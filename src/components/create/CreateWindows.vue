<template>
  <div>
    Please save the following code as <el-link type="primary" @click="download">tree.ps1</el-link>.
    <CopyText :text="powershellCode"></CopyText>
  </div>

  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>Powershell Code</span>
        <el-button class="button" text @click="copyCode" :disabled="copySuccess">{{
          copyButtonLabel
        }}</el-button>
      </div>
    </template>
    <pre>{{ powershellCode }}</pre>
  </el-card>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import CopyText from './CopyText.vue';
const powershellCode = `
function Create-Tree {
    param([string]$path)

    $root = New-Object -TypeName PSObject    
    $root | Add-Member -MemberType NoteProperty -Name "type" -Value "directory"
    $root | Add-Member -MemberType NoteProperty -Name "name" -Value $path.Replace("\", "/")
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

    $result = @()

    $items = Get-ChildItem $Path
    foreach ($item in $items) {
        $type = if ($item.PSIsContainer) { 'directory' } else { 'file' }

        $obj = @{
            'type' = $type
            'name' = $item.Name
            'size' = $item.Length
        }

        if ($type -eq 'directory') {
            $contents = Get-DirectoryTree $item.FullName
            if ($contents.length -gt 0){
                $obj['contents'] = Get-DirectoryTree $item.FullName
            }
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
`;

const copySuccess = ref(false);
const copyButtonLabel = ref('Copy Me!');

const copyCode = () => {
  navigator.clipboard.writeText(powershellCode);
  copySuccess.value = true;
  copyButtonLabel.value = 'Done';
};

const download = () => {
  // https://stackoverflow.com/questions/19721439/download-json-object-as-a-file-from-browser/30800715#30800715
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(powershellCode);
  const downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute('href', dataStr);
  downloadAnchorNode.setAttribute('download', 'tree.ps1');
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
  downloadAnchorNode.remove();
};
</script>

<style scoped></style>
