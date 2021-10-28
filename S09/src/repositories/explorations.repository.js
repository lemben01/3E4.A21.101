import Exploration from '../models/exploration.model.js';

class ExplorationsRepository {

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
            //on vas devoir faire qqch ici
        } else {
            //on ne veut pas embed la planet
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