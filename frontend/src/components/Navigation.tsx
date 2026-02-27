import { Link, useRouterState } from '@tanstack/react-router';
import { Menu, X, User, Shield } from 'lucide-react';
import { useState } from 'react';
import { useInternetIdentity } from '../hooks/useInternetIdentity';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const { identity } = useInternetIdentity();

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Modules', path: '/modules' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
    { name: 'Admin Dashboard', path: '/admin' },
  ];

  const isActive = (path: string) => currentPath === path;

  return (
    <nav className="sticky top-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border shadow-sm">
      <div className="container mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16 md:h-18">
          <Link to="/" className="flex items-center space-x-3">
            <img 
              src="/assets/generated/logo.dim_512x512.png" 
              alt="CareerSphere Logo" 
              className="h-8 w-8 md:h-10 md:w-10 object-contain"
            />
            <span className="text-lg md:text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              CareerSphere
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 lg:space-x-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2 min-h-[44px] ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                {link.path === '/admin' && <Shield className="w-4 h-4" />}
                {link.name}
              </Link>
            ))}
            {identity ? (
              <Link
                to="/profile"
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all inline-flex items-center gap-2 ${
                  isActive('/profile')
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                className={`px-3 lg:px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive('/login')
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-accent transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
            aria-label="Toggle menu"
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 space-y-2 animate-fade-in">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all min-h-[44px] ${
                  isActive(link.path)
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                {link.path === '/admin' && <Shield className="w-4 h-4" />}
                {link.name}
              </Link>
            ))}
            {identity ? (
              <Link
                to="/profile"
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 px-4 py-3 rounded-lg text-sm font-medium transition-all min-h-[44px] ${
                  isActive('/profile')
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                <User className="w-4 h-4" />
                Profile
              </Link>
            ) : (
              <Link
                to="/login"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-center px-4 py-3 rounded-lg text-sm font-medium transition-all min-h-[44px] ${
                  isActive('/login')
                    ? 'bg-primary text-primary-foreground shadow-soft'
                    : 'text-foreground/70 hover:text-foreground hover:bg-accent'
                }`}
              >
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
