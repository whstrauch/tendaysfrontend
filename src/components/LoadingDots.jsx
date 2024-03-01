import React from 'react';
import { motion, reverseEasing } from 'framer-motion';
import "./LoadingDots.css"

const LoadingDots = () => {
    const dotVariants = {
        start: {
            y: "0%"
        },
        end: {
            y: "-100%"
        }
    }

    const containerVariants = {
        start: {
            transition: {
                staggerChildren: 0.25
            }
        },
        end: {
            transition: {
                staggerChildren: 0.25
            }
        }
    }

    const transition = {
        duration: 0.5,
        repeat: Infinity,
        repeatType: "mirror",
        ease: "easeInOut",
      }

    return (
        <motion.div className='dot-container' variants={containerVariants} initial="start" animate="end" transition={{type: "spring"}}>
            <motion.span className='dot' variants={dotVariants} transition={transition}>
            </motion.span>
            <motion.span className='dot' variants={dotVariants} transition={transition}>
            </motion.span>
            <motion.span className='dot' variants={dotVariants} transition={transition}>
            </motion.span>
            
        </motion.div>
    );
};

export default LoadingDots;