const express = require("express");
const app = express();
const Prolog = require('jsprolog');

app.use(express.static('public'));

app.get('/', function (req, res) {
   res.sendFile('index.html');
});

app.get('/api/sentence/:sentence', function (req, res) {
   // res.send(req.params.sentence);
   res.send(recognizeSentence(req.params.sentence));
});

// console.log("parser")
// console.log(Object.keys(Prolog))
// console.log(Prolog.default.Parser)
const db = Prolog.default.Parser.parse("cat(mruczek). cat(lohn). cat(heniek).");

const query = Prolog.default.Parser.parseQuery("cat(mruzek).");
// const iter = Prolog.default.Solver.query(db, query);
const iter = Prolog.default.Solver.query(db, query);

function recognizeSentence(sentence){

	
	var result = /^k/.test(sentence);


	return result;
}

// console.log("dwq",recognizeSentence("d"))

// console.log(iter.next())
// while(iter.next()){
//     // console.log("X = ", iter.current.X);
//     console.log(iter);
// }

const server = app.listen(4000, function () {
   const host = server.address().address
   const port = server.address().port   
   console.log("Example app listening at http://%s:%s", host, port)
})