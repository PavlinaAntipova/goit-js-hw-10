import './css/styles.css';
import fetchCountries from "./fetchCountries";
import debounce from "lodash.debounce";
import Notiflix from 'notiflix';
import "notiflix/dist/notiflix-3.2.2.min.css";
import countryCard from './countryCard.hbs';
import countryList from './countryList.hbs';


const DEBOUNCE_DELAY = 300;

const inputRef = document.querySelector("#search-box");
const countryBoxRef = document.querySelector(".country-info");
const countryListRef = document.querySelector(".country-list");

inputRef.addEventListener("input", debounce(onSearch, DEBOUNCE_DELAY));

function onSearch(event) {
    const searchQuery = (event.target.value).trim();
    if (!searchQuery) {
        cleanQuery();
        return;
    }
    fetchCountries(searchQuery).then(countries => {
        if (countries.length > 10) {
            cleanQuery();
            notificationInfo();
            
        } else if (countries.length <= 10 && countries.length >= 2) {
            cleanQuery();
            createListContries(countries);
            
        } else {
            cleanQuery();
            createCountry(countries);
        }
        
    }).catch(error => {
        Notiflix.Notify.failure("Oops, there is no country with that name");
        
    });
}


function notificationInfo() {
   Notiflix.Notify.info("Too many matches found. Please enter a more specific name.");
}

function createCountry(country) {
    countryBoxRef.innerHTML = countryCard(country[0]);
}

function createListContries(countries) {
    countryListRef.innerHTML = countryList(countries);
}

function cleanQuery() {
    countryBoxRef.innerHTML = "";
    countryListRef.innerHTML = "";
}
