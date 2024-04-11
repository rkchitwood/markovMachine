const fs = require('fs');
const markov = require('./markov');
const axios = require('axios');
const process = require('process');

function outputMarkov(text){
    let mm = new markov.MarkovMachine(text);
    console.log(mm.makeText);
}

function generateText(path){
    fs.readFile(path, 'utf8', function(err, data){
        if(err){
            console.error(err);
            process.exit(1);
        }else{
            outputMarkov(data);
        }
    });
}

async function generateTextURL(path){
    let resp;
    try{
        resp = await axios.get(path);
    }catch(err){
        console.error(err);
        process.exit(1);
    }
    outputMarkov(resp.data);
}

let method = process.argv[2];
let path = process.argv[3];

if(method === 'url'){
    generateTextURL(path);
}else if(method === 'file'){
    generateText(path);
}else{
    console.error('invalid argument');
    process.exit(1);
}
