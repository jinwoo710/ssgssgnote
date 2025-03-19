import { drizzle } from 'drizzle-orm/d1'
import { counselings, students } from '../../src/db/schema'
import { v4 as uuidv4 } from 'uuid'
import type { D1Database } from '@cloudflare/workers-types'
import { eq, and, SQL } from 'drizzle-orm'

export interface Env {
  DB: D1Database
}

export const onRequestGet = async ({
  request,
  env
}: {
  request: Request
  env: Env
}) => {
  const db = drizzle(env.DB)
  const url = new URL(request.url)
  const studentId = url.searchParams.get('studentId')
  const conditions: SQL[] = []
  if (studentId) {
    conditions.push(eq(counselings.studentId, studentId))
  }

  let query = db
    .select({
      counseling: counselings,
      student: students
    })
    .from(counselings)
    .leftJoin(students, eq(counselings.studentId, students.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)

  const results = await query

  const counselingResults = results.map(({ counseling, student }) => ({
    ...counseling,
    student
  }))

  return new Response(JSON.stringify(counselingResults), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const onRequestPost = async ({
  request,
  env
}: {
  request: Request
  env: Env
}) => {
  try {
    const db = drizzle(env.DB)
    const data = await request.json()
    const id = uuidv4()

    await db.insert(counselings).values({
      id,
      studentId: data.studentId,
      date: data.date,
      content: data.content,
      type: data.type
    })

    const newCounseling = await db
      .select({
        counseling: counselings,
        student: students
      })
      .from(counselings)
      .leftJoin(students, eq(counselings.studentId, students.id))
      .where(eq(counselings.id, id))

    const result = {
      ...newCounseling[0].counseling,
      student: newCounseling[0].student
    }
    return new Response(JSON.stringify(result), {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        error: error instanceof Error ? error.message : 'Unknown error'
      }),
      {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      }
    )
  }
}
