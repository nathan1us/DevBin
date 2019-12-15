const PasteService = {
    create: (data) => {
        return fetch('http://localhost:8080/api/pastes/create', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.status === 200 ? res.json() : res.text())
        .catch(err => console.error(err)); 
    },
    get: (id) => {
        return fetch(`http://localhost:8080/api/pastes/${id}`, {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.status === 200 ? res.json() : res.text())
        .catch(err => console.error(err));
    },
    edit: (id, data) => {
        return fetch(`http://localhost:8080/api/pastes/${id}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include'
        })
        .then(res => res.text())
        .catch(err => console.error(err));
    },
    delete: (id) => {
        return fetch(`http://localhost:8080/api/pastes/${id}`, {
            method: 'DELETE',
            credentials: 'include'
        })
        .then(res => res.text())
        .catch(err => console.error(err));
    }
}

export default PasteService;