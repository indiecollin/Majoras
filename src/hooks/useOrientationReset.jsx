import { useEffect } from 'react';

    const useOrientationReset = () => {
      useEffect(() => {
        const handleOrientationChange = () => {
          const viewportMeta = document.querySelector('meta[name="viewport"]');
          if (viewportMeta) {            
            viewportMeta.setAttribute('content', 'width=device-width, minimum-scale=1.0, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            
            setTimeout(() => {
              viewportMeta.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no');
            }, 1); // A small delay is often sufficient
          }
        };

        window.addEventListener('orientationchange', handleOrientationChange);
        window.addEventListener('resize', handleOrientationChange); // Fallback for devices not firing orientationchange

        return () => {
          window.removeEventListener('orientationchange', handleOrientationChange);
          window.removeEventListener('resize', handleOrientationChange);
        };
      }, []);
    };

export default useOrientationReset;