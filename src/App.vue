<template>
    <div class="app">
        <h2>方案-：圆锥渐变</h2>
        <div class="ellipse-wrap">
            <div class="center">
                中心
            </div>
            <div
                v-for="(item, index) in options"
                :key="index"
                class="lap"
                :class="[`lap${index + 1}`]">
                <div
                    v-for="(list, i) in item"
                    :key="i"
                    :style="{'left': list.left, 'top': list.top, 'borderColor': list.borderColor}">
                    {{`${index}-${i}`}}
                </div>
            </div>
            <conic-gradient :types="types" />
        </div>
        <h2>方案二：变形函数</h2>
        <div class="ellipse-wrap">
            <div class="center">
                中心
            </div>
            <div
                v-for="(item, index) in options"
                :key="index"
                class="lap"
                :class="[`lap${index + 1}`]">
                <div
                    v-for="(list, i) in item"
                    :key="i"
                    :style="{'left': list.left, 'top': list.top, 'borderColor': list.borderColor}">
                    {{`${index}-${i}`}}
                </div>
            </div>
            <skew :types="types" />
        </div>
        <h2>方案三：SVG实现背景</h2>
        <div class="ellipse-wrap">
            <div class="center">
                中心
            </div>
            <div
                v-for="(item, index) in options"
                :key="index"
                class="lap"
                :class="[`lap${index + 1}`]">
                <div
                    v-for="(list, i) in item"
                    :key="i"
                    :style="{'left': list.left, 'top': list.top, 'borderColor': list.borderColor}">
                    {{`${index}-${i}`}}
                </div>
            </div>
            <svg-bg :path-list="pathList" />
        </div>
    </div>
</template>
<script lang="ts">
import {defineComponent, reactive, toRefs, nextTick} from 'vue';
import ConicGradient from 'views/ConicGradient.vue';
import Skew from 'views/Skew.vue';
import SvgBg from 'views/SvgBg.vue';

const TYPES = [{
    type: 'A',
    color: '#DFE8FF',
    borderColor: '#618EFF',
    percent: 0.2,
},
{
    type: 'B',
    color: '#DDF1FE',
    borderColor: '#67BFFE',
    percent: 0.2,
},
{
    type: 'C',
    color: '#DFF9EF',
    borderColor: '#41D99C',
    percent: 0.2,
},
{
    type: 'D',
    color: '#F5E7FE',
    borderColor: '#C77DF5',
    percent: 0.2,
},
{
    type: 'E',
    color: '#FEF4D4',
    borderColor: '#FAC53E',
    percent: 0.2
}];
const DATA = [
    [{num: 1}, {num: 1}, {num: 1}, {num: 1}, {num: 1}],
    [{num: 1}, {num: 2}, {num: 2}, {num: 2}, {num: 2}],
    [{num: 3}, {num: 3}, {num: 2}, {num: 2}, {num: 3}]
];
interface ObjectKeys {
    [key: string]: any;
}
export default defineComponent({
    name: 'App',
    components: {
        ConicGradient,
        Skew,
        SvgBg
    },
    setup() {
        const state = reactive({
            options: [] as any[],
            pathList: [] as ObjectKeys[],
            types: TYPES
        });
        state.options.length = DATA.length;
        // 计算角度下的坐标
        // @params a, b圆心坐标, angle角度
        const calcCoordinates = (a: number, b: number, angle: number): ObjectKeys => {
            // 圆心角方式计算，优点角度无误差，但是弧长分布不均匀
            // 矢量计算中都是以弧度作为计量单位, 弧度= 角度 * Math.PI/180
            // 初始值（起点）为12点钟方向, 角度 - 90
            const radian = (angle - 90) * Math.PI / 180;
            const r = a * b / (Math.sqrt(Math.pow(b * Math.cos(radian), 2)
                + Math.pow(a * Math.sin(radian), 2)));
            const x = r * Math.cos(radian) + a;
            const y = r * Math.sin(radian) + b;
            // 离心角方式计算，弧长分布相对均匀但是角度有误差
            // 矢量计算中都是以弧度作为计量单位, 弧度= 角度 * Math.PI/180
            // 初始值（起点）为12点钟方向，圆心的坐标为（r, r1)
            // const radian = angle * Math.PI / 180;
            // const x = a + Math.sin(radian) * a;
            // // 此处是'-'号，因为我们要得到的Y是相对于（0,0）而言的
            // const y = b - Math.cos(radian) * b;
            return {x, y};
        };
        // el:挂载容器
        // width: 每个元素的宽度
        // height: 每个元素的高度
        const calculation = ({el, data, types, width, height}: {
            el: HTMLElement|null,
            width: number,
            height: number,
            data: ObjectKeys,
            types: ObjectKeys[]
        }) => {
            if (el) {
                // 椭圆的半长轴
                const a = el.clientWidth / 2;
                // 椭圆的半短轴
                const b = el.clientHeight / 2;
                // 初始角度
                let angle = 0;
                let arr = [] as ObjectKeys[];
                types.forEach((item, index) => {
                    const list = data[index];
                    // 当前类占椭圆的总角度
                    const itemAngle = 360 * item.percent;
                    // 当前类的平均角度
                    const aveAngle = itemAngle / list.num;
                    // 平均角度的一半
                    const aveAngleHalf = aveAngle / 2;
                    for (let i = 1; i <= list.num; i++) {
                        // 当前类每个元素的角度, 为了视觉上好看减去平均角度的一半
                        let curAngle = i * aveAngle + angle - aveAngleHalf;
                        const {x, y} = calcCoordinates(a, b, curAngle);
                        arr.push({
                            left: `${x - width / 2}px`,
                            top: `${y - height / 2}px`,
                            borderColor: item.borderColor,
                            ...list[i - 1]
                        });
                    }
                    angle += itemAngle;
                });
                return arr;
            }
        };
        const getPath = ({el, data}: {
            el: HTMLElement | null,
            data: ObjectKeys[]
        }) => {
            let arr: ObjectKeys[] = [];
            if (el) {
                // 椭圆的半长轴
                const a = el.clientWidth / 2;
                // 椭圆的半短轴
                const b = el.clientHeight / 2;
                let angle = 0;
                data.forEach((item: ObjectKeys) => {
                    const {x, y} = calcCoordinates(a, b, angle);
                    angle += 360 * item.percent;
                    const {x: x1, y: y1} = calcCoordinates(a, b, angle);
                    // M:圆心坐标(a,b) L: 连接线初始坐标（240, 0） /
                    // A:长轴半径 短轴半径 / 开始角度: 0 / 是否是大圆弧标识 0 / 方向(1顺时针) / 终点(x y) /
                    // L: 连线结束坐标
                    const path = `M ${a} ${b} L ${x} ${y} A ${a} ${b} 0 1 1 ${x1} ${y1} L ${a} ${b}`;
                    arr.push({
                        color: item.color,
                        path,
                        a,
                        b
                    });
                });
            }
            return arr;
        };
        nextTick(() => {
            const el = document.querySelector(`.lap3`) as HTMLElement|null;
            state.pathList = getPath({el, data: TYPES});
            DATA.forEach((item: ObjectKeys, index) => {
                state.options[index] = calculation({
                    el: document.querySelector(`.lap${index + 1}`),
                    types: TYPES,
                    data: DATA[index],
                    width: 38,
                    height: 38
                });
            });
        });
        return {
            ...toRefs(state)
        };
    }
});
</script>
<style lang="less">
.ellipse-wrap {
    width: 60%;
    height: 0;
    position: relative;
    padding-top: ~'calc(60% / 2.2)';
    margin: 50px auto;
    .center {
        position: absolute;
        z-index: 4;
        width: 52px;
        height: 52px;
        line-height: 52px;
        margin-left: -26px;
        margin-top: -26px;
        top: 50%;
        left: 50%;
        border-radius: 50%;
        text-align: center;
        background: red;
        color: #ffffff;
    }
    .lap,
    .bg-wrap {
        position: absolute;
        border-radius: 50%;
        border: 2px solid #ffffff;
        top: 50%;
        left: 50%;
    }
    .lap {
        height: 0;
        > div {
            position: absolute;
            text-align: center;
            font-size: 14px;
            cursor: pointer;
            border-radius: 50%;
            height: 38px;
            width: 38px;
            text-align: center;
            line-height: 38px;
            border: 2px solid transparent;
        }
    }
    .lap1 {
        width: ~'calc(100% / 5 * 1.5)';
        padding-top: ~'calc(100% / 5 * 1.5 / 2.2)';
        margin-top: ~'calc(-100% / 5 * 1.5 / 4.4)';
        margin-left: ~'calc(-100% / 5 * 1.5 / 2)';
        z-index: 3;
    }
    .lap2 {
        width: ~'calc(100% / 5 * 3)';
        padding-top: ~'calc(100% / 5 * 3 / 2.2)';
        margin-top: ~'calc(-100% / 5 * 3 / 4.4)';
        margin-left: ~'calc(-100% / 5 * 3 / 2)';
        z-index: 2;
    }
    .lap3,
    .bg-wrap {
        width: 100%;
        padding-top: ~'calc(100% / 2.2)';
        margin-top: ~'calc(-100% / 4.4)';
        margin-left: -50%;
        z-index: 1;
        &.bg-gradient,
        &.bg-skew {
            width: ~'calc(100% / 2.2)';
            margin-left: ~'calc(-100% / 4.4)';
            transform: scale(2.2, 1);
            mask-image: radial-gradient(rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
        }
    }
    .bg-wrap {
        height: 0;
        overflow: hidden;
        z-index: 0;
        svg {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            right: 0;
        }
    }
}
</style>
