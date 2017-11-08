const Tab = (function () {
    function tab(tabs, panels) {
        this.$tabs = tabs;//$('footer > div')
        this.$panels = panels;//$('main > section')
        this.bind();
        this.spa();
    }

    tab.prototype = {
        bind() {
            const self = this;
            this.$tabs.click(function () {
                if ($(this).hasClass('active')) return;
                $(this).addClass('active')
                    .siblings().removeClass('active');
                self.$panels.hide()
                    .eq($(this).index()).fadeIn();
                self.setUrl($(this).index() + 1);
                console.log($(this).index() + 1)
            });
            window.onpopstate = () => {     // 当改变url时触发
                self.spa();
            }
            //针对 IOS 上的 safari，目的是禁止默认的拖动事件，但允许其中某div的滚动拖拽
            window.ontouchmove = function (e) {   // 禁止window的触摸移动的默认动作之后
                e.preventDefault()
            }
            $('section').each(function () {       // 在需要滚动拖拽的部分停止冒泡
                this.ontouchmove = function (e) {
                    e.stopPropagation()
                }
            })
        },
        spa() {
            const search = location.search.replace(/^\?/, '').split('=');
            if (search[0] === 'page') {
                this.$tabs.eq(search[1] - 1).addClass('active')
                    .siblings().removeClass('active')
                this.$panels
                    .hide()
                    .eq(search[1] - 1).fadeIn()
            } else {
                this.$tabs.eq(0).addClass('active')
                    .siblings().removeClass('active')
                this.$panels.eq(0).show()
            }
        },
        setUrl(page) {
            const url = location.pathname + '?page=' + page
            history.pushState({url: url, title: document.title}, document.title, url)
        }
    }
    return {
        init(tabs, panels) {
            new tab(tabs, panels);
        }
    }
})()

export {Tab};


/* 未优化版本
bind: function () {
                $('footer > div').click(function () {
                    $(this).addClass('active')
                        .siblings().removeClass('active')
                    $('main > section')
                        .hide()
                        .eq($(this).index()).fadeIn()
                })
*/