export type ToastStatus = 'warning' | 'notice' | 'success'

export type ToastMessage = {
  message: string
  type?: ToastStatus
}
