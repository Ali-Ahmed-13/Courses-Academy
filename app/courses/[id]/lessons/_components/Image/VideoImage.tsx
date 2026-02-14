import Image from 'next/image';

const VideoImage = ({ videoId }: { videoId: string | undefined }) => {
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;

  return (
    <Image
      src={thumbnailUrl}
      alt="Video Thumbnail"
      width={1280}
      height={720}
      priority
      fetchPriority="high"
      className="w-full h-full object-cover"
    />
  );
};

export default VideoImage;
