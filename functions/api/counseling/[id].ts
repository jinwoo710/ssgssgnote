import { drizzle } from 'drizzle-orm/d1'
import { counselings } from '../../../src/db/schema'
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
  const db = drizzle(env.DB)
  const id = params.id
  const data = await request.json()

  await db.update(counselings).set(data).where(eq(counselings.id, id))

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
}

export const onRequestDelete = async ({
  env,
  params
}: {
  env: Env
  params: { id: string }
}) => {
  const db = drizzle(env.DB)
  const id = params.id

  await db.delete(counselings).where(eq(counselings.id, id))

  return new Response(JSON.stringify({ success: true }), {
    headers: { 'Content-Type': 'application/json' }
  })
}
