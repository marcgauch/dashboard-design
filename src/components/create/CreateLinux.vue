<template>
  <div>
    Open a new Terminal.<br />
    Install the
    <el-link href="http://mama.indstate.edu/users/ice/tree/" target="_blank">tree</el-link> command
    first
    <CopyText :text="setupCode"></CopyText>
    Then in the same terminal run the following command:
    <CopyText :text="treeCode"></CopyText>
    This will create a tree.json file in your home folder. Feel free to change the previous line to
    change which directory should be analyzed. You can change the directory when changig
    <el-text tag="mark">~ &gt;</el-text> to
    <el-text tag="mark">/whatever/you/like &gt;</el-text>
  </div>
</template>

<script setup lang="ts">
import CopyText from './CopyText.vue';
const setupCode = `sudo apt update && sudo apt install -y tree`;
const treeCode = `tree -a -J -R -s ~ > ~/tree.json`;
</script>

<style scoped></style>
