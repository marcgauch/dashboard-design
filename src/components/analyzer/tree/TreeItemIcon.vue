<template>
  <el-icon>
    <FolderOpened v-if="expanded" />
    <Coin v-else-if="icon === ItemTypeIcon.DISK_IMAGE" />
    <Cpu v-else-if="icon === ItemTypeIcon.BINARY" />
    <Document v-else-if="icon === ItemTypeIcon.DOCUMENT" />
    <Film v-else-if="icon === ItemTypeIcon.VIDEO" />
    <Folder v-else-if="icon === ItemTypeIcon.FOLDER" />
    <Headset v-else-if="icon === ItemTypeIcon.MUSIC" />
    <Link v-else-if="icon === ItemTypeIcon.LINK" />
    <Picture v-else-if="icon === ItemTypeIcon.PICTURE" />
    <TakeawayBox v-else-if="icon === ItemTypeIcon.ARCHIVE" />
    <Flag v-else />
  </el-icon>
</template>

<script setup lang="ts">
import { ItemTypeIcon } from '@/models/models';
import {
  Coin,
  Cpu,
  Document,
  Film,
  Flag,
  Folder,
  FolderOpened,
  Headset,
  Link,
  Picture,
  TakeawayBox,
} from '@element-plus/icons-vue';

defineProps<{
  icon: ItemTypeIcon;
  expanded: boolean;
}>();
</script>
