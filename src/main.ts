import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { message } from 'ant-design-vue'

import "@/assets/css/base.css"

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// import clickoutside from '@/directive/clickBlankCloseBox'
import { vOnClickOutside } from '@vueuse/components'

import antDesign from "./utils/antDesign";

const app = createApp(App);

// app.directive('clickoutside', clickoutside)
app.directive('clickoutside', vOnClickOutside)

// antDesign(app)
app.use(antDesign)
app.use(store).use(router).mount("#app");
app.config.globalProperties.$message = message
