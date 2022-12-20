const storeToken = (value: any) => {
    if (value) {
        console.log("Store Token");
        // destructure the value obj we can receive from server
        const { access, refresh } = value;
        // whenever we get token it'll be in the form of an object from server,here we storing obj which ha
        // "access" and "refresh" token we get through the "value".we can save the whole obj as well but here
        // we save one after one values
        localStorage.setItem("access_token", access);
        localStorage.setItem("refresh_token", refresh);
    }
};

const getToken = () => {
    let access_token = localStorage.getItem("access_token");
    let refresh_token = localStorage.getItem("refresh_token");
    // returning both values.we can return both as an obj as well but we returning both separately
    return { access_token, refresh_token };
};

const removeToken = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};

export { storeToken, getToken, removeToken };

// a method to check weather the token is expired or not
// const isTokenExpired = token => Date.now() >= (JSON.parse(atob(token.split('.')[1]))).exp * 1000
