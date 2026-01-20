import api from "./axios";


export const register = (data) => {
    return api.post('/auth/register', data);
};

export const login = async (data) => {
    const res = await api.post('/auth/login', data);
    const { token, role } = res.data;
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
    return res.data;
}
export const saveAuth = (token, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
}




export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
};

