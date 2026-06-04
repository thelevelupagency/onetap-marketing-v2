/**
 * Generic pagination helper for in-memory arrays.
 *
 * Returns the slice for the requested page, the clamped safe page number,
 * and the total page count. Pure utility — no React primitives; callers
 * own URL sync and navigation.
 */
export function paginateItems<T>(
  items: T[],
  pageSize: number,
  currentPage: number,
): {
  pageItems: T[];
  totalPages: number;
  safePage: number;
} {
  const totalPages = Math.ceil(items.length / pageSize);
  const safePage = totalPages === 0 ? 1 : Math.min(Math.max(1, currentPage), totalPages);
  const pageItems = items.slice((safePage - 1) * pageSize, safePage * pageSize);
  return { pageItems, totalPages, safePage };
}

/** Page numbers with ellipsis markers for large page counts. */
export function getPaginationPageNumbers(
  current: number,
  total: number,
): (number | "ellipsis")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  if (current <= 4) return [1, 2, 3, 4, 5, "ellipsis", total];
  if (current >= total - 3)
    return [1, "ellipsis", total - 4, total - 3, total - 2, total - 1, total];
  return [1, "ellipsis", current - 1, current, current + 1, "ellipsis", total];
}
