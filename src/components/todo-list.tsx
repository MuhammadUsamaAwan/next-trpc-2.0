'use client';

import { trpc } from '@/trpc/client';
import { type TRPCClient } from '@/trpc/serverClient';

import { Checkbox } from '@/components/ui/checkbox';

type TodoListProps = {
  todos: Awaited<ReturnType<TRPCClient['todo']['getTodos']>>;
};

export function TodoList({ todos }: TodoListProps) {
  const { data } = trpc.todo.getTodos.useQuery(undefined, {
    initialData: todos,
  });
  const { mutate } = trpc.todo.toggleCompleted.useMutation();

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
