const apiKey = 'f592ab6c9074e25c271aa08476da1465';
const btn = document.getElementById('buscar');
const cidade = document.getElementById('cidade');
const esp = document.getElementById('espaco');

btn.addEventListener('click', () => {
    const city = cidade.value;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&mode=xml&appid=${apiKey}`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error('Cidade não encontrada ou erro na API');
            }
            return response.text();
        })
        .then(data => {
            const parser = new DOMParser();
            const xmlDoc = parser.parseFromString(data, "text/xml");
            const tempKelvin = xmlDoc.getElementsByTagName("temperature")[0].getAttribute("value");
            const nomeCidade = xmlDoc.getElementsByTagName("city")[0].getAttribute("name");

            const tempCelsius = (parseFloat(tempKelvin) - 273.15).toFixed(2);

            esp.innerHTML = `
            <table border="1">
            <h2>Clima em ${nomeCidade}</h2>
            <tr>
               <th> Temperatura(Graus) </th>
                <td> ${tempCelsius} °C </td>
            </tr>
            <tr>
                <th> Temperatura(Kelvin) </th> 
                <td>${tempKelvin} K </td>
            </tr>
            </table>`;
        })
        .catch(error => {
            console.error('Erro na requisição:', error);
            esp.innerHTML = `<p style="color: red;">${error.message}</p>`;
        });
});
