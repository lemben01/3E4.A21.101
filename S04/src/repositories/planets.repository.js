import Planet from '../models/planet.model.js';
import objectToDotNotation from '../libs/objectToDotNotation.js';
import dayjs from 'dayjs';

const ZERO_KELVIN = -273.15;
class PlanetsRepository {

    retriveById(idPlanet) {
        return Planet.findById(idPlanet);
    }

    retriveAll(filter) {
        //Equivalent des WHERE en sql
        const testFilter = {
            discoveredBy: 'Skadex',
            temperature: { $gt: 240 },
            'position.y': { $gt: 500 }
        }
        const testFilterOR = {
            $or: [{ discoveredBy: 'Skadex' }
                , { temperature: { $gt: 240 } }]
        }
        //WHERE discoveredBy = 'Shadex' AND temperature = 420
        return Planet.find(filter);
    }

    create(planet) {
        return Planet.create(planet);
    }
    delete(idPlanet) {
        return Planet.findByIdAndDelete(idPlanet);
    }
    update(idPlanet, planetModif) {
        const planetToDotNotation = objectToDotNotation(planetModif);
        console.log(planetModif);
        console.log('**************');
        console.log(planetToDotNotation);
        return Planet.findByIdAndUpdate(idPlanet, planetToDotNotation, {new:true});
    }

    transform(planet, transformOptions = {}) {
        if (transformOptions.unit) {
            switch (transformOptions.unit) {
                case 'c':
                    //meme chose que
                    //planet.temperature = planet.temperature + ZERO_KELVIN;
                    planet.temperature += ZERO_KELVIN;
                    planet.temperature = parseFloat(planet.temperature.toFixed(2));
                    break;
            }
        }
        planet.discoveryDate = dayjs(planet.discoveryDate).format('YYYY-MM-DD');

        //HexMatrix => parseInt
        planet.lightspeed = `${planet.position.x.toString(16)}@${planet.position.y.toString(16)}#${planet.position.z.toString(16)}`;
        delete planet.__v;
        return planet;
    }
}

export default new PlanetsRepository();