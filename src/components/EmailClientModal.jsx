import React, { useState, useEffect } from 'react';
import { 
  Mail, 
  Copy, 
  Check, 
  ExternalLink, 
  AlertTriangle, 
  Paperclip, 
  X, 
  User, 
  MapPin, 
  Truck, 
  FileText,
  Code,
  Eye
} from 'lucide-react';

export default function EmailClientModal({
  isOpen,
  onClose,
  title = "Ready to Send via Email",
  recipient = "info.brothershotshot@gmail.com",
  subject = "",
  body = "",
  htmlBody = "",
  mailtoUrl = "",
  selectedFile = null,
  isJobApplication = false,
  quoteDetails = null,
}) {
  const [copied, setCopied] = useState(false);
  const [copiedHtml, setCopiedHtml] = useState(false);
  const [viewMode, setViewMode] = useState('formatted'); // 'formatted', 'plaintext', 'html'

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Copy with rich HTML clipboard support if available, falling back to plain text
  const handleCopyFormatted = async () => {
    try {
      if (htmlBody && window.ClipboardItem && navigator.clipboard?.write) {
        const textBlob = new Blob([body], { type: 'text/plain' });
        const htmlBlob = new Blob([htmlBody], { type: 'text/html' });
        const item = new window.ClipboardItem({
          'text/plain': textBlob,
          'text/html': htmlBlob,
        });
        await navigator.clipboard.write([item]);
      } else {
        const fullText = `To: ${recipient}\nSubject: ${subject}\n\n${body}`;
        await navigator.clipboard.writeText(fullText);
      }
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    } catch {
      // Fallback
      const fullText = `To: ${recipient}\nSubject: ${subject}\n\n${body}`;
      navigator.clipboard.writeText(fullText).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      });
    }
  };

  const handleCopyRawHtml = () => {
    if (!htmlBody) return;
    navigator.clipboard.writeText(htmlBody).then(() => {
      setCopiedHtml(true);
      setTimeout(() => setCopiedHtml(false), 3000);
    });
  };

  const handleOpenEmailApp = () => {
    window.location.href = mailtoUrl;
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/85 backdrop-blur-md animate-fadeIn overscroll-contain"
    >
      <div className="relative w-full max-w-2xl bg-[#121216] border border-[#D4AF37]/50 rounded-2xl shadow-2xl overflow-hidden text-gray-200 flex flex-col max-h-[92vh]">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-[#17171C] via-[#1F1F26] to-[#17171C] px-4 sm:px-6 py-3.5 sm:py-4 border-b border-white/10 flex items-center justify-between gap-3 shrink-0">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 id="modal-title" className="text-base sm:text-lg font-bold text-white tracking-wide truncate">
                {title}
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-400 truncate">
                Formatted submission to <span className="text-[#D4AF37] font-mono font-semibold">{recipient}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            aria-label="Close dialog"
            className="text-gray-400 hover:text-white p-2 rounded-lg hover:bg-white/10 transition-colors shrink-0 cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* View mode toggle tabs */}
        <div className="px-4 sm:px-6 py-2 bg-[#0E0E12] border-b border-white/10 flex items-center justify-between gap-2 shrink-0">
          <span className="text-[11px] font-semibold text-gray-400 uppercase tracking-wider hidden xs:inline">
            Inquiry Email Format:
          </span>
          <div className="flex items-center gap-1.5 w-full xs:w-auto justify-end">
            <button
              type="button"
              onClick={() => setViewMode('formatted')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'formatted'
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50'
                  : 'text-gray-400 hover:text-white bg-white/5 border border-transparent'
              }`}
            >
              <Eye className="w-3.5 h-3.5" />
              <span>Organized View</span>
            </button>
            <button
              type="button"
              onClick={() => setViewMode('plaintext')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                viewMode === 'plaintext'
                  ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50'
                  : 'text-gray-400 hover:text-white bg-white/5 border border-transparent'
              }`}
            >
              <FileText className="w-3.5 h-3.5" />
              <span>Plain Text</span>
            </button>
            {htmlBody && (
              <button
                type="button"
                onClick={() => setViewMode('html')}
                className={`px-3 py-1 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  viewMode === 'html'
                    ? 'bg-[#D4AF37]/20 text-[#D4AF37] border border-[#D4AF37]/50'
                    : 'text-gray-400 hover:text-white bg-white/5 border border-transparent'
                }`}
              >
                <Code className="w-3.5 h-3.5" />
                <span>HTML Code</span>
              </button>
            )}
          </div>
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 overflow-y-auto overscroll-contain flex-1">
          {/* Important Resume Notice for Job Applications */}
          {isJobApplication && (
            <div className="p-3.5 sm:p-4 rounded-xl bg-[#D4AF37]/10 border border-[#D4AF37]/40 text-amber-100 flex gap-2.5 sm:gap-3 items-start">
              <AlertTriangle className="w-5 h-5 sm:w-6 sm:h-6 text-[#D4AF37] shrink-0 mt-0.5" />
              <div className="text-xs sm:text-sm space-y-1">
                <p className="font-semibold text-white">
                  Action Required: Attach Your Resume Manually
                </p>
                <p className="text-gray-300 leading-relaxed">
                  Your email application will open in your default email app. Please attach your resume before sending your email to{' '}
                  <span className="text-[#D4AF37] font-semibold underline break-all">{recipient}</span>.
                </p>
                {selectedFile && (
                  <div className="mt-2 inline-flex flex-wrap items-center gap-1.5 px-2.5 py-1 rounded-lg bg-black/40 border border-[#D4AF37]/30 text-[11px] sm:text-xs text-[#F5E6B3]">
                    <Paperclip className="w-3.5 h-3.5 text-[#D4AF37] shrink-0" />
                    <span>File to attach: <strong className="break-all">{selectedFile.name}</strong> ({(selectedFile.size / 1024).toFixed(1)} KB)</span>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Email Metadata Bar */}
          <div className="p-3 rounded-xl bg-[#0B0B0D] border border-white/10 space-y-2 text-xs">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
              <span className="text-gray-400">Recipient:</span>
              <span className="text-[#D4AF37] font-mono font-semibold break-all">{recipient}</span>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 pt-1 border-t border-white/5">
              <span className="text-gray-400">Subject:</span>
              <span className="text-white font-medium truncate">{subject}</span>
            </div>
          </div>

          {/* Tab Content 1: Organized Visual Formatted View */}
          {viewMode === 'formatted' && (
            <div className="space-y-3">
              {quoteDetails ? (
                <div className="space-y-3">
                  {/* Section 1: Customer Information */}
                  <div className="rounded-xl bg-[#0E0E12] border border-white/10 overflow-hidden">
                    <div className="px-3.5 py-2 bg-[#17171E] border-b border-[#D4AF37]/30 flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase">
                      <User className="w-3.5 h-3.5" />
                      <span>1. Customer Information</span>
                    </div>
                    <div className="p-3 text-xs space-y-1.5">
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Customer / Company:</span>
                        <span className="font-semibold text-white">{quoteDetails.customerName || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Email Address:</span>
                        <span className="font-semibold text-[#D4AF37] break-all">{quoteDetails.email || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Phone Number:</span>
                        <span className="font-semibold text-white">{quoteDetails.phone || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Route & Locations */}
                  <div className="rounded-xl bg-[#0E0E12] border border-white/10 overflow-hidden">
                    <div className="px-3.5 py-2 bg-[#17171E] border-b border-[#D4AF37]/30 flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>2. Route & Location Details</span>
                    </div>
                    <div className="p-3 text-xs space-y-1.5">
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Pickup Location (Origin):</span>
                        <span className="font-semibold text-white">{quoteDetails.pickupLocation || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Delivery Location (Destination):</span>
                        <span className="font-semibold text-white">{quoteDetails.deliveryLocation || 'N/A'}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Preferred Pickup Date:</span>
                        <span className="font-semibold text-[#D4AF37]">{quoteDetails.pickupDate || 'Earliest Available'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 3: Cargo & Specifications */}
                  <div className="rounded-xl bg-[#0E0E12] border border-white/10 overflow-hidden">
                    <div className="px-3.5 py-2 bg-[#17171E] border-b border-[#D4AF37]/30 flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase">
                      <Truck className="w-3.5 h-3.5" />
                      <span>3. Cargo & Shipment Specifications</span>
                    </div>
                    <div className="p-3 text-xs space-y-1.5">
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Load / Service Type:</span>
                        <span className="font-semibold text-[#D4AF37]">{quoteDetails.loadType || 'Hotshot Delivery'}</span>
                      </div>
                      <div className="flex justify-between gap-2">
                        <span className="text-gray-400">Dimensions & Weight:</span>
                        <span className="font-semibold text-white">{quoteDetails.dimensionsWeight || 'N/A - To be confirmed'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Section 4: Additional Details */}
                  <div className="rounded-xl bg-[#0E0E12] border border-white/10 overflow-hidden">
                    <div className="px-3.5 py-2 bg-[#17171E] border-b border-[#D4AF37]/30 flex items-center gap-2 text-xs font-bold text-[#D4AF37] uppercase">
                      <FileText className="w-3.5 h-3.5" />
                      <span>4. Additional Details & Handling Instructions</span>
                    </div>
                    <div className="p-3 text-xs text-gray-300 whitespace-pre-wrap leading-relaxed">
                      {quoteDetails.additionalDetails || 'No additional instructions provided.'}
                    </div>
                  </div>
                </div>
              ) : (
                <div className="rounded-xl bg-[#0E0E12] border border-white/10 p-3.5 text-xs">
                  <pre className="text-gray-300 whitespace-pre-wrap font-sans leading-relaxed">
                    {body}
                  </pre>
                </div>
              )}
            </div>
          )}

          {/* Tab Content 2: Raw Plain Text (RFC CRLF) */}
          {viewMode === 'plaintext' && (
            <div className="rounded-xl bg-[#0B0B0D] border border-white/10 p-3 text-xs font-mono">
              <pre className="text-gray-300 whitespace-pre-wrap text-[11px] max-h-72 overflow-y-auto leading-relaxed">
                {body}
              </pre>
            </div>
          )}

          {/* Tab Content 3: HTML Template Code */}
          {viewMode === 'html' && htmlBody && (
            <div className="rounded-xl bg-[#0B0B0D] border border-white/10 p-3 text-xs font-mono space-y-2">
              <div className="flex justify-between items-center pb-2 border-b border-white/10">
                <span className="text-[11px] text-gray-400">HTML Email Template Source:</span>
                <button
                  type="button"
                  onClick={handleCopyRawHtml}
                  className="px-2.5 py-1 rounded bg-white/10 hover:bg-[#D4AF37]/20 text-[#D4AF37] text-[11px] font-semibold transition-colors cursor-pointer"
                >
                  {copiedHtml ? 'Copied HTML!' : 'Copy Code'}
                </button>
              </div>
              <pre className="text-gray-300 whitespace-pre-wrap text-[11px] max-h-72 overflow-y-auto leading-relaxed">
                {htmlBody}
              </pre>
            </div>
          )}

          <p className="text-[11px] sm:text-xs text-gray-400 italic leading-relaxed">
            Clicking <strong className="text-white">"Open Email Client"</strong> below opens your default email client (Outlook, Apple Mail, Gmail, etc.) with these structured sections filled in. Alternatively, click <strong className="text-white">"Copy Email"</strong> to paste into webmail.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1">
            <button
              onClick={handleOpenEmailApp}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-extrabold text-sm tracking-wide shadow-lg hover:shadow-[#D4AF37]/20 transition-all cursor-pointer min-h-[48px] active:scale-[0.98]"
            >
              <ExternalLink className="w-4 h-4 text-[#0B0B0D]" />
              <span>{isJobApplication ? "Email Your Application" : "Open Email Client"}</span>
            </button>

            <button
              onClick={handleCopyFormatted}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-semibold text-sm border border-white/15 transition-colors cursor-pointer min-h-[48px] active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied Formatted Text!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-[#D4AF37]" />
                  <span>Copy Formatted Email</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
