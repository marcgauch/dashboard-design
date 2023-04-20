import { ItemTypeIcon } from '@/models/models';
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
  public static getColor(icon: ItemTypeIcon) {
    switch (icon) {
      case ItemTypeIcon.ARCHIVE:
        return '#9AE3B7';
      case ItemTypeIcon.BINARY:
        return '#E6CDA3';
      case ItemTypeIcon.DISK_IMAGE:
        return '#F2EAC4';
      case ItemTypeIcon.DOCUMENT:
        return '#F0A8A8';
      case ItemTypeIcon.MUSIC:
        return '#EAB0E3';
      case ItemTypeIcon.PICTURE:
        return '#95DBDA';
      case ItemTypeIcon.VIDEO:
        return '#9BAADD';
      default:
        return '#F0EFE6';
      // from https://www.pastelcolorpalettes.com/beautiful-pastel-colors
      // RESERVE with 8 colorshttps://www.pastelcolorpalettes.com/8-color-pastels-rainbow:
    }
  }
}
