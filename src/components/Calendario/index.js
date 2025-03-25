'use cliente';
import  styles  from "./Calendario.module.css";
import { useState } from "react";
import dayjs from "dayjs";


export default function Calendario(props){
    const [currentDate, setCurrentDate] = useState(dayjs(props.data));

        // Função para alterar o mês
        const changeMonth = (amount) => {
          console.log(amount)
          setCurrentDate(currentDate.add(amount, "month"));
        };
      
        // Gerar os dias do mês
        const generateCalendar = (eventos) => {
          const startOfMonth = currentDate.startOf("month");
          const endOfMonth = currentDate.endOf("month");
      
          let days = [];
          for (let i = 0; i < startOfMonth.day(); i++) {
            days.push({ 'dia': null, 'classe': styles.dia }); // Preenche os dias vazios antes do início do mês
          }
      
          for (let day = 1; day <= endOfMonth.date(); day++) {
            let diaAtual = startOfMonth.add(day - 1, 'day').day();
            let diaHoje = currentDate.format('DD');
            let checaDia = diaHoje==day?` ${styles.diaAtual}`:'';
            if (eventos.includes(day)) {
              days.push({ 'dia': day, 'classe': `${styles.diaEvento} ${styles.diaE}${checaDia}`});
            } else if (diaAtual == 6 || diaAtual == 0) {
              days.push({ 'dia': day, 'classe': `${styles.diaE} ${styles.diaFinalSemana}${checaDia}` });
            } else {
              days.push({ 'dia': day, 'classe': `${styles.diaE}${checaDia}` });
            };
      
          };
      
          return days;
        };
      
        const daysOfWeek = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
        const days = generateCalendar([3, 5, 8]);
    return (
        
          <div className={styles.calendario}>
            {/* Cabeçalho */}
            <div className={styles.cabeca}>
              <h1>[==</h1>
              <h2 className="text-xl font-semibold">{currentDate.format("MMMM YYYY")}</h2>
              <h1>==]</h1>
            </div>
      
            {/* Dias da semana */}
            <div className={styles.diasDaSemana}>
              {daysOfWeek.map((day) => (
                <div className={styles.diaDaSemana} key={day}>{day}</div>
              ))}
            </div>
      
            {/* Dias do mês */}
            <div className={styles.diaDoMes}>
              {days.map((day, index) => (
          
                <div
                  key={index}
                  className={styles.dia}
                > <div className={day.classe}>{day.dia || ''}</div>
                  
                </div>
              ))}
            </div>
          </div>
        );
}
