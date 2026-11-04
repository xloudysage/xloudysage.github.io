import React from 'react';
import { Github, Linkedin, Instagram, ExternalLink } from 'lucide-react';
import { SOCIAL_LINKS, SocialLinkItem } from '../data/portfolioData';

// Monochrome X (formerly Twitter) icon
const XIcon: React.FC<{ className?: string }> = ({ className = 'w-4 h-4' }) => (
  <svg
    viewBox="0 0 24 24"
    aria-hidden="true"
    className={`fill-current ${className}`}
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

interface SocialLinksProps {
  className?: string;
  variant?: 'header' | 'hero' | 'contact' | 'footer';
}

export const SocialLinks: React.FC<SocialLinksProps> = ({
  className = '',
  variant = 'contact',
}) => {
  const getIcon = (id: SocialLinkItem['id'], iconClass = 'w-4 h-4') => {
    switch (id) {
      case 'github':
        return <Github className={iconClass} aria-hidden="true" />;
      case 'linkedin':
        return <Linkedin className={iconClass} aria-hidden="true" />;
      case 'instagram':
        return <Instagram className={iconClass} aria-hidden="true" />;
      case 'x':
        return <XIcon className={iconClass} />;
    }
  };

  // Header variant: Compact icons only (GitHub, LinkedIn, X)
  if (variant === 'header') {
    const headerLinks = SOCIAL_LINKS.filter((l) => l.id !== 'instagram');
    return (
      <div className={`flex items-center gap-1.5 ${className}`}>
        {headerLinks.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} Profile (${link.username}) - opens in a new tab`}
            title={`${link.label} (@${link.username})`}
            className="p-2 rounded-md text-[#A1A1AA] hover:text-[#F5F5F5] hover:bg-white/[0.06] transition-colors"
          >
            {getIcon(link.id, 'w-4 h-4')}
          </a>
        ))}
      </div>
    );
  }

  // Hero variant: Prioritises GitHub with secondary icon buttons
  if (variant === 'hero') {
    const githubLink = SOCIAL_LINKS.find((l) => l.id === 'github')!;
    const secondaryLinks = SOCIAL_LINKS.filter((l) => l.id !== 'github');

    return (
      <div className={`flex flex-wrap items-center gap-2.5 ${className}`}>
        {/* Primary Hero GitHub Link */}
        <a
          href={githubLink.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub Profile - opens in a new tab"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-md font-mono text-xs font-medium border border-white/12 bg-white/[0.04] hover:bg-white/[0.08] hover:border-white/25 text-[#F5F5F5] transition-colors"
        >
          <Github className="w-4 h-4 text-[#A1A1AA]" aria-hidden="true" />
          <span>GitHub</span>
          <ExternalLink className="w-3 h-3 text-[#85858E]" aria-hidden="true" />
        </a>

        {/* Secondary icons (LinkedIn, Instagram, X) without overwhelming the hero */}
        <div className="flex items-center gap-1.5">
          {secondaryLinks.map((link) => (
            <a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${link.label} Profile (${link.username}) - opens in a new tab`}
              title={`${link.label} (@${link.username})`}
              className="p-2 rounded-md border border-white/10 bg-white/[0.02] hover:bg-white/[0.06] hover:border-white/20 text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors"
            >
              {getIcon(link.id, 'w-3.5 h-3.5')}
            </a>
          ))}
        </div>
      </div>
    );
  }

  // Footer variant: Compact monochrome text links
  if (variant === 'footer') {
    return (
      <div className={`flex flex-wrap items-center gap-4 ${className}`}>
        {SOCIAL_LINKS.map((link) => (
          <a
            key={link.id}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`${link.label} Profile - opens in a new tab`}
            className="font-mono text-xs text-[#A1A1AA] hover:text-[#F5F5F5] transition-colors inline-flex items-center gap-1"
          >
            <span>{link.label}</span>
            <ExternalLink className="w-2.5 h-2.5 text-[#52525B]" aria-hidden="true" />
          </a>
        ))}
      </div>
    );
  }

  // Contact section variant: Full cards for all 4 verified profiles
  return (
    <div className={`grid grid-cols-1 sm:grid-cols-2 gap-3 ${className}`}>
      {SOCIAL_LINKS.map((link) => (
        <a
          key={link.id}
          href={link.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`${link.label} Profile (@${link.username}) - opens in a new tab`}
          className="glass-panel p-3.5 rounded-lg flex items-center justify-between group border border-white/10 hover:border-white/25 hover:bg-white/[0.06] transition-colors"
        >
          <div className="flex items-center gap-3">
            <div className="p-2 rounded bg-white/[0.04] text-[#A1A1AA] group-hover:text-[#F5F5F5] transition-colors">
              {getIcon(link.id, 'w-4 h-4')}
            </div>
            <div>
              <div className="font-sans text-xs font-semibold text-[#F5F5F5]">{link.label}</div>
              <div className="font-mono text-[11px] text-[#85858E]">@{link.username}</div>
            </div>
          </div>
          <ExternalLink className="w-3.5 h-3.5 text-[#85858E] group-hover:text-[#A1A1AA] transition-colors" aria-hidden="true" />
        </a>
      ))}
    </div>
  );
};
