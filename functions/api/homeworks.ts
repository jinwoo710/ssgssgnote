import { drizzle } from 'drizzle-orm/d1'
import { homeworks, homeworkStudents } from '../../src/db/schema'
import { v4 as uuidv4 } from 'uuid'
import type { D1Database } from '@cloudflare/workers-types'
import { eq } from 'drizzle-orm'

export interface Env {
  DB: D1Database
}

export const onRequestGet = async ({ env }: { env: Env }) => {
  const db = drizzle(env.DB)
  const homeworkList = await db.select().from(homeworks)
  const result = await Promise.all(
    homeworkList.map(async homework => {
      const homeworkStudentsResult = await db
        .select()
        .from(homeworkStudents)
        .where(eq(homeworkStudents.homeworkId, homework.id))

      const unsubmittedStudentIds = homeworkStudentsResult.map(
        hs => hs.studentId
      )

      return {
        ...homework,
        unsubmittedStudentIds
      }
    })
  )

  return new Response(JSON.stringify(result), {
    headers: {
      'Content-Type': 'application/json'
    }
  })
}

export const onRequestPost = async ({
  env,
  request
}: {
  env: Env
  request: Request
}) => {
  const db = drizzle(env.DB)
  const data = await request.json()
  const id = uuidv4()
  await db.insert(homeworks).values({
    id,
    title: data.title,
    date: data.date,
    description: data.description
  })
  if (data.unsubmittedStudentIds && data.unsubmittedStudentIds.length > 0) {
    const homeworkStudentValues = data.unsubmittedStudentIds.map(studentId => ({
      homeworkId: id,
      studentId
    }))

    await db.insert(homeworkStudents).values(homeworkStudentValues)
  }
  return new Response(
    JSON.stringify({
      id,
      title: data.title,
      date: data.date,
      description: data.description,
      unsubmittedStudentIds: data.unsubmittedStudentIds || []
    }),
    {
      headers: {
        'Content-Type': 'application/json'
      }
    }
  )
}
