import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Directory, File, ItemTypeIcon } from '@/models/models';
import { ItemType } from '@/models/models';

export const useAnalyzeStore = defineStore('analyze', () => {
  const directoryPath = ref('/');
  const isCalculating = ref(false);
  const filesSortedBySize = ref([] as File[]);
  const disabledItemTypes = ref([] as ItemTypeIcon[]);

  const setDirectory = (directory: Directory) => {
    isCalculating.value = true;
    directoryPath.value = directory.fullPath;
    console.log(directory.fullPath.toString());
    console.log(directory);
    filesSortedBySize.value = sortFilesBySize(directory, disabledItemTypes.value);
    isCalculating.value = false;
  };

  const addDisabledItemType = (type: ItemTypeIcon) => {
    const tmp = disabledItemTypes.value.filter((e) => e !== type);
    tmp.push(type);
    disabledItemTypes.value = tmp;
  };

  const removeDisabledItemType = (type: ItemTypeIcon) => {
    disabledItemTypes.value = disabledItemTypes.value.filter((e) => e !== type);
  };

  return {
    directoryPath,
    filesSortedBySize,
    isCalculating,
    setDirectory,
    addDisabledItemType,
    removeDisabledItemType,
  };
});

// UTIL

const sortFilesBySize = (rootDirectory: Directory, ignoredTypes: ItemTypeIcon[]) => {
  const files = [] as File[];
  getAllFilesRecursive(rootDirectory, files, ignoredTypes);
  files.sort((a, b) => b.size - a.size);
  return files;
};

const getAllFilesRecursive = (
  rootDirectory: Directory,
  ouputArray: File[],
  ignoredTypes: ItemTypeIcon[]
) => {
  rootDirectory.contents.forEach((e) => {
    if (e.type === ItemType.DIRECTORY) {
      getAllFilesRecursive(e as Directory, ouputArray, ignoredTypes);
    } else if (e.type === ItemType.FILE && !ignoredTypes.includes(e.icon)) {
      ouputArray.push(e);
    }
  });
};
