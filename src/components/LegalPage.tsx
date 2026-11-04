import React, { useEffect } from 'react';

export type LegalPageKind = 'privacy' | 'terms' | 'cookies';

const pageTitles: Record<LegalPageKind, string> = {
  privacy: 'Privacy Policy',
  terms: 'Terms & Conditions',
  cookies: 'Cookie Policy',
};

const policyDate = 'November 4, 2026';

export function LegalPage({ page }: { page: LegalPageKind }) {
  useEffect(() => {
    document.title = `${pageTitles[page]} | s4ge`;
  }, [page]);

  return (
    <div className="legal-shell min-h-screen bg-[#080808] text-[#F5F5F5] font-sans">
      <a className="skip-link" href="#main-content">Skip to main content</a>
      <header className="border-b border-white/10 px-6 py-5 lg:px-12">
        <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
          <a href="/" className="font-mono text-sm font-semibold tracking-wider text-[#F5F5F5]">
            ~/s4ge
          </a>
          <nav aria-label="Legal pages" className="flex flex-wrap gap-x-5 gap-y-2 font-mono text-xs text-[#B0B0B7]">
            <a href="/privacy" aria-current={page === 'privacy' ? 'page' : undefined}>Privacy</a>
            <a href="/terms" aria-current={page === 'terms' ? 'page' : undefined}>Terms</a>
            <a href="/cookies" aria-current={page === 'cookies' ? 'page' : undefined}>Cookies</a>
          </nav>
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-5xl px-6 py-14 sm:py-20 lg:px-12">
        <div className="legal-content">
          <p className="font-mono text-xs uppercase tracking-wider text-[#A1A1AA]">
            Last updated {policyDate}
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight sm:text-4xl">{pageTitles[page]}</h1>

          {page === 'privacy' && <PrivacyPolicy />}
          {page === 'terms' && <Terms />}
          {page === 'cookies' && <Cookies />}
        </div>
      </main>

      <footer className="border-t border-white/10 px-6 py-6 lg:px-12">
        <div className="mx-auto flex max-w-5xl flex-col gap-3 font-mono text-xs text-[#A1A1AA] sm:flex-row sm:items-center sm:justify-between">
          <span>s4ge · Sage</span>
          <a href="mailto:shessaasiva@gmail.com">Contact the site owner</a>
          <a href="/">Return to portfolio</a>
        </div>
      </footer>
    </div>
  );
}

function PrivacyPolicy() {
  return (
    <>
      <p>
        This policy describes how Sage (also known as s4ge), the owner of this personal portfolio,
        handles information when you visit this website or use its contact option.
      </p>

      <h2>Information you choose to provide</h2>
      <p>
        The optional contact form asks only for your name, email address, and message. It does not
        submit those details to this website or a website server. Choosing “Open Email Draft”
        opens your device’s email application with a prefilled draft; the information is sent to
        the site owner only if you choose to send that email. Your email application and email
        provider process the draft and any message you send under their own terms and privacy
        practices.
      </p>

      <h2>Website and hosting information</h2>
      <p>
        This site does not use analytics, advertising pixels, or tracking scripts. The hosting
        provider used for a particular deployment may process routine connection data, such as
        an IP address, browser information, requested page, and request time, in its server logs
        for delivery, security, and reliability. The provider, location, and log-retention period
        depend on where the site is hosted; consult that provider’s privacy notice for details.
      </p>
      <p>
        The site does not load embedded social content. Following an external project or social
        link connects you to that independent service, which may process information under its
        own privacy notice. Where GDPR applies, responding to a message may be based on taking
        steps you request before a possible engagement or on the owner’s legitimate interests in
        replying to correspondence. Hosting logs may be processed for delivery and security. The
        actual legal basis and any international-transfer safeguards depend on the deployment’s
        providers and should be confirmed by the owner. Do not include sensitive personal
        information in a message.
      </p>

      <h2>Use, sharing, and retention</h2>
      <p>
        The site owner does not receive or retain contact-form entries unless you send the email.
        If you do, the information is used to read and respond to your message and is kept only as
        long as reasonably needed for that purpose or to meet applicable legal obligations. The
        site owner does not sell or share personal information for cross-context behavioral
        advertising. Information may be handled by the email and hosting providers described
        above.
      </p>

      <h2>Your privacy rights</h2>
      <p>
        Depending on where you live and whether the relevant law applies, you may have rights to
        request access to, correction of, deletion of, or a copy of personal information; to
        object to or restrict certain processing; to receive certain information in a portable
        format; to withdraw consent where processing relies on consent; and to complain to your
        local data-protection authority. California residents may
        also have rights to know, correct, or delete covered personal information and to
        non-discrimination, and the right to opt out of sale or sharing. This site does not sell
        or share personal information as those terms are defined by the CCPA/CPRA. To make a
        request, email the site owner below. Since the
        site does not receive contact-form details unless you send an email, there may be no
        information to locate or delete.
      </p>

      <h2>Contact</h2>
      <p>
        For privacy questions or requests, contact Sage at{' '}
        <a href="mailto:shessaasiva@gmail.com">shessaasiva@gmail.com</a>.
      </p>

      <p className="legal-note">
        This notice describes the site’s current behavior and is not legal advice. The owner
        should confirm the applicable legal identity, jurisdiction, hosting provider, and
        provider-specific data practices before relying on this policy.
      </p>
    </>
  );
}

function Terms() {
  return (
    <>
      <p>
        These terms apply to your use of this personal portfolio. By using the site, you agree to
        use it lawfully and not to disrupt its operation or attempt unauthorized access to its
        services.
      </p>

      <h2>Portfolio information and availability</h2>
      <p>
        Content is provided for general information about the owner’s work and interests. It may
        change over time and is provided “as is” and “as available.” No guarantee is made that the
        site will always be available, error-free, or current.
      </p>

      <h2>Intellectual property</h2>
      <p>
        Unless a page or project states otherwise, the site’s original text and design belong to
        Sage. Project names, logos, code, and other materials may belong to their respective
        owners and may be governed by separate licenses. Nothing here transfers ownership or
        grants a license beyond rights provided by applicable law or an applicable project
        license. Please contact the owner before reusing original portfolio content.
      </p>

      <h2>External sites</h2>
      <p>
        Links to third-party websites are provided for convenience. The site owner does not
        control and is not responsible for their content, availability, or privacy practices.
        Visiting them is subject to their own terms.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the extent permitted by law, the site owner is not liable for indirect or consequential
        loss arising from use of this site. Nothing in these terms limits liability or consumer
        rights that cannot legally be excluded or limited.
      </p>

      <h2>Changes and contact</h2>
      <p>
        These terms may be updated by publishing a revised version here. Questions can be sent to{' '}
        <a href="mailto:shessaasiva@gmail.com">shessaasiva@gmail.com</a>.
      </p>
      <p className="legal-note">
        These general terms are not legal advice. The owner should confirm the governing
        jurisdiction and any requirements applicable to the site.
      </p>
    </>
  );
}

function Cookies() {
  return (
    <>
      <p>
        This website currently does not set cookies or use local storage, session storage,
        analytics, advertising trackers, or embedded third-party content.
      </p>

      <h2>Contact form</h2>
      <p>
        The contact form uses your browser to open a prefilled email draft when you choose to
        continue. It does not use a cookie or save form values in browser storage. Your email
        application or provider may use its own technologies when you compose or send a message.
      </p>

      <h2>External links and hosting</h2>
      <p>
        Social profiles and project links lead to third-party sites only when you activate them.
        Those services may use cookies or other technologies under their own policies. The hosting
        provider may process technical request data as described in the{' '}
        <a href="/privacy">Privacy Policy</a>.
      </p>

      <h2>Changes</h2>
      <p>
        If this site adds cookies or similar storage in the future, this policy will be updated
        and any required choices or notices will be provided before non-essential technologies
        are used. Questions can be sent to{' '}
        <a href="mailto:shessaasiva@gmail.com">shessaasiva@gmail.com</a>.
      </p>
    </>
  );
}
