const $mainModal = document.querySelector('#main__modal');
const $successModal = document.querySelector('#success__modal');
const $failedModal = document.querySelector('#failed__modal');


document.addEventListener('keyup', event => {
  if (event.keyCode === 13) {

    if ($successModal.style.display === 'block') {
      $successModal.style.display = 'none';
      player.difficulty += 1;
      reset();
    } else {
      // Reset the game once button is clicked
      reset();
      player.difficulty = 1;
      $failedModal.style.display = 'none'
    }

    $mainModal.style.display = 'none';
  }
});