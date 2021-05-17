import React, { useState } from "react";
import { Card, Input, Icon, Button, Spin, message } from "antd";
import "../style/login.less";
import axios from "axios";
import servicePath from "../apiUrl.js";

function Login (props) {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const checkLogin = () => {
        setIsLoading(true);
        if (!userName) {
            message.error("用户名不能为空");
            return false;
        } else if (!password) {
            message.error("密码不能为空");
            return false;
        }
        let dataProps = {
            userName: userName,
            password: password
        };
        axios({
            method: "post",
            url: servicePath.checkLogin,
            data: dataProps,
            withCredentials: true,
            header: { "Access-Control-Allow-Origin": "*" }
        }).then(res => {
            setIsLoading(false);
            localStorage.setItem("openId", res.data.openId);
            props.history.push("/admin");
        });
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    };
    return (
        <div className="login-div">
            <Spin tip="Loading..." spinning={isLoading}>
                <Card title="我自横刀向天笑" bordered={true} style={{ width: 400 }}>
                    <Input
                        id="userName"
                        size="large"
                        placeholder="管理员姓名"
                        prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
                        onChange={e => {
                            setUserName(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <Input.Password
                        id="password"
                        size="large"
                        placeholder="管理员密码"
                        prefix={<Icon type="key" style={{ color: "rgba(0,0,0,.25)" }} />}
                        onChange={e => {
                            setPassword(e.target.value);
                        }}
                    />
                    <br />
                    <br />
                    <Button type="primary" size="large" block onClick={checkLogin}>
                        {" "} 登 陆{" "}
                    </Button>
                </Card>
            </Spin>
        </div>
    );
}
export default Login;
