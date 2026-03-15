export const formatTime = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} m`;
  }

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  return mins > 0
    ? `${hours}:${String(mins).padStart(2, "0")} h`
    : `${hours} h`;
};
