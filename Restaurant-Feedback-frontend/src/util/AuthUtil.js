export const isLoggedIn = () => {
    const session = localStorage.getItem('session')

    if (session == null) return false;
    return true;
}

export const logout = () => {
    localStorage.removeItem('session');
}

export const login = (data) => {
    localStorage.setItem('session', data)
}