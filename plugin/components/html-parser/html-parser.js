import parse from '../../api/index.js'
import template from '../template/template.js'

Component({
  properties: {
    richText: {
      type: String,
      value: ''
    },
    imageShowMenuByLongpress: {
      type: Boolean,
      value: false
    },
    imageLazyLoad: {
      type: Boolean,
      value: false
    },
    imagePreview: {
      type: Boolean,
      value: true
    },
    imageWebp: {
      type: Boolean,
      value: false
    }
  },

  observers: {
    'richText': function (richText) {
      let parsedData = parse(richText)
      this.setData({
        richTextNode: parsedData.nodes.map(item => {
          item = this.parseImg(item)
          return item
        })
      })
      template.init.call(this, { imgUrls: parsedData.imageUrls })
    }
  },

  options: {
    styleIsolation: 'apply-shared',
  },

  data: {
    richTextNode: '',
  },

  lifetimes: {
    attached: function () {
      this.triggerEvent('attached')
    },

    ready: function () {
      this.triggerEvent('ready')
    },

    detached: function () {
      this.triggerEvent('detached')
    }
  },
  methods: {
    parseImg(node) {
      if (node.tag === 'img') {
        node.imageLazyLoad = this.properties.imageLazyLoad
        node.imageShowMenuByLongpress = this.properties.imageShowMenuByLongpress
        node.imageWebp = this.properties.imageWebp
      } else if (node.nodes && node.nodes.length) {
        node.nodes = node.nodes.map(item => {
          item = this.parseImg(item)
          return item
        })
      }
      return node
    }
  }
})
