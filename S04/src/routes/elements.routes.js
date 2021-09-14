import express from 'express';
import HttpErrors from 'http-errors';
import httpStatus from 'http-status';
import ELEMENTS from '../data/elements.js';

const router = express.Router();

class ElementsRoutes {

    constructor() {
        router.get('/', this.getAll);
        router.post('/', this.post);
        router.get('/:symbol', this.getOne);
        router.delete('/:symbol', this.delete);
        

    }

    getAll(req, res, next) {
       res.status(httpStatus.OK);
       res.json(ELEMENTS);
    }

    getOne(req, res, next) {
       const symbol = req.params.symbol;
       const element = ELEMENTS.find(e => e.symbol == symbol);
       console.log(element);

       if (!element) {
           return next(HttpErrors.NotFound(`l'element avec le symbol ${symbol} n'existe pas`));
       } else {
           res.status(httpStatus.OK);
           res.json(element);
       }
    }

    post(req, res, next) {
        const newElement = req.body;
        const element = ELEMENTS.find(e => e.symbol == newElement.symbol);
         
        if(element) {
            //J'ai un doublon === erreur
            return next(HttpError.Conflict(`Un element avec le symbol ${newElement.symbol} existe deja.`));
        } else {
            ELEMENTS.push(newElement);
            res.status(httpStatus.CREATED); //code: 201
            res.json(newElement);
        }
    }
    
    delete(req, res, next) {
        const symbol = req.params.symbol;
        const index = ELEMENTS.findIndex(e =>  e.symbol == symbol);
        if(index === -1){
            return next(HttpError.NotFound(`Un symbol avec le symbole ${newElement.symbol} existe deja.`));
        } else {
            PLANETS.splice(index, 1);
            res.status(HttpStatus.NO_CONTENT).end();
        }
    }
}

new ElementsRoutes();

export default router;