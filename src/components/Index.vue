<template>
    <div>
        <h1> Blog</h1>
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
// import axios from 'axios'
import { store } from '../vuex/store.js'
// import _ from 'lodash'
/* eslint-disable no-unused-vars */
import { excerptFilter } from '../filters/Filters.js'

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
  // directives: {
  //   Infinite () {
  //     console.log('infinite')
  //   }
  // },
  // created () {
  //   window.addEventListener('scroll', _.throttle((event) => {
  //     if (this.$store.state.updating === false && this.$route.name === 'index') {
  //       if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
  //         console.log('we should load more posts....')
  //         this.$store.dispatch('getMorePosts').then(console.log('loading finished...'))
  //       }
  //     }
  //   }, 500, { 'leading': false, 'trailing': true }))
  methods: {
    cleanPath (string) {
      return string.replace('/', '')
    }
  }
}
</script>
<style lang="css">
  .authorPictureIndex img {
    max-width: 100px;
    height: auto;
  }
  .loading {
    width: 100%;
    text-align: center;
    font-size: 25px;
    font-weight: bold;
    padding: 40px;
    position: fixed;
    bottom: 40px;
    margin: 0 auto 40px;
    background: rgba(78, 255, 131, 0.2);
  }
</style>
