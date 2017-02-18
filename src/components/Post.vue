<template>
  <div>
    <div v-if="post.attributes">
      <div class="uk-cover-container uk-height-medium" v-if="post.heroImage">
        <img v-bind:src="addUrl(post.heroImage)" alt="" uk-cover>
      </div>
    </div>
    <h1 class="uk-heading-line uk-text-center">{{ post.attributes.title }}</h1>
    <div class="uk-container">
      <div class="uk-grid">
        <p v-html="post.attributes.body.value"></p>
      </div>
    </div>
  </div>
</template>

<style lang="css">
  code {
    background-color: inherit !important;
  }
  .header {
    min-height: 400px;
    background-size: cover;
  }
</style>

<script>
  /* eslint-disable no-unused-vars */
  import axios from 'axios'
  import { store } from '../vuex/store.js'
  import _ from 'lodash'

  export default{
    name: 'Post',
    store: store,
    beforeRouteEnter (to, from, next) {
      if (to.name === 'post') {
        store.dispatch('getSinglePost', to.params.route).then(data => {
          let imageIsUndefined = _.isUndefined(data.data.data.relationships.field_image.links)
          if (!imageIsUndefined) {
            let relatedLink = data.data.data.relationships.field_image.links.related
            store.dispatch('getRelatedImage', relatedLink).then(data => {
              next()
            })
          } else {
            next()
          }
        })
      }
    },
    computed: {
      post () {
        return this.$store.state.post
      }
    },
    methods: {
      addUrl (data) {
        return `http://drupalvm.dev${data}`
      }
    }
  }
</script>