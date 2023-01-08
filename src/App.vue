<template>
  <div id="app">
    <Top></Top>
    <Index></Index>
    <Foot></Foot>
  </div>
</template>

<script>
import Top from '@/views/Top'
import Index from '@/views/Index'
import Foot from '@/views/Foot'
export default {
  name: 'app',
  components:{
    Top,
    Index,
    Foot
  },
}
</script>
