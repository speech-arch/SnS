import { computed, ref, type Ref } from 'vue';

export interface SectionHeaderOptions {
  sortKeyProxy?: Ref<any>;
  layoutProxy?: Ref<string>;
  categoryProxy?: Ref<string[]>;
  onSortChange?: (event: any) => void;
  isMobile?: Ref<boolean>;
  showFilter?: Ref<boolean>;
  showSort?: Ref<boolean>;
}

export function useSectionHeader(props: any, emit: any, options: SectionHeaderOptions = {}) {
  const sortKeyProxy = options.sortKeyProxy || computed({
    get: () => props.sortKey ?? null,
    set: (val: string | number | { label: string; value: any } | null) => emit('update:sortKey', val)
  });
  const layoutProxy = options.layoutProxy || computed({
    get: () => props.layout ?? 'grid',
    set: (val: string) => emit('update:layout', val)
  });
  const categoryProxy = options.categoryProxy || computed({
    get: () => props.selectedCategories ?? [],
    set: (val: string[]) => emit('update:selectedCategories', val)
  });
  const onSortChange = options.onSortChange || ((event: any) => emit('sort-change', event));

  // Responsive: detect mobile
  const isMobile = options.isMobile || computed(() => window.innerWidth < 640);
  // Dialog state for mobile
  const showFilter = options.showFilter || ref(false);
  const showSort = options.showSort || ref(false);

  return {
    sortKeyProxy,
    layoutProxy,
    categoryProxy,
    onSortChange,
    isMobile,
    showFilter,
    showSort
  };
}
