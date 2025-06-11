"use client";
import { useState } from "react";
import styles from "./page.module.css";
import dayjs from "dayjs";
import Calendario from "@/components/Calendario";
import StatusGate from "@/components/StatusGate";

export default function programacaoAnual() {
  const datas = ['YYYY-01', 'YYYY-02', 'YYYY-03', 'YYYY-04', 'YYYY-05', 'YYYY-06'
    , 'YYYY-07', 'YYYY-08', 'YYYY-09', 'YYYY-10', 'YYYY-11', 'YYYY-12',]

  return (
  <StatusGate>
    <div className={styles.page}>
      <div className={styles.divCalendarios}>
        {datas.map((data, index) => (
          <div key={index} className={styles.divCoisas}>
            <div className={styles.divCalendario}>
              <Calendario
                data={dayjs().format(data)}>
              </Calendario>

            </div>
            <div className={styles.divEventos}>
              <p>10 - Dias das crianças</p>
              <p>12 - Dias das crianças 2</p>
              <p>10 - Dias das crianças</p>
              <p>12 - Dias das crianças 2</p>

            </div>
          </div>
        ))}
      </div>


    </div>
  </StatusGate>
  )
}
