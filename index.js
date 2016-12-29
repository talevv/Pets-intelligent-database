"use strict";

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
const db = Prolog.default.Parser.parse("cat(mruczek). cat(lohn). cat(heniek). cat(basia). dog(azor). dog(mika). hamster(niuniek). like(azor, mruczek). like(mruczek, azor). liveinpeace(X, Y) :- like(X, Y),like(Y, X).");

// const query = Prolog.default.Parser.parseQuery("cat(mruzek).");
// // const iter = Prolog.default.Solver.query(db, query);
// const iter = Prolog.default.Solver.query(db, query);


function recognizeSentence(sentence){
	console.log(sentence)
	sentence = sentence.toLowerCase();
	// pokaż mi wszystkie koty
	let result = /^(P|p)okaż mi wszystkie (koty|kotki)/.test(sentence);
	if(result){
		console.log("Pytanie o wszystkie koty")
		const query = Prolog.default.Parser.parseQuery("cat(X).");
		const iter = Prolog.default.Solver.query(db, query);
		const cats = [];
		while(iter.next()){
		    cats.push(iter.current.X);
		}

		return cats;
	}

	result = /^(P|p)okaż mi wszystkie (psy|pieski)/.test(sentence);
	if(result){
		console.log("Pytanie o wszystkie psy")
		const query = Prolog.default.Parser.parseQuery("dog(X).");
		const iter = Prolog.default.Solver.query(db, query);
		const dogs = [];
		while(iter.next()){
		    dogs.push(iter.current.X);
		}

		return dogs;
	}

	result = /^(P|p)okaż mi wszystkie (chomiki|chomiczki)/.test(sentence);
	if(result){
		console.log("Pytanie o wszystkie chomiki")
		const query = Prolog.default.Parser.parseQuery("hamster(X).");
		const iter = Prolog.default.Solver.query(db, query);
		const hamsters = [];
		while(iter.next()){
		    hamsters.push(iter.current.X);
		}

		return hamsters;
	}

	result = /^(C|c)zy .* .est kotem/.test(sentence);
	if(result){
		
		console.log("Pytanie o kota")
		let newQuestion = sentence.replace("czy ", "");
		newQuestion = newQuestion.replace("Czy ", "");
		newQuestion = newQuestion.replace(" jest kotem", "");
		newQuestion = newQuestion.replace("jest kotem", "");
		newQuestion = newQuestion.replace(" jest kotem ", "");
		// console.log("newQuestion", newQuestion)
		const query = Prolog.default.Parser.parseQuery(`cat(${newQuestion.toString()}).`);
		const iter = Prolog.default.Solver.query(db, query);
		
		// console.log("wynik prologa", iter.next())
		return iter.next();
	}

	result = /^(C|c)zy .* .est psem/.test(sentence);
	if(result){
		
		console.log("Pytanie o psa")
		let newQuestion = sentence.replace("czy ", "");
		newQuestion = newQuestion.replace("Czy ", "");
		newQuestion = newQuestion.replace(" jest psem", "");
		newQuestion = newQuestion.replace("jest psem", "");
		newQuestion = newQuestion.replace(" jest psem ", "");
		// console.log("newQuestion", newQuestion)
		const query = Prolog.default.Parser.parseQuery(`dog(${newQuestion.toString()}).`);
		const iter = Prolog.default.Solver.query(db, query);
		
		// console.log("wynik prologa", iter.next())
		return iter.next();
	}

	result = /^(C|c)zy .* .est chomikiem/.test(sentence);
	if(result){
		
		console.log("Pytanie o chomika")
		let newQuestion = sentence.replace("czy ", "");
		newQuestion = newQuestion.replace("Czy ", "");
		newQuestion = newQuestion.replace(" jest chomikiem", "");
		newQuestion = newQuestion.replace("jest chomikiem", "");
		newQuestion = newQuestion.replace(" jest chomikiem ", "");
		// console.log("newQuestion", newQuestion)
		const query = Prolog.default.Parser.parseQuery(`hamster(${newQuestion.toString()}).`);
		const iter = Prolog.default.Solver.query(db, query);
		
		// console.log("wynik prologa", iter.next())
		return iter.next();
	}

	result = /^(C|c)zy .* i .* ży.* w poko*/.test(sentence);
	if(result){
		
		console.log("Pytanie o pokój")
		let newQuestion = sentence.replace("czy ", "");
		newQuestion = newQuestion.replace("Czy ", "");
		newQuestion = newQuestion.replace(" żyją w pokoju", "");
		newQuestion = newQuestion.replace(" żyje w pokoju", "");
		newQuestion = newQuestion.split('i');
		
		const query = Prolog.default.Parser.parseQuery(`liveinpeace(${newQuestion[0].toString()}, ${newQuestion[1].toString()}).`);
		const iter = Prolog.default.Solver.query(db, query);
		
		return iter.next();
	}
	
}

// console.log("czy zyje w pokoju",recognizeSentence())
console.log("czy zyje w pokoju");
const query = Prolog.default.Parser.parseQuery("liveinpeace(mruczek, bartek).");
const iter = Prolog.default.Solver.query(db, query);
console.log(iter.next());

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