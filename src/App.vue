<template>
  <div id="app">
    <top></top>
    <index></index>
    <foot></foot>
  </div>
</template>

<script>
import top from '@/components/01.top'
import index from '@/components/02.index'
import foot from '@/components/03.foot'
export default {
  name: 'app',
  components:{
    top,
    index,
    foot
  },
  
}
</script>

<style>
  .nav-list span{
    position: relative;
    top: 10px;
    left: 60px;
    font: 500 20px '';
    /* 设置透明度为0 */
    opacity: 0;
    transition: .1s;
  }
</style>
