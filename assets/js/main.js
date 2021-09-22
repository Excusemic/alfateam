$(window).on('load', () => {
  const code = localStorage.getItem('alfaTeamCode');

  if (code !== 'true') {
    return (window.location.href = '/locked.html');
  } else {
    const last_session = localStorage.getItem('alfaTeamSession');
    if (!last_session) {
      return (window.location.href = '/locked.html');
    }
    const time_now = new Date().getTime();
    const ms = time_now - last_session;
    let minutes = (ms / (1000 * 60)).toFixed(1);
    if (minutes > 30) {
      localStorage.removeItem('alfaTeamCode');
      localStorage.removeItem('alfaTeamSession');
      return (window.location.href = '/locked.html');
    }
  }

  $.fn.strech_text = function () {
    var elmt = $(this),
      cont_width = elmt.width(),
      txt = elmt.html(),
      one_line = $('<span class="stretch_it">' + txt + '</span>'),
      nb_char = elmt.text().length,
      spacing = cont_width / nb_char,
      txt_width;

    elmt.html(one_line);
    txt_width = one_line.width();

    if (txt_width < cont_width) {
      var char_width = txt_width / nb_char,
        ltr_spacing = spacing - char_width + (spacing - char_width) / nb_char;

      one_line.css({ 'letter-spacing': ltr_spacing });
    } else {
      one_line.contents().unwrap();
      elmt.addClass('justify');
    }
  };
  document.querySelector('.websiteLoader').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.websiteLoader').style.display = 'none';
  }, 1000);
  $('.welcome-hero-banner').slick({
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 800,
        settings: {
          arrows: false,
          prevArrow: null,
          nextArrow: null,
        },
      },
    ],
    arrows: true,
    autoplay: true,
    autoplaySpeed: 5000,
    infinite: true,
    prevArrow: $('#prevBtn'),
    nextArrow: $('#nextBtn'),
  });
  // $('.p-text p').each(function () {
  //   $(this).strech_text();
  // });
});

let isDrag = false;
function handleDrag() {
  isDrag = true;
}
function handleDragEnd(url) {
  if (isDrag) {
    return (isDrag = false);
  } else if (url) return (window.location = url);
  return (isDrag = false);
}

$(document).ready(function () {
  const menu = document.querySelector('.sideMenu');
  const menuOverlay = document.querySelector('.menuOverlay');
  window.addEventListener('scroll', function () {
    const distance = window.scrollY;
    if (document.querySelector('.slick-list')) {
      document.querySelector('.slick-list').style.transform = `translateY(${
        distance * 1
      }px)`;
    }
    if (document.querySelector('.herobanner-content')) {
      document.querySelector('.herobanner-content').style.opacity =
        1 - (distance * 1) / 1000;
    }

    if (distance < 500) {
      if (document.querySelector('.overlay')) {
        document.querySelector('.overlay').style.bottom = `${
          100 - (distance * 3) / 10
        }%`;
        document.querySelector('.scrollDownContainer').style.top = `${
          90 + (distance * 1) / 10
        }%`;
      }
    }
    if (this.oldScroll > this.scrollY) {
      document.querySelector('header').style.top = '0px';
    } else {
      if (distance > 400 && !menu.classList.contains('showMenu')) {
        document.querySelector('header').style.top = '-100px';
      } else {
        document.querySelector('header').style.top = '0px';
      }
    }

    this.oldScroll = this.scrollY;
  });
  document
    .querySelector('.menu-wrapper label input')
    .addEventListener('click', () => {
      if (menu.classList.contains('showMenu')) {
        menu.classList.remove('showMenu');
        menuOverlay.style.display = 'none';
      } else {
        menu.classList.add('showMenu');
        menuOverlay.style.display = 'block';
      }
    });
  menuOverlay.addEventListener('click', () => {
    document.querySelector('.menu-wrapper label input').click();
  });
  const galerryImages = document.querySelectorAll('.project-gallery-item');

  if (galerryImages) {
    const closeGalery = document.querySelector('.close');
    closeGalery.addEventListener('click', () => {
      document.querySelector('#carouselModal').classList.remove('showModal');
    });
    const right = document.querySelector('.right');
    const left = document.querySelector('.left');
    const carouselModal = document.querySelector('#carouselModal');
    carouselModal.addEventListener('click', (e) => {
      if (e.target.tagName !== 'IMG') {
        document.querySelector('#carouselModal').classList.remove('showModal');
      }
    });
    const previewModalImg = document.querySelector('#carouselModal img');
    galerryImages.forEach((item, index) => {
      item.addEventListener('click', (e) => {
        previewModalImg.setAttribute('src', item.getAttribute('data-url'));
        previewModalImg.setAttribute('index', index);
        carouselModal.classList.add('showModal');
      });
    });
    right.addEventListener('click', () => {
      let currentIndex = previewModalImg.getAttribute('index');
      if (currentIndex == galerryImages.length - 1) {
        previewModalImg.setAttribute(
          'src',
          galerryImages[0].getAttribute('data-url')
        );
        return previewModalImg.setAttribute('index', 0);
      }
      galerryImages.forEach((item, index) => {
        if (index == currentIndex) {
          previewModalImg.setAttribute(
            'src',
            galerryImages[index + 1].getAttribute('data-url')
          );
          previewModalImg.setAttribute('index', index + 1);
        }
      });
    });
    left.addEventListener('click', () => {
      let currentIndex = previewModalImg.getAttribute('index');
      if (currentIndex == 0) {
        previewModalImg.setAttribute(
          'src',
          galerryImages[galerryImages.length - 1].getAttribute('data-url')
        );
        return previewModalImg.setAttribute('index', galerryImages.length - 1);
      }
      galerryImages.forEach((item, index) => {
        if (index == currentIndex) {
          previewModalImg.setAttribute(
            'src',
            galerryImages[index - 1].getAttribute('data-url')
          );
          previewModalImg.setAttribute('index', index - 1);
        }
      });
    });
  }
});
