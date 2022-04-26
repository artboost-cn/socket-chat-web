export type Subscribe = {
  msgName: string,
  callback: any,
  token: string,
}[]

export type TimeTag = {
  content: string;
  component: string;
  updatedAt: string,
}

// 双方的聊天记录，以及发送方当前发送的消息都是chatItem类型
export type ChatItem = {
  content: string,
  others: { [propname: string]: any },
  receiverId: number,
  senderId: number,
  sort: number,
  type: number,
  updatedAt: string,
  uuid?: string,
  component?: string,
  status?: string,
  fileInfo?: FileInfo,
}

// export type MsgType = {
//   msgType: string,
//   status: string,
//   // SuccessMsg的time叫updatedAt 是为了和数据库字段保持一致
//   time?: string,
//   [propsname: string]: any
// }

// socket.on('message', xxx)
export type MsgType = SuccessMsg | FailMsg | FriendReqMsg | NotiMsg | LoginMsg

export type SuccessMsg = {
  msgType: string,
  status: string,
  updatedAt: string,
  content: string,
  uuid: string,
  sessionId: string,
  talkerId: string,
  type: string,
}

export type FailMsg = {
  msgType: string,
  status: string,
  uuid: string,
  time: string,
  content: string,
}

export type ReceiveMsg = {
  content: string,
  updatedAt: string,
  sessionId: string,
  talkerId: string,
  type: number,
  others: { [propname: string]: any },
  component?: string
}

export type FriendReqMsg = {
  msgType: string,
  userInfo: User,
  content: string,
}

export type NotiMsg = {
  msgType: string
  status: string
  content: string
  time: number
}

export type LoginMsg = {
  msgType: string,
  status: string,
  time: string,
  content?: string,
}

export type FileInfo = {
  fileName: string,
  size: number,
}

export type InputChatItem = {
  content: (string | File),
  receiverId: number,
  uuid: string,
  type: number,
  sessionId: number,
  fileInfo?: FileInfo,
  senderId?: number,
  status?: string,
  updatedAt?: number,
  file?: File,
}

export type User = {
  id: number,
  userName: string,
  avatar: string,
  email: string | null,
  createdAt?: string,
}

export type Friend = User

export type FriendRequest = {
  content: string,
  createdAt: string,
  friendId: number,
  handle: number,
  id: number,
  read: number,
  user: User,
  userId: number,
}

export type Session = {
  cover: string,
  lastChat: string,
  read: number,
  receiverId: number,
  sessionId: string,
  sessionName: string,
  type: number,
  updatedAt: string,
  user: User | null,
}

export type Emoticon = {
  id: number,
  createdAt: string,
  src: string,
  userId: number
}

export type FileItem = {
  createdAt: string,
  fileName: string,
  id: number,
  size: number,
  src: string,
  type: number,
  userId: number,
}

export type Notification = {
  createdAt: string,
  id?: number,
  type: number | null,
  userId?: number,
}

export type RightClickMenu = {
  menuList: { content: string, callback: any }[],
  position: { x: number, y: number }
}