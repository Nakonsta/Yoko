<script>
    import api from "@/helpers/api";
    export default {
        name: 'Structure',
        mixins: [api],
        template: '<div class="structure"></div>',
        data: function () {
            return {
                root: {},
            }
        },
        watch: {
            root: {
                handler: function(newRoot, oldRoot) {
                    // при изменении данных - перестраиваем всё
                    this.reinit();
                },
                deep: true,
            },
        },
        created() {
            const el = document.querySelector('.section--company')
            const companyId = el.dataset.id

            this.fetchRegisteredCompanyFull(companyId)
              .then(response => {
                console.log(response.data.data)
                this.getRootData(response.data.data)
              })
            // this.root = JSON.parse('{"img":"/content/clients-1.jpg","title":"пвсар","direction":"vertical","firstNode":true,"children":[{"img":"/content/clients-1.jpg","title":"ООО \\"Экстил создание сайтов\\"","direction":"vertical","firstNode":false,"children":[]},{"img":"/content/clients-1.jpg","title":"ООО \\"Экстил создание сайтов\\"","direction":"vertical","firstNode":false,"children":[{"img":"/content/clients-1.jpg","title":"ООО \\"Экстил создание сайтов\\"","direction":"vertical","firstNode":false,"children":[]},{"img":"/content/clients-1.jpg","title":"ООО \\"Экстил создание сайтов\\"","direction":"vertical","firstNode":false,"children":[]}]}]}')
            // this.root = {
            //     img: '/content/hierarchy-1.jpg',
            //     title: 'ПАО "Группа Компаний ПИК"',
            //     children: [
            //         {
            //             img: '/content/clients-1.jpg',
            //             title: 'ООО «ГлавСтрой Санкт-Петербург»',
            //             direction: 'vertical',
            //             children: [
            //                 {
            //                     img: '/content/clients-2.jpg',
            //                     title: 'ООО «ГлавСтрой Санкт-Петербург»',
            //                 },
            //                 {
            //                     img: '/content/clients-3.jpg',
            //                     title: 'ПАО "Группа Компаний ПИК"',
            //                 },
            //             ]
            //         },
            //         {
            //             img: '/content/clients-4.jpg',
            //             title: 'ПАО "Группа Компаний ПИК"',
            //             direction: 'vertical',
            //             children: [
            //                 {
            //                     img: '/content/clients-5.jpg',
            //                     title: 'ООО «ГлавСтрой Санкт-Петербург»',
            //                     direction: 'vertical',
            //                     children: [
            //                         {
            //                             img: '/content/clients-6.jpg',
            //                             title: 'ООО «ГлавСтрой Санкт-Петербург»',
            //                         },
            //                     ]
            //                 },
            //                 {
            //                     img: '/content/clients-7.jpg',
            //                     title: 'ПАО "Группа Компаний ПИК"',
            //                 },
            //             ]
            //         },
            //         {
            //             img: '/content/clients-1.jpg',
            //             title: 'ООО «ГлавСтрой Санкт-Петербург»',
            //             direction: 'horizontal',
            //             children: [
            //                 {
            //                     img: '/content/clients-2.jpg',
            //                     title: 'ООО «ГлавСтрой Санкт-Петербург»',
            //                 },
            //                 {
            //                     img: '/content/clients-3.jpg',
            //                     title: 'ПАО "Группа Компаний ПИК"',
            //                 },
            //             ]
            //         },
            //         {
            //             img: '/content/clients-2.jpg',
            //             title: 'ПАО "ПИК"',
            //             children: [
            //                 {
            //                     img: '/content/clients-7.jpg',
            //                     title: 'ООО «ГлавСтрой Санкт-Петербург»',
            //                 }
            //             ]
            //         },
            //     ],
            // };
        },
        methods: {
            getRootData(obj) {
                const root = []

                    function parseDataCompany(data, root, firstNode = true) {
                        let newObj = {
                          img: '/content/clients-1.jpg',
                          title: data.name,
                          children: [],
                        }

                        if (!firstNode) {
                          newObj.direction = data.childes.length > 1 ? 'horizontal' : 'vertical'
                        }

                        root.push(newObj)

                        if (data.childes.length) {
                            data.childes.forEach(item => {
                                parseDataCompany(item, newObj.children, false)
                            })
                        }
                    }

                parseDataCompany(obj, root)

                this.root = root[0]
            },
            parseDataCompany(obj, parent = null) {
                let newObj = {
                    img: '/content/clients-1.jpg',
                    title: 'ООО «ГлавСтрой Санкт-Петербург»',
                    direction: 'horizontal',
                    children: [],
                }
                if (parent) {
                    parent.children.push(newObj)
                }
            },
            init() {
                // построение и привязка событий
                this.build();
                this.$el.querySelectorAll('.structure__node-wrap').forEach((el)=>{
                    el.addEventListener('mouseenter', this.hightlight);
                    el.addEventListener('mouseout', this.unhightlight);
                });
                this.resize();
                window.addEventListener('resize', this.resize);
            },
            reinit() {
                // перезапуск всех и вся
                this.$el.querySelectorAll('.structure__node-wrap').forEach((el)=> {
                    el.removeEventListener('mouseenter', this.hightlight);
                    el.removeEventListener('mouseout', this.hightlight);
                });
                window.removeEventListener('resize', this.resize);
                while(this.$el.firstChild) this.$el.removeChild(this.$el.firstChild);
                this.init();
            },
            resize() {
                // пересчёт при изменении размеров (нужно для подсветки путей у горизонтальных элементов)
                let vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
                if( vw < 1024 ) return; // на мобилке пересчёт не нужен
                this.$el.querySelectorAll('.structure__node--horizontal.structure__node--parent').forEach((parent)=> {
                    let parentWrap = parent.querySelector(':scope > .structure__node-wrap');
                    parent.querySelectorAll(':scope > .structure__children > .structure__children-wrap > .structure__node').forEach((child)=> {
                        let to = child.querySelector(':scope > .structure__node-path-to'),
                            childWrap = child.querySelector(':scope > .structure__node-wrap');
                        if( parentWrap.getBoundingClientRect().left < childWrap.getBoundingClientRect().left ) {
                            // узлы справа от родителя
                            to.style.width = (childWrap.getBoundingClientRect().left - parentWrap.getBoundingClientRect().left - 1)+'px';
                            to.style.right = '50%';
                            to.style.display = 'block';
                        } else if( parentWrap.getBoundingClientRect().left > childWrap.getBoundingClientRect().left ) {
                            // узлы слева от родителя
                            to.style.width = (parentWrap.getBoundingClientRect().left - childWrap.getBoundingClientRect().left + 1)+'px';
                            to.style.left = '50%';
                            to.style.display = 'block';
                        } else {
                            // узлы сразу под родителем
                            to.style.display = 'none';
                        }
                    });
                });
            },
            build() {
                // строим узлы
                let root = this.createNode(this.root);
                root.classList.add('structure__node--root');
                this.$el.appendChild(root);
            },
            hightlight: function(evt) {
                // подсветка узлов
                evt.target.parentElement.classList.add('hover');
                evt.target.parentElement.parents('.structure__node').forEach((parent) => {
                    parent.classList.add('active');
                });
            },
            unhightlight: function(evt) {
                // убираем подсветку узлов
                evt.target.parentElement.classList.remove('hover');
                evt.target.parentElement.parents('.structure__node').forEach((parent) => {
                    parent.classList.remove('active');
                });
            },
            createNode(item) {
                // создание узла
                let node = document.createElement('div');
                node.classList.add('structure__node');
                let nodePathTo = document.createElement('div');
                nodePathTo.classList.add('structure__node-path-to');
                node.appendChild(nodePathTo);
                let nodePathFrom = document.createElement('div');
                nodePathFrom.classList.add('structure__node-path-from');
                node.appendChild(nodePathFrom);
                let nodeWrap = document.createElement('div');
                nodeWrap.classList.add('structure__node-wrap');
                node.appendChild(nodeWrap);
                let imgDiv = document.createElement('div');
                imgDiv.classList.add('structure__node-img');
                nodeWrap.appendChild(imgDiv);
                if (item.img) {
                    let nodeImg = document.createElement('img');
                    nodeImg.setAttribute('src', item.img);
                    imgDiv.appendChild(nodeImg);
                }
                let nodeTitle = document.createElement('div');
                nodeTitle.classList.add('structure__node-title');
                nodeTitle.innerHTML = item.title;
                nodeWrap.appendChild(nodeTitle);
                if (item.children && item.children.length) {
                    // создание наследников узла
                    node.classList.add('structure__node--' + (item.direction && ['vertical', 'horizontal'].indexOf(item.direction) !== -1 ? item.direction : 'horizontal'));
                    node.classList.add('structure__node--parent');
                    let children = document.createElement('div');
                    children.classList.add('structure__children');
                    node.appendChild(children);
                    let childrenWrap = document.createElement('div');
                    childrenWrap.classList.add('structure__children-wrap');
                    if (item.direction === undefined) {
                      if (item.children.length === 1) {
                        children.classList.add('structure__children--only-child');
                        childrenWrap.classList.add('structure__children-wrap--only-child');
                      }
                    }
                    children.appendChild(childrenWrap);
                    for (let i = 0; i < item.children.length; i++) {
                        childrenWrap.appendChild(this.createNode(item.children[i]));
                    }
                }
                return node;
            },
        },
    }
</script>

<style lang="scss">
    @import "../../../assets/sass/variables/variables";
    @import "../../../assets/sass/variables/fluid-variables";
    @import "../../../assets/sass/mixins/fluid-mixin";
    @import "../../../assets/sass/mixins/mq";

    $nodeWidth: 200px;
    $nodePathSize: 32px;
    $nodePathColor: #cbcbcb;
    $nodePathColorActive: $colorTurquoiseHover;

    @include mq($from: desktop) {
        .structure__node--horizontal > .structure__children {
            position: relative;
            &:hover {
                &::before {
                    border-color: $nodePathColorActive;
                }
            }
        }

        .structure__node {
            position: relative;
            &.hover {
                &::before,
                > .structure__node-path-to::before,
                > .structure__node-path-to::after,
                > .structure__node-wrap > .structure__node-img {
                    border-color: $nodePathColorActive !important;
                }
                > .structure__node-path-to::before {
                    z-index: 2;
                }
                > .structure__node-wrap > .structure__node-img {
                    box-shadow: 0 0 10px $colorTurquoiseHover;
                }
                > .structure__node-wrap > .structure__node-title {
                    color: $nodePathColorActive;
                }
            }
            &.active {
                &::before,
                > .structure__node-wrap::before,
                > .structure__node-path-to::before,
                > .structure__node-path-to::after,
                > .structure__node-path-from::after,
                /*&.structure__node--horizontal > .structure__node-path-to::before,*/
                // подсвечиваем промежуточные блоки
                &.structure__node--vertical > .structure__children > .structure__children-wrap > .structure__node > .structure__node-path-to::before,
                > .structure__children > .structure__children-wrap > .structure__node > .structure__node-path-from::before {
                    border-color: $nodePathColorActive !important;
                }
                // фикс подсвечиветки промежуточных блоков - убираем подсветку ЗА активным
                &.structure__node--vertical > .structure__children > .structure__children-wrap > .structure__node.hover > .structure__node-path-from::before,
                &.structure__node--vertical > .structure__children > .structure__children-wrap > .structure__node.hover ~ .structure__node > .structure__node-path-to::before,
                &.structure__node--vertical > .structure__children > .structure__children-wrap > .structure__node.hover ~ .structure__node > .structure__node-path-from::before,
                &.structure__node--vertical > .structure__children > .structure__children-wrap > .structure__node.active > .structure__node-path-from::before,
                &.structure__node--vertical > .structure__children > .structure__children-wrap > .structure__node.active ~ .structure__node > .structure__node-path-to::before,
                &.structure__node--vertical > .structure__children > .structure__children-wrap > .structure__node.active ~ .structure__node > .structure__node-path-from::before {
                    border-color: $nodePathColor !important;
                }
                > .structure__node-wrap .structure__node-img {
                    box-shadow: 0 0 10px $colorTurquoiseHover;
                }
                > .structure__node-path-to::before {
                    z-index: 3;
                }
            }
        }

        .structure__node,
        .structure__node--horizontal > .structure__children,
        .structure__node--vertical > .structure__node-wrap,
        .structure__node-path-to,
        .structure__node-path-from {
            &::before,
            &::after {
                content: '';
                display: block;
                border: 0 solid $nodePathColor;
                position: absolute;
                pointer-events: none;
                transition: border-color $animation;
            }
        }
        .structure__node-path-to,
        .structure__node-path-from {
            pointer-events: none;
        }

        .structure {
            margin: -10px 0;
            padding: 10px $nodePathSize;
            overflow-y: auto;
            &__node {
                flex: 0 0 $nodeWidth;
                &--root {
                    flex: initial;
                }
                &--vertical {
                    // вертикальные наследники - полосы слева
                    > .structure__node-wrap {
                        position: relative;
                        &::before {
                            content: '';
                            display: block;
                            border-left: 1px solid $nodePathColor !important;
                            width: 0;
                            position: absolute;
                            top: $nodePathSize;
                            left: -$nodePathSize/2;
                            bottom: 0;
                        }
                    }
                    > .structure__node-path-from {
                        &::after {
                            border-width: 1px 0 0;
                            height: 0;
                            top: $nodePathSize;
                            left: -$nodePathSize/2;
                            right: $nodeWidth/2;
                        }
                    }
                    > .structure__children {
                        > .structure__children-wrap {
                            > .structure__node {
                                margin-top: $nodePathSize;
                                + .structure__node {
                                    margin-left: 0;
                                }
                                > .structure__node-path-to {
                                    &::before {
                                        border-width: 0 0 0 1px;
                                        width: 0;
                                        height: $nodePathSize*2;
                                        top: -$nodePathSize;
                                        left: -$nodePathSize/2;
                                    }
                                    &::after {
                                        border-width: 1px 0 0;
                                        height: 0;
                                        top: $nodePathSize;
                                        left: -$nodePathSize/2;
                                        right: $nodeWidth/2;
                                    }
                                }
                                &:not(:last-child) {
                                    > .structure__node-path-from {
                                        &::before {
                                            border-width: 0 0 0 1px;
                                            width: 0;
                                            top: $nodePathSize;
                                            left: -$nodePathSize/2;
                                            bottom: 0;
                                        }
                                    }
                                }
                                &--vertical {
                                    // вертикальные наследники внутри вертикального - переносим полосы вправо
                                    > .structure__node-wrap {
                                        position: relative;
                                        &::before {
                                            content: '';
                                            display: block;
                                            border-left: 1px solid $nodePathColor;
                                            width: 0;
                                            position: absolute;
                                            top: $nodePathSize;
                                            left: auto;
                                            right: -$nodePathSize/2;
                                            bottom: 0;
                                        }
                                    }
                                    > .structure__node-path-from {
                                        &::after {
                                            border-width: 1px 0 0;
                                            height: 0;
                                            top: $nodePathSize;
                                            left: $nodeWidth/2;
                                            right: -$nodePathSize/2;
                                        }
                                    }
                                    > .structure__children {
                                        > .structure__children-wrap {
                                            > .structure__node {
                                                > .structure__node-path-to {
                                                    &::before {
                                                        border-width: 0 0 0 1px;
                                                        width: 0;
                                                        height: $nodePathSize*2;
                                                        top: -$nodePathSize;
                                                        left: auto;
                                                        right: -$nodePathSize/2;
                                                    }
                                                    &::after {
                                                        border-width: 1px 0 0;
                                                        height: 0;
                                                        top: $nodePathSize;
                                                        left: $nodeWidth/2;
                                                        right: -$nodePathSize/2;
                                                    }
                                                }
                                            }
                                        }
                                    }
                                }
                                &.structure__node--parent {

                                }
                            }
                        }
                    }
                }
                &--horizontal {
                    // горизонтальные наследники
                    .structure__node + .structure__node {
                        margin-left: $nodePathSize;
                    }
                    > .structure__children {
                        padding-top: $nodePathSize;
                        &::before {
                            border-width: 0 0 0 1px;
                            width: 0;
                            height: $nodePathSize/2;
                            top: 0;
                            left: 50%;
                        }
                        &::after {
                            border-width: 1px 0 0;
                            height: 0;
                            top: $nodePathSize/2;
                            left: $nodeWidth/2;
                            right: $nodeWidth/2;
                        }
                        &--only-child {
                            &::after {
                                content: none;
                            }
                        }
                        > .structure__children-wrap {
                            display: flex;
                            justify-content: space-between;
                            &--only-child {
                              justify-content: center;
                            }
                            > .structure__node {
                                > .structure__node-path-to {
                                    top: -$nodePathSize/2;
                                    position: absolute;
                                    &::before {
                                        border-width: 1px 0 0;
                                        top: 0;
                                        left: 0;
                                        right: 0;
                                    }
                                }
                                &::before {
                                    border-width: 0 0 0 1px;
                                    width: 0;
                                    height: $nodePathSize/2;
                                    left: 50%;
                                    top: -$nodePathSize/2;
                                }
                            }
                        }
                    }
                }
                &-wrap {
                    margin: 0 auto;
                    width: $nodeWidth;
                    text-align: center;
                    font-size: 16px;
                    font-family: $fontGilroy;
                    * {
                        pointer-events: none;
                    }
                }
                &-img {
                    margin: 0 auto 10px;
                    border: 1px solid #d3d3d3;
                    width: $nodePathSize*2;
                    height: $nodePathSize*2;
                    font-size: 0;
                    text-align: center;
                    background: #ffffff;
                    position: relative;
                    z-index: 2;
                    transition: border-color $animation, box-shadow $animation;
                    &::before,
                    img {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    &::before {
                        content: '';
                        height: 100%;
                    }
                    img {
                        /*max-width: 100%;*/
                        /*max-height: 100%;*/
                        max-width: 60px;
                        max-height: 60px;
                    }
                }
                &-title {
                    padding: 0 1em;
                    transition: color $animation;
                }
            }
            &__children {
                .structure__node {

                }
            }
        }
    }
    @include mq($until: desktop) {
        .structure__node-path-to {
            display: block !important;
        }
        .structure__children::before,
        .structure__node-path-to::before,
        .structure__node-path-to::after,
        .structure__node-path-from::before {
            content: '';
            display: block;
            border: 0 solid $nodePathColor;
            position: absolute;
            transition: border-color $animation;
        }
        .structure {
            &__node {
                /*&:not(.structure__node--root) {
                    border: 1px solid #cdcdcd;
                    border-radius: 6px;
                    padding: rem(24px);
                }*/
                position: relative;
                & + & {
                    margin-top: rem(24px);
                }
                &-wrap {
                    display: flex;
                    justify-content: space-between;
                    font-size: 16px;
                    font-family: $fontGilroy;
                    * {
                        pointer-events: none;
                    }
                }
                &-img {
                    border: 1px solid #d3d3d3;
                    flex: 0 0 $nodePathSize*2;
                    width: $nodePathSize*2;
                    height: $nodePathSize*2;
                    font-size: 0;
                    text-align: center;
                    background: #ffffff;
                    transition: border-color $animation, box-shadow $animation;
                    &::before,
                    img {
                        display: inline-block;
                        vertical-align: middle;
                    }
                    &::before {
                        content: '';
                        height: 100%;
                    }
                    img {
                        /*max-width: 100%;*/
                        /*max-height: 100%;*/
                        max-width: 60px;
                        max-height: 60px;
                    }
                }
                &-title {
                    align-self: center;
                    width: calc(100% - #{$nodePathSize*2 + 24px});
                    transition: color $animation;
                }
                &.hover {
                    > .structure__node-path-to::before,
                    > .structure__node-path-to::after,
                    > .structure__node-wrap > .structure__node-img {
                        border-color: $nodePathColorActive;
                    }
                    > .structure__node-wrap > .structure__node-img {
                        box-shadow: 0 0 10px $colorTurquoiseHover;
                    }
                    > .structure__node-wrap > .structure__node-title {
                        color: $nodePathColorActive;
                    }
                }
                &.active {
                    > .structure__children::before,
                    > .structure__node-path-to::before,
                    > .structure__node-path-to::after,
                    > .structure__children > .structure__children-wrap > .structure__node > .structure__node-path-to::before,
                    > .structure__children > .structure__children-wrap > .structure__node > .structure__node-path-from::before {
                        border-color: $nodePathColorActive;
                    }
                    > .structure__children > .structure__children-wrap > .structure__node.hover ~ .structure__node > .structure__node-path-to::before,
                    > .structure__children > .structure__children-wrap > .structure__node.hover > .structure__node-path-from::before,
                    > .structure__children > .structure__children-wrap > .structure__node.active ~ .structure__node > .structure__node-path-to::before,
                    > .structure__children > .structure__children-wrap > .structure__node.active > .structure__node-path-from::before {
                        border-color: $nodePathColor;
                    }
                    > .structure__node-wrap > .structure__node-img {
                        box-shadow: 0 0 10px $colorTurquoiseHover;
                    }
                }
            }
            &__children {
                margin-top: rem(24px);
                padding-left: rem(24px);
                position: relative;
                &::before {
                    border-width: 0 0 0 1px;
                    height: 24px;
                    width: 0;
                    top: -24px;
                    left: 0;
                }
                .structure__node-path-to {
                    &::before {
                        border-width: 0 0 0 1px;
                        width: 0;
                        height: $nodePathSize;
                        top: 0;
                        left: -24px;
                    }
                    &::after {
                        border-width: 1px 0 0;
                        width: 24px;
                        height: 0;
                        top: $nodePathSize;
                        left: -24px;
                    }
                }
                &-wrap > .structure__node:not(:last-child) > .structure__node-path-from {
                    &::before {
                        border-width: 0 0 0 1px;
                        width: 0;
                        height: 100%;
                        top: $nodePathSize;
                        left: -24px;
                        /*bottom: 0;*/
                    }
                }
            }
        }
    }
</style>