import {Center} from './reuse';

const UsBoxPage = (() => {
    function usbox() {
        this.$page = $('#UsBoxPage');
        this.$ct = this.$page.find('.ct');
        this.start();
    }

    usbox.prototype = {
        start() {
            const self = this;
            this.getData((data) => {
                self.render(data);
            })
        },
        getData(callback) {
            const self = this;
            this.$page.find('.loading').show();
            $.ajax({
                url: '//api.douban.com/v2/movie/us_box',
                dataType: 'jsonp'
            }).done((ret) => {
                callback && callback(ret);
            }).fail(() => {
                console.log('Usbox 数据异常')
            }).always(() => {
                self.$page.find('.loading').hide();
            })
        },
        render(data) {
            const self = this;
            data.subjects.forEach((item) => {
                self.$ct.append(Center.createNode(item.subject))
            })
        }
    }
    return {
        init() {
            new usbox();
        }
    }
})()

export {UsBoxPage}


/*const UsBoxPage = {
            init: function () {
                this.$page = $('#UsBoxPage');
                this.$ct = this.$page.find('.ct');
                this.start();
            },
            start: function () {
                const self = this;
                this.getData(function (data) {
                    self.render(data);
                })
            },
            getData: function (callback) {
                const self = this;
                this.$page.find('.loading').show();
                $.ajax({
                    url: '//api.douban.com/v2/movie/us_box',
                    dataType: 'jsonp'
                }).done(function (ret) {
                    callback && callback(ret);
                }).fail(function () {
                    console.log('Usbox 数据异常')
                }).always(function () {
                    self.$page.find('.loading').hide();
                })
            },
            render: function (data) {
                const self = this;
                data.subjects.forEach(function (item) {
                    self.$ct.append(Center.createNode(item.subject))
                })
            }
        }*/