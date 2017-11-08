import {Center} from './reuse';

const Top250Page = (() => {
    function top250() {
        this.$page = $('#Top250Page');
        this.$ct = this.$page.find('.ct');
        this.index = 0;
        this.isFinish = false;
        this.isLoading = false;

        this.bind()
        this.start()
    }

    top250.prototype = {
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
                url: '//api.douban.com/v2/movie/top250',
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
                console.log('Top250 数据异常')
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
            new top250();
        }
    }
})()

export {Top250Page}

/*  未优化版本
const Top250Page = {
            init: function () {
                this.$page = $('#Top250Page');
                this.$ct = this.$page.find('.ct');
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
                    url: '//api.douban.com/v2/movie/top250',
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
                    console.log('Top250 数据异常')
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
        }
*/