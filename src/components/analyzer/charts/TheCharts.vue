<template>
  <el-row>
    <el-col>
      <TheTitle />
    </el-col>
  </el-row>
  <el-row :gutter="8" style="display: flex; flex-grow: 1">
    <el-col :span="12">
      <BarChart card-height="16rem" />
    </el-col>
    <el-col :span="12">
      <ChartAverageFolder card-height="16rem" />
    </el-col>
  </el-row>
  <el-row :gutter="8" style="display: flex; flex-grow: 1">
    <el-col :span="8">
      <BarChart card-height="8rem" />
    </el-col>
    <el-col :span="8">
      <BarChart card-height="8rem" />
    </el-col>
    <el-col :span="8">
      <BarChart card-height="8rem" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import TheTitle from '../titleWithFilter/TheTitle.vue';
import BarChart from '@/components/analyzer/charts/BarChart.vue';
import ChartAverageFolder from '@/components/analyzer/charts/ChartAverageFolder.vue';
</script>

<style scoped></style>
