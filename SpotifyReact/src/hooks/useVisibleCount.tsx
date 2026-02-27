import { useCallback, useLayoutEffect, useState } from "react";

type UseVisibleCountArgs = {
  itemWidth: number;
  gapX?: number;
  paddingX?: number;
  rows?: number;
  minItems?: number;
  maxItems?: number;
  paddingIsBothSides?: boolean;
};

export function useVisibleCount({
                                  itemWidth,
                                  gapX = 0,
                                  paddingX = 0,
                                  rows = 1,
                                  minItems = 0,
                                  maxItems,
                                  paddingIsBothSides = false,
                                }: UseVisibleCountArgs) {
  const [node, setNode] = useState<HTMLDivElement | null>(null);
  const [visibleCount, setVisibleCount] = useState(minItems);

  const recalc = useCallback(() => {
    if (!node) return;

    const containerWidth = node.clientWidth;
    if (containerWidth <= 0) return;

    const paddingTotal = paddingIsBothSides ? paddingX * 2 : paddingX;
    const available = Math.max(0, containerWidth - paddingTotal);

    const cols =
      gapX > 0
        ? Math.floor((available + gapX) / (itemWidth + gapX))
        : Math.floor(available / itemWidth);

    let next = Math.max(minItems, cols * rows);

    if (maxItems !== undefined) next = Math.min(next, maxItems);

    if (rows > 1) {
      next = Math.floor(next / rows) * rows;
      next = Math.max(minItems, next);
    }

    setVisibleCount((prev) => (prev === next ? prev : next));
  }, [node, itemWidth, gapX, paddingX, rows, minItems, maxItems, paddingIsBothSides]);

  const ref = useCallback((el: HTMLDivElement | null) => {
    setNode(el);
  }, []);

  useLayoutEffect(() => {
    if (!node) return;

    recalc();

    const raf = requestAnimationFrame(recalc);

    const ro = new ResizeObserver(recalc);
    ro.observe(node);

    window.addEventListener("resize", recalc);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      window.removeEventListener("resize", recalc);
    };
  }, [node, recalc]);

  return { ref, visibleCount, recalc };
}