
export default function fetchCountries(name) {
    return fetch(`https://restcountries.com/v3.1/name/${name}?fields=name,capital,population,flags,languages`).then(response => {
        if (response.status === 404) {
            throw Error(console.log(response.status));
        }
        return response.json();
    });
}