<template>
  <div>
    <div
      @click="toggleExpand"
      @click.right.prevent="openContextMenu"
      :class="`d-flex w-100 tree-item ${isAnalyzedDirectoryStyle}`"
    >
      <div v-for="n in indentationLevel" :key="n" class="empty"></div>
      <TreeItemIcon :icon="item.icon" :expanded="expanded" class="tree-item-icon" />
      <div
        class="d-flex w-100 tree-item-gradient"
        :style="`background: linear-gradient(to right, ${settings.TREE_BAR_COLOR} ${percentageOfParent}%, #ffffff00 ${percentageOfParent}%) right;`"
      >
        <TreeItemSize :size="item.totalSize" class="tree-item-size" />
        <div class="tree-item-name">{{ item.name }}</div>
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
import { computed, ref } from 'vue';

import { useSettingsStore } from '@/stores/settingsStore';
import { useAnalyzeStore } from '@/stores/analyzeStore';

import ContextMenu from '@imengyu/vue3-context-menu';

const settings = useSettingsStore();
const analyzeStore = useAnalyzeStore();

const props = defineProps({
  item: { type: Item, required: true },
  indentationLevel: { type: Number, required: true },
  percentageOfParent: { type: Number, required: true },
  bar: Number,
});

const expanded = ref(props.indentationLevel <= settings.TREE_EXPAND_DEFAULT_LEVEL);
const isDirectory = computed(() => props.item.isDirectory);

const isAnalyzedDirectoryStyle = computed(() => {
  if (!props.item.isDirectory) return '';
  if (props.item.fullPath !== analyzeStore.directoryPath) return '';
  return 'analyze-directory';
});

const toggleExpand = () => {
  if (!isDirectory.value) return;
  expanded.value = !expanded.value;
};

const openContextMenu = (e: MouseEvent) => {
  if (!isDirectory.value) return;
  // https://github.com/imengyu/vue3-context-menu
  e.preventDefault();
  //show your menu
  ContextMenu.showContextMenu({
    x: e.x,
    y: e.y,
    theme: 'mac',
    items: [
      {
        label: 'Set as analyze directory',
        onClick: () => {
          analyzeStore.setDirectory(props.item as Directory);
        },
      },
      {
        label: 'Debug',
        children: [
          {
            label: 'Log in console',
            children: [
              {
                label: 'As is',
                onClick: () => {
                  console.dir(props.item);
                },
              },
              {
                label: 'As JSON',
                onClick: () => {
                  console.log(JSON.stringify(props.item));
                },
              },
              {
                label: 'As Object but via JSON',
                onClick: () => {
                  console.log(JSON.parse(JSON.stringify(props.item)));
                },
              },
            ],
          },
          {
            label: 'set busy state',
            children: [
              {
                label: 'TRUE',
                onClick: () => {
                  analyzeStore.isCalculating = true;
                },
              },
              {
                label: 'FALSE',
                onClick: () => {
                  analyzeStore.isCalculating = false;
                },
              },
            ],
          },
        ],
      },
    ],
  });
};
</script>

<style scoped>
.tree-item {
  overflow-x: hidden;
}
.analyze-directory {
  background-color: var(--color-tree-selected);
}
.tree-item-icon {
  margin-right: 1.1rem;
}
.tree-item-gradient {
  overflow-x: hidden;
}
.tree-item-size {
  width: 5rem !important;
  min-width: 5rem !important;
  white-space: nowrap;
}
.tree-item-name {
  overflow-x: hidden;
  white-space: nowrap;
  flex-shrink: 1;
  text-overflow: clip;
}
.empty {
  border-left: 1px solid black;
  width: 1.1rem;
  min-width: 1.1rem;
  min-height: 1px;
}
</style>
