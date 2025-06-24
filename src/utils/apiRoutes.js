const API_BASE_URL = 'https://mygymapi.dev.vilhena.ifro.edu.br/api';

const apiRoutes = {
    // Base URL
    baseUrl: API_BASE_URL,

    // Autenticação
    desconectar: `${API_BASE_URL}/user/desconectar`,
    cadastro: `${API_BASE_URL}/user/cadastro`,
    login: `${API_BASE_URL}/user/login`,
    autenticar: `${API_BASE_URL}/user/autenticar`,

    // Treinos
    getTreinos: (userId) => `${API_BASE_URL}/treinos/user/${userId}`,
    cadastrarTreino: `${API_BASE_URL}/treinos/cadastrar`,
    deletarTreino: (treinoId) => `${API_BASE_URL}/treinos/deletar/${treinoId}`,

    // Notificações
    getNotificacoes: (userId) => `${API_BASE_URL}/notificacoes/${userId}`,
    patchNotificacoes: (userId) => `${API_BASE_URL}/notificacoes/${userId}`,

    // Adicione outras rotas aqui conforme precisar
};

export default apiRoutes; 