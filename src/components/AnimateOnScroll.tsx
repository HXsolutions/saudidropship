'use client';

import { useRef } from 'react';
import { motion, type Variants } from 'framer-motion';
import { useInView } from 'framer-motion';

interface AnimateOnScrollProps {
  children: React.ReactNode;
  className?: string;
  variants?: Variants;
  delay?: number;
  once?: boolean;
}

const defaultVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function AnimateOnScroll({
  children,
  className,
  variants = defaultVariants,
  delay = 0,
  once = false,
}: AnimateOnScrollProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{ duration: 0.5, delay }}
    >
      {children}
    </motion.div>
  );
}
