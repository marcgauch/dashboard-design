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
  <el-alert
    title="Privacy Notice"
    description="We respect your privacy. All uploaded data will not leave your browser. Our server will not see your data nor do we spy on how you use our tool."
    type="info"
    show-icon
    :closable="false"
    style="margin-top: 1rem; margin-bottom: 1rem"
  />
  Or use our <el-button @click="useDemoData" type="primary">Demo Data</el-button>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { ReportFileParser } from '@/services/ReportFileParser';
import { useTreeStore } from '@/stores/treeStore';
import { ElNotification } from 'element-plus';
import DEMODATA from '@/services/demodata';

const treeStore = useTreeStore();

const useDemoData = () => {
  treeStore.reportFile = ReportFileParser.parse(JSON.stringify(DEMODATA), 'Demodata.json');
  showUploadedNotification();
};

const upload = (file: any) => {
  const { name, raw } = file;
  const FR = new FileReader();
  FR.onload = (e) => {
    const str = e?.target?.result?.toString();
    if (!str) return;
    treeStore.reportFile = ReportFileParser.parse(str, name);
    showUploadedNotification();
  };

  FR.readAsText(raw);
};

const showUploadedNotification = () => {
  ElNotification({
    title: 'Data Uploaded',
    message: 'Switch to the Analyze tab to explore your data',
    type: 'success',
  });
};
</script>
