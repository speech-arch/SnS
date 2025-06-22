import { ref, computed, type Ref } from 'vue';

export type ProductFilterFn = (products: any[], selectedCategories: string[], searchTerm?: string) => any[];
export type ProductSortFn = (products: any[], sortKey: any, sortOrder: any, sortField: any) => any[];

export function useProductGrid(
  products: Ref<any[]>,
  initialItemsPerPage = 6,
  filterFn?: ProductFilterFn,
  sortFn?: ProductSortFn
) {
  const selectedCategories = ref<string[]>([]);
  const sortKey = ref();
  const sortOrder = ref();
  const sortField = ref();
  const sortOptions = ref([
    { label: 'Price High to Low', value: '!price' },
    { label: 'Price Low to High', value: 'price' },
  ]);
  const layout = ref('grid');
  const options = ref(['list', 'grid']);
  const itemsPerPage = ref(initialItemsPerPage);
  const page = ref(1);

  const categoryOptions = computed(() => {
    const cats = Array.from(new Set(products.value.map(p => p.category)));
    return cats.map(c => ({ label: c, value: c }));
  });

  // Default filter logic
  const defaultFilter: ProductFilterFn = (prods, cats) => {
    let result = prods;
    if (cats.length) {
      result = result.filter(p => cats.includes(p.category));
    }
    return result;
  };

  // Default sort logic (no-op)
  const defaultSort: ProductSortFn = (prods) => prods;

  const filteredProducts = computed(() => {
    return (filterFn || defaultFilter)(products.value, selectedCategories.value);
  });

  const sortedProducts = computed(() => {
    return (sortFn || defaultSort)(filteredProducts.value, sortKey.value, sortOrder.value, sortField.value);
  });

  const totalPages = computed(() => Math.ceil(sortedProducts.value.length / itemsPerPage.value));
  const paginatedProducts = computed(() => {
    const start = (page.value - 1) * itemsPerPage.value;
    return sortedProducts.value.slice(start, start + itemsPerPage.value);
  });

  const nextPage = () => {
    if (page.value < totalPages.value) page.value++;
  };
  const prevPage = () => {
    if (page.value > 1) page.value--;
  };

  const onSortChange = (event: { value: { value: any } }) => {
    const value = event.value.value;
    const sortValue = event.value;
    if (value.indexOf('!') === 0) {
      sortOrder.value = -1;
      sortField.value = value.substring(1, value.length);
      sortKey.value = sortValue;
    } else {
      sortOrder.value = 1;
      sortField.value = value;
      sortKey.value = sortValue;
    }
  };

  return {
    selectedCategories,
    sortKey,
    sortOrder,
    sortField,
    sortOptions,
    layout,
    options,
    itemsPerPage,
    page,
    categoryOptions,
    filteredProducts,
    sortedProducts,
    totalPages,
    paginatedProducts,
    nextPage,
    prevPage,
    onSortChange,
  };
}
