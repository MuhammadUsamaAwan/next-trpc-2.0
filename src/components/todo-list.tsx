'use client';

import { trpc } from '@/trpc/client';

import { Checkbox } from '@/components/ui/checkbox';

export function TodoList() {
  const { data } = trpc.todo.getTodos.useQuery();
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
