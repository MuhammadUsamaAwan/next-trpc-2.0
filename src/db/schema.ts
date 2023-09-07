import { randomUUID } from 'crypto';
import { sql } from 'drizzle-orm';
import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const todos = sqliteTable('todos', {
  id: text('id')
    .$defaultFn(() => randomUUID())
    .primaryKey(),
  task: text('task').notNull(),
  isCompleted: integer('is_completed', { mode: 'boolean' }).notNull().default(false),
  createdAt: text('timestamp')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`),
});
