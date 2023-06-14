import Image from 'next/image';

type Props = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
};

export const Icon = ({
  src,
  alt,
  width = 96,
  height = 96,
}: Props): JSX.Element => {
  const youtubeIconURL = process.env.YOUTUBE_CHANNEL_ICON_URL;
  return (
    <div className="rounded-full">
      <Image
        src={`${youtubeIconURL}${src}`}
        alt={alt}
        width={width}
        height={height}
      />
    </div>
  );
};
