const Center = {
    isToBottom($viewport, $content) {
        return ($viewport.height() + $viewport.scrollTop() + 25 > $content.height())
    },
    createNode(movie) {
        const template = `<div class="item">
                             <a href="#">
                                <div class="cover">
                                     <img src="" alt="">
                                </div>
                                <div class="detail">
                                    <h2><span class="name"></span> / <span class="ori-name"></span></h2>
                                    <div class="extra"><span class="score"></span> / <span class="collect"></span>收藏</div>
                                    <div class="extra"><span class="year"></span> / <span class="type"></span></div>
                                    <div class="extra">导演: <span class="director"></span></div>
                                    <div class="extra">主演: <span class="actor"></span></div>
                                </div>
                             </a>
                         </div>`
        const $node = $(template)
        $node.find('a').attr('href', movie.alt);
        $node.find('.cover img').attr('src', movie.images.medium);
        $node.find('.detail h2 .name').text(movie.title);
        $node.find('.detail h2 .ori-name').text(movie.original_title);
        $node.find('.score').text(movie.rating.average + '分');
        $node.find('.collect').text(movie.collect_count);
        $node.find('.year').text(movie.year + '年');
        $node.find('.type').text(movie.genres.join(' / '));
        $node.find('.director').text(() => {
            const directorsArr = [];
            movie.directors.forEach((item) => {
                directorsArr.push(item.name);
            })
            return directorsArr.join('、')
        })
        $node.find('.actor').text(() => {
            const castsArr = [];
            movie.casts.forEach((item) => {
                castsArr.push(item.name);
            })
            return castsArr.join('、')
        })
        return $node;
    }
}

export {Center}