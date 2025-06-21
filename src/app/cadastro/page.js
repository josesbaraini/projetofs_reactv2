'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import { validarFormularioCadastro, formularioValido } from '@/utils/validations';
import apiRoutes from '@/utils/apiRoutes';

export default function Cadastro() {
    const router = useRouter();
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        senha: '',
        confirmarSenha: ''
    });
    const [erros, setErros] = useState({});
    const [carregando, setCarregando] = useState(false);
    const [mostrarSenha, setMostrarSenha] = useState(false);
    const [mostrarConfirmarSenha, setMostrarConfirmarSenha] = useState(false);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Limpar erro do campo quando usuário começa a digitar
        if (erros[name]) {
            setErros(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Usar validação modularizada
        const novosErros = validarFormularioCadastro(formData);
        setErros(novosErros);

        if (!formularioValido(novosErros)) {
            return;
        }

        setCarregando(true);

        try {
            // Preparar dados para o backend (usando os campos que ele espera)
            const dadosParaEnviar = {
                nome: formData.username,
                email: formData.email,
                senhaD: formData.senha
            };

            const response = await fetch(apiRoutes.cadastro, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                credentials: 'include',
                body: JSON.stringify(dadosParaEnviar)
            });

            if (response.ok) {
                const data = await response.json();
                // Sucesso - redirecionar para login
                router.push('/login?cadastro=sucesso');
            } else {
                const errorData = await response.json();
                console.error('Erro no cadastro:', errorData);
                setErros({ geral: errorData.mensagem || errorData.error || 'Erro ao cadastrar usuário' });
            }
        } catch (error) {
            console.error('Erro de conexão ao cadastrar:', error);
            setErros({ geral: 'Erro de conexão. Tente novamente.' });
        } finally {
            setCarregando(false);
        }
    };

    return (
        <div className={styles.page}>
            <h1>MY GYM</h1>
            <div className={styles.painel}>
                <form onSubmit={handleSubmit}>
                    <div className={styles.inputGroup}>
                        <input
                            type="text"
                            name="username"
                            placeholder="Defina seu nome de usuário"
                            value={formData.username}
                            onChange={handleInputChange}
                            className={erros.username ? styles.inputError : ''}
                        />
                        {erros.username && (
                            <span className={styles.erro}>{erros.username}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <input
                            type="email"
                            name="email"
                            placeholder="Defina seu email"
                            value={formData.email}
                            onChange={handleInputChange}
                            className={erros.email ? styles.inputError : ''}
                        />
                        {erros.email && (
                            <span className={styles.erro}>{erros.email}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.senhaContainer}>
                            <input
                                type={mostrarSenha ? "text" : "password"}
                                name="senha"
                                placeholder="Defina sua senha"
                                value={formData.senha}
                                onChange={handleInputChange}
                                className={erros.senha ? styles.inputError : ''}
                            />
                            <button
                                type="button"
                                className={styles.btnMostrarSenha}
                                onClick={() => setMostrarSenha(!mostrarSenha)}
                            >
                                {mostrarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {erros.senha && (
                            <span className={styles.erro}>{erros.senha}</span>
                        )}
                    </div>

                    <div className={styles.inputGroup}>
                        <div className={styles.senhaContainer}>
                            <input
                                type={mostrarConfirmarSenha ? "text" : "password"}
                                name="confirmarSenha"
                                placeholder="Confirme sua senha"
                                value={formData.confirmarSenha}
                                onChange={handleInputChange}
                                className={erros.confirmarSenha ? styles.inputError : ''}
                            />
                            <button
                                type="button"
                                className={styles.btnMostrarSenha}
                                onClick={() => setMostrarConfirmarSenha(!mostrarConfirmarSenha)}
                            >
                                {mostrarConfirmarSenha ? "🙈" : "👁️"}
                            </button>
                        </div>
                        {erros.confirmarSenha && (
                            <span className={styles.erro}>{erros.confirmarSenha}</span>
                        )}
                    </div>

                    {erros.geral && (
                        <div className={styles.erroGeral}>
                            {erros.geral}
                        </div>
                    )}

                    <button
                        type="submit"
                        disabled={carregando}
                        className={carregando ? styles.btnCarregando : ''}
                    >
                        {carregando ? 'Cadastrando...' : 'Cadastrar'}
                    </button>
                </form>

                <div className={styles.aviso}>
                    <p>Já tem uma conta? <a href="/login">Conecte-se</a></p>
                </div>
            </div>
        </div>
    );
}