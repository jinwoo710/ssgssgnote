import { drizzle } from 'drizzle-orm/d1'
import { homeworks, homeworkStudents } from '../../../src/db/schema'
import type { D1Database } from '@cloudflare/workers-types'
import { eq } from 'drizzle-orm'

export interface Env {
  DB: D1Database
}

export const onRequestPut = async ({
  env,
  request,
  params
}: {
  env: Env
  request: Request
  params: { id: string }
}) => {
  const db = drizzle(env.DB)
  const data = await request.json()

  await db
    .update(homeworks)
    .set({
      title: data.title,
      date: data.date,
      description: data.description
    })
    .where(eq(homeworks.id, params.id))

  await db
    .delete(homeworkStudents)
    .where(eq(homeworkStudents.homeworkId, params.id))

  if (data.unsubmittedStudentIds && data.unsubmittedStudentIds.length > 0) {
    const homeworkStudentValues = data.unsubmittedStudentIds.map(studentId => ({
      homeworkId: params.id,
      studentId
    }))

    await db.insert(homeworkStudents).values(homeworkStudentValues)
  }

  return new Response(
    JSON.stringify({
      id: params.id,
      ...data
    }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}

export const onRequestDelete = async ({
  env,
  params
}: {
  env: Env
  params: { id: string }
}) => {
  const db = drizzle(env.DB)

  await db
    .delete(homeworkStudents)
    .where(eq(homeworkStudents.homeworkId, params.id))

  await db.delete(homeworks).where(eq(homeworks.id, params.id))

  return new Response(null, { status: 204 })
}
