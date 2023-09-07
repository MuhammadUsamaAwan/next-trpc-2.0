import { todosRouter } from '@/server/router/todos';
import { router } from '@/server/trpc';

export const appRouter = router({
  todo: todosRouter,
});

export type AppRouter = typeof appRouter;
