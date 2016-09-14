$(function() {
	
/* ------- jCarousel ---------- */
  var $jcarousel = $('.jcarousel');

  $jcarousel.jcarousel({
    wrap: 'circular'
  })
  .on('jcarousel:create jcarousel:reload', function() {
    var element = $(this),
      width = element.innerWidth();
      element.jcarousel('items').css('width', width + 'px');
    })
  .jcarousel({  });
  $('.jcarousel-prev').jcarouselControl({
    target: '-=1'
  });
  $('.jcarousel-next').jcarouselControl({
    target: '+=1'
  });

  $jcarousel
  .on('jcarousel:create jcarousel:reload', function() {
    var element = $(this),
    width = element.innerWidth();
    element.jcarousel('items').css('width', width + 'px');
  })
  .jcarousel({  });

/* -------- gallery ---------- */
    var searchVal = 'apple';
    var html;
    var content;

    request(searchVal);

    $('.gallery__form').submit( function (e) {
      e.preventDefault();
      searchVal = $.trim( $('.gallery__input').val() );
      if (!searchVal) {
        alert('empty request');
      }
      else {
        request(searchVal);
      }
    });

    function request(searchVal) {
    var API_KEY = '1223659-794638bbdd8df42b2dd8d508d';
    var URL = "https://pixabay.com/api/?key=" + API_KEY + "&q=" + encodeURIComponent(searchVal) + "&order=latest&image_type=photo&callback=?";
    $.getJSON(URL, function(data) {
      if (parseInt(data.totalHits) > 6) {
        html = $('.template').html();
        content = tmpl(html, data);
        $('.gallery__images').empty().append(content);
        $('.grid').masonry({
          itemSelector: '.grid__item',
        });
      }
      else
        alert('No hits:( Enter samthing else...');
    }).error(function (jqXHR, textStatus, errorThrown) {
      alert(errorThrown);
    });
  }

});