import Vue from 'vue'
import Vuex from 'vuex'
import actions from './actions.js'
import getters from './getters.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    posts: {},
    post: {
      heroImage: ''
    },
    updating: false
  },
  mutations: {
    setPostsIndex (state, posts) {
      state.postsIndex = posts
    },
    setHeroImage (state, heroImageString) {
      state.post.heroImage = heroImageString
    },
    setPosts (state, posts) {
      state.posts = posts
    },
    setPost (state, post) {
      state.post = post
    },
    setUpdating (state, value) {
      state.updating = value
    }
  },
  actions,
  getters
})

export { store }
