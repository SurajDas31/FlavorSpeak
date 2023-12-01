export const REST_URL = "http://localhost:8080";

export const isLoggedIn = () => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const username = localStorage.getItem('username')

    if (accessToken === null || accessToken === undefined
        || refreshToken === null || refreshToken === undefined
        || username === null || username === undefined) return false;
    return true;
}

export const getUserName = () => {
    return localStorage.getItem("username");
}

export const getAccessToken = () => {
    return localStorage.getItem("accessToken");
}

export const logout = () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('username');

    window.location.href = "/"
}

export const login = (accessToken, refreshToken, username) => {
    localStorage.setItem('accessToken', accessToken)
    localStorage.setItem('refreshToken', refreshToken)
    localStorage.setItem('username', username)
}