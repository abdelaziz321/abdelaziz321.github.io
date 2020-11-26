import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

export default new VueRouter({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/Home/Index.vue')
    },
    {
      path: '/blog',
      name: 'blog',
      component: () => import('./views/Blog/Index.vue')
    },
    {
      path: '/blog/:post',
      name: 'post',
      component: () => import('./views/Post/Index.vue')
    }
  ]
})
