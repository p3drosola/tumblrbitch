var organize = {};
$(function () {

  organize.initalize = function () {
    $('.js-new-stream').on('click', organize.onClickNewStream);
    $('.js-save').on('click', organize.onClickSave);
    organize.buildSortable();
  };

  organize.onClickNewStream = function () {
    var name = prompt('Choose a name for the new stream');
    if (!name || !name.length) {
      return;
    }
    $(".stream-blogs").sortable('destroy');
    $('.streams-container .stream').first().after(
      "<div class='stream'>" +
        "<input type='text' class='stream-name' value='" + name + "'>" +
          "<div class='stream-blogs'>" +
          "</div>" +
        "</div>" +
      "</div>").find('input').last().focus();
    organize.buildSortable();
  };

  organize.buildSortable = function () {
    $(".stream-blogs").disableSelection().sortable({
      connectWith: '.stream-blogs',
      activate: function (event, ui) {
        $('.stream-blogs').addClass('can-recieve');
      },
      deactivate: function () {
        $('.stream-blogs').removeClass('can-recieve');
      }
    });
  };

  organize.serialize = function () {
    var streams = [];
    $(".stream").each(function () {
      var stream = {};
      if ($(this).find('.stream-name').is('input')) {
        stream.name = $(this).find('.stream-name').val();
        if (!stream.name.length) return;
      } else {
        return; // uncategoriezed
      }
      stream.blogs = $(this).find('.stream-blogs').sortable('toArray', {attribute: 'data-name'});
      streams.push(stream);
    });
    return streams;
  };

  organize.onClickSave = function () {
    $(this).text('Saving...').removeClass('primary');
    var data = organize.serialize();

    $('form').append("<input type='hidden' name='streams' value='" +
       JSON.stringify(data) + "'>").submit();
  };

  return organize.initalize;

}());
