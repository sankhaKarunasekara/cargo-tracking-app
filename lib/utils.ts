/**
 * Utility function to conditionally join class names together
 */
export function cn(...classes: (string | undefined | null | false | 0)[]) {
  return classes.filter(Boolean).join(' ')
}