
export function debounce<T extends (...args: any[]) => any>(
  callback: T,
  delay: number
) {
  let timeoutId: ReturnType<typeof setTimeout> | null = null;

  return (...args: Parameters<T>): Promise<ReturnType<T>> => {
    return new Promise((resolve) => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }

      timeoutId = setTimeout(() => {
        resolve(callback(...args));
      }, delay);
    });
  };
}