<template>
    <v-card
    class="mx-auto"
    max-width="448"
  >
    <v-layout>
      <v-app-bar
       color="#282832"
        density="compact"
        class="nav"
      >

      <template v-slot:prepend>
          <v-img
          class="img"
          src="../assets/logoUNAH.png">
        </v-img>

        </template>

        <template v-slot:append>
            <v-app-bar-title>{{title}}</v-app-bar-title>
        </template>
      </v-app-bar>

    </v-layout>
  </v-card>
  </template>

<script>
export default {
    props:{title:String},
    setup(){
     
    }
}
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Rubik:wght@300;800&display=swap');

.img{
    width: 500px;
    height: 500px;
    margin-right: 100px;
}

.nav{
    height: 90px;
}
.v-toolbar__content{
    height: 90px !important;
}
.v-toolbar__prepend{
    margin-left: -120px;
}
.v-app-bar-title{
    font-family: 'Rubik', sans-serif;
    font-weight:800;
    font-size: 40px;
}
.v-toolbar__append {
    margin-right: 100px;
}
</style>