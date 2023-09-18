import './css/styles.css';
import { fetchCountries } from './fetchCountries.js';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';

const DEBOUNCE_DELAY = 500;

const searchBox = document.getElementById("search-box");
const wrapperList = document.querySelector(".country-list");
const wrapperEl = document.querySelector(".country-info");

searchBox.addEventListener(`input`,debounce(handleInputSubmit, DEBOUNCE_DELAY));
wrapperList.addEventListener('click', handleListClick);



function handleInputSubmit(event) {
  const searchCountry = event.target.value.trim();
  
  if (!searchCountry) {
    resetMarkup(wrapperList);
    resetMarkup(wrapperEl);
    return;
  }

  fetchCountries(searchCountry)
  .then(thenResult)
  .catch(error => {
    console.error(error);
    Notiflix.Notify.failure('Oops, there is no country with that name');
  });
}

function thenResult(data){
  if (data.length > 10){
    resetMarkup(wrapperList);
    Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
  } else if (data.length > 2 && data.length <= 10) {
    resetMarkup(wrapperEl);
    createShortmarkup(data);
    
  } else {
    resetMarkup(wrapperList);
    createMarkupCountryInfo(data);
  
  }
}

function handleListClick(event) {
  const target = event.target;
  const countryName = target.closest('div').dataset.name;
  if (countryName) {
    fetchCountries(countryName)
      .then(createMarkupCountryInfo)
      .catch(error => {
        console.error(error);
        Notiflix.Notify.failure('Oops, something went wrong');
      });
  }
}

function createShortmarkup(searchCountry) {
  const shortMarkup = searchCountry.map(({name,flags}) => {
    return `<div>
      <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 40px height = 30px>
      <p> ${name.common}</p>
    </div>`;
  });

  wrapperList.innerHTML = shortMarkup.join("");
}

function createMarkupCountryInfo(searchCountry){
  const markup = searchCountry.map(({name,capital,population,languages,flags}) => {
    return `<div> 
      <img class="country-list__flag" src="${flags.svg}" alt="Flag of ${name.official}" width = 40px height = 30px>
      <p> ${name.common}</p>
    </div> 
    <div> 
      <p> Capital: ${capital}</p>
      <p> Population: ${population}</p>
      <p> Languages: ${Object.values(languages).join(', ')}</p>
    </div>`;
  });

  wrapperEl.innerHTML = markup.join("");
}

function resetMarkup(element) {
  element.innerHTML = '';
}