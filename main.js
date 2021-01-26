const key = '73513e1a73f7985db5e79daeab02e9e0';
const fromEl = document.querySelector('form');
const details = document.querySelector('.details');

fromEl.addEventListener('submit', (e) => {
    e.preventDefault();
    details.innerHTML = '<h1>Loading...</h1>'; 
    const location = e.target.location.value;
    weatherApp(location);
    fromEl.reset();
});

async function weatherApp(location){
    const result = await fetchAPI(location);
    generateHTML(result);
}

async function fetchAPI(location){
    const baseURL = `https://cors-anywhere.herokuapp.com/http://api.weatherstack.com/current?access_key=${key}&query=${location}`;
    const res = await fetch(baseURL);
    const data = await res.json();
    console.log(data);
    return data;
}

function generateHTML(data) {
    const html = `
    <h1 class="temp">${data.current.temperature}°c</h1>
        <h1 class="status">${data.current.weather_descriptions.map(item => item).join(' ')}</h1>
            <div class="more-info">
                <p class="firstInf">Time: ${data.location.localtime}</p>       
                <p class="secoundInf">Is Day: ${data.current.is_day}</p>
                <p class="thirdInf">Wind degree: ${data.current.wind_degree}</p>
                <p class="fourthInf">Wind dir: ${data.current.wind_dir}</p>
                <p class="fifthInf">Wind speed: ${data.current.wind_speed}km/h</p>
                <p class="sixthInf">UV Index: ${data.current.uv_index}</p>                
            </div>
            <div class="query">${data.request.query}</div>
            `;
details.innerHTML = html;
}


