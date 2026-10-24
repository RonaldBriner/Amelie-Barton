import React, { useState } from 'react';
import { X, Check, ShieldCheck, MessageCircle, ArrowRight, Sparkles } from 'lucide-react';
import { StudioPackage, PackageAddon, STUDIO_INFO } from '../data/studioData';

interface PackageCheckoutModalProps {
  selectedPackage: StudioPackage | null;
  selectedAddons: PackageAddon[];
  onToggleAddon: (addonId: string) => void;
  allAddons: PackageAddon[];
  onClose: () => void;
}

export const PackageCheckoutModal: React.FC<PackageCheckoutModalProps> = ({
  selectedPackage,
  selectedAddons,
  onToggleAddon,
  allAddons,
  onClose,
}) => {
  const [paymentMode, setPaymentMode] = useState<'deposit' | 'full'>('deposit');
  const [clientName, setClientName] = useState('');
  const [clientEmail, setClientEmail] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [businessName, setBusinessName] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [projectNotes, setProjectNotes] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [orderConfirmed, setOrderConfirmed] = useState<{
    referenceId: string;
    timestamp: string;
  } | null>(null);

  if (!selectedPackage) return null;

  const addonsTotal = selectedAddons.reduce((sum, item) => sum + item.price, 0);
  const totalInvestment = selectedPackage.price + addonsTotal;
  const dueToday = paymentMode === 'deposit' ? Math.round(totalInvestment * 0.5) : totalInvestment;

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientName.trim() || !clientEmail.trim() || !clientPhone.trim()) {
      setErrorMessage('Please enter your name, email address, and phone/WhatsApp number to reserve your studio slot.');
      return;
    }
    setErrorMessage('');
    const randomRef = `AB-${Math.floor(1000 + Math.random() * 9000)}`;
    setOrderConfirmed({
      referenceId: randomRef,
      timestamp: new Date().toLocaleDateString('en-GB', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
    });
  };

  const buildWhatsAppOrderUrl = () => {
    const addonNames =
      selectedAddons.length > 0 ? selectedAddons.map((a) => a.title).join(', ') : 'None';
    const text = `Hi Amelie, I would like to book the "${selectedPackage.name}" package (£${totalInvestment.toLocaleString()}).\n\nSelected Add-ons: ${addonNames}\nPayment Option: ${
      paymentMode === 'deposit' ? `50% Studio Deposit (£${dueToday})` : `Full Payment (£${dueToday})`
    }\nName: ${clientName || 'Prospective Client'}\nBusiness: ${businessName || 'To be confirmed'}`;
    return `https://wa.me/${STUDIO_INFO.contact.whatsapp}?text=${encodeURIComponent(text)}`;
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-[#140E21]/75 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto"
      role="dialog"
      aria-modal="true"
      aria-labelledby="checkout-modal-title"
    >
      <div className="relative w-full max-w-3xl bg-[#FCFBF9] border border-[#140E21]/12 rounded-xl shadow-2xl overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Top Bar */}
        <div className="flex items-center justify-between gap-4 px-6 py-4 bg-[#140E21] text-white shrink-0">
          <div>
            <div className="text-xs text-[#DDD6FE]">Amelie Barton Studio · 1 Gemini Court, Sutton SM1 4AF</div>
            <h2 id="checkout-modal-title" className="font-display text-lg sm:text-xl font-semibold">
              {orderConfirmed ? `Booking Confirmed — ${orderConfirmed.referenceId}` : 'Configure & Reserve Your Studio Package'}
            </h2>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close package reservation modal"
            className="p-2 text-white/70 hover:text-white hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-6">
          {orderConfirmed ? (
            <div className="space-y-6 py-4">
              <div className="p-6 rounded-xl bg-emerald-950/5 border border-emerald-800/25 space-y-4">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <span className="text-xs font-semibold uppercase tracking-wider text-emerald-800">
                    Studio Reservation Verified
                  </span>
                  <span className="font-mono-tabular text-xs font-semibold text-[#140E21]">
                    Ref: {orderConfirmed.referenceId} · {orderConfirmed.timestamp}
                  </span>
                </div>
                <h3 className="font-display text-2xl font-semibold text-[#140E21]">
                  Thank you, {clientName}. Your project slot is reserved.
                </h3>
                <p className="text-sm text-[#534D66] leading-relaxed">
                  Amelie Barton has received your package specification for{' '}
                  <strong className="text-[#140E21]">{selectedPackage.name}</strong>. You will receive your formal studio
                  agreement and invoice at <strong className="text-[#140E21]">{clientEmail}</strong> within 2 business hours,
                  or you can fast-track kickoff immediately on WhatsApp below.
                </p>

                <div className="p-4 rounded-lg bg-white border border-[#140E21]/10 space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-[#534D66]">Selected Package:</span>
                    <span className="font-semibold text-[#140E21]">{selectedPackage.name}</span>
                  </div>
                  {selectedAddons.map((addon) => (
                    <div key={addon.id} className="flex justify-between text-xs">
                      <span className="text-[#534D66]">+ {addon.title}</span>
                      <span className="font-mono-tabular text-[#140E21]">£{addon.price.toLocaleString()}</span>
                    </div>
                  ))}
                  <div className="border-t border-[#140E21]/10 pt-2 flex justify-between font-semibold">
                    <span>Total Package Value:</span>
                    <span className="font-mono-tabular text-[#140E21]">£{totalInvestment.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-[#4C1D95] font-semibold">
                    <span>{paymentMode === 'deposit' ? '50% Kickoff Deposit Selected:' : 'Full Upfront Settlement:'}</span>
                    <span className="font-mono-tabular">£{dueToday.toLocaleString()}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                <a
                  href={buildWhatsAppOrderUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold bg-[#1E6F45] hover:bg-[#155232] text-white rounded-lg transition-colors whitespace-nowrap"
                >
                  <MessageCircle className="w-4 h-4" />
                  <span>Send Order Receipt to Amelie on WhatsApp</span>
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-5 py-3 text-sm font-medium text-[#140E21] border border-[#140E21]/20 rounded-lg hover:bg-[#F4F1EA] transition-colors cursor-pointer"
                >
                  Return to Website
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleConfirmOrder} className="space-y-6">
              {/* Contiguous Summary Box */}
              <div className="p-5 rounded-xl bg-[#F4F1EA] border border-[#140E21]/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-medium text-[#4C1D95]">
                    {selectedPackage.turnaround} · {selectedPackage.seoIncluded}
                  </div>
                  <h3 className="font-display text-xl font-semibold text-[#140E21] mt-0.5">
                    {selectedPackage.name}
                  </h3>
                  <p className="text-xs text-[#534D66] mt-1">{selectedPackage.subtitle}</p>
                </div>
                <div className="text-left sm:text-right shrink-0">
                  <div className="font-mono-tabular text-2xl font-bold text-[#140E21]">
                    £{totalInvestment.toLocaleString()}
                  </div>
                  <div className="text-xs text-[#534D66]">Fixed Studio Investment</div>
                </div>
              </div>

              {/* Optional Add-ons */}
              <div className="space-y-3">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#534D66]">
                  Optional Growth & Speed Boosters
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {allAddons.map((addon) => {
                    const isSelected = selectedAddons.some((a) => a.id === addon.id);
                    return (
                      <button
                        key={addon.id}
                        type="button"
                        onClick={() => onToggleAddon(addon.id)}
                        className={`p-3.5 rounded-lg border text-left transition-colors cursor-pointer flex items-start justify-between gap-3 ${
                          isSelected
                            ? 'bg-[#4C1D95]/8 border-[#4C1D95] text-[#140E21]'
                            : 'bg-white border-[#140E21]/12 text-[#140E21] hover:border-[#140E21]/30'
                        }`}
                      >
                        <div className="space-y-1">
                          <div className="text-xs font-semibold flex items-center gap-1.5">
                            <span
                              className={`w-4 h-4 rounded flex items-center justify-center border ${
                                isSelected ? 'bg-[#4C1D95] border-[#4C1D95] text-white' : 'border-[#534D66]/40'
                              }`}
                            >
                              {isSelected && <Check className="w-3 h-3" />}
                            </span>
                            <span>{addon.title}</span>
                          </div>
                          <p className="text-xs text-[#534D66] leading-snug">{addon.description}</p>
                        </div>
                        <span className="font-mono-tabular text-xs font-semibold text-[#4C1D95] shrink-0">
                          +£{addon.price}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Payment Schedule Toggle */}
              <div className="space-y-2">
                <div className="text-xs font-semibold uppercase tracking-wider text-[#534D66]">
                  Select Payment Structure
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPaymentMode('deposit')}
                    className={`p-3.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      paymentMode === 'deposit'
                        ? 'bg-[#4C1D95]/8 border-[#4C1D95]'
                        : 'bg-white border-[#140E21]/12'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#140E21]">50% Studio Deposit</span>
                      <span className="font-mono-tabular text-sm font-bold text-[#4C1D95]">
                        £{Math.round(totalInvestment * 0.5).toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#534D66] mt-1">
                      50% to begin design & SEO setup, 50% only upon your final launch approval.
                    </p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMode('full')}
                    className={`p-3.5 rounded-lg border text-left cursor-pointer transition-colors ${
                      paymentMode === 'full'
                        ? 'bg-[#4C1D95]/8 border-[#4C1D95]'
                        : 'bg-white border-[#140E21]/12'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-semibold text-[#140E21]">Full Settlement</span>
                      <span className="font-mono-tabular text-sm font-bold text-[#4C1D95]">
                        £{totalInvestment.toLocaleString()}
                      </span>
                    </div>
                    <p className="text-xs text-[#534D66] mt-1">
                      Single invoice with complimentary priority domain & Google Search Console setup.
                    </p>
                  </button>
                </div>
              </div>

              {/* Client Details */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={clientName}
                    onChange={(e) => setClientName(e.target.value)}
                    placeholder="e.g. James Kensington"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    value={clientEmail}
                    onChange={(e) => setClientEmail(e.target.value)}
                    placeholder="james@yourcompany.co.uk"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                    Phone or WhatsApp Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={clientPhone}
                    onChange={(e) => setClientPhone(e.target.value)}
                    placeholder="+44 7..."
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                    Business Name & Current Website (Optional)
                  </label>
                  <input
                    type="text"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    placeholder="e.g. Kensington Dental Sutton"
                    className="w-full px-3.5 py-2.5 text-sm bg-white border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#140E21] mb-1.5">
                  Key Goals or Target Keywords (Optional)
                </label>
                <textarea
                  rows={2}
                  value={projectNotes}
                  onChange={(e) => setProjectNotes(e.target.value)}
                  placeholder="Tell Amelie what you want to achieve (e.g. rank #1 in Sutton for our core services, redesign our homepage, add online checkout)..."
                  className="w-full px-3.5 py-2 text-sm bg-white border border-[#140E21]/15 rounded-lg focus:outline-none focus:border-[#4C1D95]"
                />
              </div>

              {errorMessage && (
                <div className="p-3 rounded-lg bg-red-50 border border-red-200 text-xs text-red-700 font-medium">
                  {errorMessage}
                </div>
              )}

              {/* Actions */}
              <div className="pt-2 border-t border-[#140E21]/10 flex flex-col sm:flex-row items-center justify-between gap-3">
                <div className="flex items-center gap-2 text-xs text-[#534D66]">
                  <ShieldCheck className="w-4 h-4 text-[#4C1D95] shrink-0" />
                  <span>Direct 1-on-1 contract with Amelie Barton · Sutton SM1 4AF</span>
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
                  <a
                    href={buildWhatsAppOrderUrl()}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold bg-[#1E6F45] hover:bg-[#155232] text-white rounded-lg transition-colors whitespace-nowrap"
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>Order via WhatsApp</span>
                  </a>
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 text-sm font-semibold bg-[#4C1D95] hover:bg-[#3B0764] text-white rounded-lg transition-colors cursor-pointer whitespace-nowrap"
                  >
                    <span>Reserve Slot (£{dueToday.toLocaleString()})</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
