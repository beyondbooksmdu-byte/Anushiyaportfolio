import {useEffect, useState} from 'react';
import {motion} from 'motion/react';
import {
  Check,
  Copy,
  Instagram,
  Linkedin,
  Mail,
  MessageCircle,
  Pencil,
  Phone,
  RotateCcw,
} from 'lucide-react';
import SectionHeader from './SectionHeader';

const CONTACT_STORAGE_KEY = 'anushiya_portfolio_contact_links';

interface EditableSocialLinks {
  email: string;
  linkedin: string;
  instagram: string;
}

const DEFAULT_LINKS: EditableSocialLinks = {
  email: 'email.placeholder@domain.com',
  linkedin: 'linkedin.com/in/your-profile-placeholder',
  instagram: '@instagram.placeholder',
};

export default function ContactSection() {
  const [links, setLinks] = useState<EditableSocialLinks>(DEFAULT_LINKS);
  const [draft, setDraft] = useState<EditableSocialLinks>(DEFAULT_LINKS);
  const [isEditing, setIsEditing] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(CONTACT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<EditableSocialLinks>;
        const merged = {
          email: parsed.email || DEFAULT_LINKS.email,
          linkedin: parsed.linkedin || DEFAULT_LINKS.linkedin,
          instagram: parsed.instagram || DEFAULT_LINKS.instagram,
        };
        setLinks(merged);
        setDraft(merged);
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const handleCopyPhone = async () => {
    try {
      await navigator.clipboard.writeText('9751331659');
      setCopiedPhone(true);
      setTimeout(() => setCopiedPhone(false), 2000);
    } catch {
      // Clipboard fallback ignored
    }
  };

  const handleSaveLinks = () => {
    const cleaned: EditableSocialLinks = {
      email: draft.email.trim() || DEFAULT_LINKS.email,
      linkedin: draft.linkedin.trim() || DEFAULT_LINKS.linkedin,
      instagram: draft.instagram.trim() || DEFAULT_LINKS.instagram,
    };
    setLinks(cleaned);
    setDraft(cleaned);
    setIsEditing(false);
    try {
      window.localStorage.setItem(CONTACT_STORAGE_KEY, JSON.stringify(cleaned));
    } catch {
      // Ignore storage errors
    }
  };

  const handleResetLinks = () => {
    setLinks(DEFAULT_LINKS);
    setDraft(DEFAULT_LINKS);
    setIsEditing(false);
    try {
      window.localStorage.removeItem(CONTACT_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }
  };

  const isEmailPlaceholder = links.email === DEFAULT_LINKS.email;
  const isLinkedinPlaceholder = links.linkedin === DEFAULT_LINKS.linkedin;
  const isInstagramPlaceholder = links.instagram === DEFAULT_LINKS.instagram;

  const linkedinHref = links.linkedin.startsWith('http')
    ? links.linkedin
    : `https://${links.linkedin}`;
  const instagramHandle = links.instagram.replace(/^@/, '');
  const instagramHref = links.instagram.startsWith('http')
    ? links.instagram
    : `https://instagram.com/${instagramHandle}`;

  return (
    <section
      id="contact"
      className="bg-[#FAFAF7] py-20 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-6 lg:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeader
            indexLabel="08 · Contact"
            title="Connect with M. Anushiya"
            description="Available for digital marketing collaborations, brand research, and web project inquiries."
          />

          {!isEditing ? (
            <button
              type="button"
              onClick={() => {
                setDraft(links);
                setIsEditing(true);
              }}
              className="inline-flex items-center gap-1.5 self-start rounded-lg border border-[#C5A253]/45 bg-[#FFFFFF] px-4 py-2 text-xs font-semibold text-[#252525] shadow-sm transition-colors hover:bg-[#F5F1E8] whitespace-nowrap shrink-0 md:self-auto"
            >
              <Pencil className="h-3.5 w-3.5 text-[#8C6D24]" />
              <span>Update Social Placeholders</span>
            </button>
          ) : (
            <div className="flex items-center gap-2 self-start md:self-auto">
              <button
                type="button"
                onClick={handleResetLinks}
                className="inline-flex items-center gap-1.5 rounded-lg border border-[#252525]/15 bg-[#FFFFFF] px-3 py-2 text-xs font-medium text-[#5C5C5C] hover:bg-[#F5F1E8]"
              >
                <RotateCcw className="h-3.5 w-3.5" />
                <span>Reset</span>
              </button>
              <button
                type="button"
                onClick={handleSaveLinks}
                className="inline-flex items-center gap-1.5 rounded-lg bg-[#C5A253] px-4 py-2 text-xs font-semibold text-[#252525] hover:bg-[#b59243]"
              >
                <Check className="h-3.5 w-3.5" />
                <span>Save Details</span>
              </button>
            </div>
          )}
        </div>

        <motion.div
          initial={{opacity: 0, y: 14}}
          whileInView={{opacity: 1, y: 0}}
          viewport={{once: true, amount: 0.15}}
          transition={{duration: 0.45, ease: [0.16, 1, 0.3, 1]}}
          className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-12"
        >
          {/* Direct Phone & WhatsApp Highlight Card */}
          <div className="card-luxury flex flex-col justify-between rounded-2xl p-6 sm:p-8 lg:col-span-5">
            <div>
              <p className="text-xs font-semibold tracking-widest text-[#8C6D24] uppercase">
                Direct Contact
              </p>
              <h3 className="mt-2 font-serif text-2xl font-semibold text-[#252525]">
                Phone &amp; WhatsApp
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-[#5C5C5C]">
                Reach out directly by phone or start a quick conversation on WhatsApp.
              </p>

              <div className="mt-6 flex items-center justify-between rounded-xl border border-[#C5A253]/25 bg-[#F5F1E8]/70 px-4 py-3.5">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFFFFF] text-[#8C6D24] shadow-sm">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-[#777777]">Contact Number</p>
                    <a
                      href="tel:+919751331659"
                      className="font-sans text-base font-semibold tabular-nums text-[#252525] hover:text-[#8C6D24]"
                    >
                      9751331659
                    </a>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleCopyPhone}
                  aria-label="Copy contact number 9751331659"
                  className="inline-flex h-9 items-center gap-1.5 rounded-lg border border-[#C5A253]/30 bg-[#FFFFFF] px-3 text-xs font-medium text-[#252525] transition-colors hover:bg-[#FAFAF7]"
                >
                  {copiedPhone ? (
                    <>
                      <Check className="h-3.5 w-3.5 text-[#8C6D24]" />
                      <span>Copied</span>
                    </>
                  ) : (
                    <>
                      <Copy className="h-3.5 w-3.5 text-[#777777]" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="mt-6 pt-2">
              <a
                href="https://wa.me/919751331659"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2.5 rounded-lg bg-[#C5A253] px-6 py-3.5 text-sm font-semibold text-[#252525] shadow-sm transition-all duration-200 hover:bg-[#b59243]"
              >
                <MessageCircle className="h-4 w-4" />
                <span>Chat on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Email, LinkedIn & Instagram Placeholders */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:col-span-7">
            {/* Email Placeholder */}
            <div className="card-luxury card-luxury-hover flex flex-col justify-between rounded-2xl p-6">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C5A253]/30 bg-[#F5F1E8] text-[#8C6D24]">
                  <Mail className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-[#252525]">
                  Email
                </h3>
                <p className="mt-1 text-xs text-[#777777]">
                  Email Placeholder
                </p>

                {isEditing ? (
                  <input
                    type="email"
                    value={draft.email}
                    onChange={(e) => setDraft({...draft, email: e.target.value})}
                    aria-label="Email address"
                    className="mt-3 w-full rounded-lg border border-[#C5A253]/40 bg-[#FAFAF7] px-3 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                  />
                ) : (
                  <p className="mt-3 break-all text-sm font-medium text-[#5C5C5C]">
                    {links.email}
                  </p>
                )}
              </div>

              {!isEditing && (
                <div className="mt-5 border-t border-[#C5A253]/15 pt-4">
                  {isEmailPlaceholder ? (
                    <button
                      type="button"
                      onClick={() => {
                        setDraft(links);
                        setIsEditing(true);
                      }}
                      className="text-xs font-semibold text-[#8C6D24] hover:underline"
                    >
                      Set Email Address
                    </button>
                  ) : (
                    <a
                      href={`mailto:${links.email}`}
                      className="text-xs font-semibold text-[#8C6D24] hover:underline"
                    >
                      Send Email
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* LinkedIn Placeholder */}
            <div className="card-luxury card-luxury-hover flex flex-col justify-between rounded-2xl p-6">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C5A253]/30 bg-[#F5F1E8] text-[#8C6D24]">
                  <Linkedin className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-[#252525]">
                  LinkedIn
                </h3>
                <p className="mt-1 text-xs text-[#777777]">
                  LinkedIn Placeholder
                </p>

                {isEditing ? (
                  <input
                    type="text"
                    value={draft.linkedin}
                    onChange={(e) => setDraft({...draft, linkedin: e.target.value})}
                    aria-label="LinkedIn profile URL"
                    className="mt-3 w-full rounded-lg border border-[#C5A253]/40 bg-[#FAFAF7] px-3 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                  />
                ) : (
                  <p className="mt-3 break-all text-sm font-medium text-[#5C5C5C]">
                    {links.linkedin}
                  </p>
                )}
              </div>

              {!isEditing && (
                <div className="mt-5 border-t border-[#C5A253]/15 pt-4">
                  {isLinkedinPlaceholder ? (
                    <button
                      type="button"
                      onClick={() => {
                        setDraft(links);
                        setIsEditing(true);
                      }}
                      className="text-xs font-semibold text-[#8C6D24] hover:underline"
                    >
                      Add LinkedIn Link
                    </button>
                  ) : (
                    <a
                      href={linkedinHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#8C6D24] hover:underline"
                    >
                      Visit Profile
                    </a>
                  )}
                </div>
              )}
            </div>

            {/* Instagram Placeholder */}
            <div className="card-luxury card-luxury-hover flex flex-col justify-between rounded-2xl p-6">
              <div>
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-[#C5A253]/30 bg-[#F5F1E8] text-[#8C6D24]">
                  <Instagram className="h-5 w-5" />
                </div>
                <h3 className="mt-5 font-serif text-xl font-semibold text-[#252525]">
                  Instagram
                </h3>
                <p className="mt-1 text-xs text-[#777777]">
                  Instagram Placeholder
                </p>

                {isEditing ? (
                  <input
                    type="text"
                    value={draft.instagram}
                    onChange={(e) => setDraft({...draft, instagram: e.target.value})}
                    aria-label="Instagram handle or URL"
                    className="mt-3 w-full rounded-lg border border-[#C5A253]/40 bg-[#FAFAF7] px-3 py-2 text-xs text-[#252525] focus:border-[#C5A253] focus:outline-none"
                  />
                ) : (
                  <p className="mt-3 break-all text-sm font-medium text-[#5C5C5C]">
                    {links.instagram}
                  </p>
                )}
              </div>

              {!isEditing && (
                <div className="mt-5 border-t border-[#C5A253]/15 pt-4">
                  {isInstagramPlaceholder ? (
                    <button
                      type="button"
                      onClick={() => {
                        setDraft(links);
                        setIsEditing(true);
                      }}
                      className="text-xs font-semibold text-[#8C6D24] hover:underline"
                    >
                      Add Instagram Handle
                    </button>
                  ) : (
                    <a
                      href={instagramHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs font-semibold text-[#8C6D24] hover:underline"
                    >
                      Visit Instagram
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
