import React, { useState } from 'react';
import {
  Code2,
  ExternalLink,
  Menu,
  X,
  BookOpen,
} from 'lucide-react';
import {
  DEVELOPER_PROFILE,
  APPROVED_PROJECTS,
  TECH_GROUPS,
  Project,
} from './data/portfolioData';
import { SocialLinks } from './components/SocialLinks';
import { ProjectModal } from './components/ProjectModal';
import { TopographicBackground } from './components/TopographicBackground';
import { LegalPage, LegalPageKind } from './components/LegalPage';

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeProject, setActiveProject] = useState<Project | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('Systems');
  const [contactFormOpen, setContactFormOpen] = useState(false);
  const [contactStatus, setContactStatus] = useState('');
  const legalPage = getLegalPage(window.location.pathname);

  const handleContactSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const name = formData.get('name');
    const email = formData.get('email');
    const message = formData.get('message');
    const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:shessaasiva@gmail.com?subject=${encodeURIComponent('Portfolio contact')}&body=${encodeURIComponent(body)}`;

    setContactStatus('Opening your email application with the draft.');
    window.location.href = mailto;
  };

  // Filter projects by category
  const categories = ['Systems', 'Backend and Web', 'Security and Tools', 'Experiments'];
  const filteredProjects = APPROVED_PROJECTS.filter((p) => p.category === selectedCategory);

  if (legalPage) {
    return <LegalPage page={legalPage} />;
  }

  return (
    <div className="min-h-screen bg-[#080808] text-[#F5F5F5] flex flex-col font-sans selection:bg-white/15 selection:text-white">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      {/* =========================================================================
          NAVIGATION HEADER
          ========================================================================= */}
      <header className="sticky top-0 z-40 h-16 bg-[#080808]/85 backdrop-blur-md border-b border-white/10 px-6 lg:px-12 flex items-center justify-between">
        <a
          href="#home"
          className="font-mono text-base font-semibold tracking-wider text-[#F5F5F5] hover:text-white transition-colors flex items-center gap-2"
        >
          <span className="text-[#A1A1AA]">~/</span>
          <span>{DEVELOPER_PROFILE.handle}</span>
        </a>

        {/* Desktop Navigation */}
        <nav
          aria-label="Primary Navigation"
          className="hidden md:flex items-center gap-7 font-mono text-xs tracking-wider text-[#B0B0B7]"
        >
          <a href="#about" className="hover:text-[#F5F5F5] transition-colors py-1 border-b border-transparent hover:border-white/20">
            About
          </a>
          <a href="#projects" className="hover:text-[#F5F5F5] transition-colors py-1 border-b border-transparent hover:border-white/20">
            Projects
          </a>
          <a href="#stack" className="hover:text-[#F5F5F5] transition-colors py-1 border-b border-transparent hover:border-white/20">
            Stack
          </a>
          <a href="#opportunities" className="hover:text-[#F5F5F5] transition-colors py-1 border-b border-transparent hover:border-white/20">
            Opportunities
          </a>
          <a href="#contact" className="hover:text-[#F5F5F5] transition-colors py-1 border-b border-transparent hover:border-white/20">
            Contact
          </a>
        </nav>

        {/* Header Right Action: Compact Social Links */}
        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center">
            <SocialLinks variant="header" />
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((prev) => !prev)}
            aria-label={mobileMenuOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            className="md:hidden p-2 text-[#A1A1AA] hover:text-white rounded-md border border-white/10 hover:border-white/20 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" aria-hidden="true" /> : <Menu className="w-5 h-5" aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 z-30 bg-[#0D0D0D]/95 backdrop-blur-lg border-b border-white/10 p-6 space-y-4 font-mono text-sm">
          <nav id="mobile-navigation" aria-label="Mobile navigation" className="flex flex-col space-y-3">
            <a href="#about" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#B0B0B7] hover:text-[#F5F5F5] border-b border-white/5">
              About
            </a>
            <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#B0B0B7] hover:text-[#F5F5F5] border-b border-white/5">
              Projects
            </a>
            <a href="#stack" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#B0B0B7] hover:text-[#F5F5F5] border-b border-white/5">
              Stack
            </a>
            <a href="#opportunities" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#B0B0B7] hover:text-[#F5F5F5] border-b border-white/5">
              Opportunities
            </a>
            <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="py-2 text-[#B0B0B7] hover:text-[#F5F5F5]">
              Contact
            </a>
          </nav>
          <div className="pt-2 border-t border-white/10">
            <SocialLinks variant="footer" />
          </div>
        </div>
      )}

      <main id="main-content" tabIndex={-1}>
      {/* =========================================================================
          HERO SECTION
          ========================================================================= */}
      <section
        id="home"
        className="hero-section max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-16 md:py-24 border-b border-white/10"
      >
        <TopographicBackground />
        <div className="relative z-10 max-w-3xl space-y-6">
          {/* Internship Status Badge */}
          <div className="inline-flex items-center gap-2.5 px-3 py-1.5 rounded-md glass-panel border border-white/10 font-mono text-xs text-[#D4D4D8]">
            <span className="w-2 h-2 rounded-full bg-[#B0B0B7]/80" />
            <span>{DEVELOPER_PROFILE.internshipBadge}</span>
          </div>

          {/* Heading Hierarchy */}
          <div className="space-y-3">
            <h1 className="hero-title font-sans text-[#F5F5F5]">
              {DEVELOPER_PROFILE.headline}
            </h1>

            <h2 className="hero-subtitle font-sans text-[#B0B0B7]">
              {DEVELOPER_PROFILE.subheadline}
            </h2>
          </div>

          {/* Supporting description */}
          <p className="font-sans text-base sm:text-lg text-[#B0B0B7] leading-relaxed">
            {DEVELOPER_PROFILE.supportingText}
          </p>

          {/* Primary Action */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#projects"
              className="px-5 py-2.5 rounded-md font-mono text-xs font-medium text-[#080808] bg-[#F5F5F5] hover:bg-white transition-colors"
            >
              View Projects
            </a>
            <SocialLinks variant="hero" />
          </div>
        </div>
      </section>

      {/* =========================================================================
          ABOUT SECTION
          ========================================================================= */}
      <section
        id="about"
        className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-20 border-b border-white/10"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-4 space-y-3">
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F5]">
              About
            </h2>
            <div className="flex flex-wrap items-center gap-1.5 font-mono text-xs text-[#85858E] pt-1">
              <span>Aliases:</span>
              {DEVELOPER_PROFILE.aliases.map((alias) => (
                <span
                  key={alias}
                  className="px-1.5 py-0.5 rounded bg-white/[0.04] border border-white/10 text-[#B0B0B7]"
                >
                  {alias}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:col-span-8 font-sans text-base text-[#B0B0B7] leading-relaxed">
            <p>{DEVELOPER_PROFILE.aboutText}</p>
          </div>
        </div>
      </section>

      {/* =========================================================================
          PROJECTS SECTION
          ========================================================================= */}
      <section
        id="projects"
        className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-20 border-b border-white/10"
      >
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div className="space-y-2">
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F5]">
              Projects
            </h2>
          </div>

          {/* Category Filter Controls */}
          <div
            role="group"
            aria-label="Filter projects by category"
            className="flex flex-wrap items-center gap-1.5 p-1 rounded-lg glass-panel border border-white/10 font-mono text-xs"
          >
            {categories.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setSelectedCategory(cat)}
                aria-pressed={selectedCategory === cat}
                className={`px-3 py-1.5 rounded transition-colors cursor-pointer whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-white/15 text-[#F5F5F5] font-medium border border-white/20'
                    : 'text-[#B0B0B7] hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredProjects.map((project) => (
              <article
                key={project.id}
                className="glass-panel p-5 rounded-lg flex flex-col justify-between border border-white/10 space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center justify-between gap-2 font-mono text-[11px] text-[#85858E]">
                    <span>{project.category}</span>
                    <div className="flex items-center gap-2">
                      {project.isCoursework && (
                        <span className="flex items-center gap-1 text-[#B0B0B7]">
                          <BookOpen className="w-3 h-3" aria-hidden="true" />
                          Coursework
                        </span>
                      )}
                      {project.statusBadge && (
                        <span className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.04] text-[#B0B0B7]">
                          {project.statusBadge}
                        </span>
                      )}
                    </div>
                  </div>

                  <h3 className="font-sans text-base font-semibold text-[#F5F5F5] tracking-tight">
                    {project.name}
                  </h3>

                  <p className="font-sans text-xs text-[#B0B0B7] leading-relaxed">
                    {project.shortDescription}
                  </p>

                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.technologies.map((tech) => (
                      <span
                        key={tech}
                        className="font-mono text-xs px-2.5 py-1 rounded bg-white/[0.03] border border-white/10 text-[#D4D4D8]"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-3 font-mono text-xs">
                  <a
                    href={project.repositoryUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`View source code for ${project.name} on GitHub (opens in a new tab)`}
                    className="text-[#F5F5F5] hover:underline inline-flex items-center gap-1"
                  >
                    <Code2 className="w-3.5 h-3.5 text-[#B0B0B7]" aria-hidden="true" />
                    <span>Source Code</span>
                    <ExternalLink className="w-3 h-3 text-[#85858E]" aria-hidden="true" />
                  </a>

                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    aria-label={`View details for ${project.name}`}
                    className="text-[#85858E] hover:text-white text-xs cursor-pointer"
                  >
                    View details
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}

      </section>

      {/* =========================================================================
          TECHNICAL STACK SECTION
          ========================================================================= */}
      <section
        id="stack"
        className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-20 border-b border-white/10"
      >
        <div className="mb-8 space-y-2">
          <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F5]">
            Technical Stack
          </h2>
          <p className="text-sm text-[#B0B0B7] max-w-xl font-sans">
            Technologies used across the projects above.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TECH_GROUPS.map((group) => (
            <div
              key={group.name}
              className="glass-panel p-6 rounded-xl border border-white/10 space-y-4"
            >
              <h3 className="font-sans text-sm font-semibold text-[#F5F5F5] border-b border-white/10 pb-3">
                {group.name}
              </h3>

              <ul className="space-y-3 font-mono text-xs">
                {group.items.map((item) => (
                  <li key={item.name} className="space-y-0.5">
                    <div className="text-[#F5F5F5] font-medium">{item.name}</div>
                    <div className="text-[#85858E] text-[11px] font-sans">
                      {item.detail}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* =========================================================================
          OPPORTUNITIES SECTION
          ========================================================================= */}
      <section
        id="opportunities"
        className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-20 border-b border-white/10"
      >
        <div className="glass-panel p-8 sm:p-10 rounded-xl border border-white/10 space-y-6">
          <div className="space-y-2 max-w-2xl">
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F5]">
              Opportunities
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#B0B0B7] leading-relaxed">
              Seeking engineering internship opportunities where I can contribute to production software, collaborate with experienced developers, and work on low-level or backend challenges.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {DEVELOPER_PROFILE.opportunityRoles.map((role) => (
              <div
                key={role.title}
                className="p-5 rounded-lg bg-white/[0.02] border border-white/10 space-y-1.5"
              >
                <div className="font-sans text-sm font-semibold text-[#F5F5F5]">{role.title}</div>
                <p className="font-sans text-xs text-[#85858E] leading-relaxed">
                  {role.description}
                </p>
              </div>
            ))}
          </div>

          <div className="pt-2">
            <a
              href="#contact"
              onClick={() => setContactFormOpen(true)}
              aria-controls="contact-form"
              aria-expanded={contactFormOpen}
              className="inline-flex items-center px-4 py-2 rounded-md font-mono text-xs font-medium text-[#080808] bg-[#F5F5F5] hover:bg-white transition-colors"
            >
              Get in Touch
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================================
          CONTACT SECTION
          ========================================================================= */}
      <section
        id="contact"
        className="max-w-[1440px] w-full mx-auto px-6 lg:px-12 py-20"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-3">
            <h2 className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F5]">
              Contact
            </h2>
            <p className="font-sans text-sm sm:text-base text-[#B0B0B7] leading-relaxed">
              Have an internship opportunity or an interesting engineering problem? Send me a message or connect via any of the channels below.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <SocialLinks variant="contact" />
            {contactFormOpen && (
              <form
                id="contact-form"
                onSubmit={handleContactSubmit}
                className="glass-panel rounded-xl border border-white/10 p-6 sm:p-8 space-y-5"
              >
                <h3 className="font-sans text-lg font-semibold text-[#F5F5F5]">
                  Send an email
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <label htmlFor="contact-name" className="block space-y-2 font-mono text-xs text-[#B0B0B7]">
                    Your name
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      autoComplete="name"
                      required
                      maxLength={100}
                      className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2.5 font-sans text-sm text-[#F5F5F5] placeholder:text-[#85858E]"
                    />
                  </label>
                  <label htmlFor="contact-email" className="block space-y-2 font-mono text-xs text-[#B0B0B7]">
                    Your email
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      maxLength={254}
                      aria-describedby="contact-email-hint"
                      className="mt-2 w-full rounded-md border border-white/10 bg-white/[0.03] px-3 py-2.5 font-sans text-sm text-[#F5F5F5] placeholder:text-[#85858E]"
                    />
                  </label>
                </div>
                <p id="contact-email-hint" className="font-sans text-xs text-[#A1A1AA]">
                  Your email app will use this address if the site owner replies.
                </p>
                <label htmlFor="contact-message" className="block space-y-2 font-mono text-xs text-[#B0B0B7]">
                  Message
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    required
                    maxLength={5000}
                    aria-describedby="contact-message-hint"
                    className="mt-2 w-full resize-y rounded-md border border-white/10 bg-white/[0.03] px-3 py-2.5 font-sans text-sm text-[#F5F5F5] placeholder:text-[#85858E]"
                  />
                </label>
                <p id="contact-message-hint" className="font-sans text-xs text-[#A1A1AA]">
                  Limit: 5,000 characters. The message is placed in an email draft, not sent by this site.
                </p>
                <button
                  type="submit"
                  className="inline-flex items-center px-4 py-2.5 rounded-md font-mono text-xs font-medium text-[#080808] bg-[#F5F5F5] hover:bg-white transition-colors"
                >
                  Open Email Draft
                </button>
                <p aria-live="polite" className="font-sans text-xs text-[#A1A1AA]">
                  {contactStatus && <span className="sr-only">{contactStatus} </span>}
                  By submitting, you agree to our <a className="underline underline-offset-2" href="/privacy">Privacy Policy</a>.
                  This opens your email app; the website does not receive the draft.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
      </main>

      {/* =========================================================================
          MINIMAL FOOTER
          ========================================================================= */}
      <footer className="border-t border-white/10 px-6 lg:px-12 py-8 mt-auto bg-[#080808]">
        <div className="max-w-[1440px] mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-[#A1A1AA]">
          <div>
            <span className="text-[#F5F5F5] font-semibold">{DEVELOPER_PROFILE.handle}</span> · Sage
          </div>

          <nav aria-label="Legal" className="flex flex-wrap justify-center gap-x-4 gap-y-2">
            <a href="/privacy">Privacy Policy</a>
            <a href="/terms">Terms &amp; Conditions</a>
            <a href="/cookies">Cookie Policy</a>
          </nav>

        </div>
      </footer>

      {/* Project Details Modal */}
      <ProjectModal
        project={activeProject}
        onClose={() => setActiveProject(null)}
      />

    </div>
  );
}

function getLegalPage(pathname: string): LegalPageKind | null {
  const path = pathname.replace(/\/+$/, '') || '/';
  if (path === '/privacy') return 'privacy';
  if (path === '/terms') return 'terms';
  if (path === '/cookies') return 'cookies';
  return null;
}
