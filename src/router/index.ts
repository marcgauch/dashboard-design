import { createRouter, createWebHistory } from 'vue-router';
import CreateView from '@/views/CreateView.vue';
import UploadView from '@/views/UploadView.vue';
import AnalyzeView from '@/views/AnalyzeView.vue';
import { useTreeStore } from '@/stores/treeStore';

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
router.beforeEach((to) => {
  const treeStore = useTreeStore();
  if (to.name === 'analyze' && treeStore.isEmpty) {
    return { name: 'upload' };
  }
});

export default router;
