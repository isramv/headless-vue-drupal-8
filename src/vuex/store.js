import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    posts: {},
    post: {},
    updating: false
  },
  mutations: {
    setPosts (state, posts) {
      state.posts = posts
    },
    setPost (state, post) {
      state.post = post
    },
    addItemToPosts (state, post) {
      state.posts.push(post)
    },
    setUpdating (state, value) {
      state.updating = value
    }
  },
  actions,
  getters
})

export { store }
