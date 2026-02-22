import { Target, Heart, Eye, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="py-12 sm:py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-8 sm:space-y-12">
          <div className="text-center animate-fade-in">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4">
              About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Us</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground px-4">
              Empowering Students for Skills and Knowledge
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft animate-fade-in">
            <h2 className="text-2xl sm:text-3xl font-semibold mb-3 sm:mb-4">What We Do</h2>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              We provide a comprehensive career guidance ecosystem designed specifically for school and college students. Our platform offers innovative tools, personalized recommendations, and expert guidance to help students navigate their educational journey and make informed career decisions. We combine cutting-edge technology with deep educational insights to create a seamless experience for students exploring their future.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft animate-fade-in">
            <div className="flex items-center gap-3 mb-3 sm:mb-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                <Users className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold">The Problem</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-base sm:text-lg">
              Every year, millions of students face critical career decisions without adequate guidance. Many students lack access to comprehensive information about career paths, entrance exams, and educational opportunities. This information gap leads to confusion, poor decision-making, and missed opportunities. Students often choose streams and careers based on limited knowledge or peer pressure rather than their true interests and potential.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft animate-fade-in">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <Target className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                To democratize career guidance and make quality educational counseling accessible to every student, regardless of their location or background. We aim to empower students with the knowledge and tools they need to make confident, informed decisions about their future.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-6 sm:p-8 border border-border shadow-soft animate-fade-in">
              <div className="flex items-center gap-3 mb-3 sm:mb-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                  <Eye className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                </div>
                <h2 className="text-xl sm:text-2xl font-semibold">Our Vision</h2>
              </div>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                To become India's most trusted career guidance platform, helping millions of students discover their true potential and achieve their dreams. We envision a future where every student has access to personalized, data-driven career guidance.
              </p>
            </div>
          </div>

          <div className="bg-gradient-to-br from-primary/10 to-secondary/10 rounded-2xl p-6 sm:p-8 border border-primary/20 shadow-soft animate-fade-in">
            <div className="flex items-center gap-3 mb-4 sm:mb-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl gradient-primary flex items-center justify-center shrink-0">
                <Heart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-semibold">Why Choose Us?</h2>
            </div>
            <ul className="space-y-3 sm:space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm sm:text-base text-muted-foreground">
                  <strong className="text-foreground">Comprehensive Tools:</strong> From stream selection to degree finder, we cover every aspect of career planning
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm sm:text-base text-muted-foreground">
                  <strong className="text-foreground">AI-Powered Guidance:</strong> Our intelligent chatbot provides personalized recommendations based on your interests
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm sm:text-base text-muted-foreground">
                  <strong className="text-foreground">Up-to-Date Information:</strong> Access the latest information about exams, courses, and career opportunities
                </span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 shrink-0" />
                <span className="text-sm sm:text-base text-muted-foreground">
                  <strong className="text-foreground">User-Friendly Interface:</strong> Easy-to-use platform designed with students in mind
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
