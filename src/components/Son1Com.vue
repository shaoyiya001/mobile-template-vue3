<template>
    <div class="sonCom" @click="handleClick">我是Son1Com子组件---{{ name }}</div>
    <div v-for="(i, index) in obj" :key="index">{{ obj[i] }} --- {{ i }}</div>
    <hr />
    <div v-for="item in map.list">{{ item.name }}</div>
</template>

<script setup>
import { ref, toRefs, watch, defineProps, defineEmits } from 'vue';

const todoId = ref(1);
const obj = ref(null);

// const props = defineProps(['name']); // 不建议使用
const props = defineProps({
    name: {
        type: String,
        default: ''
    },
    map: {
        type: Array,
        require: true,
        default: () => [],
    }
});
const emit = defineEmits(['childEvent'])
watch(todoId, async (newValue, oldValue) => {
        console.log('新值：', newValue, ' 旧值：', oldValue)
        const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${todoId.value}`).then(res => res.json())
        console.log(response)
        console.log(obj.value)
        obj.value = response;
    },
    { immediate: true }
)

const handleClick = () => {
    emit('childEvent', 'Data from child')
}

defineExpose({
    ...toRefs(obj)
})
</script>

<style scoped lang="scss">
.sonCom {
    color: yellowgreen;
}
</style>
