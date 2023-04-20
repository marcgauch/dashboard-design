<template>
  <div
    class="container user-select-none cursor-pointer"
    :style="`border: 1px solid ${color};`"
    @click="toggleActive"
  >
    <div :class="[{ inactive: !active }, 'colored-label']" :style="`background-color: ${color}`">
      &nbsp;
    </div>
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

const name = ItemTypeIcon[props.icon].toLowerCase().replaceAll('_', ' ');
const color = `var(--color-${ItemTypeIcon[props.icon]})`;
const active = ref(true);

const analyzeStore = useAnalyzeStore();

const toggleActive = () => {
  if (active.value) {
    active.value = false;
    analyzeStore.addDisabledItemType(props.icon);
  } else {
    active.value = true;
    analyzeStore.removeDisabledItemType(props.icon);
  }
};
</script>

<style scoped>
.container {
  display: flex;
  width: 9rem;
  height: 1rem;
}
.name {
  text-transform: capitalize;
  padding-left: 0.5rem;
}
.colored-label {
  width: 3rem;
}

.inactive {
  filter: brightness(0.7);
}
</style>
