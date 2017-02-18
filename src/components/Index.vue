<template>
  <div class="uk-container uk-container-center">
    <h1>Other Blog demo!</h1>
    <div class="post-container">
      <div class="postIndex" v-for="(post, index) in posts">
        <h1>
          <router-link :to="{ name: 'post', params: { route: cleanPath(post.path) }}">{{ post.title }}</router-link>
        </h1>
        <div class="infoContainer">
          <span class="dateIndex">
          {{ post.created }}
        </span>
          <span class="authorName">{{ post.name }}</span>
        </div>
      </div>
      <div class="loading" v-if='loading'>Loading more posts... hold on</div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-unused-vars */
let uikitcss = require('../assets/uikit-3.0.0-beta.12/css/uikit.min.css')
import { store } from '../vuex/store.js'
/* eslint-disable no-unused-vars */

export default{
  name: 'Index',
  store,
  computed: {
    posts () {
      return this.$store.state.posts
    },
    loading () {
      return this.$store.state.updating
    }
  },
  created () {
    this.$store.dispatch('getIndexPosts').then((data) => {
      this.$store.commit('setPosts', data)
    })
  },
  methods: {
    cleanPath (string) {
      return string.replace('/', '')
    }
  }
}
</script>
<style lang="css">

</style>
