import { useEffect } from "react";
import { createPortal } from "react-dom";
import { MdClose } from "react-icons/md";
import type { Project } from "../data/projects";
import "./styles/WorkModal.css";

interface Props {
  project: Project | null;
  onClose: () => void;
}

const WorkModal = ({ project, onClose }: Props) => {
  useEffect(() => {
    if (!project) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [project, onClose]);

  if (!project) return null;

  // Portalled to <body> so the fixed overlay isn't clipped by the GSAP
  // transforms on the pinned Work section / ScrollSmoother content.
  return createPortal(
    <div className="work-modal-overlay" onClick={onClose}>
      <div
        className="work-modal"
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-label={project.title}
      >
        <button
          type="button"
          className="work-modal-close"
          onClick={onClose}
          aria-label="Close"
          data-cursor="fit"
        >
          <MdClose />
        </button>

        <div className="work-modal-image">
          <img src={project.image} alt={project.alt} decoding="async" />
        </div>

        <div className="work-modal-body">
          <span className="work-modal-number">{project.number}</span>
          <h3>{project.title}</h3>
          <p className="work-modal-subtitle">{project.subtitle}</p>

          <h4>Tech Stack</h4>
          <p className="work-modal-tech">{project.tech}</p>

          {project.description && project.description.length > 0 ? (
            <ul className="work-modal-desc">
              {project.description.map((point, i) => (
                <li key={i}>{point}</li>
              ))}
            </ul>
          ) : (
            <p className="work-modal-soon">Detailed write-up coming soon.</p>
          )}
        </div>
      </div>
    </div>,
    document.body
  );
};

export default WorkModal;
