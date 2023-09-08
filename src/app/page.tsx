import { AddTodoForm } from '@/components/forms/add-todo-form';
import { TodoList } from '@/components/todo-list';
import { getUser } from '@/lib/server-utils';
import { trpc } from '@/trpc/serverClient';

export default async function Home() {
  const todos = await trpc.todos.getTodos();
  const user = await getUser();

  return (
    <div className='mx-auto max-w-xl py-20'>
      <h1 className='mb-4 text-3xl font-bold'>Todo List</h1>
      {user && <h2 className='mb-4 text-lg'>Signed Up as {user.email}</h2>}
      <AddTodoForm />
      <TodoList todos={todos} />
    </div>
  );
}
