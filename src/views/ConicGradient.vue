<template>
    <div class="bg-wrap bg-gradient" :style="{'background': `conic-gradient(${bg})`}">
    </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
export default defineComponent({
    name: 'ConicGradient',
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
        const bg = computed(() => {
            let bgColor = '';
            let percent = 0;
            console.log(props.types);
            props.types.forEach((item: any, index) => {
                const curPercent = item.percent * 100;
                bgColor += `${item.color} ${percent}%, ${item.color} ${percent + curPercent}%`;
                if (index !== props.types.length - 1) {
                    bgColor += `, `;
                }
                percent += curPercent;
            });
            return bgColor;
        });
        return {
            bg
        };
    }
});
</script>
