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
    httpAxios(url, method, false, options).then(res => {
      if (res.code === 0) {
        res.data.rows.map((item, index) => {
          for (let key in item) {
            if (item.hasOwnProperty(key)) {
              NAME.map((item1, index1) => {
                if (key == item1.key) {
                  this.columns.push({
                    title: item1.name,
                    dataIndex: item1.key,
                    key: item1.key
                  })
                }
              })
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

    const columns = this.columns.map(col => {
      return {
        ...col,
        onCell: record => ({
          record,
          dataindex: col.dataIndex,
          title: col.title,
          key: col.key
        }),
      };
    });
    return (
      /**
       * dataSource为数据数组
       * columns为表格的描述配置，列明什么之类的
       */
      <div className="tableBox">
        <Table
          dataSource={rows}
          columns={columns}
        />
      </div>
    );
  }
}

export default EditableTable;