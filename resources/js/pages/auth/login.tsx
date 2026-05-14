import InputError from '@/components/input-error';
import TextLink from '@/components/text-link';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AuthLayout from '@/layouts/auth-layout';
import { Head, Link, useForm } from '@inertiajs/react';
import { FormEventHandler } from 'react';

type LoginForm = {
   email: string;
   password: string;
   remember: boolean;
};

interface LoginProps {
   status?: string;
   canResetPassword: boolean;
   googleLogIn: boolean;
}

export default function Login({ status, canResetPassword, googleLogIn }: LoginProps) {
   const { data, setData, post, processing, errors, reset } = useForm<Required<LoginForm>>({
      email: '',
      password: '',
      remember: false,
   });

   const submit: FormEventHandler = (e) => {
      e.preventDefault();
      post(route('login'), {
         onFinish: () => reset('password'),
      });
   };

   return (
      <AuthLayout title="Log in to your account" description="Enter your email and password below to log in">
         <Head title="Log in" />
         <form className="flex flex-col gap-6" onSubmit={submit}>
            <div className="grid gap-6">
               <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                     id="email"
                     type="email"
                     required
                     autoFocus
                     tabIndex={1}
                     autoComplete="email"
                     value={data.email}
                     onChange={(e) => setData('email', e.target.value)}
                     placeholder="email@example.com"
                  />
                  <InputError message={errors.email} />
               </div>

               <div className="grid gap-2">
                  <div className="flex items-center">
                     <Label htmlFor="password">Password</Label>
                     {canResetPassword && (
                        <TextLink href={route('password.request')} className="ml-auto text-sm" tabIndex={5}>
                           Forgot password test?
                        </TextLink>
                     )}
                  </div>
                  <Input
                     id="password"
                     type="password"
                     required
                     tabIndex={2}
                     autoComplete="current-password"
                     value={data.password}
                     onChange={(e) => setData('password', e.target.value)}
                     placeholder="Password"
                  />
                  <InputError message={errors.password} />
               </div>

               <div className="flex items-center space-x-3">
                  <Checkbox id="remember" name="remember" checked={data.remember} onClick={() => setData('remember', !data.remember)} tabIndex={3} />
                  <Label htmlFor="remember">Remember me</Label>
               </div>

               <Button type="submit" className="w-full">
                  Login
               </Button>

               {googleLogIn && (
                  <>
                     <div className="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t">
                        <span className="bg-background text-muted-foreground relative z-10 px-2">Or continue with</span>
                     </div>

                     <a type="button" className="w-full" href={route('auth.google.redirect')}>
                        <Button type="button" variant="outline" className="w-full">
                           <span className="flex items-center justify-center gap-2">
                              <svg aria-hidden="true" width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                                 <path d="M17.64 9.20455C17.64 8.56637 17.5827 7.95273 17.4764 7.36364H9V10.8455H13.8436C13.635 11.97 13.005 12.9232 12.0518 13.5632V15.8455H14.9564C16.6582 14.2864 17.64 11.9545 17.64 9.20455Z" fill="#4285F4" />
                                 <path d="M9 18C11.43 18 13.4673 17.1941 14.9564 15.8455L12.0518 13.5632C11.2436 14.1032 10.215 14.4314 9 14.4314C6.65591 14.4314 4.67182 12.855 3.96773 10.71H0.957275V13.0686C2.43818 15.9832 5.48182 18 9 18Z" fill="#34A853" />
                                 <path d="M3.96773 10.71C3.79 10.17 3.69091 9.5932 3.69091 9C3.69091 8.4068 3.79 7.83 3.96773 7.29V4.93137H0.957273C0.348636 6.15137 0 7.53002 0 9C0 10.47 0.348636 11.8486 0.957273 13.0686L3.96773 10.71Z" fill="#FBBC05" />
                                 <path d="M9 3.56864C10.3214 3.56864 11.5077 4.02182 12.4418 4.91318L15.0218 2.33318C13.4627 0.866364 11.4255 0 9 0C5.48182 0 2.43818 2.01682 0.957275 4.93136L3.96773 7.29C4.67182 5.145 6.65591 3.56864 9 3.56864Z" fill="#EA4335" />
                              </svg>
                              <span>Continue With Google</span>
                           </span>
                        </Button>
                     </a>
                  </>
               )}
            </div>
            <div className="text-center text-sm">
               Don&apos;t have an account?{' '}
               <Link href={route('register')} className="underline underline-offset-4">
                  Sign up
               </Link>
            </div>
         </form>

         {status && <div className="mb-4 text-center text-sm font-medium text-green-600">{status}</div>}
      </AuthLayout>
   );
}
