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

/**
 * size in Bytes
 * shortened: will cut results into
 * 1234
 * 123.4
 * 12.45
 * 1.234
 * 0.123
 * otherwise numbers as
 * 1023.44 are possible
 */
export class UTIL {
  static calculateSize = (
    size: number,
    shortened = false
  ): { size: string; unit: UNIT; combined: string } => {
    const settingsStore = useSettingsStore();
    // Exit when size is 0
    if (size === 0) {
      return {
        size: '0',
        unit: UNIT[UNIT[0] as keyof typeof UNIT],
        combined: `0 ${UNIT[0]}`,
      };
    }

    // Default case
    for (let i = 0; i < UNIT_LENGTH; i++) {
      const newSize = size / settingsStore.TREE_ITEM_SIZE.STEP_SIZE;
      if (newSize < 1) {
        if (i === 0) {
          // No decimals in bytes
          return {
            size: String(size),
            unit: UNIT[UNIT[0] as keyof typeof UNIT],
            combined: `${size} ${UNIT[0]}`,
          };
        }

        let S: string;
        let U = UNIT[i];
        if (shortened) {
          if (size < 1) S = size.toFixed(3);
          else if (size < 10) S = size.toFixed(2);
          else if (size < 100) S = size.toFixed(1);
          else if (size < 1000) S = size.toFixed(0);
          else {
            S = newSize.toFixed(3);
            U = UNIT[i + 1];
          }
        } else {
          S = size.toFixed(settingsStore.TREE_ITEM_SIZE.DECIMAL_PLACES);
        }
        return {
          size: S,
          unit: UNIT[U as keyof typeof UNIT],
          combined: `${S} ${U}`,
        };
      }
      size = newSize;
    }

    // When not exited in loop -> too big
    return {
      size: settingsStore.TREE_ITEM_SIZE.TEXT_WHEN_TOO_BIG,
      unit: UNIT[UNIT[0] as keyof typeof UNIT],
      combined: `${settingsStore.TREE_ITEM_SIZE.TEXT_WHEN_TOO_BIG} ${UNIT[0]}`,
    };
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
