import { nextTick, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Directory, File, ItemTypeIcon } from '@/models/models';
import { ItemType } from '@/models/models';

export enum ChangeType {
  NOTHING,
  DIRECTORY,
  ITEM_FILTER,
}

export const useAnalyzeStore = defineStore('analyze', () => {
  const directoryPath = ref('/');
  const analyzeDirectory = ref({} as Directory);
  const isCalculating = ref(false);
  const isCalculatingDEBUG = ref(false);
  const filesSortedBySize = ref([] as File[]);
  const disabledItemTypes = ref([] as ItemTypeIcon[]);
  const directories = ref([] as Directory[]);
  const directoryNames = ref([] as { name: string; value: number }[]);
  const changeType = ref(ChangeType.NOTHING);

  const setDirectory = async (directory: Directory) => {
    isCalculating.value = true;
    setTimeout(() => {
      analyzeDirectory.value = directory;
      directoryPath.value = directory.fullPath;
      console.log(directory.fullPath.toString());
      console.log(directory);
      const dirNames = {} as { [key: string]: number };
      filesSortedBySize.value = sortFilesBySize(directory, disabledItemTypes.value);
      directories.value = getAllDirectoriesRecursive(directory, dirNames);
      // update directoryNames. currently dirNames is an object make it an array but only with the top 10.
      const entries = Object.entries(dirNames).sort((a, b) => b[1] - a[1]);
      directoryNames.value = entries.slice(0, 10).map(([name, value]) => ({ name, value }));

      console.log(directoryNames.value);
      changeType.value = ChangeType.DIRECTORY;
      isCalculating.value = false;
    }, 15);
  };

  const addDisabledItemType = (type: ItemTypeIcon) => {
    const tmp = disabledItemTypes.value.filter((e) => e !== type);
    tmp.push(type);
    disabledItemTypes.value = tmp;
    filesSortedBySize.value = sortFilesBySize(analyzeDirectory.value, disabledItemTypes.value);
    changeType.value = ChangeType.ITEM_FILTER;
  };

  const removeDisabledItemType = (type: ItemTypeIcon) => {
    disabledItemTypes.value = disabledItemTypes.value.filter((e) => e !== type);
    filesSortedBySize.value = sortFilesBySize(analyzeDirectory.value, disabledItemTypes.value);
    changeType.value = ChangeType.ITEM_FILTER;
  };

  return {
    addDisabledItemType,
    analyzeDirectory,
    changeType,
    directories,
    directoryNames,
    directoryPath,
    disabledItemTypes,
    filesSortedBySize,
    isCalculating,
    isCalculatingDEBUG,
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

const getAllDirectoriesRecursive = (
  rootDirectory: Directory,
  directoryNames: { [key: string]: number }
) => {
  const outputArray = [] as Directory[];
  const inner = (
    rootDirectory: Directory,
    outputArray: Directory[],
    directoryNames: { [key: string]: number }
  ) => {
    // fill directoryNames
    const { name } = rootDirectory;
    directoryNames[name] = ~~directoryNames[name] + 1;

    // continue with gathering directories
    rootDirectory.contents?.forEach((e) => {
      if (e.isDirectory) {
        const E = e as Directory;
        outputArray.push(E);
        inner(E, outputArray, directoryNames);
      }
    });
  };
  inner(rootDirectory, outputArray, directoryNames);
  return outputArray;
};
