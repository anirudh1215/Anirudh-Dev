import { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import { FiDownload, FiExternalLink } from "react-icons/fi";
import "./styles/ResumeModal.css";

interface Props {
  open: boolean;
  onClose: () => void;
}

const RESUME_URL = "/Anirudh_Saxena_Resume.pdf";

const ResumeModal = ({ open, onClose }: Props) => {
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  // Portalled to <body> so the fixed overlay isn't clipped by the GSAP
  // transforms on the ScrollSmoother content / pinned sections.
  return createPortal(
    <div className="resume-modal-overlay" onClick={onClose}>
      <div
        className="resume-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label="Resume"
      >
        <div className="resume-modal-header">
          <h3>Resume</h3>
          <div className="resume-modal-actions">
            <a
              className="resume-modal-action"
              href={RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open in new tab"
              data-cursor="fit"
            >
              <FiExternalLink />
            </a>
            <a
              className="resume-modal-action"
              href={RESUME_URL}
              download
              aria-label="Download resume"
              data-cursor="fit"
            >
              <FiDownload />
            </a>
            <button
              type="button"
              className="resume-modal-action"
              onClick={onClose}
              aria-label="Close"
              data-cursor="fit"
            >
              <MdClose />
            </button>
          </div>
        </div>

        <div className="resume-modal-viewer">
          <iframe src={`${RESUME_URL}#view=FitH`} title="Resume" />
        </div>
      </div>
    </div>,
    document.body
  );
};

export default ResumeModal;
