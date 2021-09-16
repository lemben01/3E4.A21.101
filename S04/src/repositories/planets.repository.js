import Planet from '../models/planet.model.js';
class PlanetsRepository {

    retriveById(idPlanet) {
        return Planet.findById(idPlanet);
    }

    retriveAll(filter) {
        //Equivalent des WHERE en sql
        const testFilter = {
            discoveredBy: 'Skadex',
            temperature: {$gt : 240},
            'position.y': {$gt : 500}
        }
        const testFilterOR = {
           $or: [{discoveredBy: 'Skadex'}
                , {temperature: {$gt : 240}}] 
        }
        //WHERE discoveredBy = 'Shadex' AND temperature = 420
        return Planet.find(filter);
    }
}

export default new PlanetsRepository();