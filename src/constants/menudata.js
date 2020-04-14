const menu = [{
    path: '/index',
    key: 'index',
    url:'/api.v1/user/profile',
    name: '主页'
}, {
    path: '/menberList',
    key: 'menberList',
    url:'/api.v1/user/list',
    name: '会员列表'
}, {
    path: '/moneyWater',
    key: 'moneyWater',
    url:'/api.v1/fund/stream/list',
    name: '资金流水'
}, {
    path: '/commissionStatistics',
    key: 'commissionStatistics',
    url:'/api.v1/fund/commission/list',
    name: '佣金统计'
}, {
    path: '/historyList',
    key: 'historyList',
    url:'/api.v1/fund/history/list',
    name: '历史权益'
}, {
    path: '/changeRecord',
    key: 'changeRecord',
    url:'/api.v1/stock/hold/change/list',
    name: '持仓变更记录'
}, {
    path: '/registration',
    key: 'registration',
    url:'/api.v1/stock/order/delivery/list',
    name: '历史交割单'
}, {
    path: '/registQuery',
    key: 'registQuery',
    url:'/api.v1/stock/order/history/deal/list',
    name: '历史成交查询'
}, {
    path: '/registEntrust',
    key: 'registEntrust',
    url:'/api.v1/stock/order/history/entrust/list',
    name: '历史委托查询'
}, {
    path: '/registSettlement',
    key: 'registSettlement',
    url:'/api.v1/stock/order/settle/list',
    name: '历史结算查询'
}, {
    path: '/registSnapshot',
    key: 'registSnapshot',
    url:'/api.v1/stock/hold/list',
    name: '历史持仓快照'
}];
export const MENU = menu;