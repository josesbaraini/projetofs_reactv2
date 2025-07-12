'use client'
import { useState, useEffect } from 'react';
import styles from './page.module.css'
import StatusGate from "@/components/StatusGate";
import { useUser } from '@/components/UserContext';
import { useTreinoSelecionado } from '@/hooks/useTreinoSelecionado';
import apiRoutes from '@/utils/apiRoutes';

export default function Principal() {
    return (
        <StatusGate>
            <PrincipalConteudo />
        </StatusGate>
    );
}

function PrincipalConteudo() {
    const { usuario } = useUser();
    const { treinoId, buscarTreinoPadrao } = useTreinoSelecionado();
    const [passos, setPassos] = useState([]);
    const [carregando, setCarregando] = useState(true);
    const [erro, setErro] = useState(null);

    useEffect(() => {
        const carregarPassos = async () => {
            if (!usuario?.id) return;

            setCarregando(true);
            setErro(null);

            try {
                // Se não tem treino selecionado, busca um padrão
                let treinoIdParaUsar = treinoId;
                if (!treinoIdParaUsar) {
                    treinoIdParaUsar = await buscarTreinoPadrao();
                }

                if (!treinoIdParaUsar) {
                    throw new Error('Nenhum treino disponível');
                }

                // Busca os passos do treino selecionado
                const response = await fetch(apiRoutes.getPassos, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    credentials: 'include',
                    body: JSON.stringify({
                        treino_Id: treinoIdParaUsar
                    })
                });

                if (response.ok) {
                    const data = await response.json();
                    setPassos(data);
                } else {
                    // Fallback para dados de exemplo se a API não estiver disponível
                    setPassos([
                        {
                            "id": 11,
                            "nome": "Supino",
                            "repeticoes": "10",
                            "peso": 30,
                            "series": 22,
                            "Treino_id": 8
                        },
                        {
                            "id": 12,
                            "nome": "Crucifixo",
                            "repeticoes": "12",
                            "peso": 15,
                            "series": 2,
                            "Treino_id": 8
                        }
                    ]);
                }
            } catch (error) {
                console.error('Erro ao carregar passos:', error);
                setErro('Erro ao carregar passos');
                // Fallback para dados de exemplo
                setPassos([
                    {
                        "id": 11,
                        "nome": "Supino",
                        "repeticoes": "10",
                        "peso": 30,
                        "series": 22,
                        "Treino_id": 8
                    },
                    {
                        "id": 12,
                        "nome": "Crucifixo",
                        "repeticoes": "12",
                        "peso": 15,
                        "series": 2,
                        "Treino_id": 8
                    }
                ]);
            } finally {
                setCarregando(false);
            }
        };

        carregarPassos();
    }, [usuario, treinoId]);

    if (carregando) {
        return (
            <div className={styles.page}>
                <div className={styles.divInformacoes}>
                    <div className={styles.carregando}>
                        Carregando treinos...
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className={styles.page}>
            <div className={styles.divInformacoes}>
                <div className={styles.divNomeCoisas}>
                    <h1>N°</h1>
                    <h1>Exercício</h1>
                    <h1>Repetições</h1>
                    <h1>Séries</h1>
                    <h1>Peso</h1>
                    <div className={styles.divLinha}></div>
                </div>

                <div className={styles.divPassos}>
                    {passos && passos.length > 0 ? (
                        passos.map((passo, index) => (
                            <div key={passo.id || index} className={styles.divInfoCoisas}>
                                <p>{index + 1}</p>
                                <p>{passo.nome}</p>
                                <p>{passo.repeticoes}</p>
                                <p>{passo.series}</p>
                                <p>{passo.peso}kg</p>

                                <div className={styles.divLinha}></div>
                            </div>
                        ))
                    ) : (
                        <div className={styles.semResultados}>
                            <p>Nenhum exercício encontrado</p>
                        </div>
                    )}
                </div>

                {erro && (
                    <div className={styles.erro}>
                        {erro}
                    </div>
                )}
            </div>
        </div>
    );
}