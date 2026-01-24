import { useEffect, useState } from "react";

const useCountdown = (seconds: number) => {
  const [time, setTime] = useState(seconds);

  useEffect(() => {
    if (time === 0) return;

    const id = setInterval(() => {
      setTime((t) => t - 1);
    }, 1000);

    return () => clearInterval(id);
  }, [time]);

  const padded = String(time).padStart(2, "0");
  const ended = time === 0;

  const reset = () => {
    setTime(seconds);
  };

  return {
    time: padded,
    ended,
    reset,
  };
};

export default useCountdown;
