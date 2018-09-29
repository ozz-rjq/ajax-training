let buttonLoad = document.querySelector('.btn-load');
let buttonSave = document.querySelector('.btn-save');
let dataBlock = document.querySelector('.data');
let line = document.querySelector('.line');

buttonSave.addEventListener('click', saveData);

// downloaded json will be stored here
let data;

// load data using asynchronous ajax call
buttonLoad.addEventListener('click', () => {
	if (dataBlock.innerHTML.trim() === '') {
		let xhr = new XMLHttpRequest();

		xhr.open('GET', './server/data.json', true);

		xhr.addEventListener('readystatechange', () => {
			if (xhr.status !== 200) {
				return;
			}

			if (xhr.readyState === 4) {
				data = JSON.parse(xhr.response);

				buttonLoad.classList.toggle('hideElement');

				data.forEach((line, i) => {
					setTimeout(_ => {
						addLine(line);

						if (i === (data.length - 1)) {
							buttonLoad.classList.toggle('hideElement');
						}
					}, 600*i);
				});
			}
		});

		xhr.send();
	} else {
		alert('Data has already been loaded!');
	}
});

// create html markup for loaded object
function addLine(line) {
	let lineMarkup = document.createElement('div');
	lineMarkup.classList.add('line');

	let p = document.createElement('p');
	p.classList.add('read-mode');

	let nameNode = document.createElement('span');
	nameNode.classList.add('name');
	nameNode.innerHTML = `name: ${line.name}`;

	let ageNode = document.createElement('span');
	ageNode.classList.add('age');
	ageNode.innerHTML = `age: ${line.age}`;

	let cityNode = document.createElement('span');
	cityNode.classList.add('city');
	cityNode.innerHTML = `city: ${line.city}.`

	let btnNode = document.createElement('button');
	btnNode.classList.add('btn');
	btnNode.classList.add('btn-edit');
	btnNode.innerHTML = `Edit`;

	btnNode.addEventListener('click', editLine);

	p.appendChild(nameNode);
	p.appendChild(ageNode);
	p.appendChild(cityNode);
	p.appendChild(btnNode);

	lineMarkup.appendChild(p);

	let editMarkup = document.createElement('p');
	editMarkup.classList.add('edit-mode', 'hideElement');
	editMarkup.innerHTML = `
				<input class="name" name="name" type="text" onchange="enableSaving();">
				<input class="age" name="age" type="text" onchange="enableSaving();">
				<input class="city" name="city" type="text" onchange="enableSaving();">
				<button class="btn btn-cancel" onclick='cancelEditing(this);'>Cancel</button>
	`

	lineMarkup.appendChild(editMarkup)

	dataBlock.appendChild(lineMarkup);
}

function editLine(event) {
	let targetLine = event.target.parentNode.parentNode;
	console.log(targetLine);

	targetLine.querySelector('.read-mode').classList.add('hideElement');
	// get current values
	let name = targetLine.querySelector('.read-mode span.name').innerHTML.split(':')[1].trim();
	let age = targetLine.querySelector('.read-mode span.age').innerHTML.split(':')[1].trim();
	let city = targetLine.querySelector('.read-mode span.city').innerHTML.split(':')[1].trim();
	console.log(name);

	targetLine.querySelector('.edit-mode').classList.remove('hideElement');
	// set current values in inputs
	targetLine.querySelector('.edit-mode input[name=name]').value = name;
	targetLine.querySelector('.edit-mode input[name=age]').value = age;
	targetLine.querySelector('.edit-mode input[name=city]').value = city;
}

function cancelEditing(btn) {
	let targetLine = btn.parentNode.parentNode;

	targetLine.querySelector('.read-mode').classList.remove('hideElement');
	targetLine.querySelector('.edit-mode').classList.add('hideElement');
}

function enableSaving() {
	console.log('test');
	buttonSave.classList.remove('hideElement');
}

function saveData() {
	let allLines = document.querySelectorAll('.line');

	let data = [];

	for (let i = 0; i < allLines.length; i++) {
		editLine(allLines[i]);
		let currentLine = allLines[i].querySelector('.edit-mode');
		let obj = {
			name: currentLine.querySelector('input[name=name]').value,
			age: currentLine.querySelector('input[name=age]').value,
			city: currentLine.querySelector('input[name=city]').value
		}

		data.push(obj);
	}

	console.log(data);
}