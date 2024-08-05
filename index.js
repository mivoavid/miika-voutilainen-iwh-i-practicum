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
              
        res.render('discs', { title: 'Disc Golf Discs | HubSpot APIs', data });   
    } catch (error) {
        console.error(error);
    }
});


app.get('/update-cobj', async (req, res) => {
   
        res.render('updates', { title: 'Disc Golf Discs | Update / add' });   
   
});

app.post('/update-cobj', async (req, res) => {
    const update = {
        properties: {
            "disc_name": "Test",
            "manufacturer": "Innova",
            "speed": "13"
        }
    }

    const discname = req.query.disc_name;
    const manufacturer = req.query.manufacturer;
    const speed = req.query.speed;
    const updateContact = `https://api.hubapi.com/crm/v3/objects/2-32818682/?idProperty=email`;
    const headers = {
        Authorization: `Bearer ${PRIVATE_APP_ACCESS}`,
        'Content-Type': 'application/json'
    };

    try { 
        await axios.patch(updateContact, update, { headers } );
        res.redirect('back');
    } catch(err) {
        console.error(err);
    }

});


// * Localhost
app.listen(3000, () => console.log('Listening on http://localhost:3000'));