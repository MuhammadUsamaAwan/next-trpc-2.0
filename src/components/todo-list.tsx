'use client';

import { trpc } from '@/trpc/client';
import { type TRPCClient } from '@/trpc/serverClient';
import { Checkbox } from '@/components/ui/checkbox';

type TodoListProps = {
  todos: Awaited<ReturnType<TRPCClient['todos']['getTodos']>>;
};

export function TodoList({ todos }: TodoListProps) {
  const ctx = trpc.useContext();
  const { data } = trpc.todos.getTodos.useQuery(undefined, {
    initialData: todos,
  });

  const { mutate } = trpc.todos.toggleCompleted.useMutation({
    onMutate: updatedTodo => {
      const previousTodos = ctx.todos.getTodos.getData();
      ctx.todos.getTodos.setData(
        undefined,
        data => data?.map(todo => (todo.id === updatedTodo.id ? { ...todo, ...updatedTodo } : todo))
      );
      return { previousTodos };
    },
    onError: (_, __, context) => {
      ctx.todos.getTodos.setData(undefined, context?.previousTodos);
    },
  });

  return (
    <ul className='space-y-3'>
      {data?.map(todo => (
        <li key={todo.id} className='flex items-center justify-between'>
          <span>{todo.task}</span>
          <Checkbox
            checked={todo.isCompleted}
            onCheckedChange={e => mutate({ id: todo.id, isCompleted: e.valueOf() as boolean })}
          />
        </li>
      ))}
    </ul>
  );
}
