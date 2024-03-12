import { getImg } from './js/pixabay-api';
import { createMarkup } from './js/render-functions';

import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import errorIcon from './img/error.svg';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

const galleryListElem = document.querySelector('.gallery-list');
const inputElem = document.querySelector('input');
const formSearchImg = document.querySelector('form');
const loaderElem = document.querySelector('.form-container div');
const loadMoreBtn = document.querySelector('.load-more');
const loadingAfterImgEl = document.querySelector('.loading');

const limit = 15;
let loadPageImg = 1;
let curentSearch;

const lightbox = new SimpleLightbox('.gallery-list a', {
  captionsData: 'alt',
  captionDelay: 250,
});

function showError(message, colorBg, icon) {
  iziToast.show({
    iconUrl: icon,
    messageColor: '#ffffff',
    message: message,
    backgroundColor: colorBg,
    position: 'topRight',
    messageSize: 16,
    layout: 2,
    maxWidth: 380,
    theme: 'dark',
  });
}

formSearchImg.addEventListener('submit', handleSearchImg);

async function handleSearchImg(event) {
  event.preventDefault();
  loadPageImg = 1;
  curentSearch = inputElem.value;

  galleryListElem.innerHTML = '';
  const query = inputElem.value.trim();

  if (query === '') {
    loadMoreBtn.classList.add('hidden');
    showError('Sorry, input is emty. Please try again!', '#FFA000');
    return;
  }

  try {
    const data = await getImg(loadPageImg, curentSearch, limit);

    if (data.total === 0) {
      loadMoreBtn.classList.add('hidden');
      showError(
        'Sorry, there are no images matching your search query. Please try again!',
        '#EF4040',
        errorIcon
      );
      loaderElem.classList.remove('loader');
      return;
    }

    createMarkup(data.hits, galleryListElem);

    if (Math.floor(data.totalHits / limit) === loadPageImg) {
      loadingAfterImgEl.classList.remove('loader');
      showErrorCustom('You have more 500 images.Please try later');
      return;
    }

    loaderElem.classList.remove('loader');
    loadMoreBtn.classList.remove('hidden');

    if (data.totalHits < loadPageImg * limit) {
      loadMoreBtn.classList.add('hidden');
      return showError(
        "We're sorry, but you've reached the end of search results.",
        '#0071BD'
      );
    }

    lightbox.refresh();
  } catch (error) {
    showError('Something went wrong.Please try later');
  }

  formSearchImg.reset();
}

loadMoreBtn.addEventListener('click', addMoreImg);

async function addMoreImg() {
  loadPageImg += 1;
  loadingAfterImgEl.classList.add('loader');

  try {
    const data = await getImg(loadPageImg, curentSearch, limit);

    createMarkup(data.hits, galleryListElem);

    if (Math.floor(data.totalHits / limit) === loadPageImg) {
      loadingAfterImgEl.classList.remove('loader');
      showErrorCustom('You have more 500 images.Please try later');
      return;
    }

    loaderElem.classList.remove('loader');
    loadingAfterImgEl.classList.remove('loader');
    loadMoreBtn.classList.remove('hidden');

    if (data.hits.length >= data.totalHits) {
      loadMoreBtn.classList.add('hidden');
      return showError(
        "We're sorry, but you've reached the end of search results.",
        '#0071BD'
      );
    }

    window.scrollBy({
      top: 580,
      behavior: 'smooth',
    });

    lightbox.refresh();
  } catch {
    loadingAfterImgEl.classList.remove('loader');
    loadMoreBtn.classList.add('hidden');
    showError('Something went wrong.Please try later');
  }
}
