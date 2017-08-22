/**
 * Created by luanchi on 17/5/25.
 */

export default {
    /**
     * 公寓当前城市接口
     * 参数说明: 无
     */
    getCity: {
        host: '//gongyu.m.58.com',
        url: '/nestplan/api_get_city',
    },
    /**
     * 公寓房源接口
     * 参数说明:
     *  city=bj         城市
     *  type: "all"     房源类型：yuefu房租月付，duanzu短租过渡，jizhong精致开间, ddlweishengjian独立卫生间,all全部类型数据
     *  geoia=纬度,经度  以逗号当前位置经纬度,没有传空
     *  page=1          第几页
     *  size=10         每页多少条
     */
    getHouse: {
        host: '//gongyu.m.58.com',
        url: '/nestplan/api_get_house',
    },
    /**
     * 公寓店铺（品牌墙）
     * 参数说明:
     *  city=bj         城市
     *  type=1          1精选 2热门 3更多
     *  geoia=纬度,经度  以逗号当前位置经纬度,没有传空
     *  page=1          第几页
     *  size=10         每页多少条
     */
    getBrandWall: {
        host: '//activityhouse.m.58.com',
        url: '/nestplan/api_get_brand_wall',
    },
    /**
     * 非公寓版推荐url
     * 参数说明:
     *  city=bj         城市
     */
    getRecommendUrl: {
        host: '//activityhouse.m.58.com',
        url: '/nestplan/api_recommend_url',
    },
    getUserInfo: {// 获取活动用户信息
        host: '//activityhouse.m.58.com',
        url: '/nestplan/api_user_info',
    },
    uploadImg: {// 上传图片接口
        host: '//activityhouse.m.58.com',
        url: '/Nestplan/Api_student_pic_upload?up=1&auth=1',
    },
    submitApply: {// 上传图片接口
        host: '//activityhouse.m.58.com',
        url: '/nestplan/api_student_info_post',
    },
    getCoupon: {// 获取优惠券
        host: '//activityhouse.m.58.com',
        url: '/nestplan/api_get_coupon',
    },
    getApartments: {// 获取公寓
        host: '//activityhouse.m.58.com',
        url: '/nestplan/Api_get_brand_wall?nestplan=1',
    },
    useNestplan: {// 验券
        host: '//activityhouse.m.58.com',
        url: '/nestplan/api_check_vol',
    },
};
