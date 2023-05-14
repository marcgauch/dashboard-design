<template>
  <el-row>
    <el-col>
      <TheTitle />
    </el-col>
  </el-row>
  <el-row :gutter="8" style="display: flex; flex-grow: 1">
    <el-col :span="12">
      <BarChartLargestFiles card-height="16rem" />
    </el-col>
    <el-col :span="12">
      <BarChartAmoundOfFoldertypes card-height="16rem" />
    </el-col>
  </el-row>
  <el-row :gutter="8" style="display: flex; flex-grow: 1">
    <el-col :span="8">
      <ChartAverageFolder card-height="8rem" />
    </el-col>
    <el-col :span="8">
      <BarChartLargestFiles card-height="8rem" />
    </el-col>
    <el-col :span="8">
      <BarChartLargestFiles card-height="8rem" />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import TheTitle from '../titleWithFilter/TheTitle.vue';
import BarChartAmoundOfFoldertypes from '@/components/analyzer/charts/BarChartAmoundOfFoldertypes.vue';
import BarChartLargestFiles from '@/components/analyzer/charts/BarChartLargestFiles.vue';
import ChartAverageFolder from '@/components/analyzer/charts/ChartAverageFolder.vue';
</script>

<style scoped></style>
