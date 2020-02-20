<template>
<div id="test">
    <div id="demo">
    <button v-on:click="show = !show">
        Toggle
    </button>
    <transition name="faded">
        <p v-if="show">hello</p>
    </transition>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return{
            show: true
        }
    }
}
</script>

<style lang="scss" scoped>
#test{
    margin-top: 100px;
}
#demo{
    height: 80vw;
}
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
</style>