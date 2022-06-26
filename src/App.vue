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
