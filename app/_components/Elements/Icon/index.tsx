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
  return (
    <div className="rounded-full">
      <Image src={`${src}`} alt={alt} width={width} height={height} />
    </div>
  );
};
