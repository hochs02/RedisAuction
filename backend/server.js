const express = require('express');
const cors = require('cors');
const app = express();
app.use(cors());
app.use(express.json())
const http = require('http').createServer(app);
const io = require('socket.io')(http, {
    cors: {
        origin: '*'
    }
});
const redis = require('redis');
let redisClient = redis.createClient({
    host: 'localhost',
    port: 6379
})
redisClient.connect();

let sessionID;

io.on('connection', (socket) => {
    console.log("Connected", socket.id);
    sessionID = socket.id;

    socket.on('bid-change', async (data) => {
        await redisClient.set('bids', JSON.stringify(data));
        io.emit('todo-list-did-change', data);
    })

    socket.on('disconnect', () => {
        console.log("Disconnected", socket.id);
    });
});

const auctionData = require('./object');
const key = String('auctionObject:' + auctionData.auctionObject.id);
console.log(key);

let time = 60;
let countdown = setInterval(update, 1000);
function update() {

    let min = Math.floor(time / 60);
    let sec = time % 60;

    sec = sec < 10 ? "0" + sec : sec;

    //console.log(`${min}:${sec}`);
    auctionData.auctionObject.auktionszeit = `${min}:${sec}`;

    time--;
    if (min == 0 && sec == 0) {
        clearInterval(countdown);
        console.log("Countdown ist abgelaufen");
    };

}

const logger = (req, res, next) => {
    console.log(`Received Request ${new Date(Date.now()).toLocaleString('de-DE')}`);
    console.log('HTTP METHOD', req.method);
    console.log('HTTP BODY', req.body);
    console.log('URL PARAMETER', req.params);
    next();
}

app.use(logger);

app.get('/', (req, res, next) => {
    res.status(200).send("Der Server läuft");
})

app.get('/auction', (req, res, next) => {
    try{
        res.status(200).send(auctionData.auctionObject);
    } catch (e) {
        res.status(400).send("Fehlermeldung");
    }
})

app.post('/auction', (req, res, next) => {
    //const time = require('./time');
    const newAuctionObject = {
        'id': req.body.id,
        'name': req.body.name,
        'starthöhe': req.body.starthöhe,
        'intervall': req.body.intervall
    }
    console.log(newAuctionObject);
    try{
        auctionData.auctionObject = newAuctionObject;
        res.status(200).send(auctionData.auctionObject);
    } catch (e) {
        res.status(400).send("Fehlermeldung");
    }
})

app.get('/bids', async (req, res, next) => {
    try {
        const allBids = await redisClient.zRangeWithScores(key, 0, -1)
        res.status(200).send(allBids);
    } catch (e) {
        res.status(400).send("Fehlermeldung: " + e.message);
    }
})

app.post('/bid', async (req, res, next) => {
    const newBid = {
        'nutzer': sessionID || req.body.nutzer, //req.body.nutzer wird aktuell nur für postman zum testen verwendet
        'betrag': req.body.betrag
    }
    console.log(newBid);
    const letztesGebot = Math.max(...auctionData.bids.map(o => o.betrag));
    if (newBid.betrag > letztesGebot + auctionData.auctionObject.intervall) {
        //try {
            await redisClient.zAdd(key, { score: newBid.betrag, value: String(newBid.nutzer)});
            //auctionData.bids.push(newBid);
            const allBids = await redisClient.zRangeWithScores(key, 0, -1)
            res.status(200).send(allBids);
        /**} catch (e) {
            res.status(400).send("Fehlermeldung: " + e.message);
        }*/
    } else {
        res.status(404).send("Das Gebot war zu niedrig");
    }

})



http.listen(1234, () => {
    console.log("Running on Port 1234");
});

function resolveNotFound(res, message) {
    res.statusCode = 404;
    res.send(message);
    res.end();
    return;
}
