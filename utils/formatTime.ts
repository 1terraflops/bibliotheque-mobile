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

export const formatTimeLong = (minutes: number) => {
  if (minutes < 60) {
    return `${minutes} ${minutes === 1 ? "minute" : "minutes"}`;
  }
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const hourPart = `${hours} ${hours === 1 ? "hour" : "hours"}`;
  const minPart =
    mins > 0 ? ` ${mins} ${mins === 1 ? "minute" : "minutes"}` : "";
  return `${hourPart}${minPart}`;
};

export const formatTimeWithSeconds = (seconds: number) => {
  if (seconds < 60) return `${seconds} s`;

  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;

  if (minutes < 60) return `${minutes}:${String(secs).padStart(2, "0")} m`;

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  const minPart = mins > 0 ? `:${String(mins).padStart(2, "0")}` : "";

  return `${hours}${minPart}:${String(secs).padStart(2, "0")} h`;
};
