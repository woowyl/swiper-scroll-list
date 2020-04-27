<template>
    <div class="product">
        <div class="left">
            <div class="pic-wrapper">
                <img src="http://placekitten.com/200/200" alt="">
            </div>
        </div>
        <div class="right">
            <h3 class="title">XXXX{{item}}</h3>
            <p class="discount">vip专享</p>
            <p class="price">天猫价格11</p>
            <div class="desp">
                <p class="store">门店咔咔咔咔扩</p>
                <p class="volume">销量</p>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Product",
    props: {
        item: Number
    }
}
</script>

<style lang="less" scoped>
.product {
    display: flex;
    justify-content: space-between;
    width: 100%;
    background: #fff;
    padding: .12rem .2rem;
    margin-bottom: .2rem;
    .left {
        width: 2.8rem;
        height: 2.8rem;
        .pic-wrapper {
            height: 100%;
            width: 100%;
            background: rgba(0,0,0,0.02);
            border-radius: .12rem;
            overflow: hidden;
            img {
                width: 100%;
                height: 100%;
                object-fit: contain;
            }
        }
    }
    .right {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;
        margin-left: .2rem;
        flex: 1;
        .title {
            height: .8rem;
            overflow: hidden;
            font-size: .28rem;
            color: #111;
        }
        .discount {
            display: flex;
            align-items: center;
            color:blue;
            font-size: .24rem;
            line-height: .24rem;
        }
        .price {
            display: flex;
            align-items: center;
            font-size: .24rem;
            color: #333;
        }
        .desp {
            display: flex;
            align-items: center;
            justify-content: space-between;
            .store {
                width: 2.76rem;
                overflow: hidden;
                white-space: nowrap;
                text-overflow: ellipsis;
                font-size: .24rem;
                color: #999;
                text-align: left;
            }
            .volume {
                font-size: .24rem;
                color: #999;
            }
        }
    }
}

</style>