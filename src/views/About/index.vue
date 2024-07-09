<template>
    <ul>
        <li v-for="item in list" :key="item.id" @click="handleChild(item)">{{ item.name }}</li>
    </ul>
    <Son1Com :name="name" @childEvent="handleChildEvent" :map="map"></Son1Com>
    <van-button type="primary" size="small" @click="handleGoTo">home页面</van-button>
</template>

<script setup>
import { onBeforeMount, reactive, ref, toRefs } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/store/modules/user';
import { storeToRefs } from 'pinia';
import Son1Com from '@/components/Son1Com.vue';

const router = useRouter();

const users = useUserStore();
const { list } = storeToRefs(users);

const name = ref(null);
const map = reactive({
    list: [
        {
            "id": 0,
            "name": "推荐"
        },
        {
            "id": 1,
            "name": "html"
        },
        {
            "id": 2,
            "name": "开发者资讯"
        },
        {
            "id": 4,
            "name": "c++"
        },
        {
            "id": 6,
            "name": "css"
        },
        {
            "id": 7,
            "name": "数据库"
        },
        {
            "id": 8,
            "name": "区块链"
        }
    ]
})
onBeforeMount(() => {

})

const handleGoTo = () => {
    // router.push('/home')
    // router.replace({
    //     path: '/home',
    //     query: {
    //         id: 10001,
    //         name: '李四'
    //     }
    // })
    // router.push({
    //     name: 'home',
    //     params: {
    //         id: 10002,
    //         name: '李四'
    //     }
    // })
    router.go(-1);
    // router.push('/card') // 不存在的页面，为了验证404页面
}
const handleChild = (item) => {
    name.value = item.name;
}
const handleChildEvent = (value) => {
    console.log(value)
    showToast(`我是子组件传过来的：${value}`);
}
defineExpose({
    ...toRefs()
})
</script>

<style scoped lang="scss"></style>
