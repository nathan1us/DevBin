const AuthService = {
    auth: () => {
        return fetch('http://localhost:8080/authorize', {
            method: 'GET',
            credentials: 'include'
        })
        .then(res => res.status === 200 ? res.json() : res.text())
        .catch(err => console.error(err));
    },
    login: (data) => {
        return fetch('http://localhost:8080/api/user/login', {
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
    register: (data) => {
        return fetch('http://localhost:8080/api/user/register', {
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
    logout: () => {
        return fetch('http://localhost:8080/api/user/logout', {
            method: 'POST',
            credentials: 'include'
        })
        .then(res => res.text())
        .catch(err => console.error(err));
    },
    edit: (username, data) => {
        return fetch(`http://localhost:8080/api/user/${username}`, {
            method: 'PUT',
            body: JSON.stringify(data),
            credentials: 'include'
        })
        .then(res => res.status === 200 ? res.json() : res.text())
        .catch(err => console.error(err));
    }
}

export default AuthService;