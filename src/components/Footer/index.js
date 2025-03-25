'use client';
import styles from './Footer.module.css';
import { useState, useEffect } from 'react';
const Footer = () => {
    const [isOpen, setIsOpen] = useState(false);
        return (
        <footer   className={styles.footer}>
            {isOpen && <div className={styles.footerContent}>
                <div className={styles.infoContato}>
                    <h1>Informações de Contato</h1>
                    <p>@MygymYoutube</p>
                    <p>(11) 99999-9999</p>
                    <p>contato@mygym.com.br</p>
                </div>
                <div className={styles.sobre}>
                    <h1>Sobre Nós</h1>
                    <p>O MyGym é uma plataforma inovadora criada para otimizar o acompanhamento e o desenvolvimento dos usuários em suas rotinas de treino. Com agendas eletrônicas inteligentes e ferramentas online, oferecemos uma experiência prática e personalizada, ajudando você a organizar seus treinos e monitorar seu progresso de forma eficiente.</p>
                </div>
                <div className={styles.suporte}>
                    <h1>Suporte</h1>
                    <p>Equipe de Suporte </p>
                    <p>Docs</p>
                    <p>Termos de Uso</p>
                    <p>Política de Privacidade</p>
                </div>
            </div>}
            <div className={styles.footerBottom}>
                <p>MYGYM - 2025 - © Todos os direitos reservados.</p>
            </div>
        </footer>
        )
    }

export default Footer;