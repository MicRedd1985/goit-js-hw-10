import './css/styles.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio'; 
import debounce from 'lodash.debounce';
import {fetchCountries, countryСardSearch, countryListSearch} from './fetchCountries.js'

const DEBOUNCE_DELAY = 300;
let selectCountry = null

const input = document.querySelector('#search-box')
const countryList = document.querySelector('ul.country-list')
const countryCard = document.querySelector('div.country-info')

input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY))

function onInput(event) {
    console.log('go')
    selectCountry = event.target.value.trim()
    if (selectCountry === '') {
        countryList.innerHTML = '';
        countryCard.innerHTML = '';
        return;
    }
     console.log('go-go')
    fetchCountries(selectCountry)
        .then(countrys => {
            if (countrys.length > 10) {
                Notify.info('Too many matches found. Please enter a more specific name.');
                countryList.innerHTML = '';
                countryCard.innerHTML = '';
            }
            if (countrys.length <= 10 || countrys.lengts > 1) {
                const listMarkup = countrys.map(country => countryListSearch(country));
                countryList.innerHTML = listMarkup.join()
                countryCard.innerHTML = '';
            }
            if (countrys.length === 1) {
                 console.log(countrys)
                const cardMarkup = countrys.map(country => countryСardSearch(country));
                countryCard.innerHTML = cardMarkup.join()
                countryList.innerHTML = '';
            }
        }).catch(error => {
            Notify.failure('Oops, there is no country with that name')
            countryList.innerHTML = '';
            countryCard.innerHTML = '';
            return error
        })
   
}