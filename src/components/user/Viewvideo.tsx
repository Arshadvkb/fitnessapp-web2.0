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
    <div className="bg-secondary min-h-screen min-w-screen pb-10">
      {safeVideos.length > 0 ? (
        safeVideos.map((video: Video) => (
         <div 
      className="w-full bg-white border border-gray-200 rounded-lg shadow overflow-hidden"
    >
      <video controls className="w-full h-auto">
        <source src={video.video} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      
      <div className="p-5">
        <h3 className="mb-2 text-xl font-bold tracking-tight text-gray-900">
          {video.video_name}
        </h3>
        <p className="font-normal text-gray-700 text-sm">
          {video.video_description}
        </p>
      </div>
    </div>
        ))
      ) : (
        <p>No videos available.</p> 
      )}
    </div>
  );
};

export default Viewvideo;