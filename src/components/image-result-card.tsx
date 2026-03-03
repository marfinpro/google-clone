import Image from "next/image";
import type { ImageResult as ImageResultType } from "@/types/search";

interface ImageResultCardProps {
  image: ImageResultType;
}

export const ImageResultCard = ({ image }: ImageResultCardProps) => {
  return (
    <a
      className="group block overflow-hidden rounded-lg"
      href={image.sourceUrl}
      rel="noopener noreferrer"
      target="_blank"
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-100 dark:bg-zinc-800">
        <Image
          alt={image.title}
          className="h-full w-full object-cover transition-transform group-hover:scale-105"
          height={image.height}
          src={image.thumbnailUrl}
          unoptimized
          width={image.width}
        />
      </div>
      <p
        className="mt-1 truncate text-gray-700 text-xs dark:text-gray-300"
        title={image.title}
      >
        {image.title}
      </p>
    </a>
  );
};
