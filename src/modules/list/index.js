//此为列表页
import React from 'react';
import { Table } from 'antd';
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
      rows: []
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
    MENU.map((item, index) => (
      <div>
        
      </div>
    ))
    httpAxios(url, method, false, options).then(res => {
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

  render() {
    const { rows } = this.state;
    const columns = this.columns;
    return (
      <div>
        <div className="searchBox">

        </div>
        <div className="tableBox">
          <Table dataSource={rows} columns={columns} size="small" scroll={{ y: 600 }} />
        </div>
      </div>
    );
  }
}

export default EditableTable;