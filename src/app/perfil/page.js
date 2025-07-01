'use client'
import styles from './page.module.css'
import Svg from '@/components/svg'
import { useEffect, useState } from 'react';
import PerfilConteudo from '@/components/PerfilConteudo';
import StatusGate from "@/components/StatusGate";
import { useUser } from '@/components/UserContext';
import apiRoutes from "@/utils/apiRoutes";
import { formatarData, formatarDataApenas } from '@/utils/dateUtils';


function PerfilPagina() {
    const {usuario} = useUser();
  const [dadosBasicos, setDadosBasicos] = useState({});
  const [dadosAvancados, setDadosAvancados] = useState({});
  const getUserData = async () => {
    
    if (!usuario?.id) return;
    const responseBasica = await fetch(apiRoutes.getDadosBasicos(usuario.id), {
      method: 'GET',
      credentials: "include",
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const dataBasica = await responseBasica.json();
    const responseAvancada = await fetch(apiRoutes.getDadosAvancandos(usuario.id), {
        method: 'GET',
        credentials: "include",
        headers: {
          'Content-Type': 'application/json'
        }
      });
      const dataAvancada = await responseAvancada.json();
    setDadosBasicos(dataBasica);
    setDadosAvancados(dataAvancada);

    console.log(dadosAvancados,dadosBasicos)
  };

  useEffect(() => {
    if (usuario) {
      getUserData();
    }
  }, [usuario]);
    const [opcao, setOpcao] = useState(1);
    return <div className={styles.page}>
        <div className={styles.painel}>
            <div className={styles.coluna1}>
                <div className={styles.fotoPerfil}>
                    <Svg tipo='user' altura='120px' largura='120px'></Svg>
                </div>
                <div className={styles.opcoes}>
                    <div onClick={() => setOpcao(1)} className={styles.opcao}>
                        <p>Informações da Conta</p>
                        {opcao === 1 && <div className={styles.barra}>
                        </div>}

                    </div>
                    <div onClick={() => setOpcao(2)} className={styles.opcao}>
                        <p>Informações Corporais</p>
                        {opcao === 2 && <div className={styles.barra}>
                        </div>}
                    </div>
                </div>
            </div>
            <div className={styles.coluna2}>
                <div className={styles.nome}>
                    <h1>{dadosBasicos.nome}</h1>
                </div>
                <div className={styles.linha}>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>

                </div>
                <div className={styles.entrada}>
                    <p>Entrou em {formatarDataApenas(dadosBasicos.created_at)}</p>
                </div>
                <div className={styles.conteudo}>
                    <PerfilConteudo dados={dadosBasicos} opcao={opcao} />
                </div>

            </div>
        </div>
    </div>
}
export default function Perfil() {

    return (
        <StatusGate>
            <PerfilPagina></PerfilPagina>
        </StatusGate>)
}