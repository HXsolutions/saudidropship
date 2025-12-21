
'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useAuth, useUser } from '@/firebase';
import {
  signInWithEmailAndPassword,
  AuthError,
  setPersistence,
  browserSessionPersistence,
} from 'firebase/auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

const loginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email.' }),
  password: z.string().min(1, { message: 'Password is required.' }),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export default function LoginPage() {
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth();
  const { user, isUserLoading } = useUser();
  const { toast } = useToast();
  const router = useRouter();

  // Redirect if user is already logged in and auth is no longer loading
  useEffect(() => {
    if (!isUserLoading && user) {
      router.replace('/admin');
    }
  }, [user, isUserLoading, router]);

  const loginForm = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const handleAuthError = (error: AuthError) => {
    let description = 'An unexpected error occurred. Please try again.';
    switch (error.code) {
      case 'auth/wrong-password':
      case 'auth/invalid-credential':
      case 'auth/user-not-found':
        description = 'Incorrect email or password. Please try again.';
        break;
      case 'auth/invalid-email':
        description = 'Please enter a valid email address.';
        break;
      default:
        console.error('Firebase Auth Error:', error);
    }
    toast({
      variant: 'destructive',
      title: 'Authentication Failed',
      description,
    });
  };

  const onSubmit = async (values: LoginFormValues) => {
    setIsLoading(true);
    if (!auth) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Auth service is not available.',
      });
      setIsLoading(false);
      return;
    }
    try {
      // Set persistence to session before signing in.
      await setPersistence(auth, browserSessionPersistence);
      await signInWithEmailAndPassword(auth, values.email, values.password);
      toast({ title: 'Login Successful', description: "Redirecting to dashboard..." });
      // The useEffect hook will handle the redirect once the user state is updated.
    } catch (error) {
      handleAuthError(error as AuthError);
      setIsLoading(false); // Only stop loading on error
    }
  };
  
  // While checking auth state, or if a user is found (and redirection is imminent), show a loader.
  // This prevents the login form from flashing before redirection.
  if (isUserLoading || user) {
     return (
      <div className="flex h-screen w-screen items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  // Only render the form if auth is done loading AND there is no user
  return (
    <div className="container mx-auto flex min-h-screen items-center justify-center px-4 py-12">
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Admin Login</CardTitle>
          <CardDescription>
            Access your admin dashboard.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Login
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  );
}
