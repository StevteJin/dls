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
    filter: [{ key: 'u.accountId', value: '会员ID', type: 'LIKE' }, { key: 'u.accountName', value: '会员名称', type: 'LIKE' }],
    needTime: { key: 'u.createTime', value: 'RANGE' }
}, {
    path: '/moneyWater',
    key: 'moneyWater',
    url: '/api.v1/fund/stream/list',
    name: '资金流水',
    filter: [{ key: 'accountCode', value: '会员ID', type: 'LIKE' }, { key: 'accountName', value: '会员名称', type: 'LIKE' }, { key: 'type', value: '操作类型', type: 'LIKE' }, { key: 'source', value: '流水标的', type: 'LIKE' }],
    needTime: { key: 'opeartorTime', value: 'RANGE' }
}, {
    path: '/commissionStatistics',
    key: 'commissionStatistics',
    url: '/api.v1/fund/commission/list',
    name: '佣金统计',
    filter: [{ key: 'account_code', value: '会员ID', type: 'LIKE' }, { key: 'account_name', value: '会员名称', type: 'LIKE' }, { key: 'is_settled', value: '是否结算', type: 'LIKE' }, { key: 'settle_type', value: '结算方式', type: 'LIKE' }],
    needTime: { key: 'create_time', value: 'RANGE' }
}, {
    path: '/historyList',
    key: 'historyList',
    url: '/api.v1/fund/history/list',
    name: '历史权益',
    filter: [{ key: 'accountCode', value: '会员ID', type: 'LIKE' }, { key: 'accountName', value: '会员名称', type: 'LIKE' }],
    needTime: { key: 'createTime', value: 'RANGE' }
}, {
    path: '/changeRecord',
    key: 'changeRecord',
    url: '/api.v1/stock/hold/change/list',
    name: '持仓变动信息',
    filter: [{ key: 'accountCode', value: '会员ID', type: 'LIKE' }, { key: 'accountName', value: '会员名称', type: 'LIKE' }, { key: 'productCode', value: '产品编号', type: 'LIKE' }, { key: 'u.stockCode', value: '证券代码', type: 'LIKE' }, { key: 'type', value: '操作类型', type: 'LIKE' }],
    needTime: { key: 'opeartorTime', value: 'RANGE' }
}, {
    path: '/registration',
    key: 'registration',
    url: '/api.v1/stock/order/delivery/list',
    name: '交割单信息',
    filter: [{ key: 'accountCode', value: '会员ID', type: 'LIKE' }, { key: 'accountName', value: '会员名称', type: 'LIKE' }, { key: 'orderNo', value: '委托编号', type: 'LIKE' }, { key: 'dealNo', value: '成交编号', type: 'LIKE' }],
    needTime: { key: 'createTime', value: 'RANGE' }
}, {
    path: '/registQuery',
    key: 'registQuery',
    url: '/api.v1/stock/order/history/deal/list',
    name: '成交信息',
    filter: [{ key: 'accountCode', value: '会员ID', type: 'LIKE' }, { key: 'accountName', value: '会员名称', type: 'LIKE' }, { key: 'orderNo', value: '委托编号', type: 'LIKE' }, { key: 'dealNo', value: '成交编号', type: 'LIKE' }],
    needTime: { key: 'dealDate', value: 'DATE RANGE' }
}, {
    path: '/registEntrust',
    key: 'registEntrust',
    url: '/api.v1/stock/order/history/entrust/list',
    name: '委托信息',
    filter: [{ key: 'accountCode', value: '会员ID', type: 'LIKE' }, { key: 'accountName', value: '会员名称', type: 'LIKE' }, { key: 'orderNo', value: '委托编号', type: 'LIKE' }, { key: 'subType', value: '买卖方向', type: 'LIKE' }],
    needTime: { key: 'orderDate', value: 'DATE RANGE' }
}, {
    path: '/registSettlement',
    key: 'registSettlement',
    url: '/api.v1/stock/order/settle/list',
    name: '结算信息',
    filter: [{ key: 'accountCode', value: '会员ID', type: 'LIKE' }, { key: 'accountName', value: '会员名称', type: 'LIKE' }],
    needTime: { key: 'createTime', value: 'RANGE' }
}, {
    path: '/registSnapshot',
    key: 'registSnapshot',
    url: '/api.v1/stock/hold/list',
    name: '历史持仓快照',
    filter: [{ key: 'accountCode', value: '会员ID', type: 'LIKE' }, { key: 'accountName', value: '会员名称', type: 'LIKE' }],
    needTime: { key: 'createTime', value: 'RANGE' }
}, {
    path: '/orderSttleInvite',
    key: 'orderSttleInvite',
    url: '/api.v1/stock/order/settle/invite',
    name: '会员直推统计',
    filter: [{ key: 'accountCode', value: '会员ID', type: 'LIKE' }, { key: 'accountName', value: '会员名称', type: 'LIKE' }],
    needTime: { key: 'createTime', value: 'RANGE' }
}, {
    path: '/inviteList',
    key: 'inviteList',
    url: '/api.v1/user/invite/list',
    name: '会员直推关系',
    filter: [{ key: 'from_user', value: '推荐人ID', type: 'LIKE' }, { key: 'from_user_name', value: '推荐人名称', type: 'LIKE' }],
    needTime: { key: 'createTime', value: 'RANGE' }
}];
export const MENU = menu;
