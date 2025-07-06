"use client";
import { useState } from "react";
import styles from "./page.module.css";
import dayjs from "dayjs";
import Calendario from "@/components/Calendario";
import StatusGate from "@/components/StatusGate";
import { useEventosPorMes } from '@/hooks/useEventosPorMes';
import { formatarDataApenas } from '@/utils/dateUtils';
import EditarEventoModal from '@/components/EditarEventoModal';

function ProgramacaoMensalConteudo() {
  const {
    eventos,
    eventoSelecionado,
    carregando,
    erro,
    mesAtual,
    selecionarEvento,
    mudarMes,
    getNomeMes,
    recarregarEventos
  } = useEventosPorMes();

  const [modalAberto, setModalAberto] = useState(false);
  const [eventoParaEditar, setEventoParaEditar] = useState(null);

  const handleEventoClick = (evento) => {
    selecionarEvento(evento);
  };

  const handleEventoDoubleClick = (evento) => {
    setEventoParaEditar(evento);
    setModalAberto(true);
  };

  const handleMesChange = (novoMes) => {
    mudarMes(novoMes);
  };

  const handleCloseModal = () => {
    setModalAberto(false);
    setEventoParaEditar(null);
  };

  const handleEventoUpdated = () => {
    recarregarEventos();
  };

  return (
    <div className={styles.page}>
      <div className={styles.divCalendario}>
        <Calendario
          data={dayjs().format('YYYY-MM-DD')}
          eventos={eventos}
          onEventoClick={handleEventoClick}
          onEventoDoubleClick={handleEventoDoubleClick}>
        </Calendario>
      </div>
      <div className={styles.divInfos}>
        <div className={styles.divEventosDoMes}>
          <h1>Eventos do Mês</h1>

          {/* Seletor de mês */}
          <div className={styles.seletorMes}>
            <select
              value={mesAtual}
              onChange={(e) => handleMesChange(parseInt(e.target.value))}
            >
              {Array.from({ length: 12 }, (_, i) => i + 1).map(mes => (
                <option key={mes} value={mes}>
                  {getNomeMes(mes)}
                </option>
              ))}
            </select>
          </div>

          {/* Lista de eventos */}
          {carregando ? (
            <p>Carregando eventos...</p>
          ) : erro ? (
            <p className={styles.erro}>{erro}</p>
          ) : eventos.length === 0 ? (
            <p>Nenhum evento encontrado para este mês.</p>
          ) : (
            <div className={styles.listaEventos}>
              {eventos.map((evento) => (
                <div
                  key={evento.id}
                  className={`${styles.eventoItem} ${eventoSelecionado?.id === evento.id ? styles.eventoSelecionado : ''}`}
                  onClick={() => handleEventoClick(evento)}
                >
                  <span className={styles.eventoData}>
                    {formatarDataApenas(evento.data)}
                  </span>
                  <span className={styles.eventoNome}>
                    - {evento.nome}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>

        <div
          className={styles.divEventoSelecionado}
          onDoubleClick={() => {
            if (eventoSelecionado) {
              handleEventoDoubleClick(eventoSelecionado);
            }
          }}
          style={{ cursor: eventoSelecionado ? 'pointer' : 'default' }}
        >
          {eventoSelecionado ? (
            <>
              <h1>{eventoSelecionado.nome}</h1>
              <p className={styles.eventoData}>
                <strong>Data:</strong> {formatarDataApenas(eventoSelecionado.data)}
              </p>
              <p className={styles.eventoDescricao}>
                {eventoSelecionado.descricao || 'Sem descrição'}
              </p>
              <small className={styles.dicaEdicao}>
                Duplo clique para editar
              </small>
            </>
          ) : (
            <>
              <h1>Selecione um evento</h1>
              <p>Clique em um evento da lista para ver os detalhes.</p>
            </>
          )}
        </div>
      </div>

      <EditarEventoModal
        isOpen={modalAberto}
        onClose={handleCloseModal}
        evento={eventoParaEditar}
        onEventoUpdated={handleEventoUpdated}
      />
    </div>
  );
}

export default function programacaoMensal() {
  return (
    <StatusGate>
      <ProgramacaoMensalConteudo />
    </StatusGate>
  );
}
