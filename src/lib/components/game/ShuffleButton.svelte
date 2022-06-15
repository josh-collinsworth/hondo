<script lang="ts">
import { DEFAULT_SHUFFLE_COOLDOWN } from '$lib/js/constants';

import { showModal } from '$lib/js/mutations'
import { shuffleCooldown } from '$lib/js/state';
import ShuffleIcon from '../icon/ShuffleIcon.svelte'
import ShuffleConfirmationModal from '../modals/ShuffleConfirmationModal.svelte'

const confirmShuffle = (): void => {
  showModal(ShuffleConfirmationModal)
}

$: isCoolingDown = !!$shuffleCooldown
$: recoveryScale = (DEFAULT_SHUFFLE_COOLDOWN - $shuffleCooldown) / DEFAULT_SHUFFLE_COOLDOWN
</script>

<button
  on:click={confirmShuffle}
  class="info-button shuffle-button"
>
  <ShuffleIcon />
  <div class="sr">Shuffle board</div>
  <div
    class="shuffle-button__fill"
    style="
      transform: scaleY({recoveryScale});
      background: {isCoolingDown ? 'var(--secondary)' : 'transparent'}
    "
  />
</button>
