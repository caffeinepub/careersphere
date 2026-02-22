import { SiFacebook, SiX, SiLinkedin, SiInstagram, SiGithub } from 'react-icons/si';
import { Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const appIdentifier = typeof window !== 'undefined' 
    ? encodeURIComponent(window.location.hostname) 
    : 'careersphere-app';

  const socialLinks = [
    { icon: SiFacebook, href: '#', label: 'Facebook' },
    { icon: SiX, href: '#', label: 'X (Twitter)' },
    { icon: SiLinkedin, href: '#', label: 'LinkedIn' },
    { icon: SiInstagram, href: '#', label: 'Instagram' },
    { icon: SiGithub, href: '#', label: 'GitHub' },
  ];

  return (
    <footer className="bg-card border-t border-border mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} CareerSphere. All rights reserved.</span>
          </div>

          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                aria-label={social.label}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>

          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <span>Built with</span>
            <Heart className="w-4 h-4 text-primary fill-primary" />
            <span>using</span>
            <a
              href={`https://caffeine.ai/?utm_source=Caffeine-footer&utm_medium=referral&utm_content=${appIdentifier}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline font-medium"
            >
              caffeine.ai
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
