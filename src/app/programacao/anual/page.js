"use client";
import { useState, useEffect } from "react";
import styles from "./page.module.css";
import dayjs from "dayjs";
import Calendario from "@/components/Calendario";
import StatusGate from "@/components/StatusGate";
import { useEventosPorMes } from '@/hooks/useEventosPorMes';
import { formatarDataApenas } from '@/utils/dateUtils';
import { useUser } from '@/components/UserContext';

function ProgramacaoAnualConteudo() {
  const { getEventosPorMes, getNomeMes } = useEventosPorMes();
  const { usuario } = useUser();
  const [eventosPorMes, setEventosPorMes] = useState({});
  const [carregando, setCarregando] = useState(true);

  const meses = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];

  useEffect(() => {
    const carregarTodosEventos = async () => {
      if (!usuario?.id) return; // Aguardar usuário estar disponível

      setCarregando(true);
      const eventosTemp = {};

      for (const mes of meses) {
        try {
          const eventos = await getEventosPorMes(mes);
          eventosTemp[mes] = eventos || [];
        } catch (error) {
          console.error(`Erro ao carregar eventos do mês ${mes}:`, error);
          eventosTemp[mes] = [];
        }
      }

      setEventosPorMes(eventosTemp);
      setCarregando(false);
    };

    carregarTodosEventos();
  }, [usuario]);

  if (carregando || !usuario?.id) {
    return <div className={styles.carregando}>
      {!usuario?.id ? 'Carregando usuário...' : 'Carregando eventos anuais...'}
    </div>;
  }

  return (
    <div className={styles.page}>
      <div className={styles.divCalendarios}>
        {meses.map((mes, index) => (
          <div key={index} className={styles.divCoisas}>
            <div className={styles.divCalendario}>
              <Calendario
                data={dayjs().format(`YYYY-${String(mes).padStart(2, '0')}`)}
                eventos={eventosPorMes[mes] || []}
                isSmall={true}>
              </Calendario>
            </div>
            <div className={styles.divEventos}>
              <h3>{getNomeMes(mes)}</h3>
              {eventosPorMes[mes] && eventosPorMes[mes].length > 0 ? (
                eventosPorMes[mes].map((evento, eventoIndex) => (
                  <div key={eventoIndex} className={styles.eventoItem}>
                    <span className={styles.eventoData}>
                      {formatarDataApenas(evento.data)}
                    </span>
                    <span className={styles.eventoNome}>
                      {evento.nome}
                    </span>
                  </div>
                ))
              ) : (
                <p className={styles.semEventos}>Nenhum evento</p>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function programacaoAnual() {
  return (
    <StatusGate>
      <ProgramacaoAnualConteudo />
    </StatusGate>
  );
}
