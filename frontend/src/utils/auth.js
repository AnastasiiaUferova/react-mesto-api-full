export const BASE_URL = 'https://mesto-back.u.nomoredomains.xyz';


const checkResponse = (response) => {
  if (response.ok) {
    return response.json()
  }
  return Promise.reject(`Ошибка ${response.status}`);
}


  export const register = (email, password) => {
    return fetch(`${BASE_URL}/signup`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
  };



  export const authorize = (email, password) => {
    return fetch(`${BASE_URL}/signin`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      mode: 'no-cors',
      body: JSON.stringify({email, password})
    })
    .then(checkResponse)
  }; 

  
  export const getContent = (token) => {
    return fetch(`${BASE_URL}/users/me`, {
      method: 'GET',
      mode: 'no-cors',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      }
    })
    .then(res => res.json())
    .then(data => data)
  } 