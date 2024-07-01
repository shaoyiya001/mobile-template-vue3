import { defineStore } from 'pinia'

export const indexStore = defineStore('index', {
    state: () => {
        return {
            current: 2,
        }
    },
    getters: {
        maxCurrent(state) {
            return state.current * 10
        }
    },
    actions: {
        setCurrent() {
            this.current + 10
        }
    }
})
