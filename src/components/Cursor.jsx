import { useEffect, useRef } from "react";

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    let mx = 0, my = 0, rx = 0, ry = 0;
    let raf;

    const onMove = (e) => { mx = e.clientX; my = e.clientY; };

    const tick = () => {
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (dot.current) {
        dot.current.style.left = mx + "px";
        dot.current.style.top  = my + "px";
      }
      if (ring.current) {
        ring.current.style.left = rx + "px";
        ring.current.style.top  = ry + "px";
      }
      raf = requestAnimationFrame(tick);
    };

    const onEnter = () => {
      dot.current?.classList.add("hovering");
      ring.current?.classList.add("hovering");
    };
    const onLeave = () => {
      dot.current?.classList.remove("hovering");
      ring.current?.classList.remove("hovering");
    };

    window.addEventListener("mousemove", onMove);
    document.querySelectorAll("a, button, [data-hover]").forEach(el => {
      el.addEventListener("mouseenter", onEnter);
      el.addEventListener("mouseleave", onLeave);
    });

    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      <div ref={dot}  className="cursor-dot"  />
      <div ref={ring} className="cursor-ring" />
    </>
  );
}
