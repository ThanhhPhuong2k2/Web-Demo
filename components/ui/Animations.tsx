import React, { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface FadeUpProps {
  children: ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  viewportOnce?: boolean;
}

export const FadeUp: React.FC<FadeUpProps> = ({ 
  children, 
  delay = 0, 
  duration = 0.6, 
  className = "",
  viewportOnce = true
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: viewportOnce, margin: "-10%" }}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const StaggerContainer: React.FC<{ children: ReactNode; className?: string; stagger?: number }> = ({ 
  children, 
  className = "",
  stagger = 0.1
}) => {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-10%" }}
      variants={{
        visible: { transition: { staggerChildren: stagger } },
        hidden: {}
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export const FadeInItem: React.FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
};
