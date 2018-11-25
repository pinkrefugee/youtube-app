let videosPerPage = 4;
let position = 0;
let token;
let q;
const width = 330;

function search() {
  const list = document.getElementsByTagName('ul')[0];
  list.innerHTML = '';
  list.style.marginLeft = 0;
  position = 0;
  q = document.getElementsByClassName('search-field')[0].value;

  fillDom(q).then(id => getVideoViews(id))
    .then(() => addNavigation()).then(() => setArrowsListeners())
    .then(() => addMediaListeners())
    .then(() => swipePage());
}

document.getElementsByClassName('search-btn')[0].addEventListener('click', search);


function getOutput(item) {
  const videoId = item.id.videoId;
  const title = item.snippet.title;
  const description = item.snippet.description;
  const thumb = item.snippet.thumbnails.medium.url;
  const channelTitle = item.snippet.channelTitle;
  const videoDate = item.snippet.publishedAt.slice(0, 10);

  const output = `${'<li>'
    + '<div class="video-title"><a target="_blank" href="https://www.youtube.com/watch?v='}${videoId}">${title}</a></div>`
    + `<img src="${thumb}">`
    + `<div class="video-description"><p>${description}</p></div>`
    + `<h3>${channelTitle}</h3>`
    + `<h3>${videoDate}</h3>`
    + '</li>'
    + '';

  return output;
}
function getVideoViews(id) {
  const url2 = new URL('https://www.googleapis.com/youtube/v3/videos');
  const params2 = {
    part: 'statistics', type: 'video', id, key: 'AIzaSyByx6vycUSOJvm5lh8quiEFAQPemW80gyM',
  };
  Object.keys(params2).forEach(key => url2.searchParams.append(key, params2[key]));

  return fetch(url2)
    .then(response => response.json())
    .then((x) => {
      const list = document.getElementsByTagName('li');
      const l = list.length;
      if (list.length > 15) {
        for (let i = 1; i < 16; i++) {
          list[l - i].innerHTML += `<h3>Views: ${x.items[15 - i].statistics.viewCount}</h3`;
        }
      } else {
        for (let i = 0; i < list.length; i++) {
          list[i].innerHTML += `<h3>Views: ${x.items[i].statistics.viewCount}</h3`;
        }
      }
    });
}

function fillDom(q) {
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  const params = {
    part: 'snippet, id', q, type: 'video', maxResults: 15, key: 'AIzaSyByx6vycUSOJvm5lh8quiEFAQPemW80gyM',
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetch(url).then(response => response.json()).then((data) => {
    token = data.nextPageToken;
    let videosIdList = '';
    for (let i = 0; i < data.items.length; i++) {
      const output = getOutput(data.items[i]);
      document.getElementById('results').innerHTML += output;
      videosIdList += `${data.items[i].id.videoId},`;
    }
    return videosIdList;
  });
}


function setArrowsListeners() {
  document.getElementsByClassName('prev')[0].onclick = function () {
    turnPage('left');
  };
  document.getElementsByClassName('next')[0].onclick = function () {
    turnPage('right');
  };
}


function turnPage(direction) {
  const list = document.getElementsByTagName('ul')[0];
  const listElems = document.getElementsByTagName('li');
  const dots = document.getElementsByClassName('dot');

  if (direction === 'left') {
    if (position === 0) return;
    position += width * videosPerPage;
    list.style.marginLeft = `${position}px`;
    for (let i = 1; i < dots.length; i++) {
      if (dots[i].classList.contains('active')) {
        dots[i].classList.remove('active');
        dots[i - 1].classList.add('active');
        break;
      }
    }
  } else {
    position -= width * videosPerPage;
    list.style.marginLeft = `${position}px`;
    for (let i = 0; i < dots.length - 1; i++) {
      if (dots[i].classList.contains('active')) {
        dots[i].classList.remove('active');
        dots[i + 1].classList.add('active');
        break;
      }
    }
    const pagesNumber = getNumberOfPages(listElems.length, videosPerPage);
    if (position === -width * videosPerPage * (pagesNumber - 1)) {
      loadNewChunk();
    }
  }
}


function sliderNavigation() {
  const dotsContainer = document.getElementsByClassName('dots')[0];
  dotsContainer.innerHTML = '';
  const liList = document.getElementsByTagName('li');
  const pagesNumber = getNumberOfPages(liList.length, videosPerPage);
  for (let i = 0; i < pagesNumber; i++) {
    const div = document.createElement('div');
    div.className = 'dot';
    div.onclick = function () { setCurrentPage(i + 1); };
    const span = document.createElement('span');
    span.className = 'tooltiptext';
    span.innerHTML = `page${i + 1}`;
    div.appendChild(span);
    dotsContainer.appendChild(div);
  }
  const currentPage = getCurrentPage(position, videosPerPage);
  document.getElementsByClassName('dot')[currentPage - 1].classList.add('active');
}


function setCurrentPage(i) {
  const list = document.getElementsByTagName('ul')[0];
  const liList = document.getElementsByTagName('li');
  const currentPage = getCurrentPage(position, videosPerPage);
  const dif = currentPage - i;
  position += width * videosPerPage * dif;
  list.style.marginLeft = `${position}px`;
  const dots = document.getElementsByClassName('dot');
  for (let i = 0; i < dots.length; i++) {
    dots[i].classList.remove('active');
  }
  dots[i - 1].classList.add('active');
  if (i === Math.ceil(liList.length / videosPerPage)) {
    loadNewChunk();
  }
}

function loadNewChunk() {
  getVideos(token).then(id => getVideoViews(id)).then(() => sliderNavigation());
}


function getVideos(t) {
  const url = new URL('https://www.googleapis.com/youtube/v3/search');
  const params = {
    part: 'snippet, id', q, pageToken: t, type: 'video', maxResults: 15, key: 'AIzaSyByx6vycUSOJvm5lh8quiEFAQPemW80gyM',
  };
  Object.keys(params).forEach(key => url.searchParams.append(key, params[key]));
  return fetch(url).then(response => response.json()).then((data) => {
    token = data.nextPageToken;
    let videosIdList = '';
    data.items.forEach((item, i) => {
      const output = getOutput(item);
      document.getElementById('results').innerHTML += output;
      videosIdList += `${data.items[i].id.videoId},`;
    });
    return videosIdList;
  });
}


