<template>
  <Tag :value="status" :severity="severity" class="rounded-xl" />
</template>

<script setup lang="ts">
import type { DefineComponent } from 'vue';
declare const Tag: DefineComponent;
import { useProductStatusTag } from '../composables/useProductStatusTag';

const props = defineProps<{
  status: string;
}>();

const { severity } = useProductStatusTag(props);
</script>
