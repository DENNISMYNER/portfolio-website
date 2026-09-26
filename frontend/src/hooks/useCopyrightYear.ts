/** Always the current year, computed at render time - no state/effect needed. */
export function useCopyrightYear(): number {
  return new Date().getFullYear();
}
