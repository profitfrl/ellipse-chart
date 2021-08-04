<template>
    <div class="bg-wrap bg-skew">
        <div
            v-for="(item, index) in bgList"
            :key="index"
            :style="item">
        </div>
    </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
export default defineComponent({
    name: 'Skew',
    components: {

    },
    props: {
        types: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    methods: {

    },
    setup(props) {
        const bgList = computed(() => {
            let angle = 0;
            let arr = [] as any;
            props.types.forEach((item: any) => {
                let itemAngle = 360 * item.percent;
                arr.push({
                    background: item.color,
                    transform: `rotate(${angle}deg) skewY(${itemAngle - 90}deg)`
                });
                angle += itemAngle;
            });
            return arr;
        });
        return {
            bgList
        };
    }
});
</script>

<style lang="less">
.bg-skew {
    div {
        background: rgba(0, 0, 0, .5);
        position: absolute;
        top: 0;
        right: 0;
        width: 50%;
        height: 50%;
        transform-origin: 0% 100%;
        box-sizing: border-box;
    }
}
</style>
