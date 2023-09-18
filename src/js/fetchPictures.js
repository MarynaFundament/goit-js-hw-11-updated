export default class NewFetchPicture{


 #URL = 'https://pixabay.com/api/'
 #KEY = '39518708-26ab694120e376c6ae35268e7'
 query = '';
 page= 1;
 per_page = 3;
 image_type='photo';
 safesearch='true';
 orientation='horizontal'


 fetchFunc(){
 const searchParams = new URLSearchParams({
   query: this.query,
   page: this.page,
   per_page: this.per_page,
   image_type: this.image_type,
   safesearch: this.safesearch,
   orientation:this.orientation
})

return fetch(`${this.#URL}/?key=${this.#KEY}&${searchParams}`)
       .then(response =>  response.json())
      //  .then(r => console.log(r))
       .catch((error) => {
        console.error(`Fetch error: ${error}`);
});
}

updatePage(){
this.page += 1
}

resetPage(){
this.page = 1
}

get query(){
   return this.searchRes
}

set query(newRes){
   this.searchRes = newRes;
}
}






