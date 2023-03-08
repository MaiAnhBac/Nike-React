export const loginAndGetToken = (username, password) => {
    return (
        fetch('https://dummyjson.com/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                username: username,
                password: password,
            })
        })
        .then(res => res.json())
    )
};