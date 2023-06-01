<template>
  <div>
    <h2> Creating your own json file:</h2>
    <p>You can utilize the Data Visualization and Analysis tool by importing your own JSON file. It is important to keep in mind that the content of the JSON file should only consist of file names, file types, and file sizes. Make sure to <b> exclude any personal information </b>  from the file names, such as birthdates, phone numbers, passport numbers, and similar sensitive data.</p> 
   
   <h2> Locate and open Powershell ISE</h2>
   <p>Use the integrated search bar from windows and type in Powershell. Multiple options will be available. Choose Windows PowerShell ISE and open it in administrator mode.</p>
   <P> The interface is spit into two sides: an editor side (<font style="color:darkgrey;">background white</font>) and the command line side (<font style="color: blue;">blue background</font>). </P>

    Please save the following code as <el-link type="primary" @click="download">tree.ps1</el-link>.
    <CopyText :text="powershellCode"></CopyText>
   
   <p> Drag and drop the downloaded poweshell file in the PowerShell ISE, on the editor side and press the play button (<font style="color: #0A8A0A;">green button</font>) from the available action buttons at the top of the UI. </p> 
   Now you need to define the folder you want to scan. This is defined in the analyese Path. Just copy and paste the target path (for example C:\Users\*YOUR USER NAME*\Downloads\) and press enter

   <P> Next you have to define the target path were your JSON will be written (for example C:\Users\*YOUR USER NAME*\Downloads\json.json
 ). If your target folder is large, it will take a long time for the JSON to gemerate (so be patient if you choose a folder that is larger than 3 GB)  </P>
    <pre>
      Do-Everything -analyzePath &lt;D:\irectory\to\analyze&gt; -reportFile &lt;P:\ath\to\tree.json&gt;
    </pre>
  </div>
</template>

<script setup lang="ts">
import CopyText from './CopyText.vue';
const powershellCode = `
function Create-Tree {
    param([string]$path)

    $root = New-Object -TypeName PSObject    
    $root | Add-Member -MemberType NoteProperty -Name "type" -Value "directory"
    $root | Add-Member -MemberType NoteProperty -Name "name" -Value $path.Replace("\\", "/")
    $root | Add-Member -MemberType NoteProperty -Name "size" -Valu e (Get-Item $path).Length
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
