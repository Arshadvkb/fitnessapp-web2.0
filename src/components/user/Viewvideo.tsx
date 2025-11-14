import { useEffect, useState } from "react";
import { videoStore } from "../../store/videoStore";
import type { Video } from "../../types/video";
import { Film, Play } from "lucide-react";

const Viewvideo = () => {
  const { getVideo, videos } = videoStore() as {
    getVideo: () => void;
    videos: Video[] | null;
  };
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getVideo();
  }, [getVideo]);

  useEffect(() => {
    if (videos !== null && videos.length > 0) {
      setLoading(false);
      console.log("from card", videos);
    } else if (videos === null) {
      console.log("videos is null or undefined");
    }
  }, [videos]);
  if (loading) {
    return (
      <div>
        <p>Loading videos...</p>
      </div>
    );
  }

  const safeVideos = videos ?? [];

  return (
   <div className="bg-main min-h-screen">
      {/* Header */}
      <div className="bg-accent shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-4xl font-bold text-white">Video Gallery</h1>
          <p className="mt-2 text-white/80 text-lg">
            {safeVideos.length} videos available
          </p>
        </div>
      </div>

      {/* Video Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {safeVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {safeVideos.map((video, index) => (
              <div
                key={index}
                className="bg-accent rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden hover:scale-105"
              >
                {/* Video Container */}
                <div className="relative bg-secondary aspect-video">
                  <video 
                    controls 
                    className="w-full h-full object-cover" 
                    preload="metadata"
                  >
                    <source src={video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="absolute top-3 right-3 bg-main/80 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-xs font-semibold text-white">HD</span>
                  </div>
                </div>

                {/* Video Info */}
                <div className="p-6">
                  <h3 className="text-xl font-bold text-white mb-3 line-clamp-2">
                    {video.video_name}
                  </h3>
                  <p className="text-sm text-white/70 line-clamp-3 mb-4">
                    {video.video_description}
                  </p>

                  <div className="flex items-center gap-4 pt-4 border-t border-white/20">
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Film className="w-4 h-4" />
                      <span>Training Video</span>
                    </div>
                    <div className="flex items-center gap-2 text-xs text-white/60">
                      <Play className="w-4 h-4" />
                      <span>Watch Now</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-accent mb-6">
              <Film className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              No videos available
            </h3>
            <p className="text-white/60 text-lg">Check back later for new content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewvideo;
