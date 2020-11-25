

function getParks(code) {
  const api_key='QaAQfNC59WzP77qBKqRZ2HZb3o7TMmCUbkcljlt4';
  const baseUrl='https://developer.nps.gov/api/v1/parks';

  let stateCodes = code.split(',');
  console.log(stateCodes);
  let stateCodeStr = '';
  for (let i=0; i< stateCodes.length; i++) {
    stateCodeStr += `${encodeURIComponent(stateCodes[i].trim().toUpperCase())}`;
  }
  console.log(stateCodeStr);


  let requestUrl = `${baseUrl}?stateCode=${stateCodeStr}&api_key=${api_key}`;
  console.log(requestUrl);
  fetch(requestUrl, {
    headers:{
      'Content-Type': 'application/json',
    },
  }).then((response) => response.json())
    .then((responsejson) => displayResults(responsejson))
    .catch(err => console.error(err));
}

function displayResults(responsejson) {
  $('.results').html('');
  responsejson.data.forEach((park) => {
    $('.results').append(
      `<ul id="info">
    <li class="park-name">${park.fullName}</li>
  <ul>
      <li class="park-info"><a href="${park.url}">${park.url}</a></li>
      <li class="park-info">${park.description}</li>
  </ul>
  </ul>`);
  });
}




function handleSubmitButton() {
  $('#parks').on('submit', function(evt) {
    evt.preventDefault();
    let parks = $('#park').val();
    getParks(parks);
  });
}






function main() {
  handleSubmitButton();
  getParks();
  displayResults();

  




}

$(main)