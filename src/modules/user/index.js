//此为主页
import React from 'react';
import b1 from './img/b1.png';
//redux
//步骤一
import store from '../../store/store'
//引入请求接口
import httpAxios from '../../helpers/request';
import './index.css';

class UserCenter extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: "",
            username: "",
            account_id: "",
            balance: "",
            parent_account_name: "",
            parent_account_code: "",
            invite_count: ""
        };
    }
    //请求表格数据的操作
    componentDidMount = () => {
        let url = '/api.v1/user/profile', method = 'get', options = null;
        httpAxios(url, method, false, options).then(res => {
            if (res.code === 0) {
                let data = res.data;
                this.setState({
                    data: data,
                    //会员名称
                    username: data.account_name,
                    //会员id
                    account_id: data.account_id,
                    //账户余额
                    balance: data.balance,
                    //parent_account_name
                    parent_account_name: data.parent_account_name,
                    //parent_account_code
                    parent_account_code: data.parent_account_code,
                    invite_count: data.invite_count
                });
                //这里拿到的username要发出订阅出去，redux订阅
                this.username(this.state.username);
            }
        });
    }
    username(username) {
        //store.dispatch（）是View发出Action的唯一方法。携带一个Action对象作为参数，将它发送出去。
        store.dispatch({
            type: 'username',
            payload: username
        })
    }
    render() {
        const { username, account_id, balance, parent_account_name, parent_account_code, invite_count } = this.state;
        return (
            /**
             * dataSource为数据数组
             * columns为表格的描述配置，列明什么之类的
             */
            <div className="usercenter">
                {/* <div>
                    <button onClick={this.decrement}>-</button>
                    {this.state.count}
                    <button onClick={this.increment}>+</button>
                </div> */}
                <div className="topuser">
                    <img className="u1 img" src={b1} alt="" />
                    <div className="u1">
                        <div className="t1">{!parent_account_name ? username : parent_account_name}</div>
                        <div className="t2">{!parent_account_code ? account_id : parent_account_code}</div>
                    </div>
                    <div className="u1">
                        <div className="level">上级用户</div>
                        <div className="level1">已实名</div>
                    </div>
                </div>
                <div className="bottomuser">
                    <div className="userbox">
                        <div className="b1">会员名称</div>
                        <div className="b2">MEMBER NAME</div>
                        <div className="b3">{username}</div>
                    </div>
                    <div className="userbox">
                        <div className="b1">会员ID</div>
                        <div className="b2">MEMBER ID</div>
                        <div className="b3">{account_id}</div>
                    </div>
                    <div className="userbox">
                        <div className="b1">账户余额</div>
                        <div className="b2">ACCOUNT BALANCE</div>
                        <div className="b3">{balance}</div>
                    </div>
                    <div className="userbox">
                        <div className="b1">己推数</div>
                        <div className="b2">INVITE COUNT</div>
                        <div className="b3">{invite_count}</div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserCenter;