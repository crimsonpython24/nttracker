import jQuery from 'jquery';
import { useHistory } from 'react-router-dom';

function getCookie(name) {
  let cookieValue = null;
  if (document.cookie && document.cookie !== '') {
    let cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      let cookie = jQuery.trim(cookies[i]);
      if (cookie.substring(0, name.length + 1) === name + '=') {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

function fetchData(url, met, data = null) {
  return fetch(url, {
    method: met,
    credentials: 'include',
    headers: {
      Accept: 'application/json',
      'X-Requested-With': 'XMLHttpRequest',
      'X-CSRFToken': getCookie('csrftoken'),
    },
    body: JSON.stringify(data),
  }).then(response => {
    if (response.status === 400) {
      return response.json().then(json => {
        return Promise.reject(json);
      });
    } else {
      return response.json();
    }
  });
}

export { fetchData };
