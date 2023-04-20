<template>
  <TheTitle />
  <el-row :gutter="8">
    <el-col :span="12">
      <BarChart />
    </el-col>
    <el-col :span="12">
      <BarChart />
    </el-col>
  </el-row>
  <el-row :gutter="8">
    <el-col :span="8">
      <BarChart />
    </el-col>
    <el-col :span="8">
      <BarChart />
    </el-col>
    <el-col :span="8">
      <BarChart />
    </el-col>
  </el-row>
</template>

<script setup lang="ts">
import TheTitle from '../titleWithFilter/TheTitle.vue';
import BarChart from '@/components/analyzer/charts/BarChart.vue';
</script>

<style scoped></style>
