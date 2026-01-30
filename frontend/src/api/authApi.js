import api from "./axios";


export const register = (data) => {
    return api.post('/auth/register', data);
};

export const login = async (data) => {
    const res = await api.post('/auth/login', data);
    const payload = res.data;
    if (!payload?.success) {
        throw new Error(payload?.message || "Login failed");
    }
    const { token, role } = payload?.data || {};
    if (token) {
        localStorage.setItem('authToken', token);
    }
    if (role) {
        localStorage.setItem('role', role);
    }
    return payload;
}
export const saveAuth = (token, role) => {
    localStorage.setItem('authToken', token);
    localStorage.setItem('role', role);
}




export const logout = () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('role');
};
