//此为列表页
import React from 'react';
import { Input, Button, Modal, Progress } from 'antd';
//antd样式
import 'antd/dist/antd.css';
//公共样式
import './index.css';
//引入请求接口
import httpAxios from '../../helpers/request';
//md5
import md5 from 'js-md5';
import m1 from './img/m1.png';
import m2 from './img/m2.png';
import m3 from './img/m3.png';
import m4 from './img/m4.png';
import m5 from './img/m5.png';
console.log(httpAxios)
class login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
            visible: false,
            msg: '',
            loadingTime: 10,
            isLogin: false
        }
    }
    componentWillUnmount = () => {
        this.setState = (state, callback) => {
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
                    console.log(res)
                    var num = 10;
                    let that = this;
                    var t = setInterval(function () {
                        num = num + 10;
                        if (num == 100) {
                            clearInterval(t);
                        }
                        that.setState({
                            loadingTime: num
                        }, () => {
                        });
                        if (num > 90) {
                            that.props.history.push('/index');
                        }
                    }, 100);
                    // this.setState({
                    //     isLogin: true,
                    //     loadingTime: 100
                    // });
                    if (res.code === 0) {
                        let data = res.data;
                        //这里拿到的username要发出订阅出去，redux订阅
                        localStorage.setItem('username', data.account_name);
                        localStorage.setItem('invite_code_desc', data.invite_code_desc);
                        localStorage.setItem('referral_code_desc', data.referral_code_desc);
                    }
                });
            } else {
                this.setState({
                    visible: true,
                    msg: res.msg
                }, () => {
                    console.log('666', this.state.msg)
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

    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {
        return (
            <div>
                <Modal
                    title="提示"
                    visible={this.state.visible}
                    onOk={this.handleOk}
                    onCancel={this.handleCancel}
                    okText="确定"
                    cancelText="取消"
                >
                    <p>{this.state.msg}</p>
                </Modal>
                <div className="biglogin">
                    <div className="leftLogin">
                        <div className="topLogin">
                            <div className="t1">
                                <span>代理商系统</span>&nbsp;
                                <img src={m2} alt="" />
                            </div>
                            <div className="t2">科技改变金融</div>
                            {/* <img className="t3" src={m3} alt="" /> */}
                        </div>
                        <div className="bottomLogin">
                            {/* <div className="b1">
                                <img src={m4} alt="" />
                                <span>仁信</span>
                            </div> */}
                            <div className="loading">
                                {this.state.loadingTime == 10 ? <div>Not logged in</div> :
                                    <div>Loading is running in the background...</div>}
                                <Progress percent={this.state.loadingTime} showInfo={false} strokeColor='#5473FF' width='2' />
                            </div>
                        </div>
                    </div>
                    <div className="loginbox">
                        <div className="title">登录</div>
                        <Input className="in1" value={this.state.username} placeholder="用户账号" onChange={e => this.setState({ username: e.target.value })} /><br /><br />
                        <Input type="password" className="in2" value={this.state.password} placeholder="用户密码" onChange={e => this.setState({ password: e.target.value })} /><br /><br />
                        <div className="mbox">
                            <img className="m5" src={m5} alt="" />
                            <Button className="loginButton" type="primary" onClick={() => this.loginNow()}>登录</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default login;