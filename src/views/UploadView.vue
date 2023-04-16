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
  <el-divider />
  <el-card>
    <el-checkbox v-model="settingsStore.DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE">
      DEBUG: Save and restore uploaded data automatically
    </el-checkbox>
    <br />
    <el-button @click="settingsStore.saveSettings()">Save Settings</el-button>
    <el-button @click="settingsStore.loadSettings()">Load Settings</el-button>
    <br /><br />
    <el-button @click="loadDatasetFromStorage">Load Dataset from storage</el-button>
  </el-card>
</template>

<script setup lang="ts">
import { UploadFilled } from '@element-plus/icons-vue';
import { ReportFileParser } from '@/services/ReportFileParser';
import { useTreeStore } from '@/stores/treeStore';
import { useSettingsStore } from '@/stores/settingsStore';

const treeStore = useTreeStore();
const settingsStore = useSettingsStore();

const loadDatasetFromStorage = () => {
  const DATA = localStorage.getItem('DATA');
  if (!DATA) return;
  treeStore.reportFile = ReportFileParser.parse(DATA, 'from storage');
};

const upload = (file: any) => {
  //console.log(file);
  const { name, raw } = file;
  const FR = new FileReader();
  FR.onload = (e) => {
    const str = e?.target?.result?.toString();
    if (!str) return;
    treeStore.reportFile = ReportFileParser.parse(str, name);
    if (settingsStore.DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE) {
      localStorage.setItem('DATA', str);
    }
  };

  FR.readAsText(raw);
};

if (settingsStore.DEBUG_SAVE_UPLOADED_DATA_IN_LOCAL_STORAGE) {
  settingsStore.loadSettings();
  loadDatasetFromStorage();
}
</script>
