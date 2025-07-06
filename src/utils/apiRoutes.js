
import dotenv from "dotenv";

dotenv.config({ path: '../.env' });

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const apiRoutes = {


    // Autenticação
    desconectar: `${API_BASE_URL}/user/desconectar`,
    cadastro: `${API_BASE_URL}/user/cadastro`,
    login: `${API_BASE_URL}/user/login`,
    autenticar: `${API_BASE_URL}/user/autenticar`,
    //dados
    getDadosBasicos: (userId) => `${API_BASE_URL}/user/dadosbasicos/${userId}`,
    getDadosAvancandos: (userId) => `${API_BASE_URL}/user/dadosavancados/${userId}`,
    atualizarDadosBasicos: (userId) => `${API_BASE_URL}/user/dadosbasicos/${userId}`,
    atualizarDadosAvancandos: (userId) => `${API_BASE_URL}/user/dadosavancados/${userId}`,
    fotoPerfil: (userId) => `${API_BASE_URL}/user/fotoPerfil/${userId}`,

    // Treinos
    getTreinos: (userId) => `${API_BASE_URL}/treinos/user/${userId}`,
    cadastrarTreino: `${API_BASE_URL}/treinos/cadastrar`,
    deletarTreino: (treinoId) => `${API_BASE_URL}/treinos/deletar/${treinoId}`,

    // Notificações
    getNotificacoes: (userId) => `${API_BASE_URL}/notificacoes/${userId}`,
    patchNotificacoes: (userId) => `${API_BASE_URL}/notificacoes/${userId}`,

    // Eventos
    getEventos: (userId) => `${API_BASE_URL}/eventos/pegarlista/${userId}`,
    getEventosPorMes: (userId, mes) => `${API_BASE_URL}/eventos/pelomes/${userId}`,
    criarEvento: `${API_BASE_URL}/eventos/cadastro`,
    atualizarEvento: (eventoId) => `${API_BASE_URL}/eventos/${eventoId}`,

    // Adicione outras rotas aqui conforme precisar
};

export default apiRoutes; 