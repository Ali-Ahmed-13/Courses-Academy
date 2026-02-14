'use client';
import { useState } from 'react';
import { Play } from 'lucide-react';
import VideoImage from './Image/VideoImage';

export default function LessonVideo({ videoUrl }: { videoUrl: string }) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (!videoUrl) return null;
  const videoId: string | undefined = videoUrl.split('?')[0].split('/').pop();

  return (
    <div className="w-full aspect-video rounded-3xl overflow-hidden shadow-2xl bg-black border-4 border-white ring-1 ring-slate-200 relative group">
      {!isPlaying ? (
        <div
          className="relative w-full h-full cursor-pointer"
          onClick={() => setIsPlaying(true)}
        >
          <VideoImage videoId={videoId} />

          <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
            <div className="w-20 h-20 flex items-center justify-center bg-indigo-600 text-white rounded-full shadow-2xl transform transition-transform group-hover:scale-110">
              <Play size={40} fill="currentColor" />
            </div>
          </div>
        </div>
      ) : (
        <iframe
          src={`https://www.youtube.com/embed/${videoId}?autoplay=1`}
          title="Lesson Video"
          className="w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      )}
    </div>
  );
}
