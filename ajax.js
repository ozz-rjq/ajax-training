let buttonLoad = document.querySelector('.btn-load');
let buttonSave = document.querySelector('.btn-save');
let dataBlock = document.querySelector('.data');
let line = document.querySelector('.line');

// downloaded json will be stored here
this.data;

// context menu
// let contextMenu = document.querySelector('.context-menu');
// let editBtn = contextMenu.querySelector('.btn-edit');
// let removeBtn = contextMenu.querySelector('.btn-remove');
// let selectedItem;

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
				this.data = JSON.parse(xhr.response);

				buttonLoad.classList.toggle('hideElement');

				this.data.forEach((line, i) => {
					setTimeout(_ => {
						addLine(line);

						if (i === (this.data.length - 1)) {
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
	lineMarkup.classList.add('read-mode');

	let p = document.createElement('p');

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

	dataBlock.appendChild(lineMarkup);
}

function editLine() {
	console.log('edit');
}

// handle context menu
dataBlock.addEventListener('contextmenu', ($) => {
	let target = $.target;

	if (target.tagName === 'P') {
		$.preventDefault();

		selectedItem = target;

		contextMenu.classList.toggle('showElement');
		contextMenu.style.top = `${$.y}px`;
		contextMenu.style.left = `${$.x}px`;
	}
}, true);

// removeBtn.addEventListener('click', e => {
// 	if (selectedItem) {
// 		let property = selectedItem.innerHTML.split(':')[0];
// 		let value = selectedItem.innerHTML.split(':')[1].trim();

// 		console.log(property);
// 		console.log(value);

// 		let result = this.data.filter(item => {
// 			return item[property] === value;
// 		});

// 		console.log(result);

// 		selectedItem.remove();
// 		buttonSave.classList.remove('hideElement');
// 	}
// });

// editBtn.addEventListener('click', e => {
// 	if (selectedItem && buttonSave.classList.contains('hideElement')) {
// 		let textToEdit = selectedItem.outerText.split(':')[1].trim();

// 		console.log(textToEdit);

// 		selectedItem.innerText = selectedItem.outerText.split(':')[0] + ': ';

// 		selectedItem.appendChild(document.createElement('input'));

// 		buttonSave.classList.remove('hideElement');
// 	}
// });

// POST
buttonSave.addEventListener('click', () => {
	console.log('test');

	let xhr = new XMLHttpRequest();

	xhr.open('POST', './server');

	xhr.addEventListener('readystatechange', () => {
		if (xhr.status !== 200) {
			return;
		}

		if (xhr.readyState === 4) {
			console.log('loggg');
		}
	})

	xhr.send(this.data);
});

// hide custom context menu on next events:
// document.addEventListener('click', (e) => {
// 	if (e.target.tagName !== 'SPAN' && contextMenu.classList.contains('showElement')) {
// 		contextMenu.classList.remove('showElement');
// 	}
// });

// document.addEventListener('contextmenu', (e) => {
// 	if (e.target.tagName !== 'SPAN' && contextMenu.classList.contains('showElement')) {
// 		contextMenu.classList.remove('showElement');
// 	}
// });