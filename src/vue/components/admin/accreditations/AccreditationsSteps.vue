<template>
    <ul class="accreditation__steps">
        <li :class="classes(key)" v-for="(step, key) in steps" :key="key">
            <svg class="done">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#ok"></use>
            </svg>
            <svg class="rejected">
                <use xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href="\./img/sprite.svg#close"></use>
            </svg>
            <div :class="['accreditation__tooltip', { 'accreditation__tooltip--left': key == 2 }]">
                {{ step.anotherId == status.id ? step.anotherTitle : step.title }}
            </div>
        </li>
    </ul>
</template>
<script>
export default {
    props: {
        status: {
            type: Object
        }
    },
    data() {
        return {
            steps: [
                { title: 'Принята', id: 'accepted' },
                {
                    title: 'Прошла модерацию',
                    id: 'moderation',
                    anotherId: 'revision',
                    anotherTitle: 'Возвращена на доработку'
                },
                { title: 'Одобрена', id: 'closed' }
            ],
            activeKey: 0
        }
    },
    computed: {
        classes() {
            return key => [
                'accreditation__step',
                {
                    'accreditation__step--done': this.activeKey >= key,
                    'accreditation__step--rejected': this.activeKey === key && this.status.id === 'revision'
                }
            ]
        }
    },
    created() {
        if (this.status) {
            if (this.status.id === 'revision') {
                this.activeKey = 1

                return
            }

            this.steps.forEach((state, key) => {
                if (this.steps[key].id === this.status.id) {
                    this.activeKey = key
                }
            })
        }
    }
}
</script>
<style lang="scss" scoped>
@import '../../../../assets/sass/variables/variables';
@import '../../../../assets/sass/variables/fluid-variables';
@import '../../../../assets/sass/mixins/fluid-mixin';
@import '../../../../assets/sass/mixins/mq';

.accreditation {
    &__steps {
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;

        position: relative;

        width: 100%;
        margin: 0;
        padding: 0;
        list-style: none;

        &::after {
            content: '';

            position: absolute;
            top: 50%;
            left: 0;
            z-index: 1;

            width: 100%;
            height: 1px;
            background-color: $colorGray3;
        }
    }

    &__step {
        display: flex;
        justify-content: center;
        align-items: center;

        position: relative;
        z-index: 2;

        width: 20px;
        height: 20px;
        border-radius: 100%;
        background-color: $colorGray3;

        &--done {
            background-color: $colorTurquoise;

            .done {
                display: block;
            }
        }

        &--rejected {
            background-color: $colorCrimson;

            .rejected {
                display: block;
                width: 14px;
                height: 14px;
            }

            .done {
                display: none;
            }
        }

        &:hover {
            .accreditation__tooltip {
                opacity: 1;
                visibility: visible;
            }
        }
    }

    &__tooltip {
        display: flex;
        justify-content: center;
        align-items: center;

        position: absolute;
        left: 20px;
        bottom: -32px;
        z-index: 3;

        visibility: hidden;
        background-color: $colorTextLight;
        padding: rem(5px) rem(20px);
        border-radius: 4px;
        opacity: 0;
        transition: 0.2s;

        font-family: Roboto;
        font-size: 10px;
        color: #fff;
        white-space: nowrap;

        &--left {
            left: auto;
            right: 20px;
        }
    }
}

.done,
.rejected {
    display: none;

    width: 100%;
    height: 100%;
    fill: #fff;
}
</style>
