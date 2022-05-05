import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import upperFirst from 'lodash.upperfirst'
import camelCase from 'lodash/camelCase'

const requireComponent = require.context(
  './components/base',
  false,
  /Base.*\.(vue|js)/
)

loadFonts()

const app = createApp(App)

requireComponent.keys().forEach((fileName) => {
  const componentConfig = requireComponent(fileName)
  const componentName = upperFirst(
    camelCase(fileName.replace(/^\.\/(.*)\.\w+$/, '$1'))
  )
  app.component(componentName, componentConfig.default || componentConfig)
})

app.use(router).use(store).use(vuetify).mount('#app')
