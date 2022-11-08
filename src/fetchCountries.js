export function fetchCountries(name) {
    const url = `https://restcountries.com/v3.1/name/`
    const options = `?fields=name,capital,population,flags,languages`
    return fetch(`${url}${name}${options}`).then(response => {
            if(!response.ok) {
                throw new Error(response.status);
            }
            return response.json();
        })
}

export function countryСardSearch({ flags, name, capital, population, languages }) {
    return `
      <div class="country-info__container">
        <div class="country-info__search">
          <img class="country-info__flags" src="${flags.svg}" alt="${name.official}" width="40" />
          <h2 class="country-info__name">${name.official}</h2>
        </div>
        <p class="country-info__capital"><span class="country-info__weight">Capital:</span> ${capital}</p>
        <p class="country-info__population"><span class="country-info__weight">Population:</span> ${population}</p>
        <p class="country-info__languages"><span class="country-info__weight">Languages:</span> ${Object.values(
          languages,
        )}</p>
      </div>
    `;
  }
  
  export function countryListSearch({ flags, name }) {
    return `
    <li class="country-list__item">
      <img class="country-list__flags" src="${flags.svg}" alt="${name.official}" width="20" />
      <h2 class="country-list__name">${name.official}</h2>
    </li>
    `;
  }