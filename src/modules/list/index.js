//此为列表页
import React from 'react';
import { Table, Pagination, Input, Button, DatePicker, Select, Tooltip, Popover } from 'antd';
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

//定义了一个来自React.Component的子类
class EditableTable extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
    //数据字典
    this.columns = [];
    //底部统计
    this.columnv = [];
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
      c5: [],
      c6: [],
      nowWeek: "",
      extend: "",
      allList: [],
      whereClass: ""
    };
  }
  //请求表格数据的操作
  componentDidMount = () => {
    //这是用来获取本周一和周五日期的
    this.setState({
      nowWeek: this.getCurrentWeek()
    }, () => {
      // console.log('我是周时间', this.state.nowWeek, typeof (this.state.nowWeek[0]));
    })
    //url为请求地址,method为请求方式，options为参数
    let url, method, options;
    //用来取当前路由的
    let path = this.props.match.path;
    //filter和option为请求列表的参数
    let filter = {}, option = {};
    let labelDom, c1, c2, c3, c4, c5, c6;
    //用whereClass区分各自结构的Class
    this.setState({
      wherePath: path
    }, () => {
      this.setState({
        whereClass: this.state.wherePath.replace("/", "")
      })
    })
    MENU.map((item, index) => {
      //拿搜索框
      if (path === item.path) {
        console.log(111)
        url = item.url;
        if (item.path != '/index') {
          method = 'post'
        } else {
          method = 'get'
        }
        if (path == '/historyList') {
          options = {
            page: this.state.current,
            size: 16,
            sort: 'subTradeScale',
            order: 'desc',
            filter: this.state.filter,
            option: this.state.option
          };
        } else {
          options = {
            page: this.state.current,
            size: 16,
            filter: this.state.filter,
            option: this.state.option
          };
        }
      }

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
          for (let key in a) {
            a[item.needTime.key] = this.state.dateTime;
            this.state.option[item.needTime.key] = item.needTime.value;
          }
          console.log('最终结果', a, b);
          //初始化的时候显示数
          options.filter = this.state.filter;
          options.option = this.state.option;
          let atime;
          if (path == '/registQuery' || path == '/registEntrust') {
            if (this.state.nowWeek[0] != '') {
              atime = this.state.nowWeek[0] + '~' + this.state.nowWeek[1]
            } else {
              atime = " "
            }
          } else if (path == '/menberList') {
            atime = " "
          } else {
            if (this.state.nowWeek[0] != '') {
              atime = this.state.nowWeek[0] + ' 00:00' + '~' + this.state.nowWeek[1] + ' 23:59'
            } else {
              atime = " "
            }
          }
          var lastkey = "";
          var jsonobj = this.state.filter;
          for (var key in jsonobj) {
            lastkey = key;
          }
          console.log('我是', lastkey);
          this.state.filter[lastkey] = atime;
          this.getData(url, method, false, options);
        });
        console.log('filter啊1', this.state.filter)

        //操作类型，流水标的，是否结算，结算方式，买卖方向
        /**
         * 操作类型：fund_stream_type_dict
         * 流水标的fund_stream_source_dict
         * 是否结算yes_no_dict
         * 结算方式settle_type_dict
         * 买卖方向appoint_type_dict
         * 类型hold_change_type_dict
         */
        let localData = JSON.parse(localStorage.getItem('localData'));
        let [c1, c2, c3, c4, c5, c6] = Object.values(localData).map((item, index) => (
          <Option value={item.k}>{item.v}</Option>
        ))
        labelDom = item.filter.map((item1, index1) => (
          item1.value != '操作类型' && item1.value != '流水标的' && item1.value != '是否结算' && item1.value != '结算方式' && item1.value != '买卖方向' ?
            <div key={index1} className='inputArray'>
              <label for={item1.key}>{item1.value} : </label>
              <Input id={item1.key} value={item.value} onChange={this.handelChange} className='searchInput' allowClear={true} autoComplete="off" />
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
      c5: c5,
      c6: c6
    });
  }
  onOk(value) {
    console.log('onOk: ', value);
  }

  //获取本周一和周日的时间
  getCurrentWeek() {
    //起止日期数组    
    var startStop = new Array();
    //获取当前时间    
    var currentDate = new Date();
    //返回date是一周中的某一天    
    var week = currentDate.getDay();
    //返回date是一个月中的某一天    
    var month = currentDate.getDate();

    //一天的毫秒数    
    var millisecond = 1000 * 60 * 60 * 24;
    //减去的天数    
    var minusDay = week != 0 ? week - 1 : 4;
    //alert(minusDay);    
    //本周 周一    
    var monday = new Date(currentDate.getTime() - (minusDay * millisecond));
    //本周 周日    
    var sunday = new Date(monday.getTime() + (4 * millisecond));
    monday = moment(monday).format('YYYY-MM-DD');
    sunday = moment(sunday).format('YYYY-MM-DD');
    //添加本周时间    
    startStop.push(monday); //本周起始时间    
    //添加本周最后一天时间    
    startStop.push(sunday); //本周终止时间
    console.log('本周起止时间', startStop);
    //返回    
    return startStop;
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

  handelChangeOther = (value, event, who) => {
    this.state.filter[who] = value;
    console.log('最后2', this.state.filter, '88', value, '99', event, 'who', who);
    this.state.option[who] = 'LIKE';
  }
  searchNow() {
    this.setState({
      current: 1
    }, () => {
      let url, method, options;
      let path = this.props.match.path;

      MENU.map((item, index) => {
        //拿搜索框
        if (path === item.path) {
          url = item.url;
          if (item.path != '/index') {
            method = 'post'
          } else {
            method = 'get'
          }
          if (path == '/historyList') {
            options = {
              page: this.state.current,
              size: 16,
              sort: 'subTradeScale',
              order: 'desc',
              filter: this.state.filter,
              option: this.state.option
            };
          } else {
            options = {
              page: this.state.current,
              size: 16,
              filter: this.state.filter,
              option: this.state.option
            };
          }
        }
      })
      this.getData(url, method, false, options);
    });
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
                    if (key == 'create_time' || key == 'opeartor_time') {
                      this.columns.push({
                        title: item1.name,
                        dataIndex: item1.key,
                        key: item1.key,
                        align: 'center',
                        ellipsis: true,
                        width: 250
                      })
                    } else if (key == 'remark') {
                      this.columns.push({
                        title: item1.name,
                        dataIndex: item1.key,
                        key: item1.key,
                        align: 'center',
                        ellipsis: true,
                        width: 300
                      })
                    } else if (key == 'sub_trade_scale') {
                      this.columns.push({
                        title: item1.name,
                        dataIndex: item1.key,
                        key: item1.key,
                        ellipsis: true,
                        align: 'center',
                        width: 230
                      })
                    } else if (key == 'invite_code_desc') {
                      this.columns.push({
                        title: item1.name,
                        dataIndex: item1.key,
                        key: item1.key,
                        align: 'center',
                        width: 200,
                        render: (text, record) => (
                          <div className='ermax'>{text != '' ? <img className='curimg' onClick={() => this.showImg(text, record)} src={erimg} /> : '-'}{this.state.qrUrl && text == this.state.qrUrl ?
                            <div className='ercode1' onClick={() => this.noShowImg()}>
                              <div className='erimg1' ref={this.myRef}>
                                <QRCode
                                  value={this.state.qrUrl}
                                  size={160}
                                  fgColor="#000000"
                                />
                              </div>
                            </div> : ''}</div>
                        )
                      })
                    } else if (key !== 'invite_code_desc') {
                      this.columns.push({
                        title: item1.name,
                        dataIndex: item1.key,
                        key: item1.key,
                        align: 'center',
                        ellipsis: true,
                        width: 120
                      })
                    }
                    //佣金统计
                    if (this.state.wherePath == '/commissionStatistics') {
                      if (key == 'account_code') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 120,
                          render: (text, record) => <span>统计</span>
                        })
                      } else if (key == 'create_time' || key == 'opeartor_time') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 250
                        })
                      } else if (key == 'remark') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 300
                        })
                      } else if (key == 'sub_trade_scale') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          ellipsis: true,
                          align: 'center',
                          width: 230
                        })
                      } else if (key == 'invite_code_desc') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          width: 200
                        })
                      } else {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 120
                        })
                      }
                    }
                    //成交信息
                    if (this.state.wherePath == '/registQuery') {
                      if (key == 'deal_date_desc') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 120,
                          render: (text, record) => <span>统计</span>
                        })
                      } else if (key == 'create_time' || key == 'opeartor_time') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 250
                        })
                      } else if (key == 'remark') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 300
                        })
                      } else if (key == 'sub_trade_scale') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          ellipsis: true,
                          align: 'center',
                          width: 230
                        })
                      } else if (key == 'invite_code_desc') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          width: 200
                        })
                      } else {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 120
                        })
                      }
                    }
                    //委托信息
                    if (this.state.wherePath == '/registEntrust') {
                      if (key == 'order_date_desc') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 120,
                          render: (text, record) => <span>统计</span>
                        })
                      } else if (key == 'create_time' || key == 'opeartor_time') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 250
                        })
                      } else if (key == 'remark') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 300
                        })
                      } else if (key == 'sub_trade_scale') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          ellipsis: true,
                          align: 'center',
                          width: 230
                        })
                      } else if (key == 'invite_code_desc') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          width: 200
                        })
                      } else {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 120
                        })
                      }
                    }
                    //结算信息
                    if (this.state.wherePath == '/registSettlement') {
                      if (key == 'account_code') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 120,
                          render: (text, record) => <span>统计</span>
                        })
                      } else if (key == 'create_time' || key == 'opeartor_time') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 250
                        })
                      } else if (key == 'remark') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 300
                        })
                      } else if (key == 'sub_trade_scale') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          ellipsis: true,
                          align: 'center',
                          width: 230
                        })
                      } else if (key == 'invite_code_desc') {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          width: 200
                        })
                      } else {
                        this.columnv.push({
                          title: item1.name,
                          dataIndex: item1.key,
                          key: item1.key,
                          align: 'center',
                          ellipsis: true,
                          width: 120
                        })
                      }
                    }
                  }
                })
              }
            }
          }
          this.columns = this.deteleObject(this.columns);
          this.columnv = this.deteleObject(this.columnv);
        })
        this.setState({
          data: res.data,
          total: res.data.total || null,
          rows: res.data.rows || null,
          //统计数据
          extend: res.data.extend || null,
          count: parseInt(this.total / 20)
        }, () => {
          if (this.state.wherePath == '/commissionStatistics' || this.state.wherePath == '/registQuery' || this.state.wherePath == '/registEntrust' || this.state.wherePath == '/registSettlement') {
            if (this.state.rows.length > 0) {
              //把数据push进去
              let AK = this.state.rows;
              //拷贝一个新数组
              let aL = [JSON.parse(JSON.stringify(this.state.rows[0]))];
              aL = aL.map((item, index) => {
                console.log('序列', item, index)
                for (let key in item) {
                  if (item.hasOwnProperty(key) && this.state.extend.hasOwnProperty(key)) {
                    item[key] = this.state.extend[key];
                  } else {
                    item[key] = '-'
                  }
                }
                return item;
              })
              console.log('我是新数组', aL)
              this.setState({
                allList: aL
              }, () => {
                this.setState({
                  rows: [...AK, this.state.allList[0]]
                }, () => {
                  if (this.state.rows.length > 0) {
                    //统计
                    let aLength = this.state.rows;
                    //佣金统计
                    if (this.state.wherePath == '/commissionStatistics') {
                      this.state.rows[aLength.length - 1]['account_code'] = '统计'
                    }
                    //成交信息
                    if (this.state.wherePath == '/registQuery') {
                      this.state.rows[aLength.length - 1]['deal_date_desc'] = '统计'
                    }
                    //委托信息
                    if (this.state.wherePath == '/registEntrust') {
                      this.state.rows[aLength.length - 1]['order_date_desc'] = '统计'
                    }
                    //结算信息
                    if (this.state.wherePath == '/registSettlement') {
                      this.state.rows[aLength.length - 1]['account_code'] = '统计'
                    }
                  }
                })
                console.log('大', this.state.rows, typeof (this.state.rows));
              })

            }
          }
        });
      }
    })
  }
  showImg(text, record) {
    console.log('对象', record);
    let index = this.state.rows.indexOf(record);
    console.log('第几项', index);
    let url = record.invite_code_desc;
    this.setState({
      qrUrl: url,
    }, () => {
      this.myRef.current.style.top = (index / 20) * 90 + '%';
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
    }, () => {
      let url, method, options;
      let path = this.props.match.path;
      MENU.map((item, index) => {
        //拿搜索框
        if (path === item.path) {
          url = item.url;
          if (item.path != '/index') {
            method = 'post'
          } else {
            method = 'get'
          }
          if (path == '/historyList') {
            options = {
              page: this.state.current,
              size: 16,
              sort: 'subTradeScale',
              order: 'desc',
              filter: this.state.filter,
              option: this.state.option
            };
          } else {
            options = {
              page: this.state.current,
              size: 16,
              filter: this.state.filter,
              option: this.state.option
            };
          }
        }
      })
      this.getData(url, method, false, options);
    });
  }
  getNowFormatDate = () => {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
      month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
      strDate = "0" + strDate;
    }
    var currentdate = year + seperator1 + month + seperator1 + strDate;
    // + " " + date.getHours() + seperator2 + date.getMinutes()
    // + seperator2 + date.getSeconds();
    return currentdate;
  }
  onChangeTime = (value, dateString) => {
    let path = this.props.match.path;
    console.log('Selected Time: ', value);
    console.log('Formatted Selected Time: ', dateString);
    //历史成交查询,历史委托查询
    let atime;
    if (path == '/registQuery' || path == '/registEntrust') {
      if (dateString[0] != '') {
        atime = dateString[0] + '~' + dateString[1]
      } else {
        atime = this.state.nowWeek[0] + '~' + this.state.nowWeek[1]
      }
    } else if (path == '/menberList') {
      if (dateString[0] != '') {
        atime = dateString[0] + ' 00:00' + '~' + dateString[1] + ' 23:59'
      } else {
        atime = ""
      }
    } else {
      if (dateString[0] != '') {
        atime = dateString[0] + ' 00:00' + '~' + dateString[1] + ' 23:59'
      } else {
        atime = this.state.nowWeek[0] + ' 00:00' + '~' + this.state.nowWeek[1] + ' 23:59'
      }
    }

    this.setState({
      dateTime: atime
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
    // let todayDate = this.getNowFormatDate();
    // console.log('我是当前日期', todayDate, typeof (todayDate))
    const { rows, labelDom, c1, c2, c3, c4, c5, c6, wherePath, whereClass, total, nowWeek } = this.state;
    const columns = this.columns;
    const columnv = this.columnv;
    const dateFormat = 'YYYY-MM-DD';
    const dateFormatList = ['YYYY-MM-DD', 'YYYY-MM-DD'];
    const a = moment(nowWeek[0]);
    const b = moment(nowWeek[1]);
    console.log('拿到的周值啊', nowWeek, a, b, typeof (a));
    return (
      <div>
        <div className="searchBox">
          {labelDom}
          {wherePath == '/moneyWater' ?
            <div>
              <div className='inputArray'>
                <label>操作类型 :</label>
                <Select style={{ width: 150 }} className='searchSelect' onChange={(value, event) => { this.handelChangeOther(value, event, 'type') }} allowClear={true}>
                  {c1}
                </Select>
              </div>
              <div className='inputArray'>
                <label>流水标的 :</label>
                <Select style={{ width: 120 }} className='searchSelect' onChange={(value, event) => { this.handelChangeOther(value, event, 'source') }} allowClear={true}>
                  {c2}
                </Select>
              </div></div> : (wherePath == '/commissionStatistics' ? <div>
                <div className='inputArray'>
                  <label>是否结算 :</label>
                  <Select style={{ width: 120 }} className='searchSelect' onChange={(value, event) => { this.handelChangeOther(value, event, 'is_settled') }} allowClear={true}>
                    {c3}
                  </Select>
                </div>
                <div className='inputArray'>
                  <label>结算方式 :</label>
                  <Select style={{ width: 140 }} className='searchSelect' onChange={(value, event) => { this.handelChangeOther(value, event, 'settle_type') }} allowClear={true}>
                    {c4}
                  </Select>
                </div></div> : (wherePath == '/changeRecord' ?
                  <div>
                    <div className='inputArray'>
                      <label>类型 :</label>
                      <Select style={{ width: 150 }} className='searchSelect' onChange={(value, event) => { this.handelChangeOther(value, event, 'type') }} allowClear={true}>
                        {c6}
                      </Select>
                    </div>
                  </div> : (wherePath == '/registEntrust' ?
                    <div>
                      <div className='inputArray'>
                        <label>买卖方向 :</label>
                        <Select style={{ width: 120 }} className='searchSelect' onChange={(value, event) => { this.handelChangeOther(value, event, 'subType') }} allowClear={true}>
                          {c5}
                        </Select>
                      </div>
                    </div> : '')))}
          <div className='inputArray'>
            <label>日期 :</label>
            {
              wherePath != '/menberList' ? <RangePicker
                onChange={this.onChangeTime}
                onOk={this.onOk}
                locale={locale}
                className='dateStyle'
                placeholder={[this.state.nowWeek[0], this.state.nowWeek[1]]}
              /> : <RangePicker
                  onChange={this.onChangeTime}
                  onOk={this.onOk}
                  locale={locale}
                  className='dateStyle'
                />
            }

          </div>
          <Button className="searchBtn" type="primary" onClick={() => this.searchNow()}>查询</Button>
        </div>
        <div className="tableBox">
          {/* {(wherePath == '/commissionStatistics' && rows.length > 0) || (wherePath == '/registQuery' && rows.length > 0) || (wherePath == '/registEntrust' && rows.length > 0) || (wherePath == '/registSettlement' && rows.length > 0) ?
            <Table dataSource={rows} columns={columns} size="small" scroll={{ y: 570 }} pagination={false} footer={() => {
              return (wherePath != '/registEntrust' ? <Table showHeader={false} columns={columnv} size="small" dataSource={this.state.allList} rowKey={record => Math.random()} pagination={false} /> : <Table showHeader={false} scroll={{ y: 670 }} columns={columnv} size="small" dataSource={this.state.allList} rowKey={record => Math.random()} pagination={false} />)
            }} /> : <Table dataSource={rows} columns={columns} size="small" scroll={{ y: 670 }} pagination={false} />} */}
          <Table className={whereClass} dataSource={rows} columns={columns} size="small" scroll={{ y: 670 }} pagination={false} />
          <div className="pagen">
            <Pagination size="small" current={this.state.current} defaultPageSize={16} onChange={this.onChange} total={total} />
          </div>
        </div>
      </div>
    );
  }
}

export default EditableTable;