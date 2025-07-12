'use client'
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './page.module.css'
import StatusGate from "@/components/StatusGate";
import CriarTreinoModal from '@/components/CriarTreinoModal';
import PesquisaTreinos from '@/components/PesquisaTreinos';
import ConfirmacaoDeletar from '@/components/ConfirmacaoDeletar';
import { useTreinos } from '@/hooks/useTreinos';
import { useTreinoSelecionado } from '@/hooks/useTreinoSelecionado';
import { formatarData } from '@/utils/dateUtils';

export default function Treinos() {
    return (
        <StatusGate>
            <TreinosConteudo />
        </StatusGate>
    );
}

function TreinosConteudo() {
    const router = useRouter();
    const { selecionarTreino } = useTreinoSelecionado();
    const {
        treinos,
        carregando,
        deletando,
        termoPesquisa,
        setTermoPesquisa,
        ordenarPorModificacao,
        handleOrdenacaoModificacao,
        handlePesquisar,
        limparPesquisa,
        handleTreinoCriado,
        deletarTreino
    } = useTreinos();

    const [showCriaTreino, setShowCriaTreino] = useState(false);
    const [showConfirmacaoDeletar, setShowConfirmacaoDeletar] = useState(false);
    const [treinoParaDeletar, setTreinoParaDeletar] = useState(null);

    // Função para abrir modal de confirmação
    const handleAbrirConfirmacaoDeletar = (treino) => {
        setTreinoParaDeletar(treino);
        setShowConfirmacaoDeletar(true);
    };

    // Função para confirmar exclusão
    const handleConfirmarDeletar = async () => {
        if (!treinoParaDeletar) return;

        const resultado = await deletarTreino(treinoParaDeletar.id);

        if (resultado.success) {
            setShowConfirmacaoDeletar(false);
            setTreinoParaDeletar(null);
            // Opcional: mostrar mensagem de sucesso
        } else {
            // Opcional: mostrar mensagem de erro
            console.error(resultado.message);
        }
    };

    // Função para fechar modal de confirmação
    const handleFecharConfirmacaoDeletar = () => {
        setShowConfirmacaoDeletar(false);
        setTreinoParaDeletar(null);
    };

    // Função para mostrar mais detalhes do treino
    const handleMostrarMais = (treino) => {
        selecionarTreino(treino.id);
        router.push('/principal');
    };

    return (
        <div className={styles.page}>
            <PesquisaTreinos
                termoPesquisa={termoPesquisa}
                setTermoPesquisa={setTermoPesquisa}
                ordenarPorModificacao={ordenarPorModificacao}
                handleOrdenacaoModificacao={handleOrdenacaoModificacao}
                handlePesquisar={handlePesquisar}
                limparPesquisa={limparPesquisa}
            />

            {carregando && (
                <div className={styles.carregando}>
                    Carregando treinos...
                </div>
            )}

            <div className={styles.divInformacos}>
                <div className={styles.divNomeCoisas}>
                    <h1>Nome</h1>
                    <h1>MOSTRAR MAIS</h1>
                    <h1>Ultima Mod.</h1>
                    <h1>Descrição</h1>
                    <h1>Anotações</h1>
                    <h1>Deletar</h1>
                    <div className={styles.divLinha}></div>
                </div>
                {treinos && treinos.length > 0 ? treinos.map((treino, index) => (
                    <div key={index} className={styles.divInfoCoisas}>
                        <p>{treino.nome}</p>
                        <button
                            className={styles.btnMostrarMais}
                            onClick={() => handleMostrarMais(treino)}
                            title="Ver exercícios do treino"
                        >
                            MOSTRAR MAIS
                        </button>
                        <p>{formatarData(treino.modificacao_em)}</p>
                        <p>{treino.descricao}</p>
                        <p>{treino.anotacoes}</p>
                        <button
                            className={styles.btnDeletar}
                            onClick={() => handleAbrirConfirmacaoDeletar(treino)}
                            disabled={deletando}
                            title="Deletar treino"
                        >
                            🗑️
                        </button>
                        <div className={styles.divLinha}></div>
                    </div>
                )) : !carregando && (
                    <div className={styles.semResultados}>
                        <p>Nenhum treino encontrado</p>
                    </div>
                )}
            </div>
            <div className={styles.divAddTreinos}>
                <button onClick={() => setShowCriaTreino(true)}>
                    Adicionar Treino
                </button>
            </div>

            <CriarTreinoModal
                isOpen={showCriaTreino}
                onClose={() => setShowCriaTreino(false)}
                onTreinoCriado={handleTreinoCriado}
            />

            <ConfirmacaoDeletar
                isOpen={showConfirmacaoDeletar}
                onClose={handleFecharConfirmacaoDeletar}
                onConfirm={handleConfirmarDeletar}
                treinoNome={treinoParaDeletar?.nome || ''}
                carregando={deletando}
            />
        </div>
    );
}