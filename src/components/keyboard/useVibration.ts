export const useVibration = () => {
  return () => {
    if ('vibrate' in navigator) {
      navigator.vibrate(20);
    }
  };
};
