import { clsx } from "clsx";
import { useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { playerActions } from "../../store/slice/playerSlice.ts";

type Album = {
  id: string;
  name: string;
  artist: string;
  image: string;
  tracks: any;
};

type StackedAlbumCarouselProps = {
  albums: Album[];
};

const CARD_SLOTS = [
  {
    left: "left-0",
    top: "top-0",
    width: "w-[342px]",
    height: "h-[178px]",
    z: "z-10",
  },
  {
    left: "left-[114px]",
    top: "top-[80px]",
    width: "w-[342px]",
    height: "h-[178px]",
    z: "z-20",
  },
  {
    left: "left-[238px]",
    top: "top-[169px]",
    width: "w-[560px]",
    height: "h-[270px]",
    z: "z-30",
  },
  {
    left: "left-[128px]",
    top: "top-[371px]",
    width: "w-[342px]",
    height: "h-[178px]",
    z: "z-20",
  },
  {
    left: "left-[14px]",
    top: "top-[451px]",
    width: "w-[342px]",
    height: "h-[178px]",
    z: "z-10",
  },
] as const;

export default function StackedAlbumCarousel({
                                               albums,
                                             }: StackedAlbumCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();

  const visibleAlbums = useMemo(() => {
    if (!albums.length) return [];

    const offsets = [-2, -1, 0, 1, 2];

    return offsets.map((offset, slotIndex) => {
      const realIndex = (activeIndex + offset + albums.length) % albums.length;

      return {
        slotIndex,
        album: albums[realIndex],
        realIndex,
        isActive: offset === 0,
      };
    });
  }, [albums, activeIndex]);

  const goNext = () => {
    setActiveIndex((prev) => (prev + 1) % albums.length);
  };

  const goPrev = () => {
    setActiveIndex((prev) => (prev - 1 + albums.length) % albums.length);
  };

  if (!albums.length) return null;

  return (
    <div className="flex flex-col gap-[24px]">
      <div className="relative w-[800px] h-[560px]">
        {visibleAlbums.map(({ album, slotIndex, realIndex, isActive }) => {
          const slot = CARD_SLOTS[slotIndex];

          return (
            <button
              key={`${slotIndex}-${album.id}`}
              type="button"
              onClick={() => {setActiveIndex(realIndex); dispatch(playerActions.playTrack({track: album.tracks[0], queue: album.tracks}))}}
              className={clsx(
                "absolute overflow-hidden rounded-[48px] text-left transition-all duration-300",
                "hover:cursor-pointer",
                slot.left,
                slot.top,
                slot.width,
                slot.height,
                slot.z
              )}
            >
              <img
                src={`http://localhost:5014${album.image}`}
                alt={album.name}
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-x-0 bottom-0 p-[24px]">
                <div className="font-semibold font-inter text-[24px] text-white/80">
                  {album.name}
                </div>
                <div className="font-normal font-inter text-[16px] text-white/80">
                  {album.artist}
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}