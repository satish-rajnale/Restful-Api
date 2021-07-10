const path = require('path');
const express = require('express');
const open = require('open');
const getPort = require('get-port');

(async function(){
    const app = express();

    const port = await getPort({port : 3000});
    const host = `http://127.0.0.1:${port}`;


    // endpoint to serve web assets
    app.use( '/web', express.static(path.join(__dirname, './src/www')));

    // endpoint to serve images
    app.use( 'files/images', express.static(path.join(__dirname, './src/static/images')));

    //endpoint to serve images.json
    app.get('/api/images', (req, res) => {
        res.contentType('application/json');
        res.sendFile( path.join(__dirname, './src/static/jsons/images.json'));
    });

    app.listen(port, async() =>{
        console.log('express server started');
        await open(`${host}/web`); //opens web/index.html page
    })

} )