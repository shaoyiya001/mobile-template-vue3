import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useUserStore = defineStore('useUserStore', () => {
    // 数据（state）
    const count = ref(0)
    const list = ref([])

    // 修改数据的方法
    const increment = () => {
        count.value++
    }

    const getList = async () => {
        const reslut = await fetch('http://geek.itheima.net/v1_0/channels').then(res => res.json());
        list.value = reslut.data.channels;
    }
    // 以对象的形式返回
    return { count, list, increment, getList }
})
