<template>
  <div class="flex flex-col gap-2 mt-2 sm:mt-">
    <span class="font-medium text-surface-500 dark:text-surface-400 text-sm">category</span>
    <div class="flex flex-wrap gap-2">
      <template v-for="(chip, idx) in displayedChips" :key="chip.label">
        <Chip :label="chip.label" :image="chip.image" />
      </template>
      <Button v-if="chips.length > 2"
        :label="showAll ? (isMobile ? '' : 'Less') : (isMobile ? '' : 'More')"
        :icon="showAll ? 'pi pi-chevron-up' : 'pi pi-chevron-down'"
        raised severity="help"
        @click="toggleShowAll"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductChips } from '../composables/useProductChips';

interface ChipData {
  label: string;
  image: string;
  removable?: boolean;
}

const props = defineProps<{
  chips: ChipData[];
}>();

const { showAll, displayedChips, isMobile, toggleShowAll } = useProductChips(props);
</script>
