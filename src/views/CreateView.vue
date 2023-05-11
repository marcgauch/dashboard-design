<template>
  <el-tabs type="border-card" class="create-card" v-model="selectedTab" @tab-click="updateTab">
    <el-tab-pane label="Windows" name="windows"><CreateWindows /></el-tab-pane>
    <el-tab-pane label="Mac" name="mac"><CreateMac /></el-tab-pane>
    <el-tab-pane label="Linux" name="linux"><CreateLinux /></el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import CreateLinux from '@/components/create/CreateLinux.vue';
import CreateMac from '@/components/create/CreateMac.vue';
import CreateWindows from '@/components/create/CreateWindows.vue';

const route = useRoute();
const router = useRouter();

const allowedRoutes = ['windows', 'mac', 'linux'];

const initalRoute = route.params.os.toString();
const selectedTab = ref(allowedRoutes.includes(initalRoute) ? initalRoute : 'windows');

watch(
  () => route.params.os,
  (newOs) => {
    if (Array.isArray(newOs)) {
      newOs = newOs[0];
    }
    selectedTab.value = allowedRoutes.includes(newOs) ? newOs : 'windows';
  }
);

const updateTab = ({ paneName }: TabsPaneContext) => {
  router.replace({ path: `/create/${paneName}` });
};
</script>

<!-- Added because of the element website. will remove-->
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}

.create-card {
  max-height: 70vh;
  overflow-y: auto;
}
</style>
