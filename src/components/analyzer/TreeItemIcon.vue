<template>
  <el-icon>
    <Picture v-if="icon === ItemTypeIcon.PICTURE" />
    <Folder v-else-if="icon === ItemTypeIcon.FOLDER" />
    <Link v-else-if="icon === ItemTypeIcon.LINK" />
    <Headset v-else-if="icon === ItemTypeIcon.MUSIC" />
    <Film v-else-if="icon === ItemTypeIcon.FILM" />
    <Document v-else />
  </el-icon>
</template>

<script setup lang="ts">
import { ItemTypeIcon } from '@/models/models';
import { Picture, Folder, Document, Link, Headset, Film } from '@element-plus/icons-vue';

defineProps<{
  icon: ItemTypeIcon;
}>();
</script>
