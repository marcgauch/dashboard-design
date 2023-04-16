import { reactive, ref } from 'vue';
import { defineStore } from 'pinia';

export const useSettingsStore = defineStore('settings', () => {
  const TREE_EXPAND_DEFAULT_LEVEL = ref(0);
  const TREE_BAR_COLOR = ref('#00FFFF');
  const TREE_ITEM_SIZE = reactive({
    STEP_SIZE: 1024,
    DECIMAL_PLACES: 2,
    UNITS: ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
    TEXT_WHEN_TOO_BIG: 'much',
  });
  const DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE = ref(false);

  const saveSettings = () => {
    localStorage.setItem(
      'TREE_EXPAND_DEFAULT_LEVEL',
      JSON.stringify(TREE_EXPAND_DEFAULT_LEVEL.value)
    );
    localStorage.setItem('TREE_BAR_COLOR', JSON.stringify(TREE_BAR_COLOR.value));
    localStorage.setItem('TREE_ITEM_SIZE', JSON.stringify(TREE_ITEM_SIZE));
    localStorage.setItem(
      'DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE',
      JSON.stringify(DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE.value)
    );
  };

  const loadSettings = () => {
    TREE_EXPAND_DEFAULT_LEVEL.value = JSON.parse(
      localStorage.getItem('TREE_EXPAND_DEFAULT_LEVEL') || '0'
    );
    TREE_BAR_COLOR.value = JSON.parse(localStorage.getItem('TREE_BAR_COLOR') || '#00FFFF');
    const { STEP_SIZE, DECIMAL_PLACES, UNITS, TEXT_WHEN_TOO_BIG } = JSON.parse(
      localStorage.getItem('TREE_ITEM_SIZE') ||
        `{
      STEP_SIZE: 1024,
      DECIMAL_PLACES: 2,
      UNITS: ['B', 'KB', 'MB', 'GB', 'TB', 'PB'],
      TEXT_WHEN_TOO_BIG: 'much',
    }`
    );
    TREE_ITEM_SIZE.DECIMAL_PLACES = DECIMAL_PLACES;
    TREE_ITEM_SIZE.STEP_SIZE = STEP_SIZE;
    TREE_ITEM_SIZE.TEXT_WHEN_TOO_BIG = TEXT_WHEN_TOO_BIG;
    TREE_ITEM_SIZE.UNITS = UNITS;

    DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE.value = JSON.parse(
      localStorage.getItem('DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE') || 'false'
    );
  };

  // this has to be done regardless of the settings. otherwise this data couln't be loaded at all
  DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE.value = JSON.parse(
    localStorage.getItem('DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE') || 'false'
  );

  return {
    TREE_EXPAND_DEFAULT_LEVEL,
    TREE_ITEM_SIZE,
    TREE_BAR_COLOR,
    DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE,
    saveSettings,
    loadSettings,
  };
});
