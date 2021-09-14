import express from 'express';
import HttpError from 'http-errors';
import httpStatus from 'http-status';
import HttpStatus from 'http-status';
import PLANETS from '../data/planets.js';


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

    getAll(req, res, next) {
        res.status(HttpStatus.OK);
        res.set('Content-Type', 'application/json');

        res.send(PLANETS);
    }
    getOne(req, res, next) {
        const idPlanet = req.params.idPlanet;
        
        //1. La planete existe = 200 - Ok
        const planet = PLANETS.find(p => p.id == idPlanet);
        console.log(planet);
        
        if(!planet) {
            //2. La planete n'existe pas = 404 - Not Found
            return next(HttpError.NotFound(`la planete avec le id ${idPlanet} n'existe pas`))
        } else {
        res.status(200);
        res.json(planet); //content-type et send la reponse
        }
        
    }
    post(req, res, next) {
        //pour debogue
        //console.log(req.body);
        const newPlanet = req.body;

        const planet = PLANETS.find(p => p.id == newPlanet.id);
        if(planet) {
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
        const index = PLANETS.findIndex(p =>  p.id == idPlanet);
        if(index === -1){
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