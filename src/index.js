
import './sass/layouts/_mainform.scss';
import NewFetchPicture from './js/fetchPictures.js'
import Notiflix from 'notiflix';

const newFetchPicture = new NewFetchPicture()

const form = document.querySelector('.search-form')
const submitBtn = document.querySelector('.submit-btn')
const markupForm = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')



form.addEventListener('submit', handleSearchRes)
loadMoreBtn.addEventListener('click', handleLoadMore)


function handleSearchRes(e){
e.preventDefault()

newFetchPicture.resetPage()
newFetchPicture.query = e.target.elements.searchQuery.value.trim()

const QueryRes = newFetchPicture.query;
console.log(QueryRes)


newFetchPicture.fetchFunc()
.then(createMarkup)

// Notiflix.Notify.failure('Sorry, there are no images matching your search query. Please try again.');

  }

function handleLoadMore(){

  newFetchPicture.updatePage()
  newFetchPicture.fetchFunc()
  .then(createMarkup)
  
}


function createMarkup(searchResult){
    console.log(searchResult)

  const { hits } = searchResult;
    let allMarkup = '';

  hits.forEach(({largeImageURL, tags, likes, views, comments, downloads}) => {
  const markup = `<div class="info">
    <img class = "photo-img" src="${largeImageURL}" alt="${tags}" loading="lazy" />
  <ul class="info-list"> 
  <li class="info-capture"> 
  <p class="list-p">Likes </p>
  <span class="list-s">${likes}</span></li>
  <li class="info-capture"> 
  <p class="list-p">Views </p>
  <span class="list-s">${views}</span></li>
  <li class="info-capture"> 
  <p class="list-p">Comments </p>
  <span class="list-s">${comments}</span></li>
  <li class="info-capture"> 
  <p class="list-p">Downloads </p>
  <span class="list-s">${downloads}</span></li>
   </ul> 
</div>`

allMarkup += markup;
})

markupForm.innerHTML = allMarkup;
  
   }


