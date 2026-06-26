import "./styles/Work.css";
import { useState } from "react";
import WorkImage from "./WorkImage";
import WorkModal from "./WorkModal";
import { projects, type Project } from "../data/projects";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const [activeProject, setActiveProject] = useState<Project | null>(null);

  useGSAP(() => {
    // Recalculated on every ScrollTrigger refresh (resize, lazy-loaded
    // sections, font/image load) so the pin duration always matches the
    // actual horizontal scroll width and the next section can't overlap.
    function getTranslateX(): number {
      const box = document.getElementsByClassName("work-box");
      if (!box.length) return 0;
      const rectLeft = document
        .querySelector(".work-container")!
        .getBoundingClientRect().left;
      const rect = box[0].getBoundingClientRect();
      const parentWidth = box[0].parentElement!.getBoundingClientRect().width;
      const padding: number =
        parseInt(window.getComputedStyle(box[0]).padding) / 2;
      return rect.width * box.length - (rectLeft + parentWidth) + padding;
    }

    let timeline = gsap.timeline({
      scrollTrigger: {
        trigger: ".work-section",
        start: "top top",
        end: () => `+=${getTranslateX()}`, // Use actual scroll width
        scrub: true,
        pin: true,
        invalidateOnRefresh: true,
        id: "work",
      },
    });

    timeline.to(".work-flex", {
      x: () => -getTranslateX(),
      ease: "none",
    });

    // Clean up (optional, good practice)
    return () => {
      timeline.kill();
      ScrollTrigger.getById("work")?.kill();
    };
  }, []);
  return (
    <div className="work-section" id="work">
      <div className="work-container section-container">
        <h2>
          My <span>Work</span>
        </h2>
        <div className="work-flex">
          {projects.map((project) => (
            <div className="work-box" key={project.id}>
              <div className="work-info">
                <div className="work-title">
                  <h3>{project.number}</h3>
                  <div>
                    <h4>{project.title}</h4>
                    <p>{project.subtitle}</p>
                  </div>
                </div>
                <h4>Tech Stack</h4>
                <p>{project.tech}</p>
              </div>
              <WorkImage
                image={project.image}
                alt={project.alt}
                link={project.link}
                onOpen={
                  project.link ? undefined : () => setActiveProject(project)
                }
              />
            </div>
          ))}
        </div>
      </div>

      <WorkModal project={activeProject} onClose={() => setActiveProject(null)} />
    </div>
  );
};

export default Work;
