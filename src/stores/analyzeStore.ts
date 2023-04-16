import { computed, ref } from 'vue';
import { defineStore } from 'pinia';
import type { Directory, File } from '@/models/models';
import { ItemType } from '@/models/models';

export const useAnalyzeStore = defineStore('analyze', () => {
  const setDirectory = (directory: Directory) => {
    isCalculating.value = true;
    console.log(directory);
    filesSortedBySize.value = sortFilesBySize(directory);
    isCalculating.value = false;
  };
  const isCalculating = ref(false);
  const filesSortedBySize = ref([] as File[]);
  return { setDirectory, filesSortedBySize, isCalculating };
});

// UTIL

const sortFilesBySize = (rootDirectory: Directory) => {
  let files = [] as File[];
  getAllFilesRecursive(rootDirectory, files);
  files.sort((a, b) => b.size - a.size);
  return files;
};

const getAllFilesRecursive = (rootDirectory: Directory, ouputArray: File[]) => {
  rootDirectory.contents.forEach((e) => {
    if (e.type === ItemType.FILE) {
      ouputArray.push(e);
    } else if (e.type === ItemType.DIRECTORY) {
      getAllFilesRecursive(e as Directory, ouputArray);
    }
  });
};
