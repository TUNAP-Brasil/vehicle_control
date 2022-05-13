// const baseUrl = 'https://tunap-intranet-backend.herokuapp.com/api'; //
const baseUrl = 'http://localhost:8082/api'; //
//
const request = async (method, endpoint, params, token = null, taketwo = null) => {
    try {
        method = method.toLowerCase();
        console.log(token)
        let fullUrl = `${baseUrl}${endpoint}`;
        let body = null;
        switch (method) {
            case 'get':
                let queryString = new URLSearchParams(params).toString();
                fullUrl += `?${queryString}`;
                break;
            case 'post':
            case 'put':
            case 'delete':
                body = JSON.stringify(params);
                break;
        }
        let headers;
        if (taketwo) {
            headers = { 'Content-Type': 'application/pdf' };
        } else {
            headers = { 'Content-Type': 'application/json' };
        }

        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
        let req = await fetch(fullUrl, { method, headers, body });
        let json = await req.json();
        return json;
    } catch (error) {
        return { error: 'Erro de Conexão com API' };
    }
};

export default () => {
    return {
        // funções basicas de login
        getToken: () => {
            return localStorage.getItem('token');
        },
        validateToken: async () => {
            let token = localStorage.getItem('token');
            let json = await request('get', '/product?company_id=1', {}, token);
            console.log(json)
            let username = localStorage.setItem('id_user', json.msg);
            return json;
        },
        login: async (data) => {
           
            let json = await request('post', '/login', data, {});
            return json;
        },
        logout: async () => {
            let token = localStorage.getItem('token');
            let json = await request('post', '/logout', {}, token);
            localStorage.removeItem('token');
            return json;
        },
        checkMe: async () => {
            let token = localStorage.getItem('token');
            let json = await request('post', '/auth/me', {}, token);
            return json;
        },
        signup: async (data) => {
            let json = await request('post', '/register', data, {});
            return json;
        },
        getSchedules: async () => {
            let token = localStorage.getItem('token');
            let json = await request('get', '/service-schedule' ,"company_id=1", token);
            return json;
        },
        delSchedules: async (id) => {
            let token = localStorage.getItem('token');
            let json = await request('get', `/service-schedule/${id}` , {}, token);
            return json;
        },
    };
};
