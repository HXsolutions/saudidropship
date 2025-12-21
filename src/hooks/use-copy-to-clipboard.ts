'use client';

import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copy = (text: string, successMessage: string = 'Copied to clipboard!') => {
    if (!navigator.clipboard) {
        toast({
            title: 'Clipboard not supported',
            description: 'Your browser does not support the Clipboard API.',
            variant: 'destructive',
        });
        return;
    }

    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      toast({ title: successMessage });
      setTimeout(() => setCopied(false), 2000);
    }).catch(err => {
      console.error('Failed to copy: ', err);
      toast({ title: 'Failed to copy text.', variant: 'destructive' });
    });
  };

  return { copied, copy };
}
