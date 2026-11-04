import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Code2, BookOpen } from 'lucide-react';
import { Project } from '../data/portfolioData';

interface ProjectModalProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const previouslyFocusedRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab' && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        );
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    if (project) {
      previouslyFocusedRef.current = document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null;
      document.body.style.overflow = 'hidden';
      closeButtonRef.current?.focus();
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
      previouslyFocusedRef.current?.focus();
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-project-title"
      ref={dialogRef}
      className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
      onClick={onClose}
    >
      <div
        className="glass-panel-strong max-w-2xl w-full max-h-[88vh] overflow-y-auto p-6 sm:p-8 space-y-6 rounded-xl border border-white/12 shadow-2xl relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-start justify-between gap-4 border-b border-white/10 pb-5">
          <div>
            <div className="flex flex-wrap items-center gap-2 font-mono text-xs text-[#A1A1AA] mb-2">
              <span className="text-[#F5F5F5] font-medium">{project.category}</span>
              {project.statusBadge && (
                <>
                  <span>·</span>
                  <span className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.04] text-[11px] text-[#A1A1AA]">
                    {project.statusBadge}
                  </span>
                </>
              )}
              {project.isCoursework && (
                <>
                  <span>·</span>
                  <span className="px-2 py-0.5 rounded border border-white/10 bg-white/[0.03] text-[11px] text-[#A1A1AA] flex items-center gap-1">
                    <BookOpen className="w-3 h-3 text-[#A1A1AA]" aria-hidden="true" />
                    Coursework
                  </span>
                </>
              )}
            </div>
            <h2 id="modal-project-title" className="font-sans text-2xl sm:text-3xl font-semibold tracking-tight text-[#F5F5F5]">
              {project.name}
            </h2>
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="p-1.5 text-[#A1A1AA] hover:text-white rounded-md border border-white/10 hover:border-white/20 transition-colors"
          >
            <X className="w-5 h-5" aria-hidden="true" />
          </button>
        </div>

        {/* Detailed overview */}
        <div className="space-y-4">
          <p className="text-sm sm:text-[15px] text-[#A1A1AA] leading-relaxed font-sans">
            {project.detailedDescription || project.shortDescription}
          </p>

          <div className="space-y-2 pt-2">
            <div className="font-mono text-xs text-[#A1A1AA] tracking-wider">TECHNOLOGIES & TOOLS</div>
            <div className="flex flex-wrap gap-2">
              {project.technologies.map((tech) => (
                <span
                  key={tech}
                  className="font-mono text-xs px-2.5 py-1 rounded bg-white/[0.04] border border-white/10 text-[#D4D4D8]"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <a
            href={project.repositoryUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-md font-mono text-xs font-medium border border-white/15 bg-white/[0.07] hover:bg-white/[0.12] hover:border-white/30 text-[#F5F5F5] transition-colors"
          >
            <Code2 className="w-4 h-4 text-[#A1A1AA]" aria-hidden="true" />
            <span>View Source Code on GitHub</span>
            <ExternalLink className="w-3.5 h-3.5 text-[#85858E]" aria-hidden="true" />
          </a>

          <button
            type="button"
            onClick={onClose}
            aria-label="Close project details"
            className="px-4 py-2 font-mono text-xs text-[#A1A1AA] hover:text-white transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
