import { Friend, Session, User } from "@/type";
import { createStore } from "vuex";

type State = {
  userInfo: null | User,
  currentSession: Session | null,
  sessionListData: {
    isMore: boolean,
    list: Session[]
  },
  currentFriend: Friend | null,
  friendListData: {
    isReq: boolean,
    list: Friend[],
  },
  totalUnread: number
}

export default createStore({
  state: (): State => ({
    // 用户信息
    userInfo: null,
    // 当前的会话
    currentSession: null,
    // 会话列表数据
    sessionListData: {
      isMore: false,
      list: [],
    },
    // 当前选中的朋友
    currentFriend: null,
    // 好友列表
    friendListData: {
      isReq: false,
      list: [],
    },
    // 未读信息总数
    totalUnread: 0,
  }),
  mutations: {
    // 更新用户信息
    setUserInfo(state, userInfo) {
      state.userInfo = userInfo
    },

    setCurrentSession(state, session) {
      state.currentSession = session
    },

    setSessionListData(state, sessionListData) {
      state.sessionListData = sessionListData
    },

    setCurrentFriend(state, currentFriend) {
      state.currentFriend = currentFriend;
    },

    setFriendListData(state, friendListData) {
      state.friendListData = friendListData
    },

    setTotalUnread(state, total) {
      state.totalUnread = total
    },

    // 从好友列表中添加好友
    addFriend(state, friendInfo) {
      state.friendListData.list.push(friendInfo)
    },

    // 从好友列表中删除指定id 的好友
    deleteFriend(state, friendId) {
      const list = (state.friendListData.list).filter(item => item.id != friendId)
      state.friendListData = {
        isReq: state.friendListData.isReq,
        list: list,
      }
    }
  },
  getters: {},
  actions: {},
  modules: {},
});
