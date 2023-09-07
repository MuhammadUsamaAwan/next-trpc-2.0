'use client';

import { trpc } from '@/trpc/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { addTodoSchema } from '@/lib/validations/todos';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function AddTodoForm() {
  const { mutate } = trpc.todo.addTodo.useMutation();

  const form = useForm<z.infer<typeof addTodoSchema>>({
    resolver: zodResolver(addTodoSchema),
    defaultValues: {
      task: '',
    },
  });

  function onSubmit(values: z.infer<typeof addTodoSchema>) {
    mutate(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='mb-3 flex justify-between space-x-2'
      >
        <FormField
          control={form.control}
          name='task'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input placeholder='Add a new todo' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit'>Add</Button>
      </form>
    </Form>
  );
}
