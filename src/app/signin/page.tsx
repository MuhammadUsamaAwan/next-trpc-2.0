import { SignInForm } from '@/components/forms/sign-in-form';

export default function SignIn() {
  return (
    <div className='mx-auto max-w-xl py-20'>
      <h1 className='mb-4 text-3xl font-bold'>Sign In</h1>
      <SignInForm />
    </div>
  );
}
