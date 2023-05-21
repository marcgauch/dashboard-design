<template>
  <div style="display: flex; flex-wrap: wrap; flex-basis: content">
    <div>You are watching&nbsp;</div>
    <el-tooltip placement="top" content="Set as analyze directory">
      <div class="link-item" @click="analyzeRoot">{{ root }}</div>
    </el-tooltip>
    <template v-for="(folder, i) in folders" :key="`${folder}-${i}`">
      <div>/</div>
      <el-tooltip placement="top" content="Set as analyze directory">
        <div class="link-item" @click="analyzeFolder(i)">{{ folder }}</div>
      </el-tooltip>
    </template>
    <div>&nbsp;in detail</div>
  </div>
</template>

<script setup lang="ts">
import { useAnalyzeStore } from '@/stores/analyzeStore';
import { useTreeStore } from '@/stores/treeStore';
import { computed } from 'vue';

const analyzeStore = useAnalyzeStore();
const treeStore = useTreeStore();

const root = computed(() => treeStore.root.fullPath.replace(/\/+$/, ''));

const folders = computed(() =>
  analyzeStore.directoryPath.replace(treeStore.root.fullPath, '').replace(/\/+$/, '').split('/')
);

const analyzeRoot = () => {
  analyzeStore.setDirectory(treeStore.root);
};

const analyzeFolder = (index: number) => {
  // find directory by parent
  const stepsToGo = folders.value.length - index - 1;
  let directory = analyzeStore.analyzeDirectory;
  for (let i = 0; i < stepsToGo; i++) {
    directory = directory.parent!;
  }

  analyzeStore.setDirectory(directory);
};
</script>

<style scoped>
.link-item {
  color: var(--el-color-primary);
  cursor: pointer;
}
.link-item:hover {
  color: var(--el-color-primary-light-5);
}
</style>
