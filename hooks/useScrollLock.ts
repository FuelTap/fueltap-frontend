import { useEffect } from "react";

// Stops the page behind an overlay from scrolling while `locked` is true.
export function useScrollLock(locked: boolean) {
  useEffect(() => {
    if (!locked) return;

    const html = document.documentElement;
    const { overflow, scrollbarGutter } = html.style;

    // Keep the scrollbar's space reserved so the layout doesn't shift when it hides.
    if (window.innerWidth > html.clientWidth) {
      html.style.scrollbarGutter = "stable";
    }
    html.style.overflow = "hidden";

    return () => {
      html.style.overflow = overflow;
      html.style.scrollbarGutter = scrollbarGutter;
    };
  }, [locked]);
}
