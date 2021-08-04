<template>
    <div class="bg-wrap">
        <svg xmlns="http://www.w3.org/2000/svg">
            <template v-for="(item, index) in pathList" :key="index">
                <defs>
                    <radialGradient
                        :id="`svg${index}`"
                        gradientUnits="userSpaceOnUse"
                        :gradientTransform="`scale(${item.a / item.b}, 1)`"
                        :cx="item.b"
                        :cy="item.b"
                        :r="item.b"
                        spreadMethod="pad">
                        <stop offset="0" :stop-color="item.color" stop-opacity="1"/>
                        <stop offset="0.2" :stop-color="item.color" stop-opacity="0.992" />
                        <stop offset="0.4" :stop-color="item.color" stop-opacity="0.936" />
                        <stop offset="0.6" :stop-color="item.color" stop-opacity="0.784" />
                        <stop offset="0.8" :stop-color="item.color" stop-opacity="0.488" />
                        <stop offset="1" :stop-color="item.color" stop-opacity="0.166"/>
                    </radialGradient>
                </defs>
                <path
                    :d="item.path"
                    :style="{'fill': `url(#svg${index})`}"/>
            </template>
        </svg>
    </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue';
export default defineComponent({
    name: 'SvgBg',
    components: {

    },
    props: {
        pathList: {
            type: Array,
            required: true,
            default: () => []
        }
    },
    methods: {

    },
    setup() {
        return {

        };
    }
});
</script>

