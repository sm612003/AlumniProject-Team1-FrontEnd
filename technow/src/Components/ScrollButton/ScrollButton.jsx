import React, { useEffect } from 'react';
import styles from './ScrollButton.module.css'

export const ScrollButton = () => {
  const calcScrollValue = () => {
    const scrollProgress = document.getElementById('progress');

    const pos = document.documentElement.scrollTop;
    const calcHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollValue = Math.round((pos * 100) / calcHeight);

    if (pos > 100) {
      scrollProgress.style.display = 'grid';
    } else {
      scrollProgress.style.display = 'none';
    }

    scrollProgress.addEventListener('click', () => {
      document.documentElement.scrollTop = 0;
    });

    scrollProgress.style.background = `conic-gradient(#03cc65 ${scrollValue}%, #d7d7d7 ${scrollValue}%)`;
  };

  useEffect(() => {
    calcScrollValue();
    window.addEventListener('scroll', calcScrollValue);
    return () => {
      window.removeEventListener('scroll', calcScrollValue);
    };
  }, []);

  return (
        <div id="progress" className={styles.Progress}>
            
        </div>       
  )
};
