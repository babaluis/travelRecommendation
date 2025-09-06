    const btnClear = document.getElementById("btnClear");
    const btnSearch = document.getElementById('btnSearch');

    document.addEventListener('DOMContentLoaded', () => {
        fetch('travel_recommendation_api.json')
            .then(response => response.json())
            .then(data => {
            console.log('API data on page load:', data);
            })
            .catch(error => {
            console.error('Error loading API data on page load:', error);
            });
});
  

        function resetForm() {
          const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = '';
        }
           
        

      function searchCondition() {
  const input = document.getElementById('destinationInput').value.toLowerCase();
  const resultDiv = document.getElementById('result');
  resultDiv.innerHTML = '';

  fetch('travel_recommendation_api.json')
    .then(response => response.json())
    .then(data => {
      // Search in countries
      let found = false;
      for (const country of data.countries) {
        if (country.name.toLowerCase().includes(input)) {
          //resultDiv.innerHTML += `<h2>${country.name}</h2>`;
          for (const city of country.cities) {
            resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
             resultDiv.innerHTML += `<h3>${city.name}</h3>`;
            resultDiv.innerHTML += `<p>${city.description}</p>`;
             resultDiv.innerHTML += `<button id="btnvisit">VISIT</button>`;
          }
          found = true;
        } else {
          // Search in cities
          for (const city of country.cities) {
            if (city.name.toLowerCase().includes(input)) {
              resultDiv.innerHTML += `<img src="${city.imageUrl}" alt="${city.name}">`;
              resultDiv.innerHTML += `<h2>${city.name}</h2>`;
              resultDiv.innerHTML += `<p>${city.description}</p>`;
              resultDiv.innerHTML += `<button id="btnvisit">VISIT</button>`;
              found = true;
            }
          }
        }
      }

      // Search in temples
      if (!found) {
        for (const temple of data.temples) {
          if (temple.name.toLowerCase().includes(input)) {
            resultDiv.innerHTML += `<img src="${temple.imageUrl}" alt="${temple.name}">`;
            resultDiv.innerHTML += `<h2>${temple.name}</h2>`;
            resultDiv.innerHTML += `<p>${temple.description}</p>`;
            resultDiv.innerHTML += `<button id="btnvisit">VISIT</button>`;
            found = true;
          }
        }
      }

      // Search in beaches
      if (!found) {
        for (const beach of data.beaches) {
          if (beach.name.toLowerCase().includes(input)) {
             resultDiv.innerHTML += `<img src="${beach.imageUrl}" alt="${beach.name}">`;
            resultDiv.innerHTML += `<h2>${beach.name}</h2>`;
            resultDiv.innerHTML += `<p>${beach.description}</p>`;
            resultDiv.innerHTML += `<button id="btnvisit">VISIT</button>`;
            found = true;
          }
        }
      }

      if (!found) {
        resultDiv.innerHTML = 'No match found.';
      }
    })
    .catch(error => {
      console.error('Error:', error);
      resultDiv.innerHTML = 'An error occurred while fetching data.';
    });
}
        btnSearch.addEventListener('click', searchCondition);
        btnClear.addEventListener('click', resetForm);