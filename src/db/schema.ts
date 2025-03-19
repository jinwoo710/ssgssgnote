import { sqliteTable, text, integer, primaryKey } from 'drizzle-orm/sqlite-core'

export const students = sqliteTable('students', {
  id: text('id').primaryKey(),
  studentId: integer('student_id').notNull(),
  name: text('name').notNull(),
  gender: text('gender', { enum: ['male', 'female'] }).notNull()
})

export const homeworks = sqliteTable('homeworks', {
  id: text('id').primaryKey(),
  title: text('title').notNull(),
  date: text('date').notNull(),
  description: text('description').notNull()
})

export const homeworkStudents = sqliteTable(
  'homework_students',
  {
    homeworkId: text('homework_id')
      .notNull()
      .references(() => homeworks.id, { onDelete: 'cascade' }),
    studentId: text('student_id')
      .notNull()
      .references(() => students.id, { onDelete: 'cascade' })
  },
  table => ({
    pk: primaryKey({ columns: [table.homeworkId, table.studentId] })
  })
)

export const counselings = sqliteTable('counselings', {
  id: text('id').primaryKey(),
  studentId: text('student_id')
    .notNull()
    .references(() => students.id, { onDelete: 'cascade' }),
  date: text('date').notNull(),
  content: text('content').notNull(),
  type: text('type', {
    enum: ['study', 'friend', 'attitude', 'parent']
  }).notNull()
})

export const attendance = sqliteTable('attendance', {
  id: text('id').primaryKey(),
  studentId: text('student_id')
    .notNull()
    .references(() => students.id, { onDelete: 'cascade' }),
  date: text('date').notNull(),
  status: text('status').notNull()
})
