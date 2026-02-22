import { useNavigate } from '@tanstack/react-router';
import { ArrowRight, Sparkles, Target, Users } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="relative">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-background" />
        <div className="container mx-auto px-4 py-12 sm:py-16 md:py-24 lg:py-32 relative">
          <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
            <div className="space-y-6 sm:space-y-8 animate-fade-in">
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 text-primary text-xs sm:text-sm font-medium">
                <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
                Your Career Journey Starts Here
              </div>
              
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight">
                <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                  Discover Your Future
                </span>
              </h1>
              
              <p className="text-xl sm:text-2xl md:text-3xl text-foreground/80 font-medium">
                Empowering Students for Skills and Knowledge
              </p>
              
              <p className="text-base sm:text-lg text-muted-foreground max-w-xl">
                Navigate your educational journey with confidence. Discover career paths, explore opportunities, and make informed decisions about your future.
              </p>
              
              <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
                <button
                  onClick={() => navigate({ to: '/modules' })}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-base sm:text-lg hover:shadow-soft-lg transition-all hover:scale-105 min-h-[44px]"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                </button>
                
                <button
                  onClick={() => navigate({ to: '/about' })}
                  className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3 sm:py-4 rounded-xl border-2 border-primary text-primary font-semibold text-base sm:text-lg hover:bg-primary hover:text-primary-foreground transition-all min-h-[44px]"
                >
                  Learn More
                </button>
              </div>
            </div>
            
            <div className="relative animate-fade-in order-first md:order-last">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-3xl blur-3xl" />
              <img
                src="/assets/generated/hero-students.dim_1200x600.png"
                alt="Students planning their careers"
                className="relative rounded-2xl sm:rounded-3xl shadow-soft-lg w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-12 sm:py-16 md:py-20 bg-gradient-to-b from-background to-accent/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10 sm:mb-12 md:mb-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">Why Choose Us?</h2>
            <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto px-4">
              Comprehensive tools and guidance to help you make the right career decisions
            </p>
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border hover:shadow-soft transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 sm:mb-6">
                <Target className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Personalized Guidance</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Get tailored career recommendations based on your interests, skills, and aspirations.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border hover:shadow-soft transition-all">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 sm:mb-6">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">AI-Powered Tools</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Leverage cutting-edge AI technology to discover your strengths and potential career paths.
              </p>
            </div>
            
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border hover:shadow-soft transition-all sm:col-span-2 lg:col-span-1">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl gradient-primary flex items-center justify-center mb-4 sm:mb-6">
                <Users className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">Comprehensive Resources</h3>
              <p className="text-sm sm:text-base text-muted-foreground">
                Access detailed information about degrees, exams, and career opportunities worldwide.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
