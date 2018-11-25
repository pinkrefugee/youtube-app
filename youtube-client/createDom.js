const searchDiv = document.createElement('div');
searchDiv.classList.add('search');

document.body.appendChild(searchDiv);

const wrapperDiv = document.createElement('div');
wrapperDiv.classList.add('wrapper');
searchDiv.appendChild(wrapperDiv);


const searchInput = document.createElement('input');
searchInput.setAttribute('type', 'search');
searchInput.classList.add('search-field');

const submitInput = document.createElement('input');
submitInput.setAttribute('type', 'submit');
submitInput.classList.add('search-btn');
submitInput.value = 'ok!';

wrapperDiv.appendChild(searchInput);
wrapperDiv.appendChild(submitInput);

const videosList = document.createElement('div');
videosList.classList.add('videos-list');

const videosContainer = document.createElement('ul');
videosContainer.id = 'results';

videosList.appendChild(videosContainer);
document.body.appendChild(videosList);
