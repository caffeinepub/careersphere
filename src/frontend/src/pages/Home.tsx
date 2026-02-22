import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Sparkles, Target, Users } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
        <div className="container mx-auto px-4 py-20 md:py-32 relative">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
                <Sparkles className="w-4 h-4" />
                Your Career Journey Starts Here
              </div>
              
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  CareerSphere
                </span>
              </h1>
              
              <p className="text-2xl md:text-3xl text-foreground/80 font-medium">
                Empowering Students for Skills and Knowledge
              </p>
              
              <p className="text-lg text-muted-foreground max-w-xl">
                Navigate your educational journey with confidence. Discover career paths, explore opportunities, and make informed decisions about your future.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => navigate({ to: '/modules' })}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-lg hover:shadow-soft-lg transition-all hover:scale-105"
                >
                  Get Started
                  <ArrowRight className="w-5 h-5" />
                </button>
                
                <button
                  onClick={() => navigate({ to: '/about' })}
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border-2 border-primary text-primary font-semibold text-lg hover:bg-primary hover:text-primary-foreground transition-all"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-in">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img
                src="/assets/generated/hero-students.dim_1200x600.png"
                alt="Students planning their careers"
                className="relative rounded-3xl shadow-soft-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Why Choose CareerSphere?</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools and guidance to help you make the right career decisions
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-soft transition-all">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Target className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Personalized Guidance</h3>
              <p className="text-muted-foreground">
                Get tailored career recommendations based on your interests, skills, and aspirations.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-soft transition-all">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Sparkles className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">AI-Powered Tools</h3>
              <p className="text-muted-foreground">
                Leverage cutting-edge AI technology to discover your strengths and potential career paths.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-8 border border-border hover:shadow-soft transition-all">
              <div className="w-14 h-14 rounded-xl gradient-primary flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Comprehensive Resources</h3>
              <p className="text-muted-foreground">
                Access detailed information about degrees, exams, and career opportunities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
