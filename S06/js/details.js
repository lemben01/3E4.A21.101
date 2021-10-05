const urlParams = {};
(window.onpopstate = function () {
    let match;
    const pl = /\+/g; // Regex for replacing addition symbol with a space
    const search = /([^&=]+)=?([^&]*)/g;
    const decode = function (s) {
        return decodeURIComponent(s.replace(pl, ' '));
    };
    const query = window.location.search.substring(1);

    while ((match = search.exec(query))) urlParams[decode(match[1])] = decode(match[2]);
})();

$(document).ready(()=> {
    getPlanet(urlParams.planet);
});

async function getPlanet(url) {
    const response = await axios.get(url);
    if(response.status === 200) {
        const planet = response.data;
        console.log(planet);

        //TODO image
        $('#imgIcon').attr('src',planet.icon);
        //TODO nom
        $('#lblName').html(planet.name);
        //TODO decouvert par 
        $('#lblDiscoveredBy').html(planet.discoveredBy);
        $('#lblDiscoveryDate').html(planet.discoveryDate);
        $('#lblTemperature').html(planet.temperature);
        const position = `(${planet.position.x.toFixed(3)}; ${planet.position.y.toFixed(3)}; ${planet.position.z.toFixed(3)})`;
        $('#lblPosition').html(position);

    }
}