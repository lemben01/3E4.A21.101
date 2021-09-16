import express from 'express';
import HttpError from 'http-errors';
import httpStatus from 'http-status';
import HttpStatus from 'http-status';

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

        const filter = {};
        if (req.query.explorer) {
            filter.discoveredBy = req.query.explorer;
        }

        try {
            const planet = await planetsRepository.retriveAll(filter);
            res.status(200).json(planet);
        } catch(err) {
            return next(err);
        }
    }

    async getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;

        try {
            const planet = await planetsRepository.retriveById(idPlanet);
            //console.log(planet);   
            if (!planet) {
                //2. La planete n'existe pas = 404 - Not Found
                return next(HttpError.NotFound(`la planete avec le id ${idPlanet} n'existe pas`))
            } else {
                res.status(200);
                res.json(planet); //content-type et send la reponse
            }
        } catch (err) {
            return next(err);
        }


    }
    post(req, res, next) {
        //pour debogue
        //console.log(req.body);
        const newPlanet = req.body;

        const planet = PLANETS.find(p => p.id == newPlanet.id);
        if (planet) {
            //J'ai un doublon === erreur
            return next(HttpError.Conflict(`Une planete avec l'identifiant ${newPlanet.id} existe deja.`));
        } else {
            PLANETS.push(newPlanet);
            res.status(httpStatus.CREATED); //code: 201
            res.json(newPlanet);
        }
    }
    deleteOne(req, res, next) {
        const idPlanet = req.params.idPlanet;
        const index = PLANETS.findIndex(p => p.id == idPlanet);
        if (index === -1) {
            return next(HttpError.NotFound(`Une planete avec l'identifiant ${newPlanet.id} existe deja.`));
        } else {
            PLANETS.splice(index, 1);
            res.status(HttpStatus.NO_CONTENT).end();
        }
    }
}

//Super important, ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;