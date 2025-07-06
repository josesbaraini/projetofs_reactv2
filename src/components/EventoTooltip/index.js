'use client'
import { useState } from 'react';
import styles from './EventoTooltip.module.css';

export default function EventoTooltip({ eventos }) {
    const [tooltipVisivel, setTooltipVisivel] = useState(null);

    const handleMouseEnter = (index) => {
        setTooltipVisivel(index);
    };

    const handleMouseLeave = () => {
        setTooltipVisivel(null);
    };

    if (!eventos || eventos.length === 0) {
        return <span>Nenhum</span>;
    }

    return (
        <span>
            {eventos.map((evento, index) => (
                <span key={evento.id} className={styles.eventoContainer}>
                    <span
                        className={styles.eventoNome}
                        onMouseEnter={() => handleMouseEnter(index)}
                        onMouseLeave={handleMouseLeave}
                    >
                        {evento.nome}
                    </span>
                    {tooltipVisivel === index && (
                        <div className={styles.tooltip}>
                            <strong>Descrição:</strong><br />
                            {evento.descricao || 'Sem descrição'}
                        </div>
                    )}
                    {index < eventos.length - 1 && ', '}
                </span>
            ))}
        </span>
    );
} 