<template>
  <el-tabs type="border-card" v-model="selectedTab" @tab-click="updateTab">
    <el-tab-pane label="Windows" name="windows"><el-text tag="i">
 
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Powershell Code</span>
        <el-button class="button" text>Copy Me!</el-button>
      </div>
    </template>
    <pre>      
    function Get-DirectoryTree {
    param([string]$Path)

    $items = Get-ChildItem $Path -Recurse

    $result = @()

    foreach ($item in $items) {
        $type = if ($item.PSIsContainer) { 'directory' } else { 'file' }
        $name = $item.Name
        $size = $item.Length

        $obj = @{
            'type' = $type
            'name' = $name
            'size' = $size
            'fileType' = $fileType
        }

        if ($type -eq 'directory') {
            $contents = Get-DirectoryTree $item.FullName
            $obj['contents'] = $contents
        }

        $result += $obj
    }

    return $result
  }

  $tree = Get-DirectoryTree 'PATH TO DIRECTORY THAT WILL BE SCANNED'
  $tree | ConvertTo-Json -Depth 100 | Out-File 'PATH WHERE THE JSON DATA WILL BE SAVED\tree.json'

</pre>
  </el-card>





    
    </el-text>

  </el-tab-pane>
    <el-tab-pane label="Mac" name="mac"><el-text tag="i">todo</el-text></el-tab-pane>
    <el-tab-pane label="Linux" name="linux">
      <el-text tag="i">tree -a -J -R -s ~/ownCloud/ > ~/tree.json</el-text>
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from 'element-plus';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const allowedRoutes = ['windows', 'mac', 'linux'];

const initalRoute = route.params.os.toString();
const selectedTab = ref(allowedRoutes.includes(initalRoute) ? initalRoute : 'windows');

watch(
  () => route.params.os,
  (newOs) => {
    if (Array.isArray(newOs)) {
      newOs = newOs[0];
    }
    selectedTab.value = allowedRoutes.includes(newOs) ? newOs : 'windows';
  }
);

const updateTab = ({ paneName }: TabsPaneContext) => {
  router.replace({ path: `/create/${paneName}` });
};
</script>

<!-- Added because of the element website. will remove-->
<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: auto;
}
</style>