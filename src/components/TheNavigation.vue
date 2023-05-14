<template>
  <el-menu
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
    router
    default-active="/upload"
  >
    <el-sub-menu index="">
      <template #title>Create Dataset</template>
      <el-menu-item index="/create/windows">Windows</el-menu-item>
      <el-menu-item index="/create/mac">Mac</el-menu-item>
      <el-menu-item index="/create/linux">Linux</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/upload">Upload</el-menu-item>
    <el-menu-item index="/analyze">Analyze</el-menu-item>
  </el-menu>
</template>
