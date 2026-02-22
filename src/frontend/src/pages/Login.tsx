import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { LogIn, Loader2, CheckCircle, Save, Heart, TrendingUp, LogOut } from 'lucide-react';
import { useNavigate } from '@tanstack/react-router';

export default function Login() {
  const navigate = useNavigate();
  const { login, loginStatus, identity, clear } = useInternetIdentity();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleTraditionalLogin = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Traditional login is not implemented in this demo. Please use Internet Identity.');
  };

  const handleLogout = () => {
    clear();
    navigate({ to: '/' });
  };

  const benefits = [
    {
      icon: Save,
      title: 'Save Quiz Progress',
      description: 'Your Stream Selector results are automatically saved and accessible anytime',
    },
    {
      icon: Heart,
      title: 'Bookmark Careers & Degrees',
      description: 'Save your favorite career paths and degree programs for quick access',
    },
    {
      icon: TrendingUp,
      title: 'Track Your Journey',
      description: 'Monitor your exploration progress and revisit your saved preferences',
    },
  ];

  return (
    <div className="py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-8 animate-fade-in">
            <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-6">
              <LogIn className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold mb-2">
              <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                {identity ? 'Welcome Back!' : 'Sign In to CareerSphere'}
              </span>
            </h1>
            <p className="text-muted-foreground">
              {identity ? 'You are successfully logged in' : 'Unlock personalized features and save your progress'}
            </p>
          </div>

          {identity ? (
            // Logged In State
            <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
              <div className="bg-card rounded-2xl p-8 border border-border shadow-soft-lg text-center">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                  <CheckCircle className="w-8 h-8 text-primary" />
                </div>
                <h2 className="text-2xl font-semibold mb-3">You're Logged In!</h2>
                <p className="text-sm text-muted-foreground mb-2">Principal ID:</p>
                <p className="text-xs font-mono bg-accent px-4 py-2 rounded-lg break-all mb-6">
                  {identity.getPrincipal().toString()}
                </p>
                <div className="flex gap-4 justify-center">
                  <button
                    onClick={() => navigate({ to: '/profile' })}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground hover:shadow-soft transition-all"
                  >
                    View Profile
                  </button>
                  <button
                    onClick={handleLogout}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border hover:bg-accent transition-all"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </button>
                </div>
              </div>

              <div className="bg-gradient-to-r from-primary/5 to-secondary/5 rounded-2xl p-6 border border-primary/20">
                <h3 className="font-semibold mb-3 text-center">What You Can Do Now:</h3>
                <div className="grid md:grid-cols-3 gap-4">
                  {benefits.map((benefit, index) => (
                    <div key={index} className="text-center">
                      <benefit.icon className="w-8 h-8 mx-auto mb-2 text-primary" />
                      <p className="text-sm font-medium">{benefit.title}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            // Login State
            <div className="grid md:grid-cols-2 gap-8">
              {/* Benefits Section */}
              <div className="space-y-6 animate-fade-in">
                <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-8 border border-primary/20">
                  <h2 className="text-2xl font-semibold mb-6">Why Sign In?</h2>
                  <div className="space-y-6">
                    {benefits.map((benefit, index) => (
                      <div key={index} className="flex gap-4">
                        <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                          <benefit.icon className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                          <h3 className="font-semibold mb-1">{benefit.title}</h3>
                          <p className="text-sm text-muted-foreground">{benefit.description}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Login Form Section */}
              <div className="bg-card rounded-2xl p-8 border border-border shadow-soft-lg space-y-6 animate-fade-in">
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
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
