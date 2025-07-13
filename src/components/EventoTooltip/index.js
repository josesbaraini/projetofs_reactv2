'use client'
import { useState } from 'react';
import styles from './EventoTooltip.module.css';
import EditarEventoModal from '../EditarEventoModal';
import { formatarData, formatarDataApenas } from '@/utils/dateUtils';

export default function EventoTooltip({ eventos, onEventoUpdated, modalOnly = false }) {
    const [tooltipVisivel, setTooltipVisivel] = useState(null);
    const [modalAberto, setModalAberto] = useState(false);
    const [eventoSelecionado, setEventoSelecionado] = useState(null);

    const handleMouseEnter = (index) => {
        setTooltipVisivel(index);
    };

    const handleMouseLeave = () => {
        setTooltipVisivel(null);
    };

    const handleClickEvento = (evento) => {
        setEventoSelecionado(evento);
        setModalAberto(true);
    };

    const handleCloseModal = () => {
        setModalAberto(false);
        setEventoSelecionado(null);
    };

    const handleEventoUpdated = () => {
        if (onEventoUpdated) {
            onEventoUpdated();
        }
    };

    // Se for modalOnly, já abre o modal direto para o evento passado
    if (modalOnly) {
        return (
            <EditarEventoModal
                isOpen={true}
                onClose={onEventoUpdated}
                evento={eventos && eventos.length > 0 ? eventos[0] : null}
                onEventoUpdated={handleEventoUpdated}
            />
        );
    }

    if (!eventos || eventos.length === 0) {
        return <span>Nenhum</span>;
    }

    return (
        <>
            <span>
                {eventos.map((evento, index) => (
                    <span key={evento.id} className={styles.eventoContainer}>
                        <span
                            className={styles.eventoNome}
                            onMouseEnter={() => handleMouseEnter(index)}
                            onMouseLeave={handleMouseLeave}
                            onClick={() => handleClickEvento(evento)}
                        >
                            {evento.nome}
                        </span>
                        {tooltipVisivel === index && (
                            <div className={styles.tooltip}>
                                <strong>Descrição:</strong><br />
                                {evento.descricao || 'Sem descrição'}
                                <br />
                                <strong>Data:</strong><br />
                                {formatarDataApenas(evento.data) || 'Sem data'}
                                <br />
                                <small>Clique para editar</small>
                            </div>
                        )}
                        {index < eventos.length - 1 && ', '}
                    </span>
                ))}
            </span>

            <EditarEventoModal
                isOpen={modalAberto}
                onClose={handleCloseModal}
                evento={eventoSelecionado}
                onEventoUpdated={handleEventoUpdated}
            />
        </>
    );
} 