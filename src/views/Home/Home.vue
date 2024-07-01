<template>
  <div class="home">我是home组件</div>
  <van-button type="primary" size="small" @click="handleClick">小型按钮</van-button>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { indexStore } from '@/store';
import { storeToRefs } from 'pinia';
const { proxy } = getCurrentInstance();
// proxy 替代 this
/**
* 路由对象
*/
const route = useRoute();
/**
* 路由实例
*/
const router = useRouter();
//console.log('1-开始创建组件-setup')
/**
* 数据部分
*/
const data = reactive({})
const store = indexStore();
const { current } = storeToRefs(store)

onBeforeMount(() => {
  console.log(current.value)
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  showToast('No need to import showToast');
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(()=>{
})

const handleClick = () => {
  console.log('点击事件')
}

// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='less'>
</style>