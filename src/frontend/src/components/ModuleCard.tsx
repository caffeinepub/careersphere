import { useNavigate } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';

interface ModuleCardProps {
  icon: string;
  title: string;
  description: string;
  path: string;
}

export default function ModuleCard({ icon, title, description, path }: ModuleCardProps) {
  const navigate = useNavigate();

  return (
    <div className="group relative bg-card rounded-2xl border border-border p-6 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-20 h-20 rounded-2xl gradient-card flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
          <img src={icon} alt={title} className="w-12 h-12 object-contain" />
        </div>
        
        <h3 className="text-lg font-semibold text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        
        <p className="text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        
        <button
          onClick={() => navigate({ to: path })}
          className="mt-auto inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-soft transition-all group-hover:gap-3"
        >
          Explore
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
