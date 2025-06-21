'use client'
import styles from './page.module.css';
import { useState } from 'react';
import apiRoutes from '@/utils/apiRoutes';

export default function Login() {
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [mensagem, setMensagem] = useState('');
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(apiRoutes.login, {
                method: 'POST',
                credentials: "include",
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, senha }),
            });

            const data = await response.json();

            if (data.mensagem == "Logado com sucesso") {
                setMensagem('Login bem-sucedido! Redirecionando...');
                window.location.href = '/principal';
            } else {
                setMensagem(data.mensagem || 'Email ou senha inválidos.');
            }
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setMensagem('Erro ao conectar com o servidor.');
        }
    };
    return (
        <div className={styles.page}>
            <h1>MY GYM</h1>
            <div className={styles.painel}>
                <form onSubmit={handleLogin}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Senha"
                        value={senha}
                        onChange={(e) => setSenha(e.target.value)}
                        required
                    />
                    <button type="submit">Login</button>
                </form>
                {mensagem && <p>{mensagem}</p>}
                <div className={styles.aviso}>
                    <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
                </div>
            </div>
        </div>
    )
}