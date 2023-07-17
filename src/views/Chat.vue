<template>
  <div class="chat">
    <!-- 好友列表 -->
    <session-list></session-list>
    <div class="img-middle">
      <img class="img-left" src="../assets/img/img1.png">
      <img class="img-left img-bottom" src="../assets/img/img2.png">
    </div>
    <chat-window class="chat-window"></chat-window>
  </div>
</template>

<script lang="ts">
import ChatWindow from '@/components/chatWindow/ChatWindow.vue'
import SessionList from '@/components/SessionList.vue'
import { defineComponent } from '@vue/runtime-core'

export default defineComponent({
  components: { ChatWindow, SessionList },
  name: 'chat-page',
})
</script>

<style scoped>
.chat {
  display: flex;
  width: 100%;
  background: #f4f4f4;
}

.chat-window {
  flex: 1;
}
.img-middle {
  width: 250px;
  margin: 25px 0 0 25px;
}
.img-left {
  width: 100%;
}
.img-bottom {
  margin-top: 25px;
}
</style>
