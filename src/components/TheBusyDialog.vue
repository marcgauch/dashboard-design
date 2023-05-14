<template>
  <el-dialog
    v-model="showDialog"
    title="Please wait. The system is:"
    :center="true"
    :align-center="true"
    :show-close="true"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
  >
    <div class="busy-container">
      <div class="busy-item">
        {{ messages[0] }}
      </div>
      <div class="busy-container busy-old-items">
        <div
          v-for="(message, index) in messages.slice(1)"
          :key="`${message}-${index}`"
          class="busy-item"
        >
          {{ message }}
        </div>
      </div>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useAnalyzeStore } from '@/stores/analyzeStore';
import { MESSAGES } from '@/services/WaitingMessages';
import { ref, watch } from 'vue';

const analyzeStore = useAnalyzeStore();

const showDialog = ref(false);
const messages = ref([] as string[]);
let interval: number;

const show = () => {
  clearInterval(interval);
  messages.value = [];
  pickRandomMessage();
  interval = setInterval(() => {
    pickRandomMessage();
  }, 100);
  showDialog.value = true;
};

const hide = () => {
  showDialog.value = false;
  clearInterval(interval);
};

const pickRandomMessage = () => {
  messages.value.unshift(MESSAGES[Math.floor(Math.random() * MESSAGES.length)]);
};

watch(
  // no need to check to watch analyzeStore.changeType since we are watching directrories only here
  () => analyzeStore.isCalculating,
  (state) => {
    if (state) {
      show();
    } else {
      hide();
    }
  }
);
</script>
<style scoped>
.busy-container {
  display: flex;
  overflow: hidden;
  gap: 2rem;
}

.busy-item {
  white-space: nowrap;
}

.busy-old-items {
  background-image: linear-gradient(90deg, var(--el-text-color-regular), var(--el-bg-color));
  background-clip: text;
  color: transparent;
}
</style>
