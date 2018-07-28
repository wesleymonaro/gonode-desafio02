$(document).ready(() => {
  /**
   * Alerts
   */
  setTimeout(() => {
    let alert = document.querySelector('.alert');

    if (alert) {alert.className += ' alert-hidden';}
  }, 3000);

  /**
   * MDE Editor
   */
  $('.mde').each(function () {
    const simplemde = new SimpleMDE({
      element: this,
      spellChecker: false,
      status: false,
    });
    // simplemde.render();
  });

  /**
   * Modals
   */
  $('[data-modal-open]').click(function (event) {
    event.preventDefault();

    $($(this).data('modal-open')).addClass('active');
    $('#sectionNameModal').val($('#sectionName').val());

    setTimeout(function(){
      $('#modalContent').focus();
    }, 100)
  });

  $('[data-modal-close]').click(function (event) {
    event.preventDefault();

    $($(this).data('modal-close')).removeClass('active');
  });

  $(document).keydown((e) => {
    e = e || window.event;
    if (e.keyCode == 27) {
      $('.modal').removeClass('active');
    }
  });
});
