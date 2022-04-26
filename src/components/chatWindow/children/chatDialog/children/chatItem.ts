export interface Chat {
  component: string,
  content: string,
  others: { [propname: string]: any },
  receiverId: number,
  senderId: number,
  sort: number,
  type: number,
  updatedAt: string,
  status?: string,
}