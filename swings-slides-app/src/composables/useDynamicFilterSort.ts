// Generic composable for dynamic filtering and sorting of any entity type

export function useDynamicFilterSort<T extends Record<string, any>>(
  items: Ref<T[]>,
  selectedValues: Ref<any[]>,
  filterFields: string[] = ['category'],
  sortKey: Ref<string | null>,
  sortOrder: Ref<number>,
  sortField: Ref<string>
) {
  // Dynamic filter
  const filtered = computed(() => {
    if (!selectedValues.value.length) return items.value;
    return items.value.filter(item =>
      filterFields.some(field => selectedValues.value.includes(item[field]))
    );
  });

  // Dynamic sort
  const sorted = computed(() => {
    if (!sortField.value) return filtered.value;
    return [...filtered.value].sort((a, b) => {
      const aValue = a[sortField.value];
      const bValue = b[sortField.value];
      if (aValue === undefined || bValue === undefined) return 0;
      if (sortOrder.value === -1) {
        return bValue > aValue ? 1 : bValue < aValue ? -1 : 0;
      } else {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      }
    });
  });

  return { filtered, sorted };
}

// Example usage in a component:
// import { useDynamicFilterSort } from '@/composables/useDynamicFilterSort';
// const { filtered, sorted } = useDynamicFilterSort(products, selectedCategories, ['category'], sortKey, sortOrder, sortField);
