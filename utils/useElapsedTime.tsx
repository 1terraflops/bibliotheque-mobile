import { useEffect, useState } from "react";

export const useElapsedTime = (startedAt: string | null) => {
  const [elapsed, setElapsed] = useState(0);

  useEffect(() => {
    if (!startedAt) return;
    const update = () =>
      setElapsed(
        Math.floor((Date.now() - new Date(startedAt).getTime()) / 1000),
      );
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, [startedAt]);

  return elapsed;
};
