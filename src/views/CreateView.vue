<template>
  <el-tabs type="border-card" v-model="selectedTab">
    <el-tab-pane label="Windows" name="windows"><el-text tag="i">todo</el-text></el-tab-pane>
    <el-tab-pane label="Mac" name="mac"><el-text tag="i">todo</el-text></el-tab-pane>
    <el-tab-pane label="Linux" name="linux">
      <el-text tag="i">tree -a -J -R -s ~/ownCloud/ > ~/tree.json</el-text>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const selectedTab = ref(route.params.os.toString());

watch(
  () => route.params.os,
  (newOs) => {
    if (typeof newOs === 'string') {
      selectedTab.value = newOs;
    } else {
      selectedTab.value = newOs[0];
    }
  }
);
</script>
