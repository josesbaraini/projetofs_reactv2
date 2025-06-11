"use client";
import { useState } from "react";
import styles from "./page.module.css";
import dayjs from "dayjs";
import Calendario from "@/components/Calendario";
import StatusGate from "@/components/StatusGate";

export default function programacaoMensal() {
    return(<StatusGate>
      <div className={styles.page}>
        <div className={styles.divCalendario}>
          <Calendario
          data={dayjs().format('YYYY-MM-DD')}>
          </Calendario>
        </div>
        <div className={styles.divInfos}>
          <div className={styles.divEventosDoMes}>
            <h1>Eventos do Mês</h1>
            <p>10 - Dias das crianças</p>
            <p>12 - Dias das crianças 2</p>

          </div>
          <div className={styles.divEventoSelecionado}>
          <h1>Dia das crianças</h1>
          <p>Ada ada ada coisa que a pessoa escreveria na descrião de dia das crianças, Ada ada ada coisa que a pessoa escreveria na descrião de dia das crianças,</p>

          </div>
        </div>

      </div>
      </StatusGate>
    )
}
