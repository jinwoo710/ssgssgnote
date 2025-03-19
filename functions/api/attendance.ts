import { drizzle } from 'drizzle-orm/d1'
import { attendance, students } from '../../src/db/schema'
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
  const date = url.searchParams.get('date')
  const studentId = url.searchParams.get('studentId')

  const conditions: SQL[] = []

  if (date) {
    conditions.push(eq(attendance.date, date))
  }

  if (studentId) {
    conditions.push(eq(attendance.studentId, studentId))
  }

  const results = await db
    .select({
      id: attendance.id,
      studentId: attendance.studentId,
      date: attendance.date,
      status: attendance.status,
      student: {
        id: students.id,
        studentId: students.studentId,
        name: students.name,
        gender: students.gender
      }
    })
    .from(attendance)
    .leftJoin(students, eq(attendance.studentId, students.id))
    .where(conditions.length > 0 ? and(...conditions) : undefined)

  return new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'application/json'
    }
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

    await db.insert(attendance).values({
      id,
      studentId: data.studentId,
      date: data.date,
      status: data.status
    })

    const newAttendance = await db
      .select({
        attendance: attendance,
        student: students
      })
      .from(attendance)
      .leftJoin(students, eq(attendance.studentId, students.id))
      .where(eq(attendance.id, id))

    const result = {
      ...newAttendance[0].attendance,
      student: newAttendance[0].student
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
