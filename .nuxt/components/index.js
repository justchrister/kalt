export { default as Kaltmenu } from '../../components/kaltmenu.vue'
export { default as Transactionhistory } from '../../components/transactionhistory.vue'
export { default as ChartsBarChart } from '../../components/Charts/BarChart.js'
export { default as ChartsLineChart } from '../../components/Charts/LineChart.js'
export { default as ChartsConfig } from '../../components/Charts/config.js'
export { default as ChartsUtils } from '../../components/Charts/utils.js'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
