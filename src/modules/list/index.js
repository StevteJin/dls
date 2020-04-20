//此为列表页
import React from 'react';
import { Table, Pagination, Input, Button, DatePicker, Select } from 'antd';
//二维码
import QRCode from 'qrcode.react';

//引入导航
import { MENU } from '../../constants/menudata';
//引入数据字典
import { NAME } from '../../constants/name';
//引入请求接口
import httpAxios from '../../helpers/request';
import erimg from './img/ercode.png';
import './index.css';

import locale from 'antd/es/date-picker/locale/zh_CN';

import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const { RangePicker } = DatePicker;
const { Option } = Select;
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    //数据字典
    this.columns = [];
    this.state = {
      count: 1,
      data: "",
      total: "",
      rows: [],
      labelDom: [],
      filter: {},
      option: {},
      wherePath: '',
      current: 1,
      startTime: '',
      endTime: '',
      dateTime: '',
      qrUrl: '',
      dictionary: '',
      c1: [],
      c2: [],
      c3: [],
      c4: [],
      c5: []
    };
  }
  //请求表格数据的操作
  componentDidMount = () => {
    let url, method, options;
    let moren = this.props.location.pathname;
    MENU.map((item, index) => {
      //拿搜索框
      if (moren === item.path) {
        console.log(111)
        url = item.url;
        if (item.path != '/index') {
          method = 'post'
        } else {
          method = 'get'
        }
        options = null;
      }
    })
    this.getData(url, method, false, options);
    let labelDom, c1, c2, c3, c4, c5;
    let path = this.props.match.path;
    this.setState({
      wherePath: path
    })
    let filter = {}, option = {};
    MENU.map((item, index) => {
      if (path == item.path && item.key != 'needTime') {
        item.filter.map((item1, index1) => {
          filter[item1.key] = '';
          option[item1.key] = ''
        })
        this.setState({
          filter: filter,
          option: option
        }, () => {
          console.log('结', this.state.filter);
          let a = this.state.filter;
          let b = this.state.option;
          console.log('item', item)
          // a[item.needTime.key] == this.state.dateTime;
          // b[item.needTime.key] = item.needTime.value;
          for (let key in a) {
            a[item.needTime.key] = this.state.dateTime;
            this.state.option[item.needTime.key] = item.needTime.value;
          }
          // item.needTime.key
          // item.needTime.value
          console.log('最终结果', a, b);
        });
        console.log('filter啊1', this.state.filter)

        //操作类型，流水标的，是否结算，结算方式，买卖方向
        /**
         * 操作类型：fund_stream_type_dict
         * 流水标的fund_stream_source_dict
         * 是否结算yes_no_dict
         * 结算方式settle_type_dict
         * 买卖方向appoint_type_dict
         */
        let localData = JSON.parse(localStorage.getItem('localData'));
        let fund_stream_type_dict = localData.fund_stream_type_dict;
        let fund_stream_source_dict = localData.fund_stream_source_dict;
        let yes_no_dict = localData.yes_no_dict;
        let settle_type_dict = localData.settle_type_dict;
        let appoint_type_dict = localData.appoint_type_dict;
        //操作类型，流水标的
        c1 = fund_stream_type_dict.map((item, index) => (
          <Option value={item.k}>{item.v}</Option>
        ))
        c2 = fund_stream_source_dict.map((item, index) => (
          <Option value={item.k}>{item.v}</Option>
        ))
        //是否结算，结算方式
        c3 = yes_no_dict.map((item, index) => (
          <Option value={item.k}>{item.v}</Option>
        ))
        c4 = settle_type_dict.map((item, index) => (
          <Option value={item.k}>{item.v}</Option>
        ))
        c5 = appoint_type_dict.map((item, index) => (
          <Option value={item.k}>{item.v}</Option>
        ))
        labelDom = item.filter.map((item1, index1) => (
          item1.value != '操作类型' && item1.value != '流水标的' && item1.value != '是否结算' && item1.value != '结算方式' && item1.value != '买卖方向' ?
            <div key={item.path} className='inputArray'>
              <label for={item1.key}>{item1.value} : </label>
              <Input id={item1.key} value={item.value} onChange={this.handelChange} className='searchInput' />
            </div>
            : ''
        ))
      }
    })
    this.setState({
      labelDom: labelDom,
      c1: c1,
      c2: c2,
      c3: c3,
      c4: c4,
      c5: c5
    });
  }
  onOk(value) {
    console.log('onOk: ', value);
  }
  handelChange = event => {
    let e = event.target;
    console.log('拿到的', e.id, e.value)
    console.log('filter啊2', this.state.filter)
    for (let key in this.state.filter) {
      if (key == e.id) {
        this.state.filter[key] = e.value;
        this.state.option[key] = 'LIKE';
      }
    }
    console.log('最后', this.state.filter);
  }

  handelChange1 = (value, event) => {
    this.state.filter['type'] = value;
    console.log('最后2', this.state.filter);
    this.state.option['type'] = 'LIKE';
  }
  handelChange2 = (value, event) => {
    this.state.filter['source'] = value;
    this.state.option['source'] = 'LIKE';
  }
  handelChange3 = (value, event) => {
    this.state.filter['is_settled'] = value;
    this.state.option['is_settled'] = 'LIKE';
  }
  handelChange4 = (value, event) => {
    this.state.filter['settle_type'] = value;
    this.state.option['settle_type'] = 'LIKE';
  }
  handelChange5 = (value, event) => {
    this.state.filter['sub_type'] = value;
    this.state.option['sub_type'] = 'LIKE';
  }
  searchNow() {
    let url, method, options;
    let moren = this.props.match.path;
    MENU.map((item, index) => {
      //拿搜索框
      if (moren === item.path) {
        url = item.url;
        if (item.path != '/index') {
          method = 'post'
        } else {
          method = 'get'
        }
        //需要添加时间参数
        options = {
          filter: this.state.filter,
          option: this.state.option,
        };
      }
    })
    this.getData(url, method, false, options);
  }
  getData(url, method, beel, options) {
    httpAxios(url, method, beel, options).then(res => {
      if (res.code === 0) {
        res.data.rows.map((item, index) => {
          if (index == 0) {
            for (let key in item) {
              if (item.hasOwnProperty(key)) {
                NAME.map((item1, index1) => {
                  if (key == item1.key) {
                    if (key !== 'invite_code_desc') {
                      this.columns.push({
                        title: item1.name,
                        dataIndex: item1.key,
                        key: item1.key,
                        align: 'center',
                        width: 120
                      })
                    } else {
                      this.columns.push({
                        title: item1.name,
                        dataIndex: item1.key,
                        key: item1.key,
                        align: 'center',
                        width: 200,
                        render: (text, record) => (
                          <div className='ermax'><img onMouseOver={() => this.showImg(text, record)} onMouseOut={() => this.noShowImg()} src={erimg} />{this.state.qrUrl && text == this.state.qrUrl ?
                            <div className='ercode1'>
                              <div className='erimg1'>
                                <QRCode
                                  value={this.state.qrUrl}
                                  size={110}
                                  fgColor="#000000"
                                />
                              </div>
                            </div> : ''}</div>
                        )
                      })
                    }
                  }
                })
              }
            }
          }
          this.columns = this.deteleObject(this.columns);
        })
        this.setState({
          data: res.data,
          total: res.data.total || null,
          rows: res.data.rows || null,
          count: parseInt(this.total / 20)
        });
      }
    })
  }
  showImg(text, record) {
    let url = record.invite_code_desc;
    this.setState({
      qrUrl: url,
    }, () => {
    });
  }
  noShowImg() {
    this.setState({
      qrUrl: '',
    }, () => {
    });
  }
  deteleObject(obj) {
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
      var keys = Object.keys(obj[i]);
      keys.sort(function (a, b) {
        return (Number(a) - Number(b));
      });
      var str = '';
      for (var j = 0; j < keys.length; j++) {
        str += JSON.stringify(keys[j]);
        str += JSON.stringify(obj[i][keys[j]]);
      }
      if (!stringify.hasOwnProperty(str)) {
        uniques.push(obj[i]);
        stringify[str] = true;
      }
    }
    uniques = uniques;
    return uniques;
  }
  onChange = page => {
    console.log(page);
    this.setState({
      current: page,
    });
    let url, method, options;
    let moren = this.props.match.path;
    MENU.map((item, index) => {
      //拿搜索框
      if (moren === item.path) {
        url = item.url;
        if (item.path != '/index') {
          method = 'post'
        } else {
          method = 'get'
        }
        options = {
          page: this.state.current,
          size: 20,
          filter: this.state.filter,
          option: this.state.option
        };
      }
    })
    this.getData(url, method, false, options);
  }

  onChangeTime = (value, dateString) => {
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    this.setState({
      dateTime: dateString[0] + '~' + dateString[1]
    }, () => {
      console.log('时间', this.state)
      var lastkey = "";
      var jsonobj = this.state.filter;
      for (var key in jsonobj) {
        lastkey = key;
      }
      console.log('我是', lastkey);
      this.state.filter[lastkey] = this.state.dateTime;
      console.log('时间2', this.state)
    });
  }

  render() {

    const { rows, labelDom, c1, c2, c3, c4, c5, wherePath, total } = this.state;
    const columns = this.columns;
    return (
      <div>
        <div className="searchBox">
          {labelDom}
          {wherePath == '/moneyWater' ?
            <div>
              <div className='inputArray'>
                <label>操作类型 :</label>
                <Select style={{ width: 120 }} className='searchSelect' onChange={this.handelChange1}>
                  {c1}
                </Select>
              </div>
              <div className='inputArray'>
                <label>流水标的 :</label>
                <Select style={{ width: 120 }} className='searchSelect' onChange={this.handelChange2}>
                  {c2}
                </Select>
              </div></div> : (wherePath == '/commissionStatistics' ? <div>
                <div className='inputArray'>
                  <label>是否结算 :</label>
                  <Select style={{ width: 120 }} className='searchSelect' onChange={this.handelChange3}>
                    {c3}
                  </Select>
                </div>
                <div className='inputArray'>
                  <label>结算方式 :</label>
                  <Select style={{ width: 120 }} className='searchSelect' onChange={this.handelChange4}>
                    {c4}
                  </Select>
                </div></div> : (wherePath == '/changeRecord' ?
                  <div>
                    <div className='inputArray'>
                      <label>操作类型 :</label>
                      <Select style={{ width: 120 }} className='searchSelect' onChange={this.handelChange1}>
                        {c1}
                      </Select>
                    </div>
                  </div> : (wherePath == '/registEntrust' ?
                    <div>
                      <div className='inputArray'>
                        <label>买卖方向 :</label>
                        <Select style={{ width: 120 }} className='searchSelect' onChange={this.handelChange5}>
                          {c5}
                        </Select>
                      </div>
                    </div> : '')))}
          <div>
            <RangePicker
              showTime={{ format: 'HH:mm' }}
              format="YYYY-MM-DD HH:mm"
              onChange={this.onChangeTime}
              onOk={this.onOk}
              locale={locale}
              className='dateStyle'
            />
          </div>
          <Button className="searchBtn" type="primary" onClick={() => this.searchNow()}>查询</Button>
        </div>
        <div className="tableBox">
          <Table dataSource={rows} columns={columns} size="small" scroll={{ y: 670 }} pagination={false} />
          <Pagination size="small" current={this.state.current} defaultPageSize={20} onChange={this.onChange} total={total} />
        </div>
      </div>
    );
  }
}

export default EditableTable;