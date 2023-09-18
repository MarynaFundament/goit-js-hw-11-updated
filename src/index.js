
import './css/styles.css';
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
    <img src="${largeImageURL}" alt="${tags}" loading="lazy" />
   <p class="info-item">
     <b>${likes}</b>
   </p>
   <p class="info-item">
     <b>${views}</b>
   </p>
   <p class="info-item">
     <b>${comments}</b>
   </p>
   <p class="info-item">
     <b>${downloads}</b>
   </p>
 </div>
</div>`

allMarkup += markup;
})

markupForm.innerHTML = allMarkup;
  
   }


