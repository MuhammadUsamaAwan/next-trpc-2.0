import { publicProcedure, router } from '@/trpc';
import { eq } from 'drizzle-orm';
import z from 'zod';

import { todos } from '@/db/schema';
import { addTodoSchema } from '@/lib/validations/todos';

export const todosRouter = router({
  getTodos: publicProcedure.query(async ({ ctx: { db } }) => {
    const allTodos = (await db.select().from(todos)) ?? [];
    return allTodos;
  }),
  addTodo: publicProcedure.input(addTodoSchema).mutation(async ({ ctx: { db }, input: { task } }) => {
    const [newtodo] = await db.insert(todos).values({ task }).returning();
    return newtodo;
  }),
  toggleCompleted: publicProcedure
    .input(z.object({ id: z.string(), isCompleted: z.boolean() }))
    .mutation(async ({ ctx: { db }, input: { id, isCompleted } }) => {
      await db.update(todos).set({ isCompleted }).where(eq(todos.id, id));
      return isCompleted;
    }),
});
