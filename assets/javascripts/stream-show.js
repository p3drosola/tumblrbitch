$(function () {

  var stream = {};

  stream.initalize = function () {
    stream.setMaxHeight();
    $(window).on('resize', stream.setMaxHeight);
  };

  stream.setMaxHeight = _.debounce(function () {
    $('.main-stream img').css({
      maxHeight: ($(window).height() + 30) + 'px'
    });
  }, 500);


  return stream.initalize;

}());
