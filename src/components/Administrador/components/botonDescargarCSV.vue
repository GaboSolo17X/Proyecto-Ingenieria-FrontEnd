<template>
    <div class="divBoton">
        <a 
        class="botones"
        block rounded="xl"
        >
        DESCARGAR CSV</a>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
.divBoton{
    width: 90%; 
    display: flex;
    flex-direction: column;
    justify-content: center; 
    margin: 30px;
    align-items: center;
}

.botones{
    background-color: #77181E;
    color: white;
    font-family: 'Rubik';
    text-align: center;
    width: 200px;
    height: max-content;
    border-radius: 15px;
    padding: 10px;
    text-decoration: none;
}

</style>