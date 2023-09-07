'use client';

import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { type z } from 'zod';

import { trpc } from '@/trpc/client';
import { signinSchema } from '@/lib/validations/auth';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

export function SignUpForm() {
  const router = useRouter();
  const { mutate, isLoading } = trpc.auth.signUp.useMutation({
    onSuccess() {
      router.push('/');
    },
  });

  const form = useForm<z.infer<typeof signinSchema>>({
    // @ts-expect-error TODO check this later
    resolver: zodResolver(signinSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  function onSubmit(values: z.infer<typeof signinSchema>) {
    mutate(values);
    form.reset();
  }

  return (
    <Form {...form}>
      <form
        onSubmit={(...args) => void form.handleSubmit(onSubmit)(...args)}
        className='flex flex-col justify-between space-y-2'
      >
        <FormField
          control={form.control}
          name='email'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input type='email' placeholder='Enter email' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name='password'
          render={({ field }) => (
            <FormItem className='flex-1'>
              <FormControl>
                <Input type='password' placeholder='Enter password' {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type='submit' disabled={isLoading}>
          Sign Up
        </Button>
      </form>
    </Form>
  );
}
