const log = console.log;
import express from 'express';
import dayjs from 'dayjs';
import PlanetsRoutes from './routes/planets.routes.js';
import methodMiddlewares from './middlewares/method.js';
import errorsMiddlewares from './middlewares/errors.js';
import elementsRoutes from './routes/elements.routes.js';

const app = express();

app.use(express.json());

app.use(methodMiddlewares);
app.use('/planets', PlanetsRoutes);
app.use('/elements', elementsRoutes);

app.get('/premiere', (req, res) => {
    res.status(200);
    res.set('Content-type', 'text/plain');
    res.send('Notre premiere route avec express');
});

app.get('/date', (req, res) => {
    res.status(200);
    res.set('Content-type', 'text/plain');
    res.send(dayjs().format("YYYY-MM-DD HH:mm"));
});


//pour passer des parametres dans les operations****
app.get('/maths/:operation', (req, res) => {
    const operation = req.params.operation
    log(operation);
    
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);
    let result = 0;
    switch (operation) {
        case 'somme':
            result = a+b;
            break;
        case 'difference':
            result = a-b;
            break;
        case 'produit':
            result = a*b;
            break;
        case 'quotient':
            result = a/b;
            break;
        case 'reste':
            result = a%b;
            break;
        default:
            res.status(400);
            //on met un return pour sortir directement de la fonction sinon les lignes 52,53,54 font causer une erreur...
            return res.send('Operation non reconnue');
            //on pourrais aussi faire 
            //return res.end();
    }
    res.status(200);
    res.set('Content-type', 'text/html');
    res.send(`${result}`);
    /*//log(req.query);
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);
    //res.send((a + b).toString());
    //meme chose que*/

});

app.use(errorsMiddlewares);
export default app;