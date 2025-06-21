<template>
  <div class="flex flex-wrap sm:flex-nowrap justify-between items-center w-full overflow-x-auto scrollbar-none" :class="customClass">
    <h2 class="text-2xl font-bold mb-4 truncate max-w-[50vw] sm:max-w-xs">{{ title }}</h2>
    <div class="flex justify-end items-center gap-2 min-w-0">
      <Select v-if="!isMobile" v-model="sortKeyProxy" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange" class="min-w-0 max-w-[40vw] sm:max-w-xs truncate" />
      <MultiSelect v-if="!isMobile && categoryOptions && selectedCategories !== undefined"
        v-model="categoryProxy"
        :options="categoryOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Select categories"
        class="w-full max-w-xs"
        display="chip"
      />
      <Button v-if="isMobile" icon="pi pi-filter" class="sm:hidden" @click="showFilter = true" aria-label="Filter" outlined size="small" />
      <Button v-if="isMobile" icon="pi pi-sort-alt" class="sm:hidden" @click="showSort = true" aria-label="Sort" outlined size="small" />
      <SelectButton v-model="layoutProxy" :options="layoutOptions" :allowEmpty="false">
        <template #option="{ option }">
          <i :class="[option === 'list' ? 'pi pi-bars' : 'pi pi-table'] " class="p-1"/>
        </template>
      </SelectButton>
    </div>
    <Dialog v-model:visible="showFilter" modal header="Filter by Category" class="w-11/12 max-w-xs">
      <MultiSelect
        v-model="categoryProxy"
        :options="categoryOptions"
        optionLabel="label"
        optionValue="value"
        placeholder="Select categories"
        class="w-full"
        display="chip"
      />
    </Dialog>
    <Dialog v-model:visible="showSort" modal header="Sort By" class="w-11/12 max-w-xs">
      <Select v-model="sortKeyProxy" :options="sortOptions" optionLabel="label" placeholder="Sort By Price" @change="onSortChange" class="w-full" />
    </Dialog>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import MultiSelect from 'primevue/multiselect';
import Select from 'primevue/select';
import SelectButton from 'primevue/selectbutton';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';

interface SortOption {
  label: string;
  value: string | number;
}

const emit = defineEmits<{
  (e: 'update:sortKey', value: string | number | SortOption | null): void;
  (e: 'update:layout', value: string): void;
  (e: 'sort-change', event: any): void;
  (e: 'update:selectedCategories', value: string[]): void;
}>();

const props = defineProps<{
  title: string;
  sortKey?: string | number | SortOption | null;
  sortOptions?: SortOption[];
  layout?: string;
  layoutOptions?: string[];
  customClass?: string;
  selectedCategories?: string[];
  categoryOptions?: { label: string; value: string }[];
}>();

const sortKeyProxy = computed({
  get: () => props.sortKey ?? null,
  set: (val: string | number | SortOption | null) => emit('update:sortKey', val)
});
const layoutProxy = computed({
  get: () => props.layout ?? 'grid',
  set: (val: string) => emit('update:layout', val)
});
const categoryProxy = computed({
  get: () => props.selectedCategories ?? [],
  set: (val: string[]) => emit('update:selectedCategories', val)
});
const onSortChange = (event: any) => {
  emit('sort-change', event);
};

// Responsive: detect mobile
const isMobile = ref(false);
const checkMobile = () => {
  isMobile.value = window.innerWidth < 640;
};
onMounted(() => {
  checkMobile();
  window.addEventListener('resize', checkMobile);
});
onUnmounted(() => {
  window.removeEventListener('resize', checkMobile);
});

const showFilter = ref(false);
const showSort = ref(false);
</script>
