<template>
    <div class="background-container">
        <div>.</div>
        <div class="numberN">1234567</div>
        <div class="data">
            <v-row class="saludo">
                <p>
                    El Suscrito Director(a) de la Direccion de Ingreso Permanencia y
                    Promoción de la Universidad Nacional Autónoma
                </p>
            </v-row>
            <v-row class="estudiante">
                <p>
                    Honduras CERTIFICA QUE: {{estudiante}},
                    matriculado(a)
                </p>
            </v-row>
            <v-row class="cuenta">
                <!-- <p>20201000956</p>
            <p class="carrera">INGENIERIA EN SISTEMAS</p> -->
                <p>
                    con número de cuenta {{numCuenta}} para la carrera de: {{carrera}}
                </p>
            </v-row>
            <v-row class="msg">
                <p>obtuvo las siguientes calificaciones:</p>
            </v-row>
        </div>

        <div class="contTable">
            <v-table density="compact" height="685px">
                <thead>
                    <tr class="labe">
                        <th class="text-left">CODIGO</th>
                        <th class="text-left">ASIGNATURA</th>
                        <th class="text-left">CALIFICACION</th>
                        <th class="text-left">UV</th>
                    </tr>
                </thead>
                <!-- <tbody>
          
          <tr>
            2020
          </tr>
          <tr>
            Periodo
          </tr>
          
            <tr
            v-for="item in clases"
            :key="item.name"
            class="fila-personalizada"
          >
            <td class="cod">{{ item.name }}</td>
            <td class="name">{{ item.calories  }}</td>
            <td class="cali">{{ item.cali + '&nbsp;&nbsp;&nbsp; X '}}</td>
            <td class="uv">{{ item.uv  }}</td>
            <td class="res">20</td>
          </tr>
        </tbody> -->
                <!-- <tbody>
                    <template v-for="(year, yearIndex) in datos" :key="yearIndex">
                        <tr>
                            <td colspan="5" class="year">{{ 'Año ' + year.year }}</td>
                        </tr>
                        <template v-for="(period, periodIndex) in year.periods" :key="periodIndex">
                            <tr>
                                <td colspan="5" class="period">{{ period.name }}</td>
                            </tr>
                            <tr v-for="item in period.classes" :key="item.name" class="fila-personalizada">
                                <td class="cod">{{ item.cod }}</td>
                                <td class="name">{{ item.name }}</td>
                                <td class="cali">{{ item.cali + '&nbsp;&nbsp;&nbsp; X ' }}</td>
                                <td class="uv">{{ item.uv + ' =' }}</td>
                                <td class="res">20</td>
                            </tr>
                        </template>
                    </template>
                </tbody> -->

                <tbody>
                    <template v-for="(yearData, year) in datos" :key="year">
                        <tr>
                            <td colspan="5" class="year">{{ 'Año ' + year }}</td>
                        </tr>
                        <template v-for="(periodData, period) in yearData" :key="period">
                            <tr>
                                <td colspan="5" class="period">{{ period }}</td>
                            </tr>
                            <tr v-for="classData in periodData" :key="classData.name" class="fila-personalizada">
                                <td class="cod">{{ classData.name }}</td>
                                <td class="name">{{ classData.asignatura }}</td>
                                <td class="cali">{{ classData.cali + '&nbsp;&nbsp;&nbsp; X ' }}</td>
                                <td class="uv">{{ classData.uv + ' =' }}</td>
                                <td class="res">{{ classData.cali * classData.uv}}</td>
                            </tr>
                        </template>
                    </template>
                </tbody>
            </v-table>
        </div>
    </div>
</template>

<script>

import { ref } from "vue";

export default {
    props: {
    datos:Object,
    estudiante:String, 
    numCuenta:String, 
    carrera:String
    },
    setup() {
        //     const datos= [
        //     {
        //       year: 2020,
        //       periods: [
        //         {
        //           name: 'Primer Periodo',
        //           classes: [
        //             { cod: 'IS-910', name: 'INTRODUCCION A ING.EN SISTEMAS', cali: '80', uv: '5' },
        //             { cod: 'IS-910', name: 'INTRODUCCION A ING.EN SISTEMAS', cali: '80', uv: '5' },
        //             { cod: 'IS-910', name: 'INTRODUCCION A ING.EN SISTEMAS', cali: '80', uv: '5' },
        //             // Otras clases del periodo 1
        //           ],
        //         },
        //         // Otros periodos del año 2020
        //         {
        //           name: 'Segundo Periodo',
        //           classes: [
        //             { cod: 'IS-111', name: 'BASES DE DATOS 1', cali: '80', uv: '5' },
        //             { cod: 'IS-111', name: 'BASES DE DATOS 1', cali: '80', uv: '5' },
        //             { cod: 'IS-111', name: 'BASES DE DATOS 1', cali: '80', uv: '5' },
        //             // Otras clases del periodo 1
        //           ],
        //         },
        //         {
        //           name: 'Tercer Periodo',
        //           classes: [
        //             { cod: 'IS-112', name: 'BASES DE DATOS 2', cali: '80', uv: '5' },
        //             { cod: 'IS-112', name: 'BASES DE DATOS 2', cali: '80', uv: '5' },
        //             { cod: 'IS-112', name: 'BASES DE DATOS 2', cali: '80', uv: '5' },
        //             { cod: 'IS-112', name: 'BASES DE DATOS 2', cali: '80', uv: '5' },
        //             { cod: 'IS-112', name: 'BASES DE DATOS 2', cali: '80', uv: '5' },
        //             // Otras clases del periodo 1
        //           ],
        //         },
        //       ],
        //     },
        //     // Otros años
        //   ]

        // const datos2 = [
        //     {
        //         name: "IS-201",
        //         calories: "INTRODUCCION A LA ING.EN SISTEMAS",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Primer Periodo",
        //         anio: "2020",
        //     },
        //     {
        //         name: "IS-201",
        //         calories: "Introduccion a la Ing.en Sistemas",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Primer Periodo",
        //         anio: "2020",
        //     },
        //     {
        //         name: "IS-201",
        //         calories: "Introduccion a la Ing.en Sistemas",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Primer Periodo",
        //         anio: "2020",
        //     },
        //     {
        //         name: "IS-201",
        //         calories: "Introduccion a la Ing.en Sistemas",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Primer Periodo",
        //         anio: "2020",
        //     },
        //     {
        //         name: "IS-201",
        //         calories: "Introduccion a la Ing.en Sistemas",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Segundo Periodo",
        //         anio: "2020",
        //     },
        //     {
        //         name: "IS-201",
        //         calories: "Introduccion a la Ing.en Sistemas",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Segundo Periodo",
        //         anio: "2020",
        //     },
        //     {
        //         name: "IS-201",
        //         calories: "Introduccion a la Ing.en Sistemas",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Segundo Periodo",
        //         anio: "2020",
        //     },
        //     {
        //         name: "IS-201",
        //         calories: "Introduccion a la Ing.en Sistemas",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Tercer Periodo",
        //         anio: "2020",
        //     },
        //     {
        //         name: "IS-301",
        //         calories: "BASES DE DATOS 2",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Primer Periodo",
        //         anio: "2021",
        //     },
        //     {
        //         name: "IS-301",
        //         calories: "BASES DE DATOS 2",
        //         cali: 90,
        //         uv: 5,
        //         periodo: "Primer Periodo",
        //         anio: "2021",
        //     },
        // ];

        // // Group data by year and period
        // const groupedData = datos2.reduce((result, item) => {
        //     if (!result[item.anio]) {
        //         result[item.anio] = {};
        //     }

        //     if (!result[item.anio][item.periodo]) {
        //         result[item.anio][item.periodo] = [];
        //     }

        //     result[item.anio][item.periodo].push(item);
        //     return result;
        // }, {});

    
        return {
            // groupedData,
        };

    },
};
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Archivo:wght@300&display=swap");

.background-container {
    margin: 0;
    padding: 0;
    height: 100vh;
    background-image: url("../PDF/img/White1.jpg");
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    width: 8.5in;
    height: 11in;
    /* display: flex;
  justify-content: center;
  align-items: center; */
    color: black;
    /* opacity: 0.5; */
}

.numberN {
    margin-top: 145px;
    margin-left: 60px;
    color: #cb5364;
    font-size: 1.5rem;
    font-family: "Archivo", sans-serif;
}

.v-table {
    background-color: unset;
    margin-top: 11px;
    margin-left: 40px;
    font-size: 1rem;
    font-family: serif;
    color: black;
}

/* .v-table .labe {
  height: 50px; 
} */

.text-left {
    color: black !important;
}

.contTable :deep(.v-table__wrapper) {
    /* margin-top: 340px;
    margin-left: 35px; */
}

.cod {
    width: 100px;
}

.name {
    width: 350px;
}

.cali {
    width: 0px;
}

.uv {
    width: 0px;
}

.fila-personalizada {
    height: 40px;
    /* Ajusta el valor según tus necesidades */
}

.contTable .v-table tbody .fila-personalizada {
    height: 20px;
}

.data {
    margin-top: 16px;
}

.saludo {
    margin-top: 1px !important;
    margin-left: 45px;
    font-size: 1rem;
    font-family: serif;
}

.cuenta {
    margin-top: 19px !important;
    margin-left: 45px;
    font-size: 1rem;
    font-family: serif;
}

.msg {
    margin-top: 21px !important;
    margin-left: 45px;
    font-size: 1rem;
    font-family: serif;
}

.estudiante {
    margin-top: 20px !important;
    margin-left: 45px;
    font-size: 1rem;
    font-family: serif;
    /* letter-spacing: -1px; */
    /* font-weight: bold; */
}

.carrera {
    margin-left: 110px;
    font-size: 1rem;
    font-family: serif;
}
</style>
