
'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { MoreHorizontal, Edit, Trash2 } from 'lucide-react';
import type { Product } from '@/types';
import { useFirestore } from '@/firebase';
import { doc, deleteDoc } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { useState } from 'react';

interface ProductTableProps {
  products: Product[];
  setDialogOpen: (open: boolean) => void;
  setSelectedProduct: (product: Product | null) => void;
}

export default function ProductTable({
  products,
  setDialogOpen,
  setSelectedProduct,
}: ProductTableProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [deleteTarget, setDeleteTarget] = useState<Product | null>(null);

  const handleEdit = (product: Product) => {
    setSelectedProduct(product);
    setDialogOpen(true);
  };

  const handleDelete = async (productId: string) => {
    if (!firestore) return;
    try {
      await deleteDoc(doc(firestore, 'products', productId));
      toast({ title: 'Success', description: 'Product deleted successfully.' });
    } catch (error) {
      console.error('Failed to delete product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to delete product.',
      });
    } finally {
      setDeleteTarget(null);
    }
  };

  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="hidden w-[100px] sm:table-cell">
              <span className="sr-only">Image</span>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>SKU</TableHead>
            <TableHead>
              <span className="sr-only">Actions</span>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((product) => (
            <TableRow key={product.id}>
              <TableCell className="hidden sm:table-cell">
                <Image
                  alt={product.name}
                  className="aspect-square rounded-md object-cover"
                  height="64"
                  src={product.images[0] || 'https://placehold.co/64'}
                  width="64"
                />
              </TableCell>
              <TableCell className="font-medium">{product.name}</TableCell>
              <TableCell>
                <Badge variant={product.stock === 'In Stock' ? 'default' : 'destructive'}>
                  {product.stock}
                </Badge>
              </TableCell>
              <TableCell>{product.price} {product.currency}</TableCell>
              <TableCell>{product.sku}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button aria-haspopup="true" size="icon" variant="ghost">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onSelect={() => handleEdit(product)}>
                      <Edit className="mr-2 h-4 w-4" />
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onSelect={() => setDeleteTarget(product)}
                      className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                    >
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       {products.length === 0 && (
        <div className="text-center p-8 text-muted-foreground">
            No products found.
        </div>
      )}

      <AlertDialog open={!!deleteTarget} onOpenChange={(open) => !open && setDeleteTarget(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
              <AlertDialogDescription>
                This action cannot be undone. This will permanently delete the product "{deleteTarget?.name}" from the database.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setDeleteTarget(null)}>Cancel</AlertDialogCancel>
              <AlertDialogAction
                onClick={() => deleteTarget && handleDelete(deleteTarget.id)}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
              >
                Delete
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
