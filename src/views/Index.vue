<template>
  <div class="index">
    <!-- 侧边栏 -->
    <side-bar></side-bar>

    <router-view></router-view>
    <picture-viewer></picture-viewer>
    <right-click-menu></right-click-menu>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import { io } from 'socket.io-client'
import { api_getLogin } from '@/api/user'
import { useStore } from 'vuex'
import { useRouter } from 'vue-router'
import SideBar from '@/components/SideBar.vue'
import PictureViewer from '@/components/PictureViewer.vue'
import RightClickMenu from '@/components/RightClickMenu.vue'

import Pubsub from 'pubsub-js'
import { defineComponent, onMounted } from '@vue/runtime-core'
import { message, notification } from 'ant-design-vue'
import { FailMsg, FriendReqMsg, LoginMsg, MsgType, ReceiveMsg, SuccessMsg } from '@/type'

export default defineComponent({
  name: 'HomeView',
  components: {
    SideBar,
    PictureViewer,
    // HelloWorld,
    RightClickMenu,
  },
  setup() {
    const store = useStore()
    const router = useRouter()

    // 生命周期
    onMounted(async () => {
      // 如果vuex中没有用户信息，则判断是否处于登录状态
      if (!store.state.userInfo) {
        // 判断是否登录
        let res = await api_getLogin()
        if (res) {
          store.commit('setUserInfo', res.userInfo)
        } else {
          // console.log('未登录')
          router.push('/login')
        }
      }

      // 建立websocket连接
      //此处本来根据跨域应该为const socket = io('/socket.io'),但是socketio的请求地址默认自带socket.io，所以此处只要传入'/'
      window.$socket = io('/')

      // 接收聊天信息
      window.$socket.on('chat', (data: ReceiveMsg) => {
        Pubsub.publish('chat', data)
      })

      // 接收通知信息
      window.$socket.on('message', MsgHandler)
    })

    // 方法
    // 通知的分类处理方法
    const MsgHandler = (msg: MsgType) => {
      console.log(msg)

      switch (msg.msgType) {
        case 'chat':
          // this.sendMsgSuccess(msg)
          chatHandler(msg as SuccessMsg | FailMsg)
          break
        case 'login':
          LoginHandler(msg as LoginMsg)
          break
        case 'friendRequest':
          friendReqHandler(msg as FriendReqMsg)
          break
      }
    }

    // 登录信息处理
    const LoginHandler = (msg: LoginMsg) => {
      switch (msg.status) {
        case 'success':
          // console.log('login success')
          // 将通知发送给sessionList，以更新sessionList
          Pubsub.publish('notice', msg)
          break
        case 'logout':
          // console.log('您的账号已在别的地方登录')
          message.warning('您的账号已在别的地方登录!')
          window.$socket.disconnect()
          router.push('/login')
          break
      }
    }

    // 处理好友请求的回调
    const friendReqHandler = (msg: FriendReqMsg) => {
      notification.open({
        message: '添加好友请求',
        description: `${msg.userInfo.userName}:\n${msg.content}`,
        // 通知类型 + 用户id
        key: `${msg.msgType}+${msg.userInfo.id}`,
        onClick: () => {
          // console.log('Notification Clicked!');
          store.commit('setCurrentFriend', { id: -1 })
          router.push('/friend')
          notification.close(`${msg.msgType}+${msg.userInfo.id}`)
        },
      })
    }

    // 聊天的回调
    const chatHandler = (msg: SuccessMsg | FailMsg) => {
      if (msg.status === 'success') {
        // 成功
        // this.$bus.$emit('sendMsgSuccess', msg)
        Pubsub.publish('sendMsgSuccess', msg)
      } else {
        // 失败
        message.error(msg.content)
        // this.$bus.$emit('sendMsgFail', msg)
        Pubsub.publish('sendMsgFail', msg)
      }
    }

    return {
      MsgHandler,
      LoginHandler,
      friendReqHandler,
      chatHandler,
    }
  },
})
</script>

<style scoped>
.index {
  display: flex;
  height: 100vh;
  background-size: cover;
  position: relative;
}
</style>
