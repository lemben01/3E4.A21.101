const ELEMENT_IMG_URL = 'https://assets.andromia.science/elements';

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

$(document).ready(() => {
    getPlanet(urlParams.planet);

    $('#btnAddPortal').click(() => {
        addPortal();
    });

    $('#btnMiner').click(()=>{
        minePlanet();
    });
});

async function minePlanet(){
    //GET
    const MINING_URL = `${urlParams.planet}/actions?type=mine`;

    const response = await axios.get(MINING_URL);

        if (response.status === 200) {

            const elements = response.data;

            $('#extraction tbody').empty();
            
            elements.forEach(e => {
                let elementHtml = '<tr>';

                elementHtml += `<td><img class="element" src="${ELEMENT_IMG_URL}/${e.element}.png" />${e.element}</td>`;
                elementHtml += `<td>${e.quantity}</td>`;

                elementHtml += '</tr>';

                $('#extraction tbody').append(elementHtml);
            });
        } else {
            console.log(response);
        }
}

async function addPortal() {

    const isPortalValid = document.getElementById('txtPosition').checkValidity();

    if (isPortalValid) {
        const position = $('#txtPosition').val();
        const affinity = $('#cboAffinity').val();

        const CREATE_PORTAL_URL = `${urlParams.planet}/portals`;

        const body = {
            position: position,
            affinity: affinity
        }

        const response = await axios.post(CREATE_PORTAL_URL, body);
        if (response.status === 201) {
            const newPortal = response.data;
            const portalHtml = displayPortal(newPortal);
            $('#portals tbody').append(portalHtml);
        } else {
            console.log(response);
        }
    } else {
        console.log('portal dans un format invalide.');
    }
}



async function getPlanet(url) {
    const response = await axios.get(url);
    if (response.status === 200) {
        const planet = response.data;
        console.log(planet);

        //TODO image
        $('#imgIcon').attr('src', planet.icon);
        //TODO nom
        $('#lblName').html(planet.name);
        //TODO decouvert par 
        $('#lblDiscoveredBy').html(planet.discoveredBy);
        $('#lblDiscoveryDate').html(planet.discoveryDate);
        $('#lblTemperature').html(planet.temperature);
        const position = `(${planet.position.x.toFixed(3)}; ${planet.position.y.toFixed(3)}; ${planet.position.z.toFixed(3)})`;
        $('#lblPosition').html(position);

        // Satellites
        if (planet.satellites.length > 0) {
            let satellitesHtml = '';
            planet.satellites.forEach(s => {
                satellitesHtml += `<li>${s}</li>`;
            });
            $('#satellites').html(satellitesHtml);
        } else {
            $('#satellites').html('<li>Aucun satellite</li>');
        }

        displayPortals(planet.portals);

    }
}

function displayPortals(portals) {
    // 1. Boucle foreach
    // 2.pour chaque portal un tr
    // 3.dans chaque tr 2 td (position, affinity)

    let portalsHtml = '';
    portals.forEach(p => {
        portalsHtml += displayPortal(p);
    });

    $('#portals tbody').html(portalsHtml);
}

function displayPortal(p) {
    let portalsHtml = '';

    portalsHtml += '<tr>';
    portalsHtml += `<td>${p.position}</td>`
    portalsHtml += `<td><img src="img/${p.affinity}.png" title="${p.affinity}"/></td>`
    portalsHtml += '</tr>';

    return portalsHtml;
}