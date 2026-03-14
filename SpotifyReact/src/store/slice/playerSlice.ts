import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { Track } from "../../types/track";

type PlayerState = {
  queue: Track[];
  currentIndex: number;
  isPlaying: boolean;
  volume: number;
  currentTime: number;
  duration: number;
  recentlySentForTrackId: string | null;
};

const initialState: PlayerState = {
  queue: [],
  currentIndex: -1,
  isPlaying: false,
  volume: 0.8,
  currentTime: 0,
  duration: 0,
  recentlySentForTrackId: null,
};

const slice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setQueue(state, action: PayloadAction<{ queue: Track[]; startIndex?: number }>) {
      state.queue = action.payload.queue;
      state.currentIndex = action.payload.startIndex ?? 0;
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
      state.recentlySentForTrackId = null;
    },
    playTrack(state, action: PayloadAction<{ track: Track; queue?: Track[] }>) {
      if (action.payload.queue?.length) {
        state.queue = action.payload.queue;
        state.currentIndex = action.payload.queue.findIndex(t => t.id === action.payload.track.id);
      } else {
        state.queue = [action.payload.track];
        state.currentIndex = 0;
      }
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
      state.recentlySentForTrackId = null;
    },
    togglePlay(state) {
      if (state.currentIndex >= 0) state.isPlaying = !state.isPlaying;
    },
    pause(state) {
      state.isPlaying = false;
    },
    resume(state) {
      if (state.currentIndex >= 0) state.isPlaying = true;
    },
    next(state) {
      if (state.queue.length === 0) return;
      state.currentIndex = (state.currentIndex + 1) % state.queue.length;
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
      state.recentlySentForTrackId = null;
    },
    prev(state) {
      if (state.queue.length === 0) return;
      state.currentIndex = (state.currentIndex - 1 + state.queue.length) % state.queue.length;
      state.isPlaying = true;
      state.currentTime = 0;
      state.duration = 0;
      state.recentlySentForTrackId = null;
    },
    setVolume(state, action: PayloadAction<number>) {
      state.volume = Math.min(1, Math.max(0, action.payload));
    },
    setProgress(state, action: PayloadAction<{ currentTime: number; duration: number }>) {
      state.currentTime = action.payload.currentTime;
      state.duration = action.payload.duration;
    },
    markRecentlySent(state, action: PayloadAction<string>) {
      state.recentlySentForTrackId = action.payload;
    },
    seek(state, action: PayloadAction<number>) {
      state.currentTime = Math.max(0, action.payload);
    },
    stop(state) {
      state.isPlaying = false;
      state.queue = [];
      state.currentIndex = -1;
      state.currentTime = 0;
      state.duration = 0;
      state.recentlySentForTrackId = null;
    },
  },
});

export const playerActions = slice.actions;
export const playerReducer = slice.reducer;

export const selectPlayer = (s: any) => s.player as PlayerState;
export const selectCurrentTrack = (s: any) => {
  const p = s.player as PlayerState;
  return p.currentIndex >= 0 ? p.queue[p.currentIndex] : null;
};
export const selectNextTrack = (s: any) => {
  const p = s.player as PlayerState;

  if (p.queue.length === 0) return null;

  const nextIndex = (p.currentIndex + 1) % p.queue.length;

  return p.queue[nextIndex];
};
export const selectNextQueue = (s: any) => {
  const p = s.player as PlayerState;

  if (p.currentIndex < 0 || p.queue.length === 0) return [];

  const result: Track[] = [];

  for (let i = 1; i <= Math.min(7, p.queue.length - 1); i++) {
    result.push(p.queue[(p.currentIndex + i) % p.queue.length]);
  }

  return result;
};
export const selectIsPlaying = (s: any) => {
  const p = s.player as PlayerState;
  return p.isPlaying;
};