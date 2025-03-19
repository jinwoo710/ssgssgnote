import { drizzle } from 'drizzle-orm/d1'
import { attendance } from '../../../src/db/schema'
import type { D1Database } from '@cloudflare/workers-types'
import { eq } from 'drizzle-orm'

export interface Env {
  DB: D1Database
}

export const onRequestPut = async ({
  request,
  env,
  params
}: {
  request: Request
  env: Env
  params: { id: string }
}) => {
  try {
    const db = drizzle(env.DB)
    const id = params.id
    const data = await request.json()

    await db
      .update(attendance)
      .set({
        studentId: data.studentId,
        date: data.date,
        status: data.status
      })
      .where(eq(attendance.id, id))

    return new Response(JSON.stringify({ success: true }), {
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

export const onRequestDelete = async ({
  env,
  params
}: {
  env: Env
  params: { id: string }
}) => {
  try {
    const db = drizzle(env.DB)
    const id = params.id

    await db.delete(attendance).where(eq(attendance.id, id))

    return new Response(JSON.stringify({ success: true }), {
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
