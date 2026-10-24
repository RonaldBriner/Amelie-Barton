import React, { useState } from 'react';
import { X, Check, Copy, ArrowRight, MessageCircle, BookOpen, ExternalLink } from 'lucide-react';
import { BlogArticle, STUDIO_INFO } from '../data/studioData';

interface ArticleModalProps {
  article: BlogArticle | null;
  onClose: () => void;
  onSelectService: (serviceId: string, articleTitle: string) => void;
  onSelectArticle: (article: BlogArticle) => void;
  allArticles: BlogArticle[];
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onSelectService,
  onSelectArticle,
  allArticles,
}) => {
  const [copied, setCopied] = useState(false);
  const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});

  if (!article) return null;

  const relatedArticles = allArticles.filter((a) => a.id !== article.id).slice(0, 2);

  const handleCopyLink = () => {
    const url = `${window.location.origin}/#journal-${article.slug}`;
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const toggleChecklist = (idx: number) => {
    setCheckedItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#140E21]/75 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="article-modal-title"
    >
      <div className="relative w-full max-w-4xl bg-[#FCFBF9] border border-[#140E21]/12 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[90vh] flex flex-col">
        {/* Sticky Top Reader Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#FCFBF9] border-b border-[#140E21]/10 shrink-0">
          <div className="flex items-center gap-2 text-xs text-[#534D66] truncate">
            <BookOpen className="w-4 h-4 text-[#4C1D95] shrink-0" />
            <span className="font-medium text-[#140E21]">Amelie Barton Journal</span>
            <span aria-hidden="true">·</span>
            <span>{article.category}</span>
            <span aria-hidden="true">·</span>
            <span>{article.readTime}</span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-[#140E21] bg-[#F4F1EA] hover:bg-[#EAE5D9] rounded-lg transition-colors cursor-pointer whitespace-nowrap"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-700" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Link Copied' : 'Share Guide'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              aria-label="Close article reader"
              className="p-2 text-[#534D66] hover:text-[#140E21] hover:bg-[#F4F1EA] rounded-lg transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Editorial Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-8">
          {/* Header Metadata (Unboxed per Zero-Pill Discipline) */}
          <div className="space-y-4">
            <div className="flex flex-wrap items-center gap-2 text-xs font-medium text-[#4C1D95]">
              <span>{article.category}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#534D66]">Published {article.publishedDate}</span>
              <span aria-hidden="true">·</span>
              <span className="text-[#534D66]">Target Focus: {article.targetKeyword}</span>
            </div>

            <h2
              id="article-modal-title"
              className="font-display text-2xl sm:text-4xl font-semibold text-[#140E21] leading-tight tracking-tight"
              style={{ textWrap: 'balance' }}
            >
              {article.title}
            </h2>

            <p className="text-base sm:text-lg text-[#534D66] leading-relaxed max-w-[68ch]">
              {article.excerpt}
            </p>

            {/* Author Bar */}
            <div className="flex items-center justify-between flex-wrap gap-4 pt-4 border-t border-[#140E21]/10">
              <div className="flex items-center gap-3">
                <img
                  src={STUDIO_INFO.images.ameliePortrait}
                  alt="Amelie Barton"
                  referrerPolicy="no-referrer"
                  className="w-10 h-10 rounded-full object-cover border border-[#140E21]/15"
                />
                <div>
                  <div className="text-sm font-semibold text-[#140E21]">Written by Amelie Barton</div>
                  <div className="text-xs text-[#534D66]">
                    Lead Website Designer & Local SEO Strategist · Sutton, SM1 4AF
                  </div>
                </div>
              </div>
              <a
                href={STUDIO_INFO.contact.whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-xs font-semibold text-[#4C1D95] hover:underline whitespace-nowrap"
              >
                <MessageCircle className="w-4 h-4" />
                <span>Ask Amelie a Question on WhatsApp</span>
              </a>
            </div>
          </div>

          {/* Cover Image */}
          <div className="relative aspect-[16/9] w-full rounded-lg overflow-hidden bg-[#140E21]">
            <img
              src={article.coverImage}
              alt={article.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Executive Key Takeaways */}
          <div className="p-6 rounded-lg bg-[#F4F1EA] border border-[#140E21]/10 space-y-3">
            <div className="text-xs font-semibold uppercase tracking-wider text-[#4C1D95]">
              Executive Summary & Key Takeaways
            </div>
            <ul className="space-y-2.5">
              {article.keyTakeaways.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-sm text-[#140E21] leading-relaxed">
                  <span className="font-mono-tabular text-xs font-semibold text-[#4C1D95] mt-0.5">
                    0{index + 1}.
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Full Article Sections */}
          <div className="space-y-8 max-w-[68ch]">
            {article.sections.map((sec, idx) => (
              <div key={idx} className="space-y-4">
                <h3 className="font-display text-xl sm:text-2xl font-semibold text-[#140E21] leading-snug">
                  {sec.heading}
                </h3>
                {sec.body.map((paragraph, pIdx) => (
                  <p key={pIdx} className="text-base text-[#2D263E] leading-relaxed">
                    {paragraph}
                  </p>
                ))}
                {sec.highlightBox && (
                  <div className="p-5 rounded-lg bg-[#FCFBF9] border border-[#4C1D95]/25 text-sm font-medium text-[#140E21] leading-relaxed">
                    {sec.highlightBox}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Interactive Implementation Checklist */}
          <div className="p-6 rounded-lg bg-white border border-[#140E21]/12 space-y-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div>
                <h4 className="font-display text-lg font-semibold text-[#140E21]">
                  Interactive Audit: {article.checklistTitle}
                </h4>
                <p className="text-xs text-[#534D66]">
                  Tick the items your business already has in place—or let our Sutton studio implement the rest for you.
                </p>
              </div>
              <span className="font-mono-tabular text-xs font-semibold text-[#4C1D95]">
                {Object.values(checkedItems).filter(Boolean).length} / {article.checklistItems.length} Verified
              </span>
            </div>
            <div className="space-y-2.5">
              {article.checklistItems.map((cItem, cIdx) => {
                const isChecked = !!checkedItems[cIdx];
                return (
                  <button
                    key={cIdx}
                    type="button"
                    onClick={() => toggleChecklist(cIdx)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg border text-left text-sm transition-colors cursor-pointer ${
                      isChecked
                        ? 'bg-[#4C1D95]/5 border-[#4C1D95]/30 text-[#140E21]'
                        : 'bg-[#FCFBF9] border-[#140E21]/10 text-[#2D263E] hover:border-[#140E21]/25'
                    }`}
                  >
                    <span
                      className={`w-5 h-5 rounded flex items-center justify-center border shrink-0 transition-colors ${
                        isChecked ? 'bg-[#4C1D95] border-[#4C1D95] text-white' : 'border-[#534D66]/40 bg-white'
                      }`}
                    >
                      {isChecked && <Check className="w-3.5 h-3.5" />}
                    </span>
                    <span className={isChecked ? 'line-through text-[#534D66]' : ''}>{cItem}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Embedded Conversion CTA */}
          <div className="p-6 sm:p-8 rounded-xl bg-[#140E21] text-white flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-2 max-w-xl">
              <div className="text-xs text-[#DDD6FE]">Direct Studio Implementation · Sutton SM1 4AF</div>
              <h4 className="font-display text-xl sm:text-2xl font-semibold text-white">
                Want Amelie Barton to implement this for your business?
              </h4>
              <p className="text-sm text-white/80 leading-relaxed">
                Work one-on-one with our Sutton studio to build a sub-second website and rank at the top of Google Maps.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onSelectService(article.relatedServiceId, article.title);
                }}
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-semibold bg-[#4C1D95] hover:bg-[#6D28D9] text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
              >
                <span>{article.ctaLabel}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Further Reading */}
          {relatedArticles.length > 0 && (
            <div className="pt-6 border-t border-[#140E21]/10 space-y-4">
              <div className="text-xs font-semibold uppercase tracking-wider text-[#534D66]">
                Continue Reading in the Journal
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {relatedArticles.map((rel) => (
                  <button
                    key={rel.id}
                    type="button"
                    onClick={() => {
                      setCheckedItems({});
                      onSelectArticle(rel);
                    }}
                    className="p-4 rounded-lg bg-[#F4F1EA] hover:bg-[#EAE5D9] border border-[#140E21]/10 text-left transition-colors cursor-pointer space-y-1.5"
                  >
                    <div className="text-xs text-[#4C1D95] font-medium">
                      {rel.category} · {rel.readTime}
                    </div>
                    <div className="font-display text-base font-semibold text-[#140E21] line-clamp-2">
                      {rel.title}
                    </div>
                    <div className="inline-flex items-center gap-1 text-xs font-semibold text-[#140E21] pt-1">
                      <span>Read Article</span>
                      <ExternalLink className="w-3 h-3" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
