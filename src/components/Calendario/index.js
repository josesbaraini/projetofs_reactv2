'use cliente';
import styles from "./Calendario.module.css";
import { useEffect, useState } from "react";
import dayjs from "dayjs";


export default function Calendario(props) {
  const [currentDate, setCurrentDate] = useState(props.data);
  const [mesAtual, setMesAtual] = useState(currentDate.format("MMM YYYY"))
  const eventos = props.eventos || [];
  const valores = props.valores || {};
  const isSmall = props.isSmall || false;

  // Função para alterar o mês
  const changeMonth = (amount) => {

    setCurrentDate(currentDate.add(amount, "month"));
  };

  // Gerar os dias do mês
  const generateCalendar = () => {
    const startOfMonth = currentDate.startOf("month");
    const endOfMonth = currentDate.endOf("month");

    // Criar mapa de eventos por dia
    const eventosPorDia = {};
    eventos.forEach(evento => {
      const dataEvento = dayjs(evento.data);
      const dia = dataEvento.date();
      if (!eventosPorDia[dia]) {
        eventosPorDia[dia] = [];
      }
      eventosPorDia[dia].push(evento);
    });

    let days = [];
    for (let i = 0; i < startOfMonth.day(); i++) {
      days.push({ 'dia': null, 'classe': styles.dia, 'eventos': [] }); // Preenche os dias vazios antes do início do mês
    }

    for (let day = 1; day <= endOfMonth.date(); day++) {
      let diaAtual = startOfMonth.add(day - 1, 'day').day();
      let diaHoje = currentDate.format('DD');
      let checaDia = diaHoje == day ? ` ${styles.diaAtual}` : '';
      const eventosDoDia = eventosPorDia[day] || [];

      if (eventosDoDia.length > 0) {
        days.push({
          'dia': day,
          'classe': `${styles.diaEvento} ${styles.diaE}${checaDia}`,
          'eventos': eventosDoDia
        });
      } else if (diaAtual == 6 || diaAtual == 0) {
        days.push({ 'dia': day, 'classe': `${styles.diaE} ${styles.diaFinalSemana}${checaDia}`, 'eventos': [] });
      } else {
        days.push({ 'dia': day, 'classe': `${styles.diaE}${checaDia}`, 'eventos': [] });
      };

    };

    return days;
  };
  useEffect(() => {
    setCurrentDate(props.data);
  }, [props.data]);


  const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
  const days = generateCalendar();
  return (

    <div className={`${styles.calendario} ${isSmall ? styles.calendarioPequeno : ''}`}>
      {/* Cabeçalho */}
      <div className={styles.cabeca}>
        {!isSmall && <h1>[==</h1>}
        <h2 >
          {mesAtual}
        </h2>
        {!isSmall && <h1>==]</h1>}
      </div>

      {/* Dias da semana */}
      <div className={styles.diasDaSemana}>
        {daysOfWeek.map((day) => (
          <div className={`${styles.diaDaSemana} ${isSmall ? styles.diaDaSemanaPequeno : ''}`} key={day}>
            {isSmall ? day.charAt(0) : day}
          </div>
        ))}
      </div>

      {/* Dias do mês */}
      <div className={styles.diaDoMes}>
        {days.map((day, index) => (
          <div
            key={index}
            className={`${styles.dia} ${isSmall ? styles.diaPequeno : ''}`}
            onClick={() => {
              if (day.eventos.length > 0 && valores.onClick && !isSmall) {
                valores.onClick(day.eventos[0]); // Seleciona o primeiro evento do dia
              }
            }}
            onDoubleClick={() => {
              if (day.eventos.length > 0 && valores.onDoubleClick && !isSmall) {
                valores.onDoubleClick(day.eventos[0]); // Abre modal para editar o primeiro evento
              }
            }}
            style={{
              cursor: (day.eventos.length > 0 && !isSmall) ? 'pointer' : 'default'
            }}
          >
            <div className={day.classe}>{day.dia || ''}</div>
          </div>
        ))}
      </div>
    </div>
  );
}
