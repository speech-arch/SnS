<template>
  <div class="flex flex-wrap sm:flex-nowrap justify-between items-center w-full overflow-x-auto scrollbar-none" :class="customClass">
    <h2 class="text-2xl font-bold mb-4 truncate max-w-[50vw] sm:max-w-xs">{{ title }}</h2>
    <div class="flex justify-end items-center gap-2 min-w-0">
      <Select v-model="sortKeyProxy" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange" class="min-w-0 max-w-[40vw] sm:max-w-xs truncate" />
      <SelectButton v-model="layoutProxy" :options="layoutOptions" :allowEmpty="false">
        <template #option="{ option }">
          <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table'] " class="p-1"/>
        </template>
      </SelectButton>
    </div>
  </div>
</template>

<script setup lang="ts">
interface SortOption {
  label: string;
  value: string | number;
}

const emit = defineEmits<{
  (e: 'update:sortKey', value: string | number | SortOption | null): void;
  (e: 'update:layout', value: string): void;
  (e: 'sort-change', event: any): void;
}>();

const props = defineProps<{
  title: string;
  sortKey?: string | number | SortOption | null;
  sortOptions?: SortOption[];
  layout?: string;
  layoutOptions?: string[];
  customClass?: string;
}>();

const sortKeyProxy = computed({
  get: () => props.sortKey ?? null,
  set: (val: string | number | SortOption | null) => emit('update:sortKey', val)
});
const layoutProxy = computed({
  get: () => props.layout ?? 'grid',
  set: (val: string) => emit('update:layout', val)
});
const onSortChange = (event: any) => {
  emit('sort-change', event);
};
</script>
