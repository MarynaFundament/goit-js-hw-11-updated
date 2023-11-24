
import './sass/layouts/_mainform.scss';
import NewFetchPicture from './js/fetchPictures.js'
import Notiflix from 'notiflix';
import { lightbox } from './js/lightbox.js';



const newFetchPicture = new NewFetchPicture()

const form = document.querySelector('.search-form')
const submitBtn = document.querySelector('.submit-btn')
const markupForm = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')
const inputEl = document.querySelector('.search-form_input')
let currentQuery = '';

form.addEventListener('submit', handleSearchRes)

function handleSearchRes(e){
e.preventDefault();

newFetchPicture.resetPage()
newFetchPicture.query = e.target.elements.searchQuery.value.trim()
inputEl.value = '';

if (newFetchPicture.query === '') {
  Notiflix.Notify.warning('Please, fill the main field');
  return;
}

if (newFetchPicture.query !== currentQuery) {
  newFetchPicture.resetPage();
  currentQuery = newFetchPicture.query;
  markupForm.innerHTML = '';

  loadMoreBtn.classList.add('is-hidden')

}

newFetchPicture.fetchFunc()
  // .then(r => console.log(r))
  .then( r => {
  createMarkup(r);

  if(r.totalHits > 1){
    Notiflix.Notify.info(`Hooray! We found ${r.totalHits} images.`)
  }

  if(r.totalHits === newFetchPicture.page){
    loadMoreBtn.classList.add('is-hidden')
    return
  }

  if(r.totalHits === 0){
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.')
    return
  }

  loadMoreBtn.classList.remove('is-hidden')

  })
  // .catch( err => { 
  //   console.log(err)
  // })
  
}

loadMoreBtn.addEventListener('click', handleLoadMore)

 function handleLoadMore() {
  

  if (newFetchPicture.query === '') {
    Notiflix.Notify.warning('Please, fill the main field');
    return;
  }

  newFetchPicture.updatePage();
  newFetchPicture.fetchFunc()
  .then(r => {
    createMarkup(r);
  })
  

  
}




function createMarkup({ hits }) {


  const markup = hits
    .map(
      ({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => {
        return `<div class="photo-card">
          <a href="${largeImageURL}" class="photo-link">
            <img class="photo-img" src="${webformatURL}" alt="${tags}" loading="lazy" />
          </a>
          <div class="info">
            <p class="info-item likes">
              <b>Likes</b>
              ${likes}
            </p>
            <p class="info-item views">
              <b>Views</b>
              ${views}
            </p>
            <p class="info-item comments">
              <b>Comments</b>
              ${comments}
            </p>
            <p class="info-item downloads">
              <b>Downloads</b>
              ${downloads}
            </p>
          </div>
        </div>`;
      }
    )
    .join('');

  markupForm.insertAdjacentHTML('beforeend', markup);
  lightbox.refresh();

}


$('.gallery').infinitescroll({
  loading: {
    finishedMsg: '<p>No more items to load.</p>',
    img: 'path/to/loading.gif',
    msgText: '<p>Loading more items...</p>',
  },
  nextSelector: '.load-more', // Selector for the "Load More" button
  navSelector: false, // No pagination container
  itemSelector: '.photo-card', // Selector for each item in the list
  bufferPx: 40, // Number of pixels from the bottom of the page at which to trigger the loading
  errorCallback: function () {
    console.log('Error loading more items.');
  },
});











