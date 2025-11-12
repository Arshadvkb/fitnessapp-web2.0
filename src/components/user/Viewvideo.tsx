import { useEffect, useState } from "react";
import { videoStore } from "../../store/videoStore";
import type { Video } from "../../types/video";

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
    <div className="bg-secondary min-h-screen">
    
      <div >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-gray-900">Video Gallery</h1>
          <p className="mt-2 text-gray-900">
            {safeVideos.length} videos available
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {safeVideos.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeVideos.map((video, index) => (
              <div
                key={index}
                className="bg-accent rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden border border-gray-100"
              >
                <div className="relative bg-gray-900 aspect-video">
                  <video controls className="w-full h-full" preload="metadata">
                    <source src={video.video} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>

                <div className="p-5">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                    {video.video_name}
                  </h3>
                  <p className="text-sm text-gray-600 line-clamp-3">
                    {video.video_description}
                  </p>

                  <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>Video</span>
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>HD Quality</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4"></div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">
              No videos available
            </h3>
            <p className="text-gray-500">Check back later for new content</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Viewvideo;
