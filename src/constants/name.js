const name =
    [{ key: 'product_code', name: '产品' },
    { key: 'level_name', name: '等级名称' },
    { key: 'account_id', name: '会员ID' },
    { key: 'account_name', name: '会员名称' },
    { key: 'parent_account_code', name: '推荐人ID' },
    { key: 'parent_account_name', name: '推荐人名称' },
    { key: 'invite_code_desc', name: '邀请码' },
    { key: 'referral_code_desc', name: '推广码' },
    { key: 'finance_period_desc', name: '融资周期' },
    { key: 'finance_ratio', name: '融资比例' },
    { key: 'manage_fee_rate', name: '管理费率' },
    { key: 'manage_fee_deal_rate', name: '管理费成交率' },
    { key: 'manage_make_fee_rate', name: '建仓费率' },
    { key: 'separate_fee_rate', name: '盈利分成比例' },
    { key: 'allotted_scale', name: '期初规模' },
    { key: 'cash_scale', name: '保证金' },
    { key: 'account_commission', name: '单边佣金' },
    { key: 'cordon_line', name: '警戒线(金额)' },
    { key: 'flat_line', name: '平仓线(金额)' },
    { key: 'position_ratio', name: '个股持仓比率' },
    { key: 'second_board_position_ratio', name: '创业板持仓比率' },
    { key: 'position_status_desc', name: '开仓状态' },
    { key: 'order_permission_desc', name: '下单权限' },
    { key: 'account_status_desc', name: '会员状态' },
    { key: 'finance_start_date', name: '融资开始日期' },
    { key: 'create_time', name: '创建时间' },
    { key: 'opeartor_time', name: '操作时间' },
    //资金流水
    { key: 'account_code', name: '会员ID' },
    { key: 'amount', name: '金额(元)' },
    { key: 'type_desc', name: '类型' },
    { key: 'source_desc', name: '标的' },
    { key: 'remark', name: '备注' },
    { key: 'opeartor', name: '操作人' },
    { key: 'opeartorTime', name: '操作时间' },
    //佣金统计
    { key: 'deal_cnt', name: '成交数量' },
    { key: 'commission', name: '佣金总和' },
    { key: 'is_settled_desc', name: '是否结算' },
    { key: 'settle_type_desc', name: '结算方式' },
    { key: 'settle_time', name: '结算时间' },
    { key: 'total_cost', name: '总结算金额' },
    { key: 'total_cost_all', name: '总成交金额' },
    //历史权益
    { key: 'balance', name: '账户余额' },
    { key: 'total_scale', name: '总资产' },
    { key: 'able_scale', name: '可用资金' },
    { key: 'stock_scale', name: '股票市值' },
    { key: 'self_trade_scale', name: '当日交易成交总额' },
    { key: 'sub_trade_scale', name: '当日子账户交易成交总额' },
    { key: 'change_scale', name: '当日权益变动价' },
    { key: 'total_profit', name: '总盈亏' },
    //持仓变更记录
    { key: 'stock_code', name: '证券代码' },
    { key: 'stock_name', name: '证券名称' },
    //历史交割单
    { key: 'stock_no', name: '证券代码' },
    { key: 'order_no', name: '委托编号' },
    { key: 'entrust_price', name: '委托价' },
    { key: 'stock_cnt', name: '委托数量' },
    { key: 'deal_no', name: '成交编号' },
    { key: 'deal_price', name: '成交均价' },
    { key: 'deal_amount', name: '成交金额' },
    { key: 'commission_rate', name: '佣金率' },
    { key: 'transfer_fee_rate', name: '过户费率' },
    { key: 'transfer_fee', name: '过户费' },
    { key: 'stamp_rate', name: '印花税率' },
    { key: 'stamp', name: '印花税' },
    { key: 'other_fee_rate', name: '其他费用率' },
    { key: 'other_fee', name: '其他费用' },
    { key: 'settle_price', name: '结算金额' },
    { key: 'bs_type_desc', name: '买卖方向' },
    //历史成交查询
    { key: 'pk_order', name: '委托PK' },
    { key: 'deal_avr_price', name: '成交均价' },
    { key: 'fee_amount', name: '手续费' },
    { key: 'happen_amount', name: '发生金额' },
    { key: 'memo', name: '备注信息' },
    { key: 'sub_type_desc', name: '买卖方向' },
    { key: 'entrust_status_desc', name: '委托状态' },
    //历史委托查询
    //历史结算信息
    { key: 'deal_cnt_buy', name: '总买入数量' },
    { key: 'deal_amount_buy', name: '买入成交额' },
    { key: 'commission_buy', name: '总买入手续费' },
    { key: 'happen_amount_buy', name: '总买入发生金额' },
    { key: 'deal_cnt_sell', name: '总卖出数量' },
    { key: 'deal_amount_sell', name: '卖出成交金额' },
    { key: 'commission_sell', name: '总卖出手续费' },
    { key: 'happen_amount_sell', name: '总卖出发生金额' },
    { key: 'total_happen_amount', name: '总发生金额' },
    { key: 'total_deal_amount', name: '总成交金额' },
    //历史持仓快照
    { key: 'allotted_cnt', name: '持仓数量' },
    { key: 'pre_cost', name: '参考成本' },
    { key: 'pre_close_price', name: '收盘价' },
    { key: 'profit', name: '参考盈亏' },
    { key: 'deal_date_desc', name: '成交日期' },
    { key: 'deal_time_desc', name: '成交时间' },
    { key: 'order_date_desc', name: '委托日期' },
    { key: 'order_time_desc', name: ' 委托时间' },
    { key: 'amount_number', name: ' 数量' },
    //会员直推统计
    { key: 'invite_count', name: '直推会员数' },
    { key: 'total_deal_cnt', name: '成交数量' },

    { key: 'from_user', name: '推荐人ID' },
    { key: 'from_user_name', name: '推荐人名称' },
    { key: 'to_user', name: '客户ID' },
    { key: 'to_user_name', name: '客户名称' },
    ]
export const NAME = name;