<template>
  <div class="home">我是home组件</div>
  <hr />
  <div>useCurrentStore不解构 ====> {{ store.current }}</div>
  <div>useUserStore解构出来的值 ====> {{ count }}</div>
  <hr />
  <div>query路由方式携带参数：{{route.query.id}} --- {{ route.query.name }}</div>
  <div>params路由方式携带参数：{{route.params.id}} --- {{ route.params.name }}</div>
  <hr />
  <van-button type="primary" size="small" @click="handleClick">add增加</van-button>
  <hr />
  <van-button type="primary" size="small" @click="handleRouter">about页面</van-button>
</template>

<script setup>
import { ref, reactive, toRefs, onBeforeMount, onMounted, watchEffect, computed, getCurrentInstance } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { useCurrentStore } from '@/store/modules/current';
import { useUserStore } from '@/store/modules/user';
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
/** pinia 第一种方式 */
const store = useCurrentStore();
// const { current } = store; // 切记！！！不能直接解构使用，直接解构不是响应式的，需使用storeToRefs()方法进行解构

/** pinia 第二种方式 */
const users = useUserStore();
const { count } = storeToRefs(users);

onBeforeMount(() => {
  console.log("store", store.current)
  console.log("count", count.value)
  //console.log('2.组件挂载页面之前执行----onBeforeMount')
})
onMounted(() => {
  showToast('No need to import showToast');
  //console.log('3.-组件挂载到页面之后执行-------onMounted')
})
watchEffect(() => {
  console.log('')
})

const handleClick = () => {
  // store.current++
  // count.value++
  // store.setCurrent();
  store.setCurrentNum(1)
  users.increment()
  users.getList()
}

const handleRouter = () => {
  console.log('路由跳转')
  router.push('/about')
}

// 使用toRefs解构
// let { } = { ...toRefs(data) } 
defineExpose({
  ...toRefs(data)
})

</script>
<style scoped lang='scss'>
</style>