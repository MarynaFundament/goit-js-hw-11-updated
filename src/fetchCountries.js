
export const fetchCountries = (name) => {
  const url = `https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,languages,flags;`


  return fetch(url)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .catch((error) => {
      console.error(`Fetch error: ${error}`);
    });
};





