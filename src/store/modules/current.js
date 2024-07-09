import { defineStore } from 'pinia'

/** 模块化导出 */
export const useCurrentStore = defineStore('current', {
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
        setCurrent(state) {
            // actions没有state,只能通过this拿store,这里打印验证
            console.log("state", state)
            this.current + 10
        },
        setCurrentNum(num) {
            this.current += num
        }
    }
})
