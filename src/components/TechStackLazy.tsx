import { lazy, Suspense, useEffect, useRef, useState } from "react";

const TechStack = lazy(() => import("./TechStack"));

/**
 * Gates the heavy TechStack scene (r3f + Rapier + postprocessing, ~2.4 MB)
 * behind an IntersectionObserver so that chunk is only downloaded once the
 * section is about to enter the viewport. Until then we render a placeholder
 * with the same `.techstack` container + heading, so layout (and the GSAP
 * pin height) is identical — no visual change, no layout shift.
 */
const TechStackLazy = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setShow(true);
          io.disconnect();
        }
      },
      // Start loading ~one viewport early so the canvas is ready by the time
      // the user scrolls to it.
      { rootMargin: "600px 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  if (show) {
    return (
      <Suspense fallback={null}>
        <TechStack />
      </Suspense>
    );
  }

  return (
    <div className="techstack" ref={ref}>
      <h2> My Techstack</h2>
    </div>
  );
};

export default TechStackLazy;
