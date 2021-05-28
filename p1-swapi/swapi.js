const app = document.getElementById('app');
const swapiPeopleUl = document.createElement('ul');
const fetchMoreBtn = document.createElement('button');
fetchMoreBtn.textContent = 'Fetch more...';
app.appendChild(swapiPeopleUl);
app.appendChild(fetchMoreBtn);
let url = 'https://swapi.dev/api/people/';

const hover3dEffect = (event) => {
	const targetedLi = event.target.closest('li');
	const posX = (targetedLi.offsetWidth / 2 - event.offsetX) / 30;
	const posY = (targetedLi.offsetHeight / 2 - event.offsetY) / 26;
	targetedLi.style.transform = `rotateY(${posX}deg) rotateX(${posY}deg)`;
};

const removeTransition = (event) => {
	event.target.style.transition = 'none';
};

const resetCard = (event) => {
	event.target.style.transition = 'transform 0.5s ease, opacity 0.3s ease';
	event.target.style.transform = 'rotateX(0deg) rotateY(0deg)';
};

const createListEl = (person) => {
	const listItem = document.createElement('li');
	listItem.innerHTML = `
    <h2>${person.name}</h2>
    <p><span>gender:</span> ${person.gender}</p>
    <p><span>birth year:</span> ${person.birth_year}</p>
    <p><span>height:</span> ${person.height}</p>
    <p><span>body mass:</span> ${person.mass}</p>
    <p><span>eye color:</span> ${person.eye_color}</p>
    <p><span>hair color:</span> ${person.hair_color}</p>
    <p><span>skin color:</span> ${person.skin_color}"</p>
    `;
	listItem.addEventListener('mousemove', hover3dEffect);
	listItem.addEventListener('mouseenter', removeTransition);
	listItem.addEventListener('mouseleave', resetCard);
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
