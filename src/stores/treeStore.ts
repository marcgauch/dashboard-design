import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import { ReportFile } from '@/models/models';

export const useTreeStore = defineStore('tree', () => {
  const reportFile = ref(new ReportFile());

  const root = computed(() => reportFile.value.directory);
  const isEmpty = computed(() => root.value.totalSize === -1);

  return { isEmpty, reportFile, root };
});
