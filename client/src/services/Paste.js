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
    }
}

export default PasteService;