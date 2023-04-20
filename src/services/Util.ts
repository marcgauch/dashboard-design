import { ItemTypeIcon } from '@/models/models';
import { useSettingsStore } from '@/stores/settingsStore';

export enum UNIT {
  B,
  KB,
  MB,
  GB,
  TB,
}
// keep this in sync with the amount of entries in UNTIS
const UNIT_LENGTH = 5;

export class UTIL {
  static calculateSize = (size: number) => {
    console.log(this.convertSize(1, UNIT.MB, UNIT.B));
    const settingsStore = useSettingsStore();
    if (size === 0) return '0 B';
    for (let i = 0; i < UNIT_LENGTH; i++) {
      const newSize = size / settingsStore.TREE_ITEM_SIZE.STEP_SIZE;
      if (newSize < 1) {
        if (i === 0) {
          // No decimals in bytes
          return `${size} ${UNIT[0]}`;
        }
        return `${size.toFixed(settingsStore.TREE_ITEM_SIZE.DECIMAL_PLACES)} ${UNIT[i]}`;
      }
      size = newSize;
    }
    return settingsStore.TREE_ITEM_SIZE.TEXT_WHEN_TOO_BIG;
  };

  static convertSize = (size: number, startUnit: UNIT, endUnit: UNIT) => {
    if (startUnit === endUnit) return size;
    const settingsStore = useSettingsStore();
    const factor = settingsStore.TREE_ITEM_SIZE.STEP_SIZE;
    if (startUnit === UNIT.B) {
      if (endUnit === UNIT.KB) return size / factor;
      if (endUnit === UNIT.MB) return size / factor / factor;
      if (endUnit === UNIT.GB) return size / factor / factor / factor;
      if (endUnit === UNIT.TB) return size / factor / factor / factor / factor;
    }
    if (startUnit === UNIT.KB) {
      if (endUnit === UNIT.B) return size * factor;
      if (endUnit === UNIT.MB) return size / factor;
      if (endUnit === UNIT.GB) return size / factor / factor;
      if (endUnit === UNIT.TB) return size / factor / factor / factor;
    }
    if (startUnit === UNIT.MB) {
      if (endUnit === UNIT.B) return size * factor * factor;
      if (endUnit === UNIT.KB) return size * factor;
      if (endUnit === UNIT.GB) return size / factor;
      if (endUnit === UNIT.TB) return size / factor / factor;
    }
    if (startUnit === UNIT.GB) {
      if (endUnit === UNIT.B) return size * factor * factor * factor;
      if (endUnit === UNIT.KB) return size * factor * factor;
      if (endUnit === UNIT.MB) return size * factor;
      if (endUnit === UNIT.TB) return size / factor;
    }
    if (startUnit === UNIT.TB) {
      if (endUnit === UNIT.B) return size * factor * factor * factor * factor;
      if (endUnit === UNIT.KB) return size * factor * factor * factor;
      if (endUnit === UNIT.MB) return size * factor * factor;
      if (endUnit === UNIT.GB) return size * factor;
    }
    throw `UTIL.convertSize(${size}, UNIT.${UNIT[startUnit]}, UNIT.${UNIT[endUnit]}) threw this error`;
  };
  public static getColor(icon: ItemTypeIcon) {
    //IMPORTANT: Keep this in sync with @/styles/indes.scss/:root
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
