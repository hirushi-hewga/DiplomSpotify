import { useEffect, useRef, useState } from "react";

type VolumeSliderProps = {
  value: number;
  onChange?: (value: number) => void;
};

export default function VolumeSlider({
                                       value,
                                       onChange,
                                     }: VolumeSliderProps) {
  const sliderRef = useRef<HTMLDivElement | null>(null);
  const [isDragging, setIsDragging] = useState(false);

  const safeValue = Math.max(0, Math.min(100, value));

  const updateValueFromClientY = (clientY: number) => {
    if (!sliderRef.current || !onChange) return;

    const rect = sliderRef.current.getBoundingClientRect();
    const y = clientY - rect.top;
    const ratio = 1 - y / rect.height;
    const nextValue = Math.round(Math.max(0, Math.min(1, ratio)) * 100);

    onChange(nextValue);
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    updateValueFromClientY(e.clientY);
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      updateValueFromClientY(e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div
      ref={sliderRef}
      className="relative h-full w-full rounded-[36px] inset-[2px] border-[2px] border-white/90  cursor-pointer select-none"
      onMouseDown={handleMouseDown}
    >
      <div className="absolute inset-[-2px] overflow-hidden rounded-[999px]">
        <div
          className="absolute bottom-0 left-0 right-0 rounded-full bg-[#FF934C]"
          style={{ height: `${safeValue}%` }}
        />
      </div>
    </div>
  );
}