<template>
  <el-upload drag :autoUpload="false" action="#" :showFileList="false" @change="upload">
    <el-icon class="el-icon--upload"><upload-filled /></el-icon>
    <div class="el-upload__text">Drop file here or <em>click to upload</em></div>
    <template #tip>
      <div class="el-upload__tip">
        JSON File generated in Step &laquo;<router-link to="/create/windows"
          >Create Dataset</router-link
        >&raquo;
      </div>
    </template>
  </el-upload>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { ReportFileParser } from '@/services/ReportFileParser';

const upload = (file: any) => {
  //console.log(file);
  const { name, raw } = file;
  const FR = new FileReader();
  FR.onload = (e) => {
    const str = e?.target?.result?.toString();
    if (!str) return;
    console.dir(ReportFileParser.parse(str, name));
  };

  FR.readAsText(raw);
};
</script>
