import { DirectiveBinding } from "vue"

// 加载失败显示的图片
const defaultImg = './assets/img/img_fail.jpg'

export default {
  mounted(el: HTMLImageElement, binding: DirectiveBinding) {
    // el表示使用指令的DOM元素
    // bindings表示指令相关的信息是一个对象
    // 指令的功能：实现图片的懒加载
    // 1、监听图片进入可视区
    const oberver = new IntersectionObserver(([{ isIntersecting }]) => {
      if (isIntersecting) {
        // 进入了可视区
        // 2、给图片的src属性赋值图片的地址
        el.src = binding.value
        // 取消图片的监听
        oberver.unobserve(el)
        // 加载的图片失败了，显示默认的图片地址
        el.onerror = () => {
          el.src = defaultImg
        }
      }
    })
    oberver.observe(el)
  }
}