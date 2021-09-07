import express from 'express';
import HttpError from 'http-errors';
import Http from 'http-status';
import PLANETS from '../data/planets.js';


const router = express.Router();


class PlanetsRoutes {
    constructor() {
        //Definition des routes pour la ressource planet 
        router.get('/planets', this.getAll); //Retrieve  toutes les planetes
        router.get('/planets/:idPlanet', this.getOne);
        router.post('/planets', this.post);
    }
    getAll(req, res, next) {
        res.status(200);
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

    }
}

//Super important, ne pas oublier ces deux lignes
new PlanetsRoutes();
export default router;