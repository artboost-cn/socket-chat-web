<template>
  <div class="chat-window" v-if="store.state.currentSession && store.state.currentSession.sessionId">
    <chat-top-bar></chat-top-bar>
    <div v-if="store.state.currentSession.type !== 2">
      <chat-dialog></chat-dialog>
      <input-box></input-box>
    </div>
    <div v-else>
      <noti-dialog></noti-dialog>
    </div>
  </div>
  <div class="logo-page" v-else>
    <img :src="require('@/assets/img/logo.svg')" alt="" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@vue/runtime-core'
import { useStore } from 'vuex'
import ChatDialog from './children/chatDialog/ChatDialog.vue'
import ChatTopBar from './children/ChatTopBar.vue'
import InputBox from './children/InputBox.vue'
import NotiDialog from './children/NotiDialog.vue'
export default defineComponent({
  components: { InputBox, ChatDialog, ChatTopBar, NotiDialog },
  name: 'chat-window',
  setup() {
    const store = useStore()

    return {
      store,
    }
  },
})
</script>

<style scoped>
.chat-window {
  /* background-color: #f5f5f5; */
  background-color: #f9f9f9;
}

.logo-page img {
  margin-top: calc(45vh - 65px);
  height: 130px;
  width: 130px;
}
</style>
