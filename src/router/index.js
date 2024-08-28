import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
import ProductDetail from '../views/ProductDetails.vue';

const routes = [
  { path: '/', component: Home },
  { path: '/products/:id', component: ProductDetail, props: true }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;