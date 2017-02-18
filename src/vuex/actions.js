import axios from 'axios'

const actions = {
  getIndexPosts (context) {
    return new Promise((resolve, reject) => {
      axios.get('//drupalvm.dev/api/posts.json')
      .then(response => {
        context.commit('setPostsIndex', response.data)
        /* eslint-disable no-undef */
        resolve(response.data)
      }).catch(data => {
        reject(data)
      })
    })
  },
  getSinglePost (context, path) {
    // get the UUID from drupal.
    return new Promise((resolve, reject) => {
      axios.get('//drupalvm.dev/pathapi/routes?route=' + path)
        .then(data => {
          context.commit('setPost', data.data.data)
          resolve(data)
        }).catch(e => {
          reject(e)
        })
    })
  },
  getRelatedImage (context, imageUrl) {
    return new Promise((resolve, reject) => {
      axios.get(imageUrl).then(data => {
        let imageFile = data.data.data.attributes.url
        context.commit('setHeroImage', imageFile)
        resolve(imageFile)
      }).catch(e => {
        reject(e)
      })
    })
  }
}

export default actions
