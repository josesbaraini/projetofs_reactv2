// Regex patterns para validações
export const PATTERNS = {
    EMAIL: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    PASSWORD_MIN_LENGTH: 6,
    USERNAME_MIN_LENGTH: 3,
    PHONE: /^\(\d{2}\) \d{4,5}-\d{4}$/,
    CPF: /^\d{3}\.\d{3}\.\d{3}-\d{2}$/
};

// Mensagens de erro padrão
export const ERROR_MESSAGES = {
    REQUIRED: 'Este campo é obrigatório',
    EMAIL_INVALID: 'Email inválido',
    PASSWORD_TOO_SHORT: `Senha deve ter pelo menos ${PATTERNS.PASSWORD_MIN_LENGTH} caracteres`,
    USERNAME_TOO_SHORT: `Nome deve ter pelo menos ${PATTERNS.USERNAME_MIN_LENGTH} caracteres`,
    PASSWORDS_DONT_MATCH: 'Senhas não coincidem',
    PHONE_INVALID: 'Telefone inválido',
    CPF_INVALID: 'CPF inválido'
};

/**
 * Valida um formulário de cadastro
 * @param {Object} formData - Dados do formulário
 * @param {string} formData.username - Nome de usuário
 * @param {string} formData.email - Email
 * @param {string} formData.senha - Senha
 * @param {string} formData.confirmarSenha - Confirmação de senha
 * @returns {Object} Objeto com erros encontrados
 */
export const validarFormularioCadastro = (formData) => {
    const erros = {};

    // Validação do username
    if (!formData.username?.trim()) {
        erros.username = ERROR_MESSAGES.REQUIRED;
    } else if (formData.username.trim().length < PATTERNS.USERNAME_MIN_LENGTH) {
        erros.username = ERROR_MESSAGES.USERNAME_TOO_SHORT;
    }

    // Validação do email
    if (!formData.email?.trim()) {
        erros.email = ERROR_MESSAGES.REQUIRED;
    } else if (!PATTERNS.EMAIL.test(formData.email.trim())) {
        erros.email = ERROR_MESSAGES.EMAIL_INVALID;
    }

    // Validação da senha
    if (!formData.senha) {
        erros.senha = ERROR_MESSAGES.REQUIRED;
    } else if (formData.senha.length < PATTERNS.PASSWORD_MIN_LENGTH) {
        erros.senha = ERROR_MESSAGES.PASSWORD_TOO_SHORT;
    }

    // Validação da confirmação de senha
    if (!formData.confirmarSenha) {
        erros.confirmarSenha = ERROR_MESSAGES.REQUIRED;
    } else if (formData.senha !== formData.confirmarSenha) {
        erros.confirmarSenha = ERROR_MESSAGES.PASSWORDS_DONT_MATCH;
    }

    return erros;
};

/**
 * Valida se um formulário tem erros
 * @param {Object} erros - Objeto com erros
 * @returns {boolean} True se não há erros
 */
export const formularioValido = (erros) => {
    return Object.keys(erros).length === 0;
};

/**
 * Valida um email
 * @param {string} email - Email para validar
 * @returns {boolean} True se email é válido
 */
export const validarEmail = (email) => {
    return PATTERNS.EMAIL.test(email?.trim() || '');
};

/**
 * Valida uma senha
 * @param {string} senha - Senha para validar
 * @returns {Object} Objeto com validação e mensagens
 */
export const validarSenha = (senha) => {
    const validacoes = {
        temMinimoCaracteres: senha?.length >= PATTERNS.PASSWORD_MIN_LENGTH,
        temMaiuscula: /[A-Z]/.test(senha || ''),
        temMinuscula: /[a-z]/.test(senha || ''),
        temNumero: /\d/.test(senha || ''),
        temCaractereEspecial: /[!@#$%^&*(),.?":{}|<>]/.test(senha || '')
    };

    const mensagens = [];
    if (!validacoes.temMinimoCaracteres) {
        mensagens.push(`Mínimo ${PATTERNS.PASSWORD_MIN_LENGTH} caracteres`);
    }
    if (!validacoes.temMaiuscula) {
        mensagens.push('Pelo menos uma letra maiúscula');
    }
    if (!validacoes.temMinuscula) {
        mensagens.push('Pelo menos uma letra minúscula');
    }
    if (!validacoes.temNumero) {
        mensagens.push('Pelo menos um número');
    }
    if (!validacoes.temCaractereEspecial) {
        mensagens.push('Pelo menos um caractere especial');
    }

    return {
        valida: Object.values(validacoes).every(Boolean),
        validacoes,
        mensagens
    };
};

/**
 * Valida um telefone brasileiro
 * @param {string} telefone - Telefone para validar
 * @returns {boolean} True se telefone é válido
 */
export const validarTelefone = (telefone) => {
    return PATTERNS.PHONE.test(telefone?.trim() || '');
};

/**
 * Valida um CPF
 * @param {string} cpf - CPF para validar
 * @returns {boolean} True se CPF é válido
 */
export const validarCPF = (cpf) => {
    return PATTERNS.CPF.test(cpf?.trim() || '');
};

/**
 * Limpa caracteres especiais de uma string
 * @param {string} str - String para limpar
 * @returns {string} String limpa
 */
export const limparString = (str) => {
    return str?.replace(/[^\w\s]/gi, '') || '';
};

/**
 * Formata um telefone para o padrão brasileiro
 * @param {string} telefone - Telefone para formatar
 * @returns {string} Telefone formatado
 */
export const formatarTelefone = (telefone) => {
    const limpo = telefone?.replace(/\D/g, '') || '';

    if (limpo.length === 11) {
        return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 7)}-${limpo.slice(7)}`;
    } else if (limpo.length === 10) {
        return `(${limpo.slice(0, 2)}) ${limpo.slice(2, 6)}-${limpo.slice(6)}`;
    }

    return telefone;
};

/**
 * Formata um CPF
 * @param {string} cpf - CPF para formatar
 * @returns {string} CPF formatado
 */
export const formatarCPF = (cpf) => {
    const limpo = cpf?.replace(/\D/g, '') || '';

    if (limpo.length === 11) {
        return `${limpo.slice(0, 3)}.${limpo.slice(3, 6)}.${limpo.slice(6, 9)}-${limpo.slice(9)}`;
    }

    return cpf;
}; 