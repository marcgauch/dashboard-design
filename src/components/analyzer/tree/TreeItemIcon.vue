<template>
  <el-icon>
    <FolderOpened v-if="expanded" />
    <Picture v-else-if="icon === ItemTypeIcon.PICTURE" />
    <Folder v-else-if="icon === ItemTypeIcon.FOLDER" />
    <Link v-else-if="icon === ItemTypeIcon.LINK" />
    <Headset v-else-if="icon === ItemTypeIcon.MUSIC" />
    <Film v-else-if="icon === ItemTypeIcon.VIDEO" />
    <Document v-else />
  </el-icon>
</template>

<script setup lang="ts">
import { ItemTypeIcon } from '@/models/models';
import {
  Document,
  Film,
  Folder,
  FolderOpened,
  Headset,
  Link,
  Picture,
} from '@element-plus/icons-vue';

defineProps<{
  icon: ItemTypeIcon;
  expanded: boolean;
}>();
</script>
