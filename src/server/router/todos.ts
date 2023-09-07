import { publicProcedure, router } from '@/server/trpc';

export const todosRouter = router({
  getTodos: publicProcedure.query(() => {
    return [1, 2, 4];
  }),
});
