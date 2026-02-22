import { Target, Heart, Eye, Users } from 'lucide-react';

export default function About() {
  return (
    <div className="py-16 min-h-screen bg-gradient-to-b from-background via-accent/10 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              About <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">CareerSphere</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Empowering Students for Skills and Knowledge
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-soft animate-fade-in">
            <h2 className="text-3xl font-semibold mb-4">What is CareerSphere?</h2>
            <p className="text-muted-foreground leading-relaxed text-lg">
              CareerSphere is a comprehensive career guidance ecosystem designed specifically for school and college students. We provide innovative tools, personalized recommendations, and expert guidance to help students navigate their educational journey and make informed career decisions. Our platform combines cutting-edge technology with deep educational insights to create a seamless experience for students exploring their future.
            </p>
          </div>

          <div className="bg-card rounded-2xl p-8 border border-border shadow-soft animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Users className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-semibold">The Problem</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed text-lg">
              Every year, millions of students face critical career decisions without adequate guidance. Many students lack access to comprehensive information about career paths, entrance exams, and educational opportunities. This information gap leads to confusion, poor decision-making, and missed opportunities. Students often choose streams and careers based on limited knowledge or peer pressure rather than their true interests and potential.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <Target className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold">Our Mission</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To democratize career guidance by providing every student with access to personalized, data-driven insights and comprehensive resources. We aim to bridge the information gap and empower students to make confident decisions about their educational and professional futures.
              </p>
            </div>

            <div className="bg-card rounded-2xl p-8 border border-border shadow-soft animate-fade-in">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                  <Eye className="w-6 h-6 text-white" />
                </div>
                <h2 className="text-2xl font-semibold">Our Vision</h2>
              </div>
              <p className="text-muted-foreground leading-relaxed">
                To become the most trusted career guidance platform in India, helping millions of students discover their true potential and achieve their dreams. We envision a future where every student has the tools and knowledge to make informed career choices aligned with their passions and strengths.
              </p>
            </div>
          </div>

          <div className="bg-gradient-card rounded-2xl p-8 border border-border shadow-soft-lg animate-fade-in">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-xl gradient-primary flex items-center justify-center">
                <Heart className="w-6 h-6 text-white" />
              </div>
              <h2 className="text-3xl font-semibold">Why Choose Us?</h2>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                'AI-powered personalized recommendations',
                'Comprehensive career and degree information',
                'Interactive tools and assessments',
                'Expert guidance and resources',
                'User-friendly interface',
                'Regular updates with latest information',
                'Free access to all students',
                'Support for multiple career paths',
              ].map((feature, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                  <span className="text-foreground">{feature}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
