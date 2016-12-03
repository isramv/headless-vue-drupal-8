import Vue from 'vue'
import VueRouter from 'vue-router'
import Index from '../components/Index.vue'
import Post from '../components/Post.vue'

Vue.use(VueRouter)

const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    return savedPosition
  } else {
    const position = {}
    if (to.hash) {
      position.selector = to.hash
    }
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0
      position.y = 0
    }
    return position
  }
}

const routes = [
  {
    name: 'index',
    path: '/',
    component: Index,
    meta: { scrollToTop: false }
  },
  {
    name: 'post',
    path: '/blog/:route_name',
    component: Post,
    meta: { scrollToTop: true }
  }
]

const router = new VueRouter({
  mode: 'history',
  routes,
  scrollBehavior
})

export default router
