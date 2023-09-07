import { AddTodoForm } from '@/components/forms/add-todo-form';
import { TodoList } from '@/components/todo-list';

export default function Home() {
  return (
    <div className='mx-auto max-w-xl py-20'>
      <h1 className='mb-4 text-3xl font-bold'>Todo List</h1>
      <AddTodoForm />
      <TodoList />
    </div>
  );
}
