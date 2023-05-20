<template>
  <div class="filter">
    <TreeMapDropdown
      :tags="tags.map(({ label, type, activeLeft: active }) => ({ label, type, active }))"
      @change="changeLeft"
      class="filter-element"
    />
    <div id="color-gradient">&nbsp;</div>
    <TreeMapDropdown
      :tags="tags.map(({ label, type, activeRight: active }) => ({ label, type, active }))"
      @change="changeRight"
      class="filter-element"
    />
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
import TreeMapDropdown from './TeeMapDropdown.vue';

const emits = defineEmits<{
  (e: 'change', tags: { left: string[]; right: string[] }): void;
}>();

const tags = reactive([
  { label: 'Archive', type: 'ARCHIVE', activeLeft: true, activeRight: false },
  { label: 'Binary', type: 'BINARY', activeLeft: false, activeRight: true },
  { label: 'Disk Image', type: 'DISK_IMAGE', activeLeft: false, activeRight: true },
  { label: 'Document', type: 'DOCUMENT', activeLeft: false, activeRight: true },
  { label: 'Music', type: 'MUSIC', activeLeft: false, activeRight: true },
  { label: 'Picture', type: 'PICTURE', activeLeft: false, activeRight: true },
  { label: 'Video', type: 'VIDEO', activeLeft: false, activeRight: true },
  { label: 'Other', type: 'OTHER', activeLeft: false, activeRight: true },
]);

const changeLeft = (newTags: { type: String; active: boolean }[]) => {
  tags.forEach((tag) => {
    tag.activeLeft = newTags.find((e) => e.type === tag.type)!.active;
  });
  updateParent();
};
const changeRight = (newTags: { type: String; active: boolean }[]) => {
  tags.forEach((tag) => {
    tag.activeRight = newTags.find((e) => e.type === tag.type)!.active;
  });
  updateParent();
};

const updateParent = () => {
  const left = [] as string[];
  const right = [] as string[];
  tags.forEach((tag) => {
    if (tag.activeLeft) {
      left.push(tag.type);
    }
    if (tag.activeRight) {
      right.push(tag.type);
    }
  });
  emits('change', { left, right });
};
</script>

<style scoped>
.filter {
  border: 1px solid limegreen;
  display: flex;
  justify-content: space-between;
}
.filter-element {
  margin-left: 2rem;
  margin-right: 2rem;
}
#color-gradient {
  background: rgb(0, 0, 255);
  background: linear-gradient(90deg, rgba(0, 0, 255, 1) 0%, rgba(255, 0, 0, 1) 100%);
  min-width: 1;
  flex-grow: 1;
  margin: 0.2rem 0rem;
}
</style>
