<template>
  <div class="filter-row">
    <FilterItem :icon="ItemTypeIcon.ARCHIVE" />
    <FilterItem :icon="ItemTypeIcon.BINARY" />
    <FilterItem :icon="ItemTypeIcon.DISK_IMAGE" />
    <FilterItem :icon="ItemTypeIcon.DOCUMENT" />
    <FilterItem :icon="ItemTypeIcon.MUSIC" />
    <FilterItem :icon="ItemTypeIcon.PICTURE" />
    <FilterItem :icon="ItemTypeIcon.VIDEO" />
    <FilterItem :icon="ItemTypeIcon.OTHER" />
  </div>
</template>

<script setup lang="ts">
import { ItemTypeIcon } from '@/models/models';
import FilterItem from './FilterItem.vue';
</script>

<style scoped>
.filter-row {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>
