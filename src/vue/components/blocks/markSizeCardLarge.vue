<template>
    <div class="cable-info">
        <div class="table-cell__title cable-info__title" data-name="Маркоразмер">
            <span class="cable-info__title-text">
                {{ item.title }}
            </span>
        </div>
        <div class="table-cell__quantity cable-info__quantity" :data-name="item.quantity ? 'Остаток, м' : ''">
            <span v-if="item.quantity">
                {{ item.quantity }} м
            </span>
            <span v-else>
                под заказ
            </span>
        </div>
        <div class="table-cell__price cable-info__price" :data-name="item.price ? 'Цена, руб' : ''">
            <span v-if="item.price">
                {{ item.price }} &#8381;
            </span>
        </div>
        <div v-if="item.documents && item.documents.certificates" class="table-cell__certificates cable-info__certificates" :data-name="item.documents && item.documents.certificates ? 'Сертификаты' : ''">
            <span v-for="(document, key) in item.documents.certificates" :key="key" class="cable-info__certificate">
                <a :href="document.url" class="cable-info__certificate-link">
                    <img :src="`img/sprite.svg#${chooseCertificatePic(document.properties.date_end)}-usage`" class="cable-info__certificate-pic" alt="Сертификат продукции">
                    {{ document.properties.number }}
                    <span class="cable-info__certificate-tooltip">{{chooseCertificateToolTip(document.properties.date_end)}}</span>
                </a>
            </span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'MarkSizeCard',

    props: {
        item: {
            type: Object,
            required: true,
        }
    },

    data() {
        return {
            today: new Date(),
        }
    },

    methods: {
        chooseCertificatePic(date_end) {
            const expiringDate = new Date(date_end)
            if (this.today > expiringDate) {
                return 'expiring-certificate'
            }
            // 2,628e+9 - число миллисекунд в месяце
            if ((this.today - expiringDate) < 2,628e+9) {
                return 'expiring-soon-certificate'
            }
            return 'actual-certificate'
        },
        chooseCertificateToolTip(date_end) {
            const expiringDate = new Date(date_end)
            if (this.today > expiringDate) {
                return 'срок сертификата истек'
            }
            // 2,628e+9 - число миллисекунд в месяце
            if ((this.today - expiringDate) < 2,628e+9) {
                return `срок сертификата закончится ${this.formatDate(expiringDate)}`
            }
            return `сертификат действует до ${this.formatDate(expiringDate)}`
        },
        formatDate(date) {
            var dd = date.getDate();
            if (dd < 10) dd = '0' + dd;

            var mm = date.getMonth() + 1;
            if (mm < 10) mm = '0' + mm;

            var yy = date.getFullYear() % 100;
            if (yy < 10) yy = '0' + yy;

            return dd + '.' + mm + '.' + yy;
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    .cable-info {
        display: flex;
        align-items: center;
        padding: rem(27px) 0;
        border-bottom: 1px solid $borderColor;
        color: $lightcolorText;
        font-weight: 500;
        &__title-text {
            display: inline-block;
            font-size: rem(14px);
            border: 1px solid #D3D3D3;
            border-radius: 4px;
            padding: rem(10px) rem(32px);
        }
        &__quantity {
            font-size: rem(14px);
        }
        &__price {
            font-size: rem(16px);
            color: $colorTurquoise;
        }
        &__certificate {
            display: inline-block;
            margin-right: rem(12px);
            &-link {
                display: inline-block;
                position: relative;
                color: $lightcolorText;
                font-size: rem(14px);
                font-weight: 500;
                &:hover .cable-info__certificate-tooltip,
                &:focus .cable-info__certificate-tooltip {
                    display: block;
                }
            }
            &-tooltip {
                display: none;
                position: absolute;
                box-shadow: 0px 4px 24px rgba(55, 31, 31, 0.25);
                padding: rem(10px);
                background-color: $colorWhite;
                color: $colorGray;
                font-size: rem(14px);
                white-space: nowrap;
                border-radius: 4px;
                top: -50px;
                left: -80px;
            }
            &-pic {
                width: 12px;
                height: 12px;
            }
        }
    }
        
    .table-cell {
        &__title {
            width: 25%;
        }
        &__quantity {
            width: 20%;
        }
        &__price {
            width: 20%;
        }
        &__certificates {
            width: 35%;
        }
    }

    @include mq($until: desktop) {
        .table-cell {
            &__title {
                width: 35%;
            }
            &__quantity {
                width: 20%;
            }
            &__price {
                width: 20%;
            }
            &__certificates {
                width: 25%;
            }
        } 
    }

    @include mq($until: tablet) {
        .cable-info {
            flex-direction: column;
            align-items: flex-start;
            &__title,
            &__quantity,
            &__price,
            &__certificates {
                position: relative;
                padding: rem(8px) 0 rem(8px) rem(128px);
                &::before {
                    content: attr(data-name);
                    position: absolute;
                    top: rem(8px);
                    left: 0;
                    font-size: rem(14px);
                    font-weight: 500;
                    color: $colorGray;
                }
            }
            &__title-text {
                padding: rem(10px);
            }
        }
        .table-cell {
            &__title {
                width: 100%;
            }
            &__quantity {
                width: 100%;
            }
            &__price {
                width: 100%;
            }
            &__certificates {
                width: 100%;
            }
        }
    }

</style>