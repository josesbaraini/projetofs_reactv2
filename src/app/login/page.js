import styles from './page.module.css'

export default function Login() {
    return (
        <div className={styles.page}>
            <h1>MY GYM</h1>
           <div className={styles.painel}>
                <form>
                    <input type="text" placeholder="Digite seu Email" />
                    <input type="password" placeholder="Digite sua Senha" />
                    <button type="submit">Login</button>
                </form>
                <div className={styles.aviso}>
                    <p>Não tem uma conta? <a href="/cadastro">Cadastre-se</a></p>
                </div>
           </div>
        </div>
    )
}