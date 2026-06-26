import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import "./styles/Cursor.css";
import gsap from "gsap";

const Cursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let hover = false;
    const cursor = cursorRef.current!;
    const mousePos = { x: 0, y: 0 };
    const cursorPos = { x: 0, y: 0 };

    const onMove = (e: MouseEvent) => {
      mousePos.x = e.clientX;
      mousePos.y = e.clientY;
    };
    document.addEventListener("mousemove", onMove);

    let raf = requestAnimationFrame(function loop() {
      if (!hover) {
        const delay = 6;
        cursorPos.x += (mousePos.x - cursorPos.x) / delay;
        cursorPos.y += (mousePos.y - cursorPos.y) / delay;
        gsap.to(cursor, { x: cursorPos.x, y: cursorPos.y, duration: 0.1 });
      }
      raf = requestAnimationFrame(loop);
    });

    // Delegated on the document so dynamically-mounted elements (e.g. the
    // portalled Work modal's close button) are handled without re-querying.
    const onOver = (e: MouseEvent) => {
      const element = (e.target as HTMLElement)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (!element) return;
      const rect = element.getBoundingClientRect();
      const type = element.dataset.cursor;

      if (type === "fit") {
        // Morph the cursor into a ring that hugs the element's shape and
        // sits centered over it, highlighting it.
        cursor.classList.add("cursor-fit");
        cursor.style.setProperty(
          "--cursorSize",
          `${Math.max(rect.width, rect.height)}px`
        );
        gsap.to(cursor, {
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
          duration: 0.25,
          overwrite: true,
        });
        hover = true;
      } else if (type === "disable") {
        cursor.classList.add("cursor-disable");
      }
    };

    const onOut = (e: MouseEvent) => {
      const element = (e.target as HTMLElement)?.closest?.(
        "[data-cursor]"
      ) as HTMLElement | null;
      if (!element) return;
      // Ignore moves between the element and its own descendants.
      const related = e.relatedTarget as Node | null;
      if (related && element.contains(related)) return;
      cursor.classList.remove("cursor-disable", "cursor-fit");
      hover = false;
    };

    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
    };
  }, []);

  // Portalled to <body> so the custom cursor shares the root stacking
  // context with portalled overlays (e.g. the Work modal) and its high
  // z-index actually paints above them instead of being trapped inside a
  // nested stacking context.
  return createPortal(
    <div className="cursor-main" ref={cursorRef}></div>,
    document.body
  );
};

export default Cursor;
