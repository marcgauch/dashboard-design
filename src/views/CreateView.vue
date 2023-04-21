<template>
  <el-tabs type="border-card" v-model="selectedTab" @tab-click="updateTab">
    <el-tab-pane label="Windows" name="windows"
      ><el-text tag="i">
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <span>Powershell Code</span>
              <el-button class="button">Memememe</el-button>
              <el-button class="button" text @click="copyCode" :disabled="copySuccess">{{
                copyButtonLabel
              }}</el-button>
            </div>
          </template>
          <pre>
            function Create-Tree {
    param([string]$path)

    $root = New-Object -TypeName PSObject    
    $root | Add-Member -MemberType NoteProperty -Name "type" -Value "directory"
    $root | Add-Member -MemberType NoteProperty -Name "name" -Value $path
    $root | Add-Member -MemberType NoteProperty -Name "size" -Value (Get-Item $path).Length
    $root | Add-Member -MemberType NoteProperty -Name "contents" -Value (Get-DirectoryTree $path)

    $report = New-Object -TypeName PSObject
    $report | Add-Member -MemberType NoteProperty -Name "type" -Value "report"
    $report | Add-Member -MemberType NoteProperty -Name "directories" -Value 69
    $report | Add-Member -MemberType NoteProperty -Name "files" -Value 420

    return @($root, $report)
}


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
        }

        if ($type -eq 'directory') {
            $contents = Get-DirectoryTree $item.FullName
            $obj['contents'] = $contents
        }

        $result += $obj
    }

    return $result
  }

  function Do-Everything {
    param(
    [Parameter(mandatory=$true)]
    [string]$analyzePath,
    [Parameter(mandatory=$true)]
    [string]$reportFile
    )
    
    $tree = Create-Tree -path $analyzePath
    $tree | ConvertTo-Json -Depth 100 | Out-File "$reportFile" -Encoding utf8
  }

Do-Everything


</pre
          >
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
//added line 62 for button logic
import { defineComponent } from 'vue';

import type { TabsPaneContext } from 'element-plus';
import { method } from 'lodash';
import { ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const allowedRoutes = ['windows', 'mac', 'linux'];

const initalRoute = route.params.os.toString();
const selectedTab = ref(allowedRoutes.includes(initalRoute) ? initalRoute : 'windows');

//added lines 78 - 108

export default defineComponent({
  data() {
    return {
      copySuccess: false,
      copyButtonLabel: 'Copy Me!',
    };
  },

  methods: {
    copyCode() {
      // Select the code inside the <pre> tag
      const codeElement = this.$el.querySelector('pre');
      const selection = window.getSelection();
      const range = document.createRange();
      range.selectNodeContents(codeElement);
      selection.removeAllRanges();
      selection.addRange(range);

      // Copy the selected code to the clipboard
      const copySuccess = document.execCommand('copy');

      // Update the button label and log to the console
      if (copySuccess) {
        this.copySuccess = true;
        this.copyButtonLabel = 'Done';
        console.log('Code copied');
      }
    },
  },
});

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
