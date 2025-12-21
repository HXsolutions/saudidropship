
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronUp, ChevronDown, ZoomIn } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

type ImageGalleryProps = {
  images: string[];
};

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [mainImage, setMainImage] = useState(images[0] || 'https://placehold.co/600x600');
  const [thumbnailScroll, setThumbnailScroll] = useState(0);
  
  const displayableThumbnails = 4;

  const handleThumbnailClick = (image: string) => {
    setMainImage(image);
  };

  const scrollThumbnails = (direction: 'up' | 'down') => {
    const newScroll = direction === 'up' 
      ? Math.max(0, thumbnailScroll - 1)
      : Math.min(images.length - displayableThumbnails, thumbnailScroll + 1);
    setThumbnailScroll(newScroll);
  };

  if (!images || images.length === 0) {
    return (
      <div className="aspect-square w-full bg-slate-100 flex items-center justify-center rounded-lg">
        <span className="text-slate-400">No Image</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row gap-4">
      {/* Thumbnails for Desktop */}
      <div className="hidden md:flex flex-col items-center gap-2">
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => scrollThumbnails('up')}
          disabled={thumbnailScroll === 0 || images.length <= displayableThumbnails}
        >
          <ChevronUp size={16} />
        </Button>
        <div className="w-20 h-[328px] overflow-hidden relative">
            <div 
                className="absolute top-0 left-0 transition-transform duration-300 ease-in-out"
                style={{ transform: `translateY(-${thumbnailScroll * 88}px)` }}
            >
            {images.map((img, index) => (
                <div
                key={index}
                className={cn(
                    'w-20 h-20 relative rounded-md overflow-hidden cursor-pointer mb-2 border-2',
                    mainImage === img ? 'border-primary' : 'border-transparent'
                )}
                onClick={() => handleThumbnailClick(img)}
                >
                <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
                </div>
            ))}
            </div>
        </div>
        <Button 
          variant="ghost" 
          size="icon" 
          className="h-8 w-8"
          onClick={() => scrollThumbnails('down')}
          disabled={thumbnailScroll >= images.length - displayableThumbnails}
        >
          <ChevronDown size={16} />
        </Button>
      </div>

      <div className="flex-1 flex flex-col gap-2">
        {/* Main Image */}
        <div className="relative group flex-grow">
          <div className="aspect-square w-full relative overflow-hidden rounded-lg">
            <Image src={mainImage} alt="Main product" fill className="object-contain" />
            <Button variant="ghost" size="icon" className="absolute top-2 right-2 bg-black/30 text-white hover:bg-black/50 hover:text-white">
              <ZoomIn size={20} />
            </Button>
          </div>
        </div>
        
        {/* Thumbnails for Mobile */}
        <div className="md:hidden flex items-center gap-2">
          <div className="flex-1 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <div className="flex gap-2">
            {images.map((img, index) => (
              <div
                key={index}
                className={cn(
                  'w-16 h-16 relative rounded-md overflow-hidden cursor-pointer shrink-0 border-2',
                  mainImage === img ? 'border-primary' : 'border-transparent'
                )}
                onClick={() => handleThumbnailClick(img)}
              >
                <Image src={img} alt={`Thumbnail ${index + 1}`} fill className="object-cover" />
              </div>
            ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
