const fs = require('fs');
const path = require('path');

let products = () => {
	return JSON.parse(fs.readFileSync(path.join(__dirname, '../data/productsDataBase.json'), 'utf-8'));
}
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {

	// Detail - Detail from one product
	detail: (req, res) => {
		let id = req.params.id;
		let productes = products()
		let found = productes.find(producto => producto.id == id);
		let title = found.name;
		res.render("detail", {found, title: title});
	},

	// Create - Form to create
	create: (req, res) => {
		res.render('product-create-form.ejs')
	},
	
	// Create -  Method to store
	store: (req, res) => {
		let productes = products();
		let show = products();
		let producto = {
			id: productes.length + 2,
			name: req.body.name,
			price: req.body.price,
			discount: req.body.discount,
			category: req.body.category,
			description: req.body.description,
			image: req.file.filename
		}
		productes.push(producto);
		productes = JSON.stringify(productes, null, ' ');
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), productes);
		res.render('index', {products: show});
	},

	// Update - Form to edit
	edit: (req, res) => {
		let productes = products();
		let id = req.params.id;
		let found = productes.find(producto => producto.id == id);
		let title = found.name;
		res.render('product-edit-form.ejs', {productToEdit: found, title: title})
	},
	// Update - Method to update
	update: (req, res) => {
		let productes = products();
		let show = products();
		let id = req.params.id;
		productes.forEach(product => {
			if(product.id == id) {
			let test = {
				id: req.params.id,
				name: req.body.name,
				price: req.body.price,
				discount: req.body.discount,
				category: req.body.category,
				description: req.body.description
			}
		}
		productes = JSON.stringify(productes, null, '');
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), productes);
		res.render('index', {products: show});
		});
	},

	// Delete - Delete one product from DB
	destroy : (req, res) => {
		let productes = products();
		let show = products();
		let newDB = productes.filter(producto => producto.id != req.params.id);
		productes = JSON.stringify(newDB, null, "");
		fs.writeFileSync(path.join(__dirname, '../data/productsDataBase.json'), productes);
		let camino = '../../public/images/products/' + newDB[req.params.id + 1].image
		fs.unlink(camino, (err) => {
			if(err) {
				console.error(err);
				return;
			}})
			res.json(camino)

		}
};

module.exports = controller;