$(function () {
  setTimeout(function () {
    $('.messages').slideUp();
  }, 3000);


  var setMaxHeight = _.debounce(function () {
    $('.main-stream img').css({
      maxHeight: ($(window).height() + 30) + 'px'
    });
  }, 500);

  setMaxHeight();
  $(window).on('resize', setMaxHeight);

});
