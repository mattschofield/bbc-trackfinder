$(document).ready(function () {

  $('#dp2').datepicker();

  $('.buttonPlay').click(function (e) {
    e.preventDefault();

    console.log(e);

    var audio = $(e.currentTarget).parent().parent().find('audio')[0];
    console.log(audio);

    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
  })

})