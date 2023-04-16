import { useSettingsStore } from '@/stores/settingsStore';

export class UTIL {
  static calculateSize = (size: number) => {
    const settingsStore = useSettingsStore();
    if (size === 0) return '0 B';
    for (let i = 0; i < settingsStore.TREE_ITEM_SIZE.UNITS.length; i++) {
      const newSize = size / settingsStore.TREE_ITEM_SIZE.STEP_SIZE;
      if (newSize < 1) {
        if (i === 0) {
          // No decimals in bytes
          return `${size} ${settingsStore.TREE_ITEM_SIZE.UNITS[0]}`;
        }
        return `${size.toFixed(settingsStore.TREE_ITEM_SIZE.DECIMAL_PLACES)} ${
          settingsStore.TREE_ITEM_SIZE.UNITS[i]
        }`;
      }
      size = newSize;
    }
    return settingsStore.TREE_ITEM_SIZE.TEXT_WHEN_TOO_BIG;
  };
}
