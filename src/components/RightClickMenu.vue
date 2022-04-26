<template>
  <div class="right-click-menu" v-show="showMenu" :style="`top:${position.y}px;left:${position.x}px;`" v-clickoutside="closeMenu">
    <div class="menu-item" v-for="(item, index) in menuList" :key="index" @click="clickItem(item.callback)">
      {{ item.content }}
    </div>
  </div>
</template>

<script lang="ts">
import Pubsub from 'pubsub-js'
import { reactive, toRefs } from '@vue/reactivity'
import { defineComponent, onMounted, onUnmounted } from '@vue/runtime-core'
import { RightClickMenu } from '@/type'

export default defineComponent({
  setup() {
    const state: State = reactive({
      menuList: [],
      showMenu: false,
      position: { x: -1, y: -1 },
    })

    // 生命周期
    onMounted(() => {
      Pubsub.subscribe('rightMenu', openMenu)
    })

    onUnmounted(() => {
      Pubsub.unsubscribe('rightMenu')
    })

    // methods
    // 关闭菜单的回调
    const closeMenu = () => {
      state.showMenu = false
      state.position = { x: -1, y: -1 }
      state.menuList = []
    }
    // 点击item的回调
    const clickItem = (callback: any) => {
      callback()
      state.showMenu = false
    }

    // 打开菜单的回调
    const openMenu = (name: string, { menuList, position }: RightClickMenu) => {
      state.menuList = menuList
      state.position = position
      state.showMenu = true
    }

    return {
      ...toRefs(state),
      closeMenu,
      clickItem,
    }
  },
})

// type State = { showMenu: boolean } & Omit<RightClickMenu, keyof { showMenu: boolean }>
type State = { showMenu: boolean } & RightClickMenu
</script>

<style scoped>
.right-click-menu {
  position: fixed;
  border: 1px solid #ccc;
  background-color: #fff;
  width: 120px;
  font-size: 12px;
  padding: 3px 0;
  border-radius: 5px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
}

.menu-item {
  border-bottom: 1px solid #ccc;
  padding: 4px 8px;
  cursor: pointer;
}

.menu-item:hover {
  /* background-color: #129611; */
  background-color: #2495ce;
  color: white;
}

.menu-item:last-child {
  border: none;
}
</style>
