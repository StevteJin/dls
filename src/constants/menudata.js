const menu = [{
    path: '/index',
    key: 'index',
    url: '/api.v1/user/profile',
    name: '主页',
}, {
    path: '/menberList',
    key: 'menberList',
    url: '/api.v1/user/list',
    name: '会员列表',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }]
}, {
    path: '/moneyWater',
    key: 'moneyWater',
    url: '/api.v1/fund/stream/list',
    name: '资金流水',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }, { key: 'type', value: '操作类型', type: 'LIKE' }, { key: 'source', value: '流水标的', type: 'LIKE' }]
}, {
    path: '/commissionStatistics',
    key: 'commissionStatistics',
    url: '/api.v1/fund/commission/list',
    name: '佣金统计',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }, { key: 'is_settled', value: '是否结算', type: 'LIKE' }, { key: 'settle_type', value: '结算方式', type: 'LIKE' }]
}, {
    path: '/historyList',
    key: 'historyList',
    url: '/api.v1/fund/history/list',
    name: '历史权益',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }]
}, {
    path: '/changeRecord',
    key: 'changeRecord',
    url: '/api.v1/stock/hold/change/list',
    name: '持仓变更记录',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }, { key: 'productCode', value: '产品编号', type: 'LIKE' }, { key: 'stockCode', value: '证券代码', type: 'LIKE' }, { key: 'type', value: '操作类型', type: 'LIKE' }]
}, {
    path: '/registration',
    key: 'registration',
    url: '/api.v1/stock/order/delivery/list',
    name: '历史交割单',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }, { key: 'orderNo', value: '委托编号', type: 'LIKE' }, { key: 'dealNo', value: '成交编号', type: 'LIKE' }]
}, {
    path: '/registQuery',
    key: 'registQuery',
    url: '/api.v1/stock/order/history/deal/list',
    name: '历史成交查询',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }, { key: 'orderNo', value: '委托编号', type: 'LIKE' }, { key: 'dealNo', value: '成交编号', type: 'LIKE' }]
}, {
    path: '/registEntrust',
    key: 'registEntrust',
    url: '/api.v1/stock/order/history/entrust/list',
    name: '历史委托查询',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }, { key: 'orderNo', value: '委托编号', type: 'LIKE' }, { key: 'sub_type', value: '买卖方向', type: 'LIKE' }]
}, {
    path: '/registSettlement',
    key: 'registSettlement',
    url: '/api.v1/stock/order/settle/list',
    name: '历史结算查询',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }]
}, {
    path: '/registSnapshot',
    key: 'registSnapshot',
    url: '/api.v1/stock/hold/list',
    name: '历史持仓快照',
    filter: [{ key: 'accountId', value: '交易账号', type: 'LIKE' }, { key: 'accountName', value: '账户姓名', type: 'LIKE' }]
}];
export const MENU = menu;