import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Loader2 } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';

// Form schema definition
const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required." }),
  password: z.string()
    .min(1, { message: "Password is required." })
    .min(8, { message: "Password must be at least 8 characters." }),
});

// Type for form values inferred from the schema
type LoginFormValues = z.infer<typeof loginFormSchema>;

// Props interface for the LoginForm component
interface LoginFormProps {
  className?: string;
  onLoginSuccess?: (data: LoginFormValues) => void;
  // Example: could add a prop for sign-up navigation
  // onSignUpClick?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ className, onLoginSuccess }) => {
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const handleLoginSubmit = async (data: LoginFormValues) => {
    setIsLoading(true);
    console.log("Login form submitted with:", data);

    // Simulate API call
    try {
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Mock success/failure logic
      if (data.username === "testuser" && data.password === "password123") {
        console.log("Login successful");
        if (onLoginSuccess) {
          onLoginSuccess(data);
        }
        // form.reset(); // Optionally reset form on success
      } else {
        form.setError("root.serverError", { 
          type: "manual", 
          message: "Invalid username or password." 
        });
        console.error("Login failed: Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      form.setError("root.serverError", { 
        type: "manual", 
        message: "An unexpected error occurred. Please try again."
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className={cn(
      "w-full min-w-[300px] max-w-[400px]", // Sizing from layout requirements
      className
    )}>
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-center text-card-foreground">
          Log in
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6 pt-0"> {/* Shadcn CardContent default is p-6 pt-0 */} 
        <div className="flex flex-col gap-4"> {/* Consistent gap as per layout requirements */} 
          <Form {...form}>
            <form onSubmit={form.handleSubmit(handleLoginSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">Username</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Username" 
                        {...field} 
                        className="bg-card text-card-foreground placeholder:text-secondary border-input"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">Password</FormLabel>
                    <FormControl>
                      <Input 
                        type="password" 
                        placeholder="Password" 
                        {...field}
                        className="bg-card text-card-foreground placeholder:text-secondary border-input"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {form.formState.errors.root?.serverError && (
                <FormMessage className="text-sm font-medium text-destructive">
                  {form.formState.errors.root.serverError.message}
                </FormMessage>
              )}
              <Button 
                type="submit" 
                className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  'Log in'
                )}
              </Button>
            </form>
          </Form>
          <p className="text-sm text-center text-secondary">
            or,{' '}
            <a 
              href="/signup" // Example href, use React Router Link in a full app
              onClick={(e) => { 
                e.preventDefault(); // Prevent default for demo
                console.log('Navigate to sign up page');
                // if (onSignUpClick) onSignUpClick(); 
              }}
              className="font-medium text-primary hover:underline focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring rounded-sm"
            >
              sign up
            </a>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
