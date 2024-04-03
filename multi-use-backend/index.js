const { v4: generateId } = require('uuid');
const express = require('express');
const app = express();
const fs = require('fs').promises;
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');

const filePath = path.join(process.cwd(), 'db.json');
const writeToFile = (incomingObject) => {
	let text = JSON.stringify(incomingObject, null, 2);
	if (text === '""') {
		text = '';
	}
	return fs.writeFile(filePath, text, (err) => {
		if (err) {
			console.error(err);
		} else {
			console.log('File written successfully');
		}
	});
}

const readFile = async () => {
	const response = await fs.readFile(filePath, 'utf8');
	console.log('response: ', JSON.parse(response));
	if (response) {
		return JSON.parse(response);
	}
	return '';
}

app.use(cors({
	origin: true,
	methods: ['GET', 'PUT', 'POST', 'DELETE']
}));

app.use(bodyParser.json());

app.get('/:id', async (req, res) => {
	let data = await readFile();
	if (req.params.id && data[req.params.id]) {
		res.status(200).send({
			status: 'success',
			data: data[req.params.id]
		});
	}
	res.status(404).send({
		status: 'not found',
		data: data[req.params.id]
	});
});

app.put('/:id', async (req, res) => {
	let data = await readFile();
	if (req.params.id && data[req.params.id]) {
		data[req.params.id] = {
			id: req.params.id,
			...req.body 
		}
		await writeToFile(data);
		res.status(200).send({
			status: 'success',
			data: data[req.params.id]
		});
	}
	res.status(404).send({
		status: 'not found',
		data: data[req.params.id]
	});
});


app.delete('/:id', async (req, res) => {
	let data = await readFile();
	if (req.params.id && data[req.params.id]) {
		delete data[req.params.id];
		await writeToFile(data);
		res.status(200).send({
			status: 'success',
			data: data[req.params.id]
		});
	}
	res.status(404).send({
		status: 'not found',
		data: data[req.params.id]
	});
});

app.get('/', async (req, res) => {
	let data = await readFile();
	res.status(200).send({
		status: 'success',
		data
	});
});

app.post('/', async (req, res) => {
	let data = await readFile();
	console.log('data: ', data)
	if (data === '') {
		data = {};
	};
	const id = generateId();
	data[id] = {
		id,
		...req.body 
	};
	console.log('data: ', data)
	await writeToFile(data);
	res.status(200).send({
		status: 'success',
		data: data[id]
	});
});

app.delete('/', async (req, res) => {
	let data = '';
	await writeToFile(data);
	res.status(200).send({
		status: 'success'
	});
});

app.listen(4110, () => {
	console.log('listening on port 4110');
}, );