import React, { createContext, useState, useRef, ReactNode, useEffect } from 'react';
import { ITrack } from 'interfaces/track';
import { API_URL } from 'utils/envData';

interface IPlayerContext {
  activeTrack: ITrack | null;
  currentTrackIndex: number;
  isPlaying: boolean;
  progress: number;
  volume: number,
  audioRef: React.RefObject<HTMLAudioElement>;
  playTracks: (newTrack: ITrack[]) => void;
  playPause: () => void;
  playPrev: () => void;
  playNext: () => void;
  handleTimeUpdate: () => void;
  updateVolume: (newVolume: number) => void;
}

export const PlayerContext = createContext<IPlayerContext | null>(null);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const [activeTrack, setActiveTrack] = useState<ITrack | null>(null);
  const [tracks, setTracks] = useState<ITrack[] | null>(null);
  const [currentTrackIndex, setCurrentTrackIndex] = useState<number>(0);
  const audioRef = useRef<HTMLAudioElement>(new Audio());
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [progress, setProgress] = useState<number>(0);
  const [volume, setVolume] = useState<number>(0.5);
  
  const audioUrl = API_URL + "/Audio/";

  const playTracks = (newTracks: ITrack[]) => {
    setTracks(newTracks);
    setCurrentTrackIndex(0);
  };

  useEffect(() => {
    if (tracks) {
      playTrackByIndex();
    }
  }, [tracks, currentTrackIndex]);

  const playTrackByIndex = () => {
    console.log(tracks);
    if (tracks && tracks[currentTrackIndex]) {
      setActiveTrack(tracks[currentTrackIndex]);
      audioRef.current.src = audioUrl.concat(tracks[currentTrackIndex].path);
      audioRef.current.volume = volume;
      audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const playPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const updateVolume = (newVolume: number) => {
    audioRef.current.volume = newVolume;
    setVolume(newVolume);
  };

  const handleTimeUpdate = () => {
    const currentTime = audioRef.current.currentTime;
    const duration = audioRef.current.duration;
    setProgress((currentTime / duration) * 100);
  };

  const playPrev = () => {
    if (audioRef.current.currentTime > 3) {
      audioRef.current.currentTime = 0;
      setProgress(0);
    }
    else if (currentTrackIndex > 0) {
      setCurrentTrackIndex(currentTrackIndex - 1);
    }
  }

  const playNext = () => {
    if (tracks && currentTrackIndex < tracks.length - 1) {
      setCurrentTrackIndex(currentTrackIndex + 1);
    }
  }

  useEffect(() => {
    let intervalId: number;

    if (isPlaying) {
      intervalId = setInterval(handleTimeUpdate, 1000);
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
    }

    return () => {
      clearInterval(intervalId);
      audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [isPlaying]);

  return (
    <PlayerContext.Provider
      value={{
        activeTrack,
        currentTrackIndex,
        isPlaying,
        progress,
        volume,
        audioRef,
        playTracks,
        playPause,
        playPrev,
        playNext,
        handleTimeUpdate,
        updateVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};