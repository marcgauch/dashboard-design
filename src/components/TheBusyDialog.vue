<template>
  <el-dialog
    v-model="showDialog"
    :title="`Please wait while the system is ${message}`"
    :center="true"
    :align-center="true"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div v-loading="true">&nbsp;</div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useAnalyzeStore } from '@/stores/analyzeStore';
import { pickRandomMessage } from '@/services/WaitingMessages';
import { ref, watch } from 'vue';

const analyzeStore = useAnalyzeStore();

const showDialog = ref(false);

const message = ref(pickRandomMessage());

watch(
  // no need to check to watch analyzeStore.changeType since we are watching directrories only here
  () => analyzeStore.isCalculating,
  (state) => {
    showDialog.value = state;
  }
);
</script>
<style scoped></style>
