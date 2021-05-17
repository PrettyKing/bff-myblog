import React from "react";
import { Avatar, Divider } from "antd";

const Author = () => {
    return (
        <div className="author-div comm-box">
            <div>
                <Avatar
                    size={100}
                    src="http://img2.imgtn.bdimg.com/it/u=4056134699,3053706067&fm=26&gp=0.jpg"
                />
            </div>
            <div className="author-introduction">
                拥有一个无处安放的心的程序员，喜欢唱，喜欢跳，喜欢折腾。
                <Divider>社交账号</Divider>
                <Avatar size={28} className="account" />
                <Avatar size={28} className="account" />
                <Avatar size={28} className="account" />
            </div>
        </div>
    );
};

export default Author;