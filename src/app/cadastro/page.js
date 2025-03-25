import styles from './page.module.css'

export default function Cadastro() {
    return (
        <div className={styles.page}>
            <h1>MY GYM</h1>
           <div className={styles.painel}>
                <form>
                    <input type="text" placeholder="Defina seu nome de Usuario" />
                    <input type="text" placeholder="Defina seu Email" />
                    <input type="password" placeholder="Defina sua Senha" />
                    <input type="password" placeholder="Confirme sua Senha" />
                    <button type="submit">Cadastrar</button>
                </form>
                <div className={styles.aviso}>
                    <p>Ja tem uma conta? <a href="/login">Conecte-se</a></p>
                </div>
           </div>
        </div>
    )
}