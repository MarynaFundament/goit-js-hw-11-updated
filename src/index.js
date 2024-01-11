
import './sass/layouts/_mainform.scss';
import NewFetchPicture from './js/fetchPictures.js'
import Notiflix from 'notiflix';
import { lightbox } from './js/lightbox.js';
import axios from 'axios';




const newFetchPicture = new NewFetchPicture()

const form = document.querySelector('.search-form')
const submitBtn = document.querySelector('.submit-btn')

const markupForm = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')
const inputEl = document.querySelector('.search-form_input')
let currentQuery = '';

form.addEventListener('submit', handleSearchRes)

async function handleSearchRes(e){
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





try {
  const result = await newFetchPicture.fetchFunc();

  createMarkup(result);

  if (result.totalHits > 1) {
    Notiflix.Notify.info(`Hooray! We found ${result.totalHits} images.`);
  }

  if (result.totalHits === newFetchPicture.page) {
    loadMoreBtn.classList.add('is-hidden');
    return;
  }

  if (result.totalHits === 0) {
    Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    return;
  }

  loadMoreBtn.classList.remove('is-hidden');
} catch (error) {
  console.error('Error fetching images:', error);
}
}


loadMoreBtn.addEventListener('click', handleLoadMore)

async function handleLoadMore() {
  

  if (newFetchPicture.query === '') {
    Notiflix.Notify.warning('Please, fill the main field');
    return;
  }

 
  newFetchPicture.updatePage();


  try{
    const result = await newFetchPicture.fetchFunc()
      createMarkup(result);

      if (newFetchPicture.page > result.totalPages) {
        console.log(newFetchPicture.page);
        Notiflix.Notify.info("We're sorry, but you've reached the end of search results");
        loadMoreBtn.classList.add('is-hidden');
      }
  }
  catch{
    console.error('Error fetching more images:', error);

  }
  
  
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

  //height of the picture

  const dynamicDiv = document.querySelector('.photo-card');
  const height = dynamicDiv.getBoundingClientRect().height;
    // console.log(height);
  
   window.scrollBy({
    top: 2 * height,
    behavior: 'smooth',
  });

}














