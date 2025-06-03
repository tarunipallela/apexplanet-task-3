const container = document.getElementById('countries-container');
const searchInput = document.getElementById('search');
const loader = document.getElementById('loader');
const themeToggle = document.getElementById('theme-toggle');

// Fetch data from REST Countries API
async function fetchCountries() {
  loader.classList.remove('hidden');
  try {
    const response = await fetch('https://restcountries.com/v3.1/all');
    const countries = await response.json();
    displayCountries(countries);
    loader.classList.add('hidden');

    // Add search filter
    searchInput.addEventListener('input', () => {
      const filtered = countries.filter(country =>
        country.name.common.toLowerCase().includes(searchInput.value.toLowerCase())
      );
      displayCountries(filtered);
    });
  } catch (error) {
    console.error('Failed to fetch countries:', error);
    container.innerHTML = `<p>Failed to load country data. Try again later.</p>`;
    loader.classList.add('hidden');
  }
}

// Display countries in cards (includes languages)
function displayCountries(data) {
  container.innerHTML = ''; // clear old content

  data.forEach(country => {
    const card = document.createElement('div');
    card.classList.add('country-card');
    card.innerHTML = `
      <img src="${country.flags.svg}" alt="Flag of ${country.name.common}">
      <div class="country-content">
        <h2>${country.name.common}</h2>
        <p><strong>Capital:</strong> ${country.capital ? country.capital[0] : 'N/A'}</p>
        <p><strong>Population:</strong> ${country.population.toLocaleString()}</p>
        <p><strong>Region:</strong> ${country.region}</p>
        <p><strong>Languages:</strong> ${country.languages ? Object.values(country.languages).join(', ') : 'N/A'}</p>
      </div>
    `;
    container.appendChild(card);
  });
}

// Dark mode toggle
themeToggle.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
});

// Init
fetchCountries();
