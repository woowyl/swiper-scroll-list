<template>
  <div id="app" v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">
    <div class="swiper-pagination" slot="pagination" ref="pagination"></div>
    <swiper ref="mySwiper" :options="swiperOptions">

        <swiper-slide v-for="navList in navBar" :key="navList.id">
          <div v-for="n in scrollList[curId].list" :key="n">
            <Product :item=n></Product>
          </div>
        </swiper-slide>
    </swiper>
  </div>
</template>

<script>
import Product from './components/Product.vue'
import $ from 'jquery'
import _ from 'lodash'
// import style
import 'swiper/css/swiper.css'

export default {
  name: 'App',
  components: {
    Product,
  },
  data() {
    return {
        swiperOptions: {
          data: [1,2,3],
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet(index, className) {
              return `<span class="${className} swiper-pagination-bullet-custom">${index + 1}</span>`
            }
          },
        },
        navBar: [{
            id: 111,
            name: "分类1"
          },{
            id: 2,
            name: "分类2"
          },{
            id: 333,
            name: "分类3"
          },{
            id: 444,
            name: "分类4"
          },{
            id: 55,
            name: "分类5"
        }],
        scrollList:{
            111: {
              list: [1,2,3,5],
              page:1
            }
        },
        // curId: this.navBar[0].id
        curId: 111
    }
  },
  computed: {
    swiper() {
      return this.$refs.mySwiper.$swiper
    }
  },
  mounted() {
    var that = this;

    for(var i=0;i<this.swiper.pagination.bullets.length;i++){
      $(this.swiper.pagination.bullets[i]).text(this.navBar[i].name)
    }

    this.swiper.on("slideChangeTransitionEnd", _.debounce(function() {
      // that.setSelectedPosition();
      console.log(that.swiper.activeIndex)
    }, 500))

    this.swiper.on("transitionEnd",function() {
      window.scrollTo(0,0);
      that.setSelectedPosition();
      // console.log(that.swiper.activeIndex)
    })

    // 初始化数据
    this.getDataList(this.navBar[0].id)

  },
  methods: {
    loadMore: function() {
      console.log("加载更多"+this.swiper.activeIndex);
    },
    setSelectedPosition: function() {
          var $selected = $(".swiper-pagination-bullet-active");
          var $wrapper = $(".swiper-pagination");
          if (!$selected) return;
          var selectedPosition = $selected[0].offsetLeft;
          
          var wrapperWidth = $wrapper.width();
          var scrollLength = selectedPosition - (wrapperWidth / 2)+50;
          
          if (scrollLength > 0) {
              $wrapper.animate({ scrollLeft: scrollLength }, 300);
          } else if ($wrapper[0].scrollLeft > 0) {
              $wrapper.animate({ scrollLeft: 0 }, 300);
          }
    },
    getDataList: function(tabid) {
        Array.prototype.concat.call(this.scrollList[tabid].list, [1,2,3,4]);
        console.log("this.scrollList", this.scrollList);
        
    }
  }
}
</script>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
.swiper-pagination {
  width: 100%;
  background: lightcoral;
  height: .8rem;
  overflow-x: scroll;
  white-space: nowrap;
  position: fixed;
  top: 0;
  .swiper-pagination-bullet {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    height: .8rem;
    background:skyblue;
    width: 2rem;
    font-size: .25rem;
    border-radius: 0;
    margin: 0 5px;
  }
}
.swiper-container {
  padding-top: .5rem !important;
}
</style>
