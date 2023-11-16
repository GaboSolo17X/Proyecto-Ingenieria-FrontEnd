<template>
<v-container fluid>
      <v-row dense>
            <v-col cols="6">
    <v-card class="clase mx-auto"
    max-width="350">
            <v-img src="../assets/lista.png" class="clase-imagen">
            </v-img>
                <v-card-title>Lista de estudiantes</v-card-title>
            <v-card-actions class="espacio-boton">
                <v-btn large rounded color="white" class="botoncito" text-center @click="descargarCSV">descargar</v-btn>
            </v-card-actions>
            <v-spacer></v-spacer>
    </v-card>
    </v-col>
        <v-col cols="6">
    <v-card class="clase mx-auto"
    max-width="350" height="310">
            <v-img src="../assets/seguridad.png" class="clase-imagen">
            </v-img>
                <v-card-title>Subir video introductorio</v-card-title>
            <v-card-actions class="espacio-boton">
                <v-form  @submit.prevent="onSubmit">
                    <div class="wrapper">
                    <input v-model="form.link" type="text" placeholder="Ingresar link"/>
                    <button>Subir</button>
                </div> 
            </v-form>
               
            </v-card-actions>
            <v-spacer></v-spacer>

    </v-card>
    </v-col>
      </v-row>
    </v-container>
</template>
<script>
import { onMounted, ref} from 'vue';

export default ({
    
    props:{idSeccion:String},

    setup(props){
        const  miParametro  = props.idSeccion;
        console.log('miParametro en el componente hijo:', miParametro);

     const descargarCSV = async () => {
      try {
        const res = await fetch("http://localhost:3000/docente/listadoEstudiante", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ idSeccion: miParametro }),
        })
          .then((response) => response.blob()) // Obtener el archivo como un objeto Blob
          .then((blob) => {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "archivo.csv"; // Nombre del archivo para descargar
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          });
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };


    const form = ref({
        link: '',
    });

    const isFormValid = ref(false);

    const validateForm = () => {
        if (
            form.value.link
        ) {
            isFormValid.value = true;
            console.log(form.value.link)
        } else {
            isFormValid.value = false;
        }
    };

    const pruebaLink=async()=>{
  try {
    const formData=new FormData();
    formData.append('idSeccion',miParametro);
    formData.append('linkVideo',form.value.link);
    const res=await fetch('http://localhost:3000/seccion/actualizarVideo',{
      method:'PUT',
      body: formData
    });
    const data=await res.json();
    console.log(data)
  } catch (error) {
    console.log(error)
    
  }
 }

    const onSubmit = async () => {
    validateForm();
    if (isFormValid.value) {
        pruebaLink();
      }
    };

        return{
            miParametro,
            descargarCSV,
            form,
            onSubmit
        }
    }
})
</script>
<style scoped>
.clase{
    flex: 1 1 33.333%;
    width: 100%;
    background-color: #A92727;
    border-radius: 30px;
    color: white;
    text-align: center;
    font-weight: bold;
    padding-bottom: 15px;
}

.espacio-boton{
    justify-content: center;
}

.botoncito{
    background-color: #282832;
    padding: 16px 50px;
    line-height: 5px;
}

.clase-imagen{
    width: 100%;
}

.wrapper{
    position: relative;
    width: 300px;
    max-width: 100%;
}

.wrapper input{
    background: white;
    border-radius: 50px;
    padding: 10px;
    width: 100%;
    height: 40px !important;
    color: black;
}
.wrapper button{
    position: absolute;
    background-color: darkred;
    border-radius: 0px 20px 20px 0px;
    height: 40px !important;
    transform: translateX(-70px);
    width: 70px;
}
</style>
