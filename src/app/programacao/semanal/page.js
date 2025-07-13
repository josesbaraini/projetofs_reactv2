'use client'
import styles from './page.module.css'
import StatusGate from "@/components/StatusGate";
import { useEventos } from '@/hooks/useEventos';
import { useTreinos } from '@/hooks/useTreinos';
import { formatarDataApenas } from '@/utils/dateUtils';
import { useState } from 'react';
import EventoTooltip from '@/components/EventoTooltip';

function ProgramacaoSemanalConteudo() {
    const { eventos, carregando: carregandoEventos, getEventosSemanaAtual, recarregarEventos } = useEventos();
    const [eventoEditando, setEventoEditando] = useState(null);
    // Obter eventos da semana atual
    let eventosSemana = getEventosSemanaAtual();

    // Ordenar eventos do mais próximo para o mais distante
    eventosSemana = eventosSemana.slice().sort((a, b) => new Date(a.data) - new Date(b.data));

    // Função para recarregar eventos após edição
    const handleEventoUpdated = () => {
        recarregarEventos();
        setEventoEditando(null);
    };

    // Função para duplo clique
    const handleDoubleClick = (evento) => {
        setEventoEditando(evento);
    };

    return (
        <div className={styles.page}>
            <div className={styles.cima}>
                <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
                <p>Evento: {eventosSemana.length > 0 ? `${eventosSemana.length} evento(s)` : 'Nenhum'}</p>
            </div>
            <div className={styles.baixo}>
                {eventosSemana.length === 0 ? (
                    <div style={{ color: '#fff', fontSize: 18, margin: '0 auto' }}>Nenhum evento para esta semana.</div>
                ) : (
                    eventosSemana.map(evento => (
                        <div
                            key={evento.id}
                            className={styles.eventoCard}
                            onDoubleClick={() => handleDoubleClick(evento)}
                            tabIndex={0}
                            title="Duplo clique para editar"
                        >
                            <div className={styles.eventoCardHeader}>
                                <span className={styles.eventoCardNome}>{evento.nome}</span>
                                <span className={styles.eventoCardData}>{formatarDataApenas(evento.data)}</span>
                            </div>
                            <div className={styles.eventoCardDescricao}>
                                {evento.descricao || 'Sem descrição'}
                            </div>
                            <div className={styles.eventoCardDica}>
                                Dê <b>duplo clique</b> no card para editar o evento
                            </div>
                        </div>
                    ))
                )}
            </div>
            {/* Tooltip/modal de edição do evento selecionado */}
            {eventoEditando && (
                <EventoTooltip
                    eventos={[eventoEditando]}
                    onEventoUpdated={handleEventoUpdated}
                    modalOnly={true}
                />
            )}
        </div>
    )
}

export default function programacaoSemanal() {
    return (
        <StatusGate>
            <ProgramacaoSemanalConteudo />
        </StatusGate>
    )
}