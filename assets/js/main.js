$(window).on('load', () => {
  document.querySelector('.websiteLoader').style.opacity = '0';
  setTimeout(() => {
    document.querySelector('.websiteLoader').style.display = 'none';
  }, 1000);
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
  $('.welcome-hero-banner').slick({
    slidesToShow: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 8000,
    infinite: true,
  });

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
