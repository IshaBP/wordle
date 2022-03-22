const vibrate = () => {
  if ('vibrate' in navigator) {
    navigator.vibrate(20);
  }
};

export const useVibration = () => vibrate;
