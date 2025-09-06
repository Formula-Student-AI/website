import Image from "next/image";

interface GalleryItemProps {
  src: string;
  alt?: string;
  caption?: string;
  index: number;
}

export function GalleryItem({ src, alt, caption, index }: GalleryItemProps) {
  return (
    <div className="relative group overflow-hidden rounded-lg shadow-lg w-full">
      <div className="aspect-[4/3] relative w-full">
        <Image
          src={src}
          alt={alt || `Gallery image ${index + 1}`}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
      </div>
      {caption && (
        <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white p-2 text-sm">
          {caption}
        </div>
      )}
    </div>
  );
}
