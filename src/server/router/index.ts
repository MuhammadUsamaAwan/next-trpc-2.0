import { todosRouter } from '@/server/router/todos';
import { router } from '@/server/trpc';

export const appRouter = router({
  todos: todosRouter,
});

export type AppRouter = typeof appRouter;
