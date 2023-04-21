<template>
  <div
    class="container user-select-none cursor-pointer"
    :style="`border: 2px solid ${color};`"
    @click="toggleActive"
  >
    <div class="colored-label" :style="`background-color: ${backgroundColor}`">&nbsp;</div>
    <div :class="[{ 'text-decoration-line-through': !active }, 'name']">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { ItemTypeIcon } from '@/models/models';
import { useAnalyzeStore } from '@/stores/analyzeStore';
import { ref } from 'vue';

const props = defineProps<{
  icon: ItemTypeIcon;
}>();
const analyzeStore = useAnalyzeStore();

const name = ItemTypeIcon[props.icon].toLowerCase().replaceAll('_', ' ');
const color = `var(--color-${ItemTypeIcon[props.icon]})`;
const active = ref(!analyzeStore.disabledItemTypes.includes(props.icon));
const backgroundColor = ref(color);

const toggleActive = () => {
  if (active.value) {
    active.value = false;
    backgroundColor.value = 'var(--color-INACTIVE)';
    analyzeStore.addDisabledItemType(props.icon);
  } else {
    active.value = true;
    backgroundColor.value = color;
    analyzeStore.removeDisabledItemType(props.icon);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  width: 9rem;
  height: 1rem;
  border-radius: 0.15rem;
  box-shadow: var(--el-box-shadow-light);
}
.name {
  text-transform: capitalize;
  padding-left: 0.5rem;
}
.colored-label {
  width: 1.5rem;
}

.inactive {
  background-color: #f0efe6;
}
</style>
