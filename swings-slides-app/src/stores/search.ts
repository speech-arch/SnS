import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useSearchStore = defineStore('search', () => {
  const searchTerm = ref('');
  return { searchTerm };
});
