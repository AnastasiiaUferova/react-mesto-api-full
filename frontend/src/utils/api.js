class Api {
    constructor({ address, headers }) {
        this._address = address;
        this._headers = headers;
    }

    _handleResponse = (response) => {
        if (response.ok) {
            return response.json();
        }
        return Promise.reject(`Ошибка: ${response.status}`);
    }

    getCards() {
        return fetch(`${this._address}/cards`, {
            method: "GET",
            headers: this._headers,
        })
            .then(this._handleResponse);
    }

    addCard(data) {
        return fetch(this._address + "/cards", {
            method: "POST",
            headers: this._headers,
            body: JSON.stringify({
                name: data.name,
                link: data.link
            }),
        })
            .then(this._handleResponse)
    }

    getUserInfo () {
        return fetch(`${this._address}/users/me`, {
            method: "GET",
            headers: this._headers,
        })
        .then(this._handleResponse);
    }

    changeUserInfo (data) {
        return fetch(`${this._address}/users/me`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            name: data.name,
            about: data.about,
        })
    })
    .then(this._handleResponse);
    
    }


    deleteCard(cardId) {
        return fetch (`${this._address}/cards/${cardId}`, {
        method: "DELETE",
        headers:this._headers})
        .then(this._handleResponse);
    }

    changeAvatar(data) {
        return fetch(`${this._address}/users/me/avatar`, {
        method: "PATCH",
        headers: this._headers,
        body: JSON.stringify({
            avatar: data.avatar
        })
    })
    .then(this._handleResponse);
    
}


    changeLikeCardStatus(id, isLiked) {
        return fetch(`${this._address}/cards/${id}/likes`, {
          method: isLiked ? 'DELETE' : 'PUT',
          headers: this._headers,
        })
          .then(this._handleResponse)
      }
    }



const api = new Api({
    address: 'https://mesto-back.u.nomoredomains.xyz',
    headers: {
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
        "Content-Type": "application/json",
        'Accept': 'application/json'
    },
});

export default api