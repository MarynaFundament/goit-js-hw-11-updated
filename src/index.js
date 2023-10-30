
import './sass/layouts/_mainform.scss';
import NewFetchPicture from './js/fetchPictures.js'
import Notiflix from 'notiflix';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";


const newFetchPicture = new NewFetchPicture()

const form = document.querySelector('.search-form')
const submitBtn = document.querySelector('.submit-btn')
const markupForm = document.querySelector('.gallery')
const loadMoreBtn = document.querySelector('.load-more')



form.addEventListener('submit', handleSearchRes)
loadMoreBtn.addEventListener('click', handleLoadMore)


function handleSearchRes(e){
e.preventDefault();

newFetchPicture.resetPage()
newFetchPicture.query = e.target.elements.searchQuery.value.trim()

const QueryRes = newFetchPicture.query;


if (newFetchPicture.query === '') {
  Notiflix.Notify.warning('Please, fill the main field');
  return;
}



newFetchPicture.fetchFunc()
  .then(createMarkup)
}



function handleLoadMore(){

  loadMoreBtn.disabled = false;

  newFetchPicture.updatePage()
  newFetchPicture.fetchFunc()
  .then(createMarkup)

}


function createMarkup(searchResult){
    console.log(searchResult)

  const { hits } = searchResult;
    let allMarkup = '';

  markupForm.innerHTML = '';

  hits.forEach(({largeImageURL, tags, likes, views, comments, downloads}) => {
  const markup = `<a href="${largeImageURL}" class="gallery-item"> 
  <div class="info">
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
</div> </a>`


allMarkup += markup;

})

markupForm.insertAdjacentHTML('beforeend', allMarkup);

const lightbox = new SimpleLightbox('.gallery a', {
  caption: false,
  captionDelay: 0,
});

lightbox.refresh()

   }

  


