import { useEffect, useMemo, useState } from "react";

type WaveProgressProps = {
  width?: number;
  height?: number;
  rows?: number;
  isPlaying?: boolean;
};

function buildWavePath(
  width: number,
  baselineY: number,
  time: number,
  {
    amplitude = 10,
    frequency = 0.045,
    speed = 1.6,
    phase = 0,
    centerBoost = 18,
    sampleStep = 6,
  }: {
    amplitude?: number;
    frequency?: number;
    speed?: number;
    phase?: number;
    centerBoost?: number;
    sampleStep?: number;
  }
) {
  let d = "";

  for (let x = 0; x <= width; x += sampleStep) {
    const normalized = x / width;
    const distFromCenter = Math.abs(normalized - 0.5);

    const envelope = Math.exp(-Math.pow(distFromCenter * 5.5, 2));
    const currentAmp = amplitude + envelope * centerBoost;

    const y =
      baselineY +
      Math.sin(x * frequency + time * speed + phase) * currentAmp;

    d += x === 0 ? `M ${x} ${y}` : ` L ${x} ${y}`;
  }

  return d;
}

export default function WaveProgress({
                                       width = 1013,
                                       height = 100,
                                       rows = 4,
                                       isPlaying = true,
                                     }: WaveProgressProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    if (!isPlaying) return;

    let frameId = 0;
    let start = performance.now();

    const loop = (now: number) => {
      const elapsed = (now - start) / 1000;
      setTime(elapsed);
      frameId = requestAnimationFrame(loop);
    };

    frameId = requestAnimationFrame(loop);

    return () => cancelAnimationFrame(frameId);
  }, [isPlaying]);

  const rowYs = useMemo(() => {
    const topPadding = 20;
    const bottomPadding = 20;
    const usableHeight = height - topPadding - bottomPadding;
    const gap = usableHeight / (rows - 1);

    return Array.from({ length: rows }, (_, i) => topPadding + i * gap);
  }, [height, rows]);

  return (
    <svg
      width="100%"
      viewBox={`0 0 ${width} ${height}`}
      className="block w-full"
      preserveAspectRatio="none"
    >
      {rowYs.map((y, rowIndex) => {
        const path1 = buildWavePath(width, y, time, {
          amplitude: 5,
          frequency: 0.05,
          speed: 1.1 + rowIndex * 0.08,
          phase: rowIndex * 0.8,
          centerBoost: 10,
          sampleStep: 5,
        });

        const path2 = buildWavePath(width, y, time, {
          amplitude: 7,
          frequency: 0.06,
          speed: 1.8 + rowIndex * 0.12,
          phase: rowIndex * 1.3 + 0.5,
          centerBoost: 16,
          sampleStep: 5,
        });

        return (
          <g key={rowIndex}>
            <path
              d={path1}
              fill="none"
              stroke="white"
              strokeWidth="1"
              strokeLinecap="round"
            />
            <path
              d={path2}
              fill="none"
              stroke="#ff6a00"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </g>
        );
      })}
    </svg>
  );
}