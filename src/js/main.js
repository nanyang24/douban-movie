// import 引入文件，可省略.js
import {Top250Page} from './app/top250'
import {UsBoxPage} from './app/usbox'
import {ComingSoonPage} from './app/comingsoon'
import {SearchPage} from './app/search'
import {Tab} from './app/tab'
import  '../css/style.css'

// 初始化
Top250Page.init();
UsBoxPage.init();
ComingSoonPage.init();
SearchPage.init();
Tab.init($('footer > div'), $('main > section'));

