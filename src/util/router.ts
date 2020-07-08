interface RouterObj {
    [prop: string]: RouterDetail
}
interface RouterDetail {
    title: string
    key: string
}
export const routerObj: RouterObj = {
    '/': { title: '首页', key: '1' },
    '/userList': { title: '用户列表', key: '2' },
    '/template': { title: '模板管理', key: '3' },
    '/editTemplate': { title: '添加模板', key: '3' },
    '/editTemplateSearch': { title: '编辑模板', key: '3' },
    '/print': { title: '印品管理', key: '7' },
    '/category': { title: '类目管理', key: '8' },
    '/editPrint': { title: '新增印品', key: '8' },
    '/editPrintSearch': { title: '编辑印品', key: '8' },
    '/specsCompose': { title: '印品规格组合', key: '10' },
    '/orderList': { title: '订单管理', key: '11' },
    '/commentList': { title: '评价管理', key: '12' },
    '/commentDatailSearch': { title: '评价详情', key: '12' },
    '/bulkDelivery': { title: '批量发货', key: '13' },
    '/afterSales': { title: '售后管理', key: '14' },
    '/afterSalesDetailSearch': { title: '售后管理详情', key: '14' },
    '/coupon': { title: '优惠券', key: '15' },
    '/addCoupon': { title: '添加优惠券', key: '16' },
    '/newUserCoupon': { title: '新用户优惠券', key: '17' },
    '/showWorks': { title: '作品管理', key: '18' },
    '/commission': { title: '分佣管理', key: '19' },
    '/withdrawalLog': { title: '提现申请记录', key: '20' },
    '/dataStatistics': { title: '数据统计', key: '21' },
    '/systemSetting': { title: '系统设置', key: '22' },
    '/editBanner': { title: '添加图片', key: '22' },
    '/editBannerSearch': { title: '编辑图片', key: '22' },
    '/login': { title: '登录', key: '' },
    '/sendCoupon':{title: '发放优惠券', key: '23'},
    '/addSendCoupon':{title: '添加发放优惠券', key: '24'},
}
