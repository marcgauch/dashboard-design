import { createRouter, createWebHistory } from 'vue-router';
import CreateView from '@/views/CreateView.vue';
import UploadView from '@/views/UploadView.vue';
import AnalyzeView from '@/views/AnalyzeView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { path: '/upload' },
    },
    {
      path: '/create/:os',
      name: 'create',
      component: CreateView,
    },
    {
      path: '/upload',
      name: 'upload',
      component: UploadView,
    },
    {
      path: '/analyze',
      name: 'analyze',
      component: AnalyzeView,
    },
  ],
});

export default router;
