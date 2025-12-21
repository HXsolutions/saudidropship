'use client';

import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { generateProductDescription } from '@/ai/flows/generate-product-description';
import { useCopyToClipboard } from '@/hooks/use-copy-to-clipboard';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Copy, Loader2, Sparkles } from 'lucide-react';

const formSchema = z.object({
  productName: z.string().min(3, 'Product name must be at least 3 characters.'),
  productFeatures: z.string().min(10, 'Please describe at least one key feature.'),
});

type FormValues = z.infer<typeof formSchema>;

export default function AIDescriptionForm() {
  const [generatedDescription, setGeneratedDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const { copy } = useCopyToClipboard();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      productName: '',
      productFeatures: '',
    },
  });

  async function onSubmit(values: FormValues) {
    setIsLoading(true);
    setGeneratedDescription('');
    try {
      const result = await generateProductDescription(values);
      if (result.description) {
        setGeneratedDescription(result.description);
      } else {
        throw new Error('AI did not return a description.');
      }
    } catch (error) {
      console.error('Failed to generate description:', error);
      toast({
        variant: 'destructive',
        title: 'Generation Failed',
        description: 'Could not generate a description. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card>
      <CardContent className="p-6">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="productName"
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
            <FormField
              control={form.control}
              name="productFeatures"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Features</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="e.g., Portable, USB-C charging, multiple heat settings, quiet operation, includes 3 types of oud."
                      className="min-h-[100px]"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isLoading} className="w-full">
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <Sparkles className="mr-2 h-4 w-4" />
              )}
              Generate Description
            </Button>
          </form>
        </Form>

        {generatedDescription && (
          <div className="mt-8 pt-6 border-t">
            <h3 className="text-lg font-semibold mb-2 font-headline">Generated Description</h3>
            <div className="relative">
              <Textarea
                readOnly
                value={generatedDescription}
                className="min-h-[150px] pr-12 bg-secondary"
              />
              <Button
                variant="ghost"
                size="icon"
                className="absolute top-2 right-2 h-8 w-8"
                onClick={() => copy(generatedDescription, 'Generated description copied!')}
              >
                <Copy className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
