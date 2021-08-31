const log = console.log;
import express from 'express';
import dayjs from 'dayjs';

const app = express();
app.get('/premiere', (req, res) => {
    res.status(200);
    res.set('Content-type', 'text/plain');
    res.send('Notre premiere route avec express');
});

app.get('/date', (req,res) => {
    res.status(200);
    res.set('Content-type', 'text/plain');
    res.send(dayjs().format("YYYY-MM-DD HH:mm"));
});

app.get('/somme', (req, res) => {
    //log(req.query);
    const a = parseInt(req.query.a, 10);
    const b = parseInt(req.query.b, 10);
    res.status(200);
    res.set('Content-type', 'text/html');
    //res.send((a + b).toString());
    //meme chose que
    res.send(`${a + b}`);

});

export default app;