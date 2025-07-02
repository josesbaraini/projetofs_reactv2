const API_BASE_URL = 'http://localhost:8000/api';

const apiRoutes = {
    // Base URL
    baseUrl: API_BASE_URL,

    // Autenticação
    desconectar: `${API_BASE_URL}/user/desconectar`,
    cadastro: `${API_BASE_URL}/user/cadastro`,
    login: `${API_BASE_URL}/user/login`,
    autenticar: `${API_BASE_URL}/user/autenticar`,
    //dados
    getDadosBasicos:(userId)=> `${API_BASE_URL}/user/dadosbasicos/${userId}`,
    getDadosAvancandos:(userId)=> `${API_BASE_URL}/user/dadosavancados/${userId}`,
    atualizarDadosBasicos:(userId)=> `${API_BASE_URL}/user/dadosbasicos/${userId}`,
    atualizarDadosAvancandos:(userId)=> `${API_BASE_URL}/user/dadosavancados/${userId}`,

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