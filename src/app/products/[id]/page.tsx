
'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { doc, getDoc } from 'firebase/firestore';
import { useFirestore } from '@/firebase';
import type { Product } from '@/types';
import ImageGallery from '@/components/image-gallery';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Copy, Download, Share2, CheckCircle, Info, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Skeleton } from '@/components/ui/skeleton';

export default function ProductDetailPage() {
  const { id } = useParams();
  const firestore = useFirestore();
  const { toast } = useToast();
  const { copy } = useCopyToClipboard();

  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id && firestore) {
      const getProduct = async () => {
        setLoading(true);
        const docRef = doc(firestore, 'products', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          console.log("No such document!");
          // Handle not found case
        }
        setLoading(false);
      };
      getProduct();
    }
  }, [id, firestore]);

  const handleShare = async () => {
    if (!product) return;
    const shareUrl = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: product.name,
          text: `Check out this product: ${product.name}`,
          url: shareUrl,
        });
      } catch (error) {
         if (error instanceof DOMException && (error.name === 'AbortError' || error.name === 'NotAllowedError')) {
          // User cancelled the share sheet, fall back to copying link
          copy(shareUrl, 'Share cancelled. Link copied to clipboard!');
        } else {
          console.error('Error sharing:', error);
          // Fallback for other errors
          copy(shareUrl, 'Could not share. Link copied instead.');
        }
      }
    } else {
      // Fallback for browsers that don't support navigator.share
      copy(shareUrl, 'Product link copied to clipboard!');
    }
  };

  const handleDownloadImages = async () => {
    if (!product) return;
    toast({ title: 'Starting image download...' });
    for (let i = 0; i < product.images.length; i++) {
      const imageUrl = product.images[i];
      try {
        const response = await fetch(imageUrl);
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${product.sku}-image-${i + 1}.jpg`;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        a.remove();
        await new Promise(resolve => setTimeout(resolve, 500));
      } catch (error) {
        console.error('Error downloading image:', error);
        toast({
          title: 'Download Failed',
          description: `Could not download image ${i + 1}.`,
          variant: 'destructive',
        });
      }
    }
  };

  const handleCopyDescription = () => {
    if (!product) return;
    const textToCopy = `*${product.name}*\n\n*Price:* ${product.price} ${product.currency}\n\n*Description:*\n${product.description}\n\n*SKU:* ${product.sku}`;
    copy(textToCopy, 'Product details copied!');
  };


  if (loading) {
    return (
      <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-12">
            <Skeleton className="w-full aspect-square rounded-lg" />
            <div className="space-y-6">
                <Skeleton className="h-10 w-3/4" />
                <Skeleton className="h-8 w-1/4" />
                <Skeleton className="h-6 w-1/3" />
                <div className="space-y-2">
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-full" />
                    <Skeleton className="h-4 w-5/6" />
                </div>
                 <Skeleton className="h-12 w-full" />
            </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return <div className="container mx-auto py-12 px-4 text-center">Product not found.</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-16">
            <div>
                <ImageGallery images={product.images} />
            </div>
            <div className="flex flex-col">
                <h1 className="text-2xl lg:text-3xl font-bold text-foreground mb-2">{product.name}</h1>
                <p className="text-3xl font-bold text-primary mb-6">
                    {product.price} <span className="text-base font-normal text-slate-400">{product.currency}</span>
                </p>

                {product.stock === 'In Stock' && (
                    <div className="flex items-center gap-2 text-green-600 mb-6">
                        <CheckCircle size={18} />
                        <span className="font-semibold text-sm">In stock!</span>
                    </div>
                )}
                
                <div className="flex items-center gap-2 sm:gap-4 mb-8">
                    <Button variant="ghost" size="sm" className="text-muted-foreground" onClick={handleShare}>
                        <Share2 size={16} className="mr-2"/>
                        Share
                    </Button>
                    <Button variant="default" onClick={handleDownloadImages}>
                        <Download size={16} className="mr-2"/>
                        Download Images
                    </Button>
                </div>

                <Accordion type="single" collapsible defaultValue="item-1" className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger className='border rounded-md px-4'>
                            <div className='flex items-center gap-2'>
                            <Info size={16}/>
                            <span className='text-sm font-medium'>Product Description</span>
                            </div>
                        </AccordionTrigger>
                        <AccordionContent className="p-4">
                            <div className='flex justify-between items-center mb-2'>
                            <h4 className="font-semibold">Copy details for your store</h4>
                            <Button variant="ghost" size="sm" onClick={handleCopyDescription}>
                                <Copy size={14} className="mr-2" />
                                Copy
                            </Button>
                            </div>
                            <p className='text-sm text-muted-foreground'>{product.description}</p>
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>
        </div>
    </div>
  );
}
