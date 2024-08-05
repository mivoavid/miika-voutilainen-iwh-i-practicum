const express = require('express');
const axios = require('axios');
const app = express();

app.set('view engine', 'pug');
app.use(express.static(__dirname + '/public'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// * Please DO NOT INCLUDE the private app access token in your repo. Don't do this practicum in your normal account.
const PRIVATE_APP_ACCESS = '';

app.get('/', async (req, res) => {
    const discs = 'https://api.hubspot.com/crm/v3/objects/2-32818682?properties=disc_name,speed,manufacturer';
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    try {
        const resp = await axios.get(discs, { headers });
        const data = resp.data.results
              
        res.render('homepage', { title: 'Disc Golf Discs | HubSpot APIs', data });   
    } catch (error) {
        console.error(error);
    }
});


app.get('/update-cobj', async (req, res) => {
    res.render('updates', { title: 'Update Custom Object Form | Integrating With HubSpot I Practicum' });
});

app.post('/update-cobj', async (req, res) => {
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    }
    const update = {
        properties: {
            "disc_name": req.body.discname,
            "manufacturer": req.body.manufacturer,
            "speed": req.body.speed
        }
    };

    const updateDiscsUrl = `https://api.hubapi.com/crm/v3/objects/2-32818682`;

    try {
        await axios.post(updateDiscsUrl, update, { headers });
        res.redirect('/');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error updating custom object');
    }
});

app.listen(3000, () => console.log('Listening on http://localhost:3000'));