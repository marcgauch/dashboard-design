import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  const TREE_EXPAND_DEFAULT_LEVEL = ref(0);
  const TREE_BAR_COLOR = ref('#00FFFF');
  const TREE_ITEM_SIZE = reactive({
    STEP_SIZE: 1024,
    DECIMAL_PLACES: 2,
    TEXT_WHEN_TOO_BIG: 'too many',
  });

  return {
    TREE_EXPAND_DEFAULT_LEVEL,
    TREE_ITEM_SIZE,
    TREE_BAR_COLOR,
  };
});
