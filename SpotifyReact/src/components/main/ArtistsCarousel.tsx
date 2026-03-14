import { clsx } from "clsx";
import { useMemo, useState } from "react";

type Artist = {
  id: string;
  name: string;
  image: string;
};

type ArtistsCarouselProps = {
  artists: Artist[];
  compact?: boolean;
};

export default function ArtistsCarousel({
                                          artists,
                                          compact = false,
                                        }: ArtistsCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const visibleCount = compact ? 3 : 5;
  const sideCount = Math.floor(visibleCount / 2);

  const visibleArtists = useMemo(() => {
    if (!artists.length) return [];

    const result: Array<{
      artist: Artist;
      relativeIndex: number;
      absoluteIndex: number;
    }> = [];

    for (let offset = -sideCount; offset <= sideCount; offset++) {
      const index = (activeIndex + offset + artists.length) % artists.length;

      result.push({
        artist: artists[index],
        relativeIndex: offset,
        absoluteIndex: index,
      });
    }

    return result;
  }, [artists, activeIndex, sideCount]);

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + artists.length) % artists.length);
  };

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % artists.length);
  };

  if (!artists.length) return null;

  return (

        <div className="flex items-center flex-1">
          {visibleArtists.map(({ artist, relativeIndex, absoluteIndex }) => {
            const isCenter = relativeIndex === 0;
            const isSide = relativeIndex !== 0;

            const sizeClass =
              relativeIndex === 0
                ? "w-[450px] h-[450px]"
                : Math.abs(relativeIndex) === 1
                  ? "w-[350px] h-[350px]"
                  : "w-[250px] h-[250px]";

            return (
              <div
                key={`${artist.id}-${absoluteIndex}`}
                onClick={() => setActiveIndex(absoluteIndex)}
                className="flex flex-col items-center gap-[16px] hover:cursor-pointer"
              >
                <div
                  className={clsx(
                    "rounded-full overflow-hidden shrink-0",
                    sizeClass
                  )}
                >
                  <img
                    src={`http://localhost:5014${artist.image}`}
                    alt={artist.name}
                    className={clsx(
                      "w-full h-full object-cover",
                      isSide && "opacity-[54%]"
                    )}
                  />
                </div>

                <div className="flex flex-col items-center gap-[12px] text-white font-inter leading-none">
                  <div className="font-semibold font-inter text-[24px]">
                    {artist.name}
                  </div>
                  <div className="font-bold font-inter text-[20px]">
                    Artist
                  </div>
                </div>
              </div>
            );
          })}
        </div>
  );
}