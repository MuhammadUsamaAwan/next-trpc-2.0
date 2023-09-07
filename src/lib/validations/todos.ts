import z from 'zod';

export const addTodoSchema = z.object({
  task: z.string().refine(value => value.trim().length > 0, {
    message: 'Task must be at least 1 character long',
  }),
});
