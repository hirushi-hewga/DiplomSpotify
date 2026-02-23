import { useEffect, useLayoutEffect, useRef, useState } from "react";

type UseVisibleCountArgs = {
  itemWidth: number;
  gapX?: number;
  paddingX?: number;
  rows?: number;
  minItems?: number;
  maxItems?: number;
};

export function useVisibleCount({
                                  itemWidth,
                                  gapX = 0,
                                  paddingX = 0,
                                  rows = 1,
                                  minItems = 0,
                                  maxItems,
                                }: UseVisibleCountArgs) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [count, setCount] = useState(minItems);

  const recalc = () => {
    const el = ref.current;
    if (!el) return;

    const containerWidth = el.clientWidth;

    const available = Math.max(0, containerWidth - paddingX);

    const cols =
      gapX > 0
        ? Math.floor((available + gapX) / (itemWidth + gapX))
        : Math.floor(available / itemWidth);

    let next = cols * rows;

    // max
    next = Math.max(minItems, next);

    // min
    if (maxItems !== undefined) {
      next = Math.min(next, maxItems);
    }

    if (rows > 1) {
      next = Math.floor(next / rows) * rows;
    }

    setCount(next);
  };

  useLayoutEffect(() => {
    recalc();
  }, []);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const ro = new ResizeObserver(recalc);
    ro.observe(el);

    return () => ro.disconnect();
  }, []);

  return { ref, visibleCount: count };
}