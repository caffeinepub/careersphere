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
    <div className="group relative bg-card rounded-2xl border border-border p-4 sm:p-6 hover:shadow-soft-lg transition-all duration-300 hover:-translate-y-1 cursor-pointer">
      <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl gradient-card flex items-center justify-center shadow-soft group-hover:scale-110 transition-transform duration-300">
          <img src={icon} alt={title} className="w-10 h-10 sm:w-12 sm:h-12 object-contain" />
        </div>
        
        <h3 className="text-base sm:text-lg font-semibold text-foreground group-hover:text-primary transition-colors leading-tight">
          {title}
        </h3>
        
        <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3">
          {description}
        </p>
        
        <button
          onClick={() => navigate({ to: path })}
          className="mt-auto inline-flex items-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-lg bg-primary text-primary-foreground font-medium hover:shadow-soft transition-all group-hover:gap-3 min-h-[44px] text-sm sm:text-base"
        >
          Explore
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
