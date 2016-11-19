import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Post from '../components/Post.vue'

Vue.use(VueRouter)

const routes = [
  {
    name: 'index',
    path: '/',
    component: Index
  },
  {
    name: 'post',
    path: '/blog/:post_name',
    component: Post
  }
]

const router = new VueRouter({
  routes
})

export default router
