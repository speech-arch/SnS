import { computed, type Ref } from 'vue';

/**
 * useSearchFilter composable: Filters an array of items based on a search term.
 * @param items - Ref to the array of items to filter
 * @param searchTerm - Ref to the search string
 * @param fields - Array of object keys to search in (default: all string fields)
 */
export function useSearchFilter<T extends Record<string, any>>(
  items: Ref<T[]>,
  searchTerm: Ref<string>,
  fields?: (keyof T)[]
) {
  const filtered = computed(() => {
    const term = searchTerm.value.trim().toLowerCase();
    if (!term) return items.value;
    return items.value.filter(item => {
      const keys = fields || (Object.keys(item).filter(k => typeof item[k] === 'string') as (keyof T)[]);
      return keys.some(key => {
        const value = item[key];
        return typeof value === 'string' && value.toLowerCase().includes(term);
      });
    });
  });

  return { filtered };
}
