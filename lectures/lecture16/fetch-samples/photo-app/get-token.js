export async function getAccessToken(rootURL, username, password) {
    const postData = {
        username: username,
        password: password,
    };
    const endpoint = `${rootURL}/api/token/`;
    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(postData),
    });
    const data = await response.json();
    return data.access_token;
}

async function printToken() {
    const token = await getAccessToken(
        'https://photo-app-secured.herokuapp.com',
        'jneal3',
        'password'
    );
    console.log(token);
}

printToken()