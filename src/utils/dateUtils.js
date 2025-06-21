/**
 * Formata uma data ISO para o formato brasileiro (dd/mm/aaaa hh:mm)
 * @param {string} dataISO - Data no formato ISO string
 * @returns {string} Data formatada ou string vazia se não houver data
 */
export function formatarData(dataISO) {
    if (!dataISO) return '';

    const data = new Date(dataISO);

    // Verifica se a data é válida
    if (isNaN(data.getTime())) return '';

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    const hora = String(data.getHours() - 4).padStart(2, '0');
    const min = String(data.getMinutes()).padStart(2, '0');

    return `${dia}/${mes}/${ano} ${hora}:${min}`;
}

/**
 * Formata uma data ISO apenas para data (dd/mm/aaaa)
 * @param {string} dataISO - Data no formato ISO string
 * @returns {string} Data formatada ou string vazia se não houver data
 */
export function formatarDataApenas(dataISO) {
    if (!dataISO) return '';

    const data = new Date(dataISO);

    // Verifica se a data é válida
    if (isNaN(data.getTime())) return '';

    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();

    return `${dia}/${mes}/${ano}`;
}

/**
 * Formata uma data ISO apenas para hora (hh:mm)
 * @param {string} dataISO - Data no formato ISO string
 * @returns {string} Hora formatada ou string vazia se não houver data
 */
export function formatarHora(dataISO) {
    if (!dataISO) return '';

    const data = new Date(dataISO);

    // Verifica se a data é válida
    if (isNaN(data.getTime())) return '';

    const hora = String(data.getHours() - 4).padStart(2, '0');
    const min = String(data.getMinutes()).padStart(2, '0');

    return `${hora}:${min}`;
}

/**
 * Obtém a data atual formatada
 * @returns {string} Data atual no formato dd/mm/aaaa hh:mm
 */
export function getDataAtual() {
    const agora = new Date();
    return formatarData(agora.toISOString());
} 