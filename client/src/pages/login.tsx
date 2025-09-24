import { useState } from "react";
import { Link, useLocation } from "wouter";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema, type LoginData } from "@shared/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useAuth } from "@/components/auth-context";
import { loginUser } from "@/lib/auth";
import { useToast } from "@/hooks/use-toast";

export default function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const { login } = useAuth();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (data: LoginData) => {
    setIsLoading(true);
    setError("");

    try {
      const response = await loginUser(data.email, data.password);
      login(response.user, response.token);
      toast({
        title: "Welcome back!",
        description: "You have been successfully logged in.",
      });
      setLocation("/");
    } catch (err: any) {
      setError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  // 🔹 Google OAuth handler
  const handleGoogleLogin = () => {
    window.location.href = "http://localhost:5008/api/auth/google";
  };

  return (
    <div className="gradient-bg min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-md card-gradient">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold text-foreground mb-2">Welcome Back</CardTitle>
          <p className="text-muted-foreground">Sign in to continue your career journey</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {/* Email Field */}
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                {...register("email")}
                className="bg-input border-border"
                data-testid="input-email"
              />
              {errors.email && (
                <p className="text-sm text-destructive">{errors.email.message}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password")}
                className="bg-input border-border"
                data-testid="input-password"
              />
              {errors.password && (
                <p className="text-sm text-destructive">{errors.password.message}</p>
              )}
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="remember"
                  className="rounded border-border text-primary focus:ring-ring"
                />
                <Label htmlFor="remember" className="text-sm text-muted-foreground">
                  Remember me
                </Label>
              </div>
              <Link href="#" className="text-sm text-primary hover:underline">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full btn-primary py-2 rounded-lg font-semibold"
              disabled={isLoading}
              data-testid="button-submit"
            >
              {isLoading ? "Signing In..." : "Sign In"}
            </Button>
          </form>

          {/* OR Divider */}
          <div className="flex items-center my-4">
            <hr className="flex-grow border-t border-border" />
            <span className="mx-2 text-muted-foreground text-sm">OR</span>
            <hr className="flex-grow border-t border-border" />
          </div>

          {/* Google Login Button */}
          <Button
            type="button"
            variant="outline"
            className="w-full flex items-center justify-center space-x-2"
            onClick={handleGoogleLogin}
          >
            <img
              src="https://www.svgrepo.com/show/355037/google.svg"
              alt="Google"
              className="w-5 h-5"
            />
            <span>Continue with Google</span>
          </Button>

          <div className="mt-6 text-center">
            <p className="text-sm text-muted-foreground">
              Don't have an account?{" "}
              <Link href="/signup" className="text-primary hover:underline" data-testid="link-signup">
                Sign up
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
