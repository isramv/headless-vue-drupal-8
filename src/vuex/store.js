import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    posts: {},
    post: {}
  },
  mutations: {
    setPosts (state, posts) {
      state.posts = posts
    },
    setPost (state, post) {
      state.post = post
    }
  }
})

export { store }
