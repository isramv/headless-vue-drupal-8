<template>
  <div>
    <div v-if="post.attributes">
      <div v-bind:style="{ 'background-image': 'url(' + addUrl(post.heroImage) + ')' }">
        <h1>{{ post.attributes.title }}</h1>
      </div>
      <p v-html="post.attributes.body.value"></p>
    </div>
	</div>
</template>

<style lang="css">
  code {
    background-color: inherit !important;
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