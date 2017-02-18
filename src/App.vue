<template>
  <div id="app" class="uk-container uk-container-center">
    <transition name="slide-fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>
<style lang="css">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /*text-align: center;*/
  color: #2c3e50;
  /*margin-top: 60px;*/
}
.slide-fade-enter-active {
  transition: all .2s ease;
  position: absolute;
}
.slide-fade-leave-active {
  transition: all .2s ease;
  transform: translateY(-100%);
}
.slide-fade-enter-to {
  transition: all .2s ease;
  animation: custom-animation .5s;
}

.bounce-leave-active {
}
@keyframes custom-animation {
  0% {
    transform: translateX(-20%);
    opacity: 0;
    /*position: absolute;*/
    top: 0;
  }
  50% {
    transform: translateX(10%);
    opacity: .7;
    top: 0;
  }
  100% {
    transform: translateX(0%);
    opacity: 1;
    top: 0;
  }
}

</style>
