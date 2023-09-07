import { router } from '@/trpc';

import { authRouter } from '@/trpc/router/auth';
import { todosRouter } from '@/trpc/router/todos';

export const appRouter = router({
  todos: todosRouter,
  auth: authRouter,
});

export type AppRouter = typeof appRouter;
