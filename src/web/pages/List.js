import React, { useState, useEffect } from 'react'
import { List, Icon } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import servicePath from "../defaultUrl";
import { DesktopOutlined } from '@ant-design/icons';


import axios from "axios"

function ListPage (props) {
    const [mylist, setMylist] = useState([]);
    const renderer = new marked.Renderer();
    marked.setOptions({
        renderer: renderer,
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: false,
        smartLists: true,
        smartypants: false,
        sanitize: false,
        xhtml: false,
        highlight: function (code) {
            return hljs.highlightAuto(code).value;
        }
    });
    console.log(props.match.params.id)
    useEffect(() => {
        axios(servicePath.getListById + props.match.params.id).then(res => {
            console.log('远程获取数据结果:', res.data.data)
            setMylist(res.data.data)
        });
    }, [props.match.params.id])

    const goDetail = (id) => {
        props.history.push(`/detail/${id}`)
    }

    return <div>
        <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
                <List.Item>
                    <div className="list-title" onClick={() => goDetail(item.id)}><span>{item.title}</span></div>
                    <div className="list-icon">
                        <span>
                            <DesktopOutlined /> {item.addTime}
                        </span>
                        <span>
                            <DesktopOutlined />{item.typeName}
                        </span>
                        <span>
                            <DesktopOutlined /> {item.view_count}人
                    </span>
                    </div>
                    <div
                        className="list-context"
                        dangerouslySetInnerHTML={{ __html: marked(item.introduce) }}
                    ></div>
                </List.Item>
            )}
        />
    </div>
}

export default ListPage