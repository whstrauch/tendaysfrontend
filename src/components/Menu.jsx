import React from 'react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import "./Menu.css"
import { useNavigate } from 'react-router-dom';

const Menu = ({color, rules}) => {

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const navHome = () => {
        setIsOpen(false)
        navigate("/")
    }

    const navRules = () => {
        setIsOpen(false)
        rules()
    }

    const variants = {
        open: {
          opacity: 1,
          y: 0,
          transition: { type: "spring", stiffness: 300, damping: 24 }
        },
        closed: { opacity: 0, y: 20, transition: { duration: 0.2 } }
      };

    const top = {
        open: {
            rotate: 45,
            translateY: 30
        },
        closed: {
            rotate: 0,
            translateY: 0
        }
    }

    const mid = {
        open: {
            opacity: 0
        },
        closed: {
            opacity: 1
        }
    }

    const bottom = {
        open: {
            rotate: -45,
            translateY: -30
        },
        closed: {
            rotate: 0,
            translateY: 0
        }
    }

    return (
        <motion.div 
            initial={false}
            animate={isOpen ? "open" : "closed"}
            style={{display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start', marginRight: '20px'}}
        >
            <motion.button whileHover={{scale: 1.1}} className='menu' onClick={() => setIsOpen(!isOpen)}>
                <motion.svg viewBox="0 -15 100 80" width="25" height="25">
                    <motion.rect variants={top} width="100" height="12" rx="8" fill={color}></motion.rect>
                    <motion.rect variants={mid} y="30" width="100" height="12" rx="8" fill={color}></motion.rect>
                    <motion.rect variants={bottom} y="60" width="100" height="12" rx="8" fill={color}></motion.rect>
                </motion.svg>
            </motion.button>
            <motion.div
                variants={{
                    open: {
                        clipPath: "inset(0% 0% 0% 0% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.3,
                            delayChildren: 0.2,
                            staggerChildren: 0.05
                    }
                    },
                    closed: {
                        clipPath: "inset(0% 20% 100% 80% round 10px)",
                        transition: {
                            type: "spring",
                            bounce: 0,
                            duration: 0.2
                        }
                    }
                }}
                className="menu-container"
            >
                <motion.button variants={variants} className="menu-button" onClick={navHome}>Home</motion.button>
                <motion.button variants={variants} className="menu-button" onClick={navRules}>Rules</motion.button>
                <motion.button variants={variants} className="menu-button" >Support</motion.button>
            </motion.div>
            
        </motion.div>
    );
};

export default Menu;