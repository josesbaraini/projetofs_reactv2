'use client'
import styles from './page.module.css'
import StatusGate from "@/components/StatusGate";
import { useEventos } from '@/hooks/useEventos';
import { useTreinos } from '@/hooks/useTreinos';
import EventoTooltip from '@/components/EventoTooltip';


function ProgramacaoSemanalConteudo() {
    const { eventos, carregando: carregandoEventos, getEventosSemanaAtual, recarregarEventos } = useEventos();
    const { treinos, carregando: carregandoTreinos } = useTreinos();

    // Obter eventos da semana atual
    const eventosSemana = getEventosSemanaAtual();

    // Função para obter eventos de um dia específico
    const getEventosPorDia = (diaSemana) => {
        const diasSemana = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
        const hoje = new Date();
        const diaAtual = hoje.getDay();
        const diasParaAdicionar = diasSemana.indexOf(diaSemana) - diaAtual;

        const dataDia = new Date(hoje);
        dataDia.setDate(hoje.getDate() + diasParaAdicionar);

        return eventosSemana.filter(evento => {
            const eventoData = new Date(evento.data);
            const dataFormatada = dataDia.toISOString().split('T')[0];
            const eventoDataFormatada = eventoData.toISOString().split('T')[0];
            return eventoDataFormatada === dataFormatada;
        });
    };

    // Função para recarregar eventos após edição
    const handleEventoUpdated = () => {
        recarregarEventos();
    };

    return (
        <div className={styles.page}>
            <div className={styles.cima}>
                <p>Data: {new Date().toLocaleDateString('pt-BR')}</p>
                <p>Evento: {eventosSemana.length > 0 ? `${eventosSemana.length} evento(s)` : 'Nenhum'}</p>
            </div>
            <div className={styles.baixo}>
                <div className={`${styles.dia} ${styles.atual}`}>
                    <div className={`${styles.diaTitulo} ${styles.diaTituloatual}`}><p>Segunda</p></div>
                    <div className={styles.treino}>
                        <div className={styles.diaTitulo}><p>Segunda</p></div>
                        <p>Treino:</p>
                        <p className={styles.resposta}>Nenhum</p>
                    </div>
                    <div className={styles.evento}>
                        <p>Evento:</p>
                        <p className={styles.resposta}>
                            <EventoTooltip eventos={getEventosPorDia('Segunda')} onEventoUpdated={handleEventoUpdated} />
                        </p>
                    </div>
                </div>
                <div className={styles.dia}>
                    <div className={styles.diaTitulo}><p>Terça</p></div>
                    <div className={styles.treino}>
                        <p>Treino:</p>
                        <p className={styles.resposta}>Nenhum</p>
                    </div>
                    <div className={styles.evento}>
                        <p>Evento:</p>
                        <p className={styles.resposta}>
                            <EventoTooltip eventos={getEventosPorDia('Terça')} onEventoUpdated={handleEventoUpdated} />
                        </p>
                    </div>
                </div>
                <div className={styles.dia}>
                    <div className={styles.diaTitulo}><p>Quarta</p></div>
                    <div className={styles.treino}>
                        <p>Treino:</p>
                        <p className={styles.resposta}>Nenhum</p>
                    </div>
                    <div className={styles.evento}>
                        <p>Evento:</p>
                        <p className={styles.resposta}>
                            <EventoTooltip eventos={getEventosPorDia('Quarta')} onEventoUpdated={handleEventoUpdated} />
                        </p>
                    </div>
                </div>
                <div className={styles.dia}>
                    <div className={styles.diaTitulo}><p>Sexta</p></div>
                    <div className={styles.treino}>
                        <p>Treino:</p>
                        <p className={styles.resposta}>Nenhum</p>
                    </div>
                    <div className={styles.evento}>
                        <p>Evento:</p>
                        <div className={styles.resposta}>
                            <EventoTooltip eventos={getEventosPorDia('Sexta')} onEventoUpdated={handleEventoUpdated} />
                        </div>
                    </div>
                </div>
                <div className={styles.dia}>
                    <div className={styles.diaTitulo}><p>Sábado</p></div>
                    <div className={styles.treino}>
                        <p>Treino:</p>
                        <p className={styles.resposta}>Nenhum</p>
                    </div>
                    <div className={styles.evento}>
                        <p>Evento:</p>
                        <p className={styles.resposta}>
                            <EventoTooltip eventos={getEventosPorDia('Sábado')} onEventoUpdated={handleEventoUpdated} />
                        </p>
                    </div>
                </div>
                <div className={styles.dia}>
                    <div className={styles.diaTitulo}><p>Domingo</p></div>
                    <div className={styles.treino}>
                        <p>Treino:</p>
                        <p className={styles.resposta}>Nenhum</p>
                    </div>
                    <div className={styles.evento}>
                        <p>Evento:</p>
                        <div className={styles.resposta}>
                            <EventoTooltip eventos={getEventosPorDia('Domingo')} onEventoUpdated={handleEventoUpdated} />
                        </div>
                    </div>
                </div>
            </div>
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