const express = require("express");
const app = express();

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile('index.html');
});

app.get('/api/sentence/:sentence', function (req, res) {
   res.send(req.params.sentence);
});


const server = app.listen(4000, function () {
   const host = server.address().address
   const port = server.address().port   
   console.log("Example app listening at http://%s:%s", host, port)
})