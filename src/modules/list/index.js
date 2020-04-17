//此为列表页
import React from 'react';
import { Table, Pagination, Input, Button } from 'antd';
//引入导航
import { MENU } from '../../constants/menudata';
//引入数据字典
import { NAME } from '../../constants/name';
//引入请求接口
import httpAxios from '../../helpers/request';

import './index.css';

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
      current: 1
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
    let labelDom;
    let path = this.props.match.path;
    this.setState({
      wherePath: path
    })
    let filter = {}, option = {};
    MENU.map((item, index) => {
      if (path == item.path) {
        item.filter.map((item1, index1) => {
          filter[item1.key] = '';
          option[item1.key] = ''
        })
        this.setState({
          filter: filter,
          option: option
        }, () => {
          console.log('filter啊1', this.state.filter)
        });
        labelDom = item.filter.map((item1, index1) =>
          (
            <div key={item.path} className='inputArray'>
              <label for={item1.key}>{item1.value} : </label>
              <Input id={item1.key} value={item.value} onChange={this.handelChange} className='searchInput' />
            </div>
          ))
      }
    })
    this.setState({
      labelDom: labelDom
    });
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
        options = {
          filter: this.state.filter,
          option: this.state.option
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
                    this.columns.push({
                      title: item1.name,
                      dataIndex: item1.key,
                      key: item1.key,
                      align: 'center',
                      width: 200
                    })
                  }
                })
              }
            }
          }
          this.columns=this.deteleObject(this.columns);
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
  deteleObject(obj) {
    var uniques = [];
    var stringify = {};
    for (var i = 0; i < obj.length; i++) {
        var keys = Object.keys(obj[i]);
        keys.sort(function(a, b) {
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
  };

  render() {

    const { rows, labelDom, wherePath, total } = this.state;
    const columns = this.columns;
    return (
      <div>{wherePath != '/index' ?
        <div className="searchBox">
          {labelDom}
          <Button className="searchBtn" type="primary" onClick={() => this.searchNow()}>查询</Button>
        </div> : ''}
        <div className="tableBox">
          <Table dataSource={rows} columns={columns} size="small" scroll={{ y: 600 }} pagination={false} />
          <Pagination size="small" current={this.state.current} onChange={this.onChange} total={total} />
        </div>
      </div>
    );
  }
}

export default EditableTable;