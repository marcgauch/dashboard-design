<template>
  <el-dropdown :hide-on-click="false">
    <span class="el-dropdown-link">
      {{ displayText }}
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item v-for="tag in tags" :key="tag">
          <el-switch
            @change="changeSwitch(tag.type, tag.active)"
            v-model="tag.active"
            size="small"
            class="switch"
          />{{ tag.label }}
        </el-dropdown-item>
        <el-dropdown-item @click="enableAll" divided>All</el-dropdown-item>
        <el-dropdown-item @click="disableAll">None</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script setup lang="ts">
import { computed } from 'vue';

interface Tag {
  label: string;
  type: string;
  active: boolean;
}

interface IProps {
  tags: Tag[];
}
const props = defineProps<IProps>();

const emits = defineEmits<{ (e: 'change', value: { type: string; active: boolean }[]): void }>();

const displayText = computed(() => {
  const activeCount = props.tags.reduce((acc, cur) => (cur.active ? acc + 1 : acc), 0);
  if (activeCount === 0) return 'Please select at least one item';
  if (activeCount === props.tags.length) return 'Please do not select all items';
  if (activeCount <= props.tags.length / 2)
    return props.tags
      .filter((e) => e.active)
      .map((e) => e.label)
      .join(', ');
  return `NOT ${props.tags
    .filter((e) => !e.active)
    .map((e) => e.label)
    .join(', ')}`;
});

const changeSwitch = (which: string, state: boolean) => {
  const tags = props.tags.map(({ type, active }) => {
    if (which === type) {
      return { type, active: state };
    }
    return { type, active };
  });
  emits('change', tags);
};

const disableAll = () => {
  const tags = props.tags.map(({ type }) => ({ type, active: false }));
  emits('change', tags);
};
const enableAll = () => {
  const tags = props.tags.map(({ type }) => ({ type, active: true }));
  emits('change', tags);
};
</script>
<style scoped>
.el-dropdown-link {
  cursor: pointer;
  color: var(--el-color-primary);
  display: flex;
  align-items: center;
}

.switch {
  margin-right: 0.6rem;
}
</style>
