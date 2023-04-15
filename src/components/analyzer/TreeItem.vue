<template>
  <div>
    <div @click="toggleExpand" class="d-flex w-100">
      <div v-for="n in indentationLevel" :key="n" class="empty"></div>
      <TreeItemIcon :icon="item.icon" :expanded="expanded" class="tree-item-icon" />
      <div
        class="d-flex w-100"
        :style="`background: linear-gradient(to right, ${settings.TREE_BAR_COLOR} ${percentageOfParent}%, #ffffff00 ${percentageOfParent}%) right;`"
      >
        <TreeItemSize :size="item.totalSize" class="tree-item-size" />
        <div class="name">{{ item.name }}</div>
      </div>
    </div>
    <div v-if="expanded">
      <TreeItem
        v-for="dir in (item as Directory).contents"
        :item="dir"
        :key="dir.name"
        :indentationLevel="indentationLevel + 1"
        :percentageOfParent="(dir.totalSize / item.totalSize) * 100"
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
  if (!isDirectory) return;
  expanded.value = !expanded.value;
};
</script>

<style scoped>
.tree-item-icon {
  margin-right: 0.55rem;
}
.tree-item-size {
  width: 5rem;
  margin-left: 0.55rem; /*this and the one from .tree-item-size will determine where the colored bar starts */
}
.tree-item-name {
}
.empty {
  border-left: 1px solid black;
  width: 1.1rem;
  min-height: 1px;
}
</style>
