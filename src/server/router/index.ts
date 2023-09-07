import { authRouter } from '@/server/router/auth';
import { todosRouter } from '@/server/router/todos';
import { router } from '@/server/trpc';

export const appRouter = router({
  todos: todosRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
