// use express to make a server for the images and jsons in the asset folder
// we need a couple functions
// =external=
// 1. serve some images and their data (loaded from the jsons)
// =internal=
// 1. get the names, path, and data of the images that match a given set of filters
    /* Filterable properties: (all stored in the json) (each is optional for the filter)
        * name (regex filters)
        * date minted
        * mint price
        * tags
        * number of squares in the image
        * colors present in the image
    */

// import 
import NFTDatabase from './nft-database';

const express = require('express');
const app = express();
app.use(express.static('assets'));

app.get('/nfts', (req, res) => {
    let nfts = NFTDatabase.get_all_nfts();
    let nfts_filtered = NFTDatabase.filter_by(nfts, "tags", ["bears"], ["bears"]);
    res.send(nfts_filtered);
}
