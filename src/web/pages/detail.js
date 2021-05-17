import React, { useState, useEffect } from "react"
import { Row, Col, Affix, Icon, Breadcrumb } from "antd";
import marked from "marked";
import hljs from "highlight.js";
import "highlight.js/styles/monokai-sublime.css";
import servicePath from "../defaultUrl";
import "../style/Detail.less"
import { DesktopOutlined } from '@ant-design/icons';

import axios from "axios"

const Detail = props => {
    const [content, setContent] = useState({})
    const [html, setHtml] = useState("")
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

    useEffect(() => {
        axios(servicePath.getArticleById + props.match.params.id).then(res => {
            // console.log(res.data.data[0])
            // resolve(res.data.data[0]);
            setContent(res.data.data[0])
            setHtml(marked(res.data.data[0].article_content))
        });
    }, [])
    // renderer: 这个是必须填写的，你可以通过自定义的Renderer渲染出自定义的格式
    // gfm：启动类似Github样式的Markdown,填写true或者false
    // pedatic：只解析符合Markdown定义的，不修正Markdown的错误。填写true或者false
    // sanitize: 原始输出，忽略HTML标签，这个作为一个开发人员，一定要写flase
    // tables： 支持Github形式的表格，必须打开gfm选项
    // breaks: 支持Github换行符，必须打开gfm选项，填写true或者false
    // smartLists：优化列表输出，这个填写ture之后，你的样式会好看很多，所以建议设置成ture
    // highlight: 高亮显示规则 ，这里我们将使用highlight.js来完成
    return <div>
        <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={24} lg={24} xl={24}>
                <div>
                    <div className="bread-div">
                        <Breadcrumb>
                            <Breadcrumb.Item>
                                <a href="/">首页</a>
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>{content.title}</Breadcrumb.Item>
                        </Breadcrumb>
                    </div>

                    <div>
                        <div className="detailed-title">{content.title}</div>
                        <div className="list-icon center">
                            <span>
                                <DesktopOutlined/> {content.addTime}
                            </span>
                            <span>
                                <DesktopOutlined /> {content.typeName}
                            </span>
                        </div>

                        <div
                            className="detailed-content"
                            dangerouslySetInnerHTML={{ __html: html }}
                        ></div>
                    </div>
                </div>
            </Col>

            {/* <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                <Affix offsetTop={5}>
                    <div className="detailed-nav comm-box">
                        <div className="nav-title">文章目录</div>
                        <div className="toc-list">{tocify && tocify.render()}</div>
                    </div>
                </Affix>
            </Col> */}
        </Row>
    </div>
}

export default Detail