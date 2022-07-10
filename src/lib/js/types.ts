export type ToastStatus = 'warning' | 'notice' | 'success'

export type ToastMessage = {
  message: string
  type?: ToastStatus
}

/**
 *  This is very non-ideal, but it saves on storage space.
 *  Instead of reusing object keys, we just save game history in an array.
 * [0]: Points scored 
 * [1]: Guesses used
 * [2]: Bonus points scored
 */
export type PlayedGame = [number, number, number]