const API_BASE_URL = 'http://localhost:8000/api';

const apiRoutes = {
    // Autenticação
    login: `${API_BASE_URL}/user/login`,
    autenticar: `${API_BASE_URL}/user/autenticar`,

    // Treinos
    getTreinos: (userId) => `${API_BASE_URL}/treinos/user/${userId}`,
    cadastrarTreino: `${API_BASE_URL}/treinos/cadastrar`,

    // Notificações
    getNotificacoes: (userId) => `${API_BASE_URL}/notificacoes/${userId}`,

    // Adicione outras rotas aqui conforme precisar
};

export default apiRoutes; 