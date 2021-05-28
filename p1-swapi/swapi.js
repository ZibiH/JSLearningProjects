const app = document.getElementById('app');
const swapiPeopleUl = document.createElement('ul');
const fetchMoreBtn = document.createElement('button');
fetchMoreBtn.textContent = 'Fetch more...';
app.appendChild(swapiPeopleUl);
app.appendChild(fetchMoreBtn);
let url = 'https://swapi.dev/api/people/';

const createListEl = (person) => {
	const listItem = document.createElement('li');
	listItem.innerHTML = `
    <h2>${person.name}</h2>
    <p><span>gender:</span> ${person.gender}</p>
    <p><span>height:</span> ${person.height}</p>
    <p><span>eye color:</span> ${person.eye_color}</p>
    <p><span>hair color:</span> ${person.hair_color}</p>
    <p><span>homewolrd:</span><a href="${person.homeworld}" target="_balnk">link</a></p>
    `;
	swapiPeopleUl.appendChild(listItem);
};

const collectData = () => {
	const peopleId = [];

	const checkData = (response) => {
		if (!response) {
			console.log('Hmmm, there is no data to fetch or some other issue...');
		}
		if (!response.ok) throw new Error(`Status code: ${response.status}`);
		return response.json();
	};

	const parseData = (data) => {
		for (let person of data.results) {
			peopleId.push(person);
		}

		const nextUrl = Promise.resolve(data.next);
		url = data.next;
		return nextUrl;
	};

	const fetchMoreData = (url) => {
		return fetch(url);
	};

	const createPeopleList = () => {
		peopleId.forEach((person) => {
			createListEl(person);
		});
	};

	fetchMoreData(url)
		.then(checkData)
		.then(parseData)
		.then(createPeopleList)
		.catch((err) => {
			throw new Error(err);
		});

	fetchMoreBtn.addEventListener('click', collectData);
};

collectData();
