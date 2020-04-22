//此为列表页
import React from 'react';
import { Input, Button } from 'antd';
//antd样式
import 'antd/dist/antd.css';
//公共样式
import './index.css';
//引入请求接口
import httpAxios from '../../helpers/request';
//md5
import md5 from 'js-md5';
console.log(httpAxios)
class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: ''
        }
    }
    componentWillUnmount = () => {
        this.setState = (state,callback)=>{
          return;
        };
    }
    loginNow() {
        let options = {
            passport: this.state.username,
            password: md5(this.state.password)
        };
        httpAxios('/login', 'post', false, options).then(res => {
            if (res.code === 0) {
                localStorage.setItem('token', res.data.token);
                let url = '/api.v1/user/profile', method = 'get', options = null;
                httpAxios(url, method, false, options).then(res => {
                    if (res.code === 0) {
                        let data = res.data;
                        //这里拿到的username要发出订阅出去，redux订阅
                        localStorage.setItem('username', data.account_name);
                        localStorage.setItem('invite_code_desc', data.invite_code_desc);
                        this.props.history.push('/index');
                    }
                });
            }
        });
        httpAxios('/dictionary', 'get', false, null).then(res => {
            if (res.code === 0) {
                let a = JSON.stringify(res.data);
                localStorage.setItem('localData', a);
            }
        })
    }
    render() {
        return (
            <div className="loginbox">
                <div className="title">登录</div>
                <Input value={this.state.username} placeholder="请输入用户名" onChange={e => this.setState({ username: e.target.value })} /><br /><br />
                <Input.Password value={this.state.password} placeholder="请输入密码" onChange={e => this.setState({ password: e.target.value })} /><br /><br />
                <Button className="loginButton" type="primary" onClick={() => this.loginNow()}>登录</Button>
            </div>
        );
    }
}

export default login;