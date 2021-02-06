export function isValidTimestamp(timestamp) {
  const currentTime = new Date().getTime();

  if (timestamp > currentTime) {
    return false;
  }

  return new Date(timestamp * 1000).getTime() > 0;
}
