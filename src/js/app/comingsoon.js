import {Center} from './reuse';

const ComingSoonPage = (() => {
    function comingsoon() {
        this.$page = $('#ComingSoonPage');
        this.$ct = this.$page.find('.ct')
        this.index = 0;
        this.isFinish = false;
        this.isLoading = false;
        this.bind()
        this.start()
    }

    comingsoon.prototype = {
        bind() {
            const self = this;
            this.$page.scroll(() => {
                if (!self.isFinish && Center.isToBottom(self.$page, self.$ct)) {
                    self.start();
                }
            })
        },
        start() {
            const self = this
            this.getData((data) => {
                self.render(data)
            })
        },
        getData(callback) {
            const self = this;
            if (this.isLoading) return;
            this.isLoading = true;
            this.$page.find('.loading').show()
            $.ajax({
                url: '//api.douban.com/v2/movie/coming_soon',
                data: {
                    start: self.index || 0
                },
                dataType: 'jsonp'
            }).done((ret) => {
                console.log(ret)
                self.index += 20;
                if (self.index >= ret.total) {
                    self.isFinish = true
                }
                callback && callback(ret);
            }).fail(() => {
                console.log('ComingSoon 数据异常')
            }).always(() => {
                self.isLoading = false;
                self.$page.find('.loading').hide();
            })
        },
        render(data) {
            const self = this
            data.subjects.forEach((movie) => {
                self.$ct.append(Center.createNode(movie))
            })
        }
    }
    return {
        init() {
            new comingsoon();
        }
    }
})()

export {ComingSoonPage};


/*const ComingSoonPage = {
            init: function () {
                this.$page = $('#ComingSoonPage');
                this.$ct = this.$page.find('.ct')
                this.index = 0;
                this.isFinish = false;
                this.isLoading = false;
                this.bind()
                this.start()
            },
            bind: function () {
                const self = this;
                this.$page.scroll(function () {
                    if (!self.isFinish && Center.isToBottom(self.$page, self.$ct)) {
                        self.start();
                    }
                })
            },
            start: function () {
                const self = this
                this.getData(function (data) {
                    self.render(data)
                })
            },
            getData: function (callback) {
                const self = this;
                if (this.isLoading) return;
                this.isLoading = true;
                this.$page.find('.loading').show()
                $.ajax({
                    url: '//api.douban.com/v2/movie/coming_soon',
                    data: {
                        start: self.index || 0
                    },
                    dataType: 'jsonp'
                }).done(function (ret) {
                    console.log(ret)
                    self.index += 20;
                    if (self.index >= ret.total) {
                        self.isFinish = true
                    }
                    callback && callback(ret);
                }).fail(function () {
                    console.log('ComingSoon 数据异常')
                }).always(function () {
                    self.isLoading = false;
                    self.$page.find('.loading').hide();
                })
            },
            render: function (data) {
                const self = this
                data.subjects.forEach(function (movie) {
                    self.$ct.append(Center.createNode(movie))
                })
            }
        }*/