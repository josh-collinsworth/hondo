// TODO: is this actually the right way to do this?
import type LifelineConfirmationModalSvelte from '/components/modals/LifelineConfirmationModal.svelte'
import type GameOverModalSvelte from '/components/modals/GameOverModal.svelte'

export type ToastStatus = 'warning' | 'notice' | 'success'

export type ToastMessage = {
  message: string
  type: ToastStatus
}


export type Modal = LifelineConfirmationModalSvelte|GameOverModalSvelte|null