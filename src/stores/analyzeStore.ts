import { ref } from 'vue';
import { defineStore } from 'pinia';
import type { Directory, File, ItemTypeIcon } from '@/models/models';
import { ItemType } from '@/models/models';

export const useAnalyzeStore = defineStore('analyze', () => {
  const directoryPath = ref('/');
  const analyzeDirectory = ref({} as Directory);
  const isCalculating = ref(false);
  const filesSortedBySize = ref([] as File[]);
  const disabledItemTypes = ref([] as ItemTypeIcon[]);
  const directories = ref([] as Directory[]);

  const setDirectory = (directory: Directory) => {
    isCalculating.value = true;
    analyzeDirectory.value = directory;
    directoryPath.value = directory.fullPath;
    console.log(directory.fullPath.toString());
    console.log(directory);
    filesSortedBySize.value = sortFilesBySize(directory, disabledItemTypes.value);
    directories.value = getAllDirectoriesRecursive(directory);
    isCalculating.value = false;
  };

  const addDisabledItemType = (type: ItemTypeIcon) => {
    const tmp = disabledItemTypes.value.filter((e) => e !== type);
    tmp.push(type);
    disabledItemTypes.value = tmp;
    filesSortedBySize.value = sortFilesBySize(analyzeDirectory.value, disabledItemTypes.value);
  };

  const removeDisabledItemType = (type: ItemTypeIcon) => {
    disabledItemTypes.value = disabledItemTypes.value.filter((e) => e !== type);
    filesSortedBySize.value = sortFilesBySize(analyzeDirectory.value, disabledItemTypes.value);
  };

  return {
    addDisabledItemType,
    directories,
    directoryPath,
    disabledItemTypes,
    filesSortedBySize,
    isCalculating,
    removeDisabledItemType,
    setDirectory,
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
  rootDirectory.contents?.forEach((e) => {
    if (e.isDirectory) {
      getAllFilesRecursive(e as Directory, ouputArray, ignoredTypes);
    } else if (e.type === ItemType.FILE && !ignoredTypes.includes(e.icon)) {
      ouputArray.push(e);
    }
  });
};

const getAllDirectoriesRecursive = (rootDirectory: Directory) => {
  const outputArray = [] as Directory[];
  const inner = (rootDirectory: Directory, outputArray: Directory[]) => {
    rootDirectory.contents?.forEach((e) => {
      if (e.isDirectory) {
        const E = e as Directory;
        outputArray.push(E);
        inner(E, outputArray);
      }
    });
  };
  inner(rootDirectory, outputArray);
  return outputArray;
};
