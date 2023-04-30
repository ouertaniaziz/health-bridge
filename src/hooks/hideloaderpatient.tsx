import { useEffect } from 'react';

export function Hideloaderpatient() {
  useEffect(() => {
    
      const overlay = document.querySelector('.loader-overlay');
      const loader = document.querySelector('.main-loader');

      setTimeout(() => {
        loader.remove();
        overlay.remove();
      }, 3000);
    
  }, []);
}
