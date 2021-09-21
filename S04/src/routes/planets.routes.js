import express from 'express';
import HttpError from 'http-errors';
import httpStatus from 'http-status';
import HttpStatus from 'http-status';
import planets from '../data/planets.js';

import PLANETS from '../data/planets.js';

import planetsRepository from '../repositories/planets.repository.js';


const router = express.Router();


class PlanetsRoutes {
    constructor() {
        //Definition des routes pour la ressource planet 
        router.get('/', this.getAll); //Retrieve  toutes les planetes
        router.get('/:idPlanet', this.getOne);
        router.post('/', this.post);
        router.delete('/:idPlanet', this.deleteOne);
        router.patch('/:idPlanet', this.patch);
        router.put('/:idPlanet', this.put);
    }
    patch(req, res, next) {
        return next(HttpError.NotImplemented());
    }
    put(req, res, next) {
        return next(HttpError.NotImplemented());
    }

    async getAll(req, res, next) {
        //Critere pour la bd 
        const filter = {};
        if (req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }
        //parametre de transformation
        const transformOptions = {};
        if (req.query.unit) {
            const unit = req.query.unit;
            if (unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest('le parametre unit doit avoir la valeur c pour celsius'));
            }
        }
        try {
            let planet = await planetsRepository.retriveAll(filter);
            //Je veux un nouv tableau des planetes transformees
            //map() = une boucle
            planet = planet.map(p => {
                p = p.toObject({ getters: true, virtuals: false });
                p = planetsRepository.transform(p, transformOptions);
                return p;
            });
            res.status(200).json(planet);
        } catch (err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        //parametre de transformation
        const transformOptions = {};
        if (req.query.unit) {
            const unit = req.query.unit;
            if (unit === 'c') {
                transformOptions.unit = unit;
            } else {
                return next(HttpError.BadRequest('le parametre unit doit avoir la valeur c pour celsius'));
            }
        }

        try {
            let planet = await planetsRepository.retriveById(idPlanet);

            //console.log(planet);   
            if (!planet) {
                //2. La planete n'existe pas = 404 - Not Found
                return next(HttpError.NotFound(`la planete avec le id ${idPlanet} n'existe pas`))
            } else {
                planet = planet.toObject({ getters: true, virtuals: false });
                planet = planetsRepository.transform(planet, transformOptions);
                res.status(200);
                res.json(planet); //content-type et send la reponse
            }
        } catch (err) {
            return next(err);
        }


    }
    async post(req, res, next) {
        //pour debogue
        //console.log(req.body);
        const newPlanet = req.body;

        //TODO: Validation rapide jusqu'a la semaine +/- 8
        try {
            //newPlanet -> req.body
            let planetAdded = await planetsRepository.create(newPlanet);
            planetAdded = planetAdded.toObject({ getters: true, virtuals: false });
            planetAdded = planetsRepository.transform(planetAdded);


            res.status(201).json(planetAdded) //created
        } catch (err) {
            return next(err);
        }
    }
    async deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        try {
            const deleteResult = await planetsRepository.delete(idPlanet);
            console.log(deleteResult);
            if (!deleteResult) {
                return next(HttpError.NotFound(`Une planete avec l'identifiant ${idPlanet.id} existe deja.`));
            } else {
                res.status(204).end();
            }
        } catch (err) {
            return next(err);
        }
    }
}
//Super important, ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;