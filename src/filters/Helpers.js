import Vue from 'vue'
import striptags from 'striptags'

/* eslint-disable no-unused-vars */
const excerptFilter = Vue.filter('excerpt-filter', (value) => {
  // clean the value.
  let firstClean = striptags(value, '<p>')
  // extract first paragraph.
  let rx = new RegExp(/<p>.+<\/p>/, 'i')
  let result = firstClean.match(rx)
  let secondClean = result.length > 0 ? result[0] : value
  let rx2 = new RegExp(/&([a-z]{2,4});/, 'ig')
  return secondClean.replace(rx2, '').replace('<p>', '').replace('</p>', '...')
})
/* eslint-disable no-unused-vars */
export { excerptFilter }
