export const REST_URL = "http://localhost:8080";

export const isLoggedIn = async () => {
    const accessToken = localStorage.getItem('accessToken')
    const refreshToken = localStorage.getItem('refreshToken')
    const username = localStorage.getItem('username')

    if (accessToken === null || accessToken === undefined
        || refreshToken === null || refreshToken === undefined
        || username === null || username === undefined) return false;

    try {
        var res = await fetch(REST_URL + "/api/v1/auth/valid/accessToken", {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + getAccessToken()
            }
        })
        if (res.status === 200) {
            let data = await res.json()
            return data.status === "true";
        }
    } catch (error) {
        console.error(error);
        return false;
    }
    return true;
}

export const getUserName = () => {
    return localStorage.getItem("username");
}

export const getUserId = () => {
    return localStorage.getItem("id");
}

export const getRole = () => {
    return localStorage.getItem("role");
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

export const login = (data) => {
    localStorage.setItem('accessToken', data.accessToken)
    localStorage.setItem('refreshToken',  data.refreshToken)
    localStorage.setItem('id',  data.person.id)
    localStorage.setItem('username',  data.person.firstName + " " + data.person.lastName)
    localStorage.setItem('role', data.person.role)
}