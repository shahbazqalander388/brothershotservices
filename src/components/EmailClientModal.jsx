import React, { useState, useEffect } from 'react';
import { Mail, Copy, Check, ExternalLink, AlertTriangle, Paperclip, X } from 'lucide-react';

export default function EmailClientModal({
  isOpen,
  onClose,
  title = "Ready to Send via Email",
  recipient = "info.brothershotshot@gmail.com",
  subject = "",
  body = "",
  mailtoUrl = "",
  selectedFile = null,
  isJobApplication = false,
}) {
  const [copied, setCopied] = useState(false);

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

  const handleCopy = () => {
    const fullText = `To: ${recipient}\nSubject: ${subject}\n\n${body}`;
    navigator.clipboard.writeText(fullText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
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
      <div className="relative w-full max-w-2xl bg-[#121216] border border-[#D4AF37]/40 rounded-2xl shadow-2xl overflow-hidden text-gray-200">
        {/* Header bar */}
        <div className="bg-gradient-to-r from-[#17171C] via-[#1F1F26] to-[#17171C] px-4 sm:px-6 py-3.5 sm:py-5 border-b border-white/10 flex items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 flex items-center justify-center text-[#D4AF37] shrink-0">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0">
              <h3 id="modal-title" className="text-base sm:text-xl font-bold text-white tracking-wide truncate">
                {title}
              </h3>
              <p className="text-[11px] sm:text-xs text-gray-400 truncate">
                Direct to <span className="text-[#D4AF37] font-mono">{recipient}</span>
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

        {/* Modal Body */}
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-5 max-h-[78vh] overflow-y-auto overscroll-contain">
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

          {/* Email Preview Details */}
          <div className="space-y-2.5 bg-[#0B0B0D] p-3 sm:p-4 rounded-xl border border-white/5 text-xs font-mono">
            <div>
              <span className="text-gray-500 uppercase tracking-wider block text-[10px] mb-0.5">To:</span>
              <span className="text-[#D4AF37] font-medium text-xs sm:text-sm break-all">{recipient}</span>
            </div>
            <div>
              <span className="text-gray-500 uppercase tracking-wider block text-[10px] mb-0.5">Subject:</span>
              <span className="text-white text-xs break-all">{subject}</span>
            </div>
            <div>
              <span className="text-gray-500 uppercase tracking-wider block text-[10px] mb-0.5">Generated Body Preview:</span>
              <pre className="text-gray-300 whitespace-pre-wrap font-sans text-xs bg-black/50 p-2.5 sm:p-3 rounded-lg border border-white/5 max-h-40 overflow-y-auto leading-relaxed">
                {body}
              </pre>
            </div>
          </div>

          {/* Explanatory disclaimer */}
          <p className="text-[11px] sm:text-xs text-gray-400 italic leading-relaxed">
            Note: Clicking below will prepare your message inside your installed email application (Outlook, Apple Mail, Thunderbird, Gmail, etc.). The email has not been sent yet and will only be sent when you click send inside your email client.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1">
            <button
              onClick={handleOpenEmailApp}
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-gold-gradient text-[#0B0B0D] font-bold text-sm tracking-wide shadow-lg hover:shadow-[#D4AF37]/20 transition-all cursor-pointer min-h-[48px] active:scale-[0.98]"
            >
              <ExternalLink className="w-4 h-4 text-[#0B0B0D]" />
              {isJobApplication ? "Email Your Resume" : "Open Email Client"}
            </button>

            <button
              onClick={handleCopy}
              className="inline-flex items-center justify-center gap-2 px-5 py-3.5 rounded-xl bg-white/5 hover:bg-white/10 text-white font-medium text-sm border border-white/10 transition-colors cursor-pointer min-h-[48px] active:scale-[0.98]"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-400">Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4 text-gray-400" />
                  <span>Copy Email Text</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
