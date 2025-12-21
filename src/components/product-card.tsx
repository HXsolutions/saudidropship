
'use client';

import Image from 'next/image';
import type { Product } from '@/types';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

type ProductCardProps = {
  product: Product;
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link href={`/products/${product.id}`} className="block group">
      <Card className="overflow-hidden cursor-pointer border-slate-200 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300 h-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-t-lg">
          <Image
            src={product.images[0] || 'https://placehold.co/600x600'}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
           <Badge
              className="absolute top-3 right-3 text-xs"
              variant={product.stock === 'In Stock' ? 'default' : 'destructive'}
              >
              {product.stock}
          </Badge>
        </div>
        <CardContent className="p-4">
          <h3 className="font-semibold text-base text-foreground text-center truncate" title={product.name}>
            {product.name}
          </h3>
          <p className="text-center text-primary font-semibold mt-2">{product.price} {product.currency}</p>
        </CardContent>
      </Card>
    </Link>
  );
}
