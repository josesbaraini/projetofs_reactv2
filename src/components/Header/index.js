'use client';
import styles from './Header.module.css';
import { useState, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Svg from '../svg'
const Header = () => {
    const [isOpen, setIsOpen] = useState(styles.dropdownb);
    const dropdownRef = useRef(null);
    const [notInfo, setNotInfo] = useState(false)
    const [abaUtilidades, setAbaUtilidades] = useState(styles.abaUtilidadesEsconder)
    const [isLogged, setIsLogged] = useState(true)
    const router = useRouter();
    function mexeAbaUtilidades(){
        if (abaUtilidades === styles.abaUtilidadesEsconder) {
            setAbaUtilidades(styles.abaUtilidades)
        } else {
            setAbaUtilidades(styles.abaUtilidadesEsconder)
        }
    }
    function handleMouseEnter() {
        setIsOpen(styles.dropdown);
    }
    function handleMouseLeave(event) {
        // Se o próximo elemento ainda está dentro do dropdown, não feche
        if (dropdownRef.current && dropdownRef.current.contains(event.relatedTarget)) {
            return;
        }
        setIsOpen(styles.dropdownb);
    }


    if (!isLogged) {
        return (<header className={styles.header}>
            <div onClick={() => router.push('/principal')}  className={styles.logo}>
                <Image src='/images/logo.png' alt='logo' width={100} height={100} />
                 
            </div>
            <nav className={styles.nav}>
            <ul className={styles.ul}>
                <li className={styles.li}>
                <h1 onClick={() => router.push('/login')}>Login</h1>
                </li>
                <li className={styles.li}>
                <h1 onClick={() => router.push('/cadastro')}>Cadastro</h1>
                </li>
            </ul>
            </nav>
        </header>)
    } else {
        return (
            <header className={styles.header}>
                
                <div onClick={() => router.push('/principal')} className={styles.logo}>
                    <Image src='/images/logo.png' alt='logo' width={60} height={60} />
                </div>
                <nav className={styles.nav}>
                    <ul className={styles.ul}>
                        <li className={styles.li} ref={dropdownRef}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}>
                            <h1 className={styles.relative}>Programação</h1>
                            <ul className={isOpen}>
                                <li onClick={() => router.push('/programacao/semanal')}>
                                    P. Semanal
                                </li>
                                <li onClick={() => router.push('/programacao/mensal')}>
                                    P. Mensal
                                </li>
                                <li onClick={() => router.push('/programacao/anual')}>
                                    P. Anual
                                </li>

                            </ul>
                        </li>
                        <li className={styles.li}>
                            <h1 onClick={() => router.push('/treinos')}>Treinos</h1>
                        </li>
                    </ul>
                </nav>
                <div className={styles.options}>
                    {notInfo && <div className={styles.notInfo}></div>}
                    <div onClick={() => router.push('/notificacoes')}><Svg tipo='notificacao'></Svg></div>
                    <div><Svg tipo='user' altura='50px' largura='50px' funcao={mexeAbaUtilidades}></Svg></div>

                </div>
                <div className={abaUtilidades}>
                    <div className={styles.abaUtilidadesItem}>
                   
                    <Svg tipo='userU'></Svg>
                        <h1>Perfil</h1>
                    
                    </div>
                    <div className={styles.abaUtilidadesItem}>
                        <Svg tipo='logout'></Svg>
                        <h1>Logout</h1>
                    </div>
                </div>
            </header>

        )
    }

}

export default Header