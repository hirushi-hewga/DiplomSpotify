import React, { useState, useEffect, useRef } from 'react';
import { getTrackById, getTracks } from '../services/MusicFlowService.tsx';

const MusicPlayer: React.FC = () => {
    const [tracks, setTracks] = useState<{
        id: number;
        duration: number;
        albumId: number;
        name: string;
        path: string;
        genres: { id: number; name: string }[];
    }[]>([]);
    const [currentIndex, setCurrentIndex] = useState<number>(0);
    const [loading, setLoading] = useState<boolean>(true);

    const audioRef = useRef<HTMLAudioElement>(null);

    const fetchTracks = async () => {
        try {
            const trackData = await getTracks();
            setTracks(trackData);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching tracks:', error);
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchTracks();
    }, []);

    const handleNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % tracks.length);
    };

    const handlePrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + tracks.length) % tracks.length);
    };

    const currentTrack = tracks[currentIndex];
    const audioSrc = currentTrack ? `http://localhost:5158/audio/${currentTrack.path}` : '';

    useEffect(() => {
        if (audioRef.current) {
            audioRef.current.src = audioSrc;
        }
    }, [audioSrc]);

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div className="music-player">
            {currentTrack ? (
                <div>
                    <h3>{currentTrack.name}</h3>
                    <p>Жанр: {currentTrack.genres.map(genre => genre.name).join(', ')}</p>
                    <audio ref={audioRef} controls />
                    <div className="controls">
                        <button onClick={handlePrevious} disabled={tracks.length <= 1}>←</button>
                        <button onClick={handleNext} disabled={tracks.length <= 1}>→</button>
                    </div>
                </div>
            ) : (
                <p>No track is playing</p>
            )}
        </div>
    );
};

export default MusicPlayer;