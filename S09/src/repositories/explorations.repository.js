import Exploration from '../models/exploration.model.js';
import planetRepository from './planet.repository.js';

class ExplorationsRepository {

    retriveAll(retriveOptions) {
        const retriveQuery = Exploration.find().skip(retriveOptions.skip).limit(retriveOptions.limit);
        const countQuery = Exploration.estimatedDocumentCount();

        return Promise.all([retriveQuery, countQuery]);
    }

    retriveById(idExploration, retriveOptions) {
        const retriveQuery = Exploration.findById(idExploration);
        if(retriveOptions.planet){
            retriveQuery.populate('planet');
        }
        return retriveQuery;
    }

    transform(exploration, transformOptions = {}) {
        if (transformOptions.embed && transformOptions.embed.planet) {
            //?embed=planet
            //exploration.planet => un objet complet
            exploration.planet = planetRepository.transform(exploration.planet, transformOptions);
        } else {
            //on ne veut pas embed la planet
            //exploratin.planet => seulement le id
            exploration.planet = { href:`/planets/${exploration.planet}`};
        }
        // choix pour le BASE_URL
        // exploration.href = `${process.env.BASE_URL}/explorations/${exploration._id}`;

        exploration.href = `/explorations/${exploration._id}`;
        delete exploration._id;

        return exploration;
    }

}

export default new ExplorationsRepository();