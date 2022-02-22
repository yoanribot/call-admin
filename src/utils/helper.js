export function calculateElapsedTime (time) {
  // Seconds
  let delta = time / 1000;

  // Days
  const days = Math.floor(time / (1000 * 60 * 60 * 24));
  delta -= days * 86400;

  // Hours
  const hours = Math.floor(delta / 3600) % 24;
  delta -= hours * 3600;

  const minutes = Math.floor(delta / 60) % 60;
  delta -= minutes * 60;

  const seconds = delta % 60;

  return { days, hours, minutes, seconds };
}