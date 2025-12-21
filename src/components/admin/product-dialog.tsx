
'use client';

import { useForm, useFieldArray, FormProvider } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import type { Product } from '@/types';
import { useEffect, useState } from 'react';
import { useFirestore } from '@/firebase';
import { doc, setDoc, addDoc, collection } from 'firebase/firestore';
import { useToast } from '@/hooks/use-toast';
import { Loader2, PlusCircle, Trash2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Skeleton } from '../ui/skeleton';

const productSchema = z.object({
  name: z.string().min(3, { message: 'Product name must be at least 3 characters.' }),
  price: z.coerce.number().min(0, { message: 'Price must be a positive number.' }),
  currency: z.literal('SAR'),
  description: z.string().min(10, { message: 'Description must be at least 10 characters.' }),
  images: z.array(z.string().url({ message: 'Please enter a valid URL.' })).min(1, { message: 'At least one image is required.' }),
  stock: z.enum(['In Stock', 'Low Stock', 'Out of Stock'], { required_error: 'Stock status is required.' }),
  sku: z.string().min(3, { message: 'SKU must be at least 3 characters.' }),
  category: z.string().min(1, { message: 'Category is required.' }),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductDialogProps {
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  product: Product | null;
}

// Fixed list of categories
const fixedCategories = [
    "Beauty",
    "Electronics",
    "Gadgets",
    "Kitchen & Garden",
    "Household",
    "Fitness",
];


export function ProductDialog({ isOpen, onOpenChange, product }: ProductDialogProps) {
  const firestore = useFirestore();
  const { toast } = useToast();
  const [isSaving, setIsSaving] = useState(false);

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: '',
      price: 0,
      currency: 'SAR',
      category: '',
      description: '',
      images: [''],
      stock: 'In Stock',
      sku: '',
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: 'images',
  });

  useEffect(() => {
    if (isOpen) {
        setIsSaving(false); // Reset saving state when dialog opens
        if (product) {
            form.reset(product);
        } else {
            form.reset({
            name: '',
            price: 0,
            currency: 'SAR',
            category: '',
            description: '',
            images: [''],
            stock: 'In Stock',
            sku: '',
            });
        }
    }
  }, [isOpen, product, form]);
  
  const onSubmit = async (data: ProductFormValues) => {
    if (!firestore) return;
    setIsSaving(true);
    try {
      if (product) {
        const docRef = doc(firestore, 'products', product.id);
        await setDoc(docRef, { ...product, ...data }, { merge: true });
        toast({ title: 'Success', description: 'Product updated successfully.' });
      } else {
        const productsCollection = collection(firestore, 'products');
        const docRef = await addDoc(productsCollection, {...data, category: data.category || 'Uncategorized' });
        await setDoc(docRef, { id: docRef.id }, { merge: true });
        toast({ title: 'Success', description: 'Product created successfully.' });
      }
      onOpenChange(false);
    } catch (error) {
      console.error('Failed to save product:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to save product. Please check console for details.',
      });
    } finally {
      setIsSaving(false);
    }
  };

  const DialogFormContent = () => (
    <FormProvider {...form}>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 max-h-[70vh] overflow-y-auto px-1 py-2">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Product Name</FormLabel>
                <FormControl>
                  <Input placeholder="e.g., Smart Bakhoor Burner" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-2 gap-4">
              <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>Price (SAR)</FormLabel>
                      <FormControl>
                          <Input type="number" placeholder="250" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
              />
              <FormField
                  control={form.control}
                  name="sku"
                  render={({ field }) => (
                      <FormItem>
                      <FormLabel>SKU</FormLabel>
                      <FormControl>
                          <Input placeholder="SA-HG-002" {...field} />
                      </FormControl>
                      <FormMessage />
                      </FormItem>
                  )}
              />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Status</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select stock status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="In Stock">In Stock</SelectItem>
                        <SelectItem value="Low Stock">Low Stock</SelectItem>
                        <SelectItem value="Out of Stock">Out of Stock</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                   <Select onValueChange={field.onChange} value={field.value} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {fixedCategories.map(cat => (
                            <SelectItem key={cat} value={cat}>{cat}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea placeholder="Describe the product..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div>
            <FormLabel>Images</FormLabel>
            <div className="space-y-2 mt-2">
              {fields.map((field, index) => (
                <div key={field.id} className="flex items-center gap-2">
                  <FormField
                    control={form.control}
                    name={`images.${index}`}
                    render={({ field }) => (
                      <FormItem className="flex-1">
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  {fields.length > 1 && (
                    <Button type="button" variant="destructive" size="icon" onClick={() => remove(index)}>
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              ))}
            </div>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="mt-2"
              onClick={() => append('')}
            >
              <PlusCircle className="mr-2 h-4 w-4" />
              Add Image URL
            </Button>
            <FormMessage>{form.formState.errors.images?.message}</FormMessage>
          </div>

          <DialogFooter className="pt-4 sticky bottom-0 bg-background z-10">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSaving}>
              {isSaving && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Save Product
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </FormProvider>
  );

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>{product ? 'Edit Product' : 'Add New Product'}</DialogTitle>
           <DialogDescription>
            {product ? 'Update the details for this product.' : 'Create a new product to add to your catalog.'}
          </DialogDescription>
        </DialogHeader>
        <DialogFormContent />
      </DialogContent>
    </Dialog>
  );
}
