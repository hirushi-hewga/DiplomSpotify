import { useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { apiFetch } from "../../api/apiClient";
import { playerActions, selectCurrentTrack, selectPlayer } from "../../store/slice/playerSlice";
import { getUser } from "../../store/slice/userSlice";

const BASE = "http://localhost:5014";

export function usePlayerAudio() {
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const player = useSelector(selectPlayer);
  const track = useSelector(selectCurrentTrack);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const sentRef = useRef(false);

  const userRef = useRef(user);
  const trackRef = useRef(track);
  const playerRef = useRef(player);

  useEffect(() => {
    userRef.current = user;
  }, [user]);

  useEffect(() => {
    trackRef.current = track;
  }, [track]);

  useEffect(() => {
    playerRef.current = player;
  }, [player]);

  useEffect(() => {
    const audio = new Audio();
    audio.preload = "metadata";
    audioRef.current = audio;

    const onTimeUpdate = () => {
      dispatch(
        playerActions.setProgress({
          currentTime: audio.currentTime || 0,
          duration: Number.isFinite(audio.duration) ? audio.duration : 0,
        })
      );

      const currentUser = userRef.current;
      const currentTrack = trackRef.current;
      const currentPlayer = playerRef.current;

      if (currentUser?.id && currentTrack?.id) {
        const threshold = 20;
        const alreadySent =
          currentPlayer.recentlySentForTrackId === currentTrack.id || sentRef.current;

        if (!alreadySent && audio.currentTime >= threshold) {
          sentRef.current = true;
          dispatch(playerActions.markRecentlySent(currentTrack.id));

          apiFetch("/api/track/recently-played", {
            method: "POST",
            body: JSON.stringify({
              userId: currentUser.id,
              trackId: currentTrack.id,
            }),
          })
            .then(async (res) => {
              if (!res.ok) {
                console.error("recently-played failed:", res.status, await res.text());
              }
            })
            .catch((e) => {
              console.error("recently-played error:", e);
            });
        }
      }
    };

    const onEnded = () => {
      dispatch(playerActions.next());
    };

    audio.addEventListener("timeupdate", onTimeUpdate);
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.pause();
      audio.removeEventListener("timeupdate", onTimeUpdate);
      audio.removeEventListener("ended", onEnded);
      audioRef.current = null;
    };
  }, [dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    sentRef.current = false;

    if (!track) {
      audio.pause();
      audio.src = "";
      return;
    }

    const src = track.path.startsWith("http") ? track.path : `${BASE}${track.path}`;

    audio.src = src;
    audio.currentTime = 0;

    if (player.isPlaying) {
      audio.play().catch(() => {
        dispatch(playerActions.pause());
      });
    }
  }, [track?.id, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio || !track) return;

    if (player.isPlaying) {
      audio.play().catch(() => dispatch(playerActions.pause()));
    } else {
      audio.pause();
    }
  }, [player.isPlaying, track?.id, dispatch]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    audio.volume = player.volume;
  }, [player.volume]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (
      Number.isFinite(audio.duration) &&
      Math.abs(audio.currentTime - player.currentTime) > 0.6
    ) {
      audio.currentTime = Math.min(
        audio.duration || player.currentTime,
        Math.max(0, player.currentTime)
      );
    }
  }, [player.currentTime]);
}