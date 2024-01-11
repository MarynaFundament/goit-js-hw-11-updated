import axios from "axios";

// loader

const loaderContainer = document.querySelector('.loader')
function showLoader() {
  loaderContainer.classList.remove('is-hidden');
}

function hideLoader() {
  loaderContainer.classList.add('is-hidden');
}

// fetch

export default class NewFetchPicture{


 #URL = 'https://pixabay.com/api/'
 #KEY = '39518708-26ab694120e376c6ae35268e7'
 query = '';
 page= 1;
 per_page = 40;
 image_type='photo';
 safesearch='true';
 orientation='horizontal'

 async fetchFunc() {
  const searchParams = new URLSearchParams({
    query: this.query,
    page: this.page,
    per_page: this.per_page,
    image_type: this.image_type,
    safesearch: this.safesearch,
    orientation: this.orientation,
  });

  try {
    showLoader();

    const response = await axios.get(`${this.#URL}/?key=${this.#KEY}&${searchParams}&q=${this.query}`);
    
    return response.data;


  } catch (error) {
    console.error(`Axios error: ${error.message}`);
    throw error; 
  }

  finally{
      
    setTimeout(() => {
      hideLoader();
    }, 4000);

  }
}


updatePage(){
this.page += 1
}

resetPage(){
this.page = 1
}

get query() {
  return this.query;
}

set query(newRes) {
  this.query = newRes;
}
}








