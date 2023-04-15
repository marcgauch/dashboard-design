<template>
  <div>
    <div
      @click="toggleExpand"
      class="tree-item"
      :style="`  background: linear-gradient(to right, #ff0000 ${percentageOfParent}%, #ffffff00 ${percentageOfParent}%) right;`"
    >
      <div v-for="n in indentationLevel" :key="n" class="empty"></div>
      {{ indentationLevel }}
      <TreeItemIcon :icon="item.icon" class="tree-item-icon" />
      <TreeItemSize :size="item.size" class="tree-item-size" />
      <div class="name">{{ item.name }}</div>
      <TreeItemIcon :icon="item.icon" :expanded="expanded" class="tree-item-icon" />
    </div>
    <div v-if="expanded">
      <TreeItem
        v-for="dir in (item as Directory).contents"
        :item="dir"
        :key="dir.name"
        :indentationLevel="indentationLevel + 1"
        :percentageOfParent="10"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Item, Directory } from '@/models/models';
import TreeItem from './TreeItem.vue';
import TreeItemIcon from './TreeItemIcon.vue';
import TreeItemSize from './TreeItemSize.vue';
import { ref } from 'vue';

import { useSettingsStore } from '@/stores/settingsStore';

const settings = useSettingsStore();

const props = defineProps({
  item: { type: Item, required: true },
  indentationLevel: { type: Number, required: true },
  percentageOfParent: { type: Number, required: true },
  bar: Number,
});

const expanded = ref(props.indentationLevel <= settings.TREE_EXPAND_DEFAULT_LEVEL);
const isDirectory = props.item.isDirectory();

const toggleExpand = () => {
  console.log('TOGGLE');
  if (!isDirectory) return;
  expanded.value = !expanded.value;
};
</script>

<style scoped>
.tree-item {
  display: flex;
  border: 1px solid black;
}
.tree-item-icon {
}
.tree-item-size {
  margin-left: 1.1rem;
  width: 5rem;
}
.tree-item-name {
}
.empty {
  border-left: 1px solid black;
  width: 1.1rem;
  min-height: 1px;
}
</style>
