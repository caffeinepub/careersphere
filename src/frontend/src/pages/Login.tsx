import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { LogIn, Loader2 } from 'lucide-react';

export default function Login() {
  const { login, loginStatus, identity } = useInternetIdentity();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTraditionalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Traditional login is UI only as per non-goals
    alert('Traditional login is not implemented in this demo. Please use Internet Identity.');
  };

  return (
    <div className="py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                Welcome Back
              </span>
            </h1>
            <p className="text-muted-foreground">Sign in to continue your career journey</p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-soft-lg space-y-6 animate-fade-in">
            {identity ? (
              <div className="text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                  <LogIn className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-xl font-semibold">You're Logged In!</h2>
                <p className="text-muted-foreground">
                  Principal: {identity.getPrincipal().toString().slice(0, 20)}...
                </p>
              </div>
            ) : (
              <>
                <div className="space-y-4">
                  <button
                    onClick={login}
                    disabled={loginStatus === 'logging-in'}
                    className="w-full inline-flex items-center justify-center gap-2 px-6 py-4 rounded-lg bg-primary text-primary-foreground hover:shadow-soft transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loginStatus === 'logging-in' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Connecting...
                      </>
                    ) : (
                      <>
                        <LogIn className="w-5 h-5" />
                        Login with Internet Identity
                      </>
                    )}
                  </button>
                  <p className="text-xs text-center text-muted-foreground">
                    Secure authentication powered by Internet Computer
                  </p>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-border" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-card text-muted-foreground">Or continue with email</span>
                  </div>
                </div>

                <form onSubmit={handleTraditionalLogin} className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="password" className="block text-sm font-medium mb-2">
                      Password
                    </label>
                    <input
                      type="password"
                      id="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full px-4 py-3 rounded-lg border border-input bg-background focus:outline-none focus:ring-2 focus:ring-primary"
                      placeholder="••••••••"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full px-6 py-3 rounded-lg border border-border hover:bg-accent transition-all"
                  >
                    Sign In
                  </button>
                </form>

                <p className="text-sm text-center text-muted-foreground">
                  Don't have an account?{' '}
                  <button className="text-primary hover:underline">Sign up</button>
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
