const fs = require('fs');
const path = require('path');

let products = () => {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'));
}

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	index: (req, res) => {
		let test = products();
		res.render('index', {products: test});
	},
	search: (req, res) => {
		let results = [];
		let test = products();
		let search = req.body.search;
		let encontrado = test.find(product => product.name == search);
		res.render('results', {encontrado})
	},
};

module.exports = controller;
