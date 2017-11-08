import {Center} from './reuse';

const SearchPage = (() => {
    function search() {
        this.$page = $('#SearchPage')
        this.$input = this.$page.find('input')
        this.$btn = this.$page.find('.button')
        this.$ct = this.$page.find('.search-result')
        this.bind()
    }

    search.prototype = {
        bind() {
            const self = this;
            this.$btn.click(() => {
                self.$ct.empty()

                self.getData(self.$input.val(), (data) => {
                    self.render(data);
                })
            })
        },
        getData(val, callback) {
            const self = this;
            this.$page.find('.loading').show()
            $.ajax({
                url: '//api.douban.com/v2/movie/search',
                data: {
                    q: val
                },
                dataType: 'jsonp'
            }).done((ret) => {
                callback && callback(ret);
            }).fail(() => {
                console.log('Search 数据异常')
            }).always(() => {
                self.$page.find('.loading').hide()
            })
        },
        render(data) {
            const self = this;
            if (data.total === 0) {
                const result = '<div class="unfound">未找到结果，请重新输入</div>'
                self.$ct.append(result);
            }
            data.subjects.forEach((item) => {
                self.$ct.append(Center.createNode(item))
            })
        }
    }
    return {
        init() {
            new search();
        }
    }
})()

export {SearchPage};


/*var SearchPage = {
            init: function () {
                this.$page = $('#SearchPage')
                this.$input = this.$page.find('input')
                this.$btn = this.$page.find('.button')
                this.$ct = this.$page.find('.search-result')
                this.bind()
            },
            bind: function () {
                var self = this;
                this.$btn.click(function () {
                    self.$ct.empty()

                    self.getData(self.$input.val(), function (data) {
                        self.render(data);
                    })
                })
            },
            getData: function (val, callback) {
                var self = this;
                this.$page.find('.loading').show()
                $.ajax({
                    url: '//api.douban.com/v2/movie/search',
                    data: {
                        q: val
                    },
                    dataType: 'jsonp'
                }).done(function (ret) {
                    callback && callback(ret);
                }).fail(function () {
                    console.log('Search 数据异常')
                }).always(function () {
                    self.$page.find('.loading').hide()
                })
            },
            render: function (data) {
                var self = this;
                if (data.total === 0) {
                    var result = '<div class="unfound">未找到结果，请重新输入</div>'
                    self.$ct.append(result);
                }
                data.subjects.forEach(function (item) {
                    self.$ct.append(Center.createNode(item))
                })
            }
        }*/