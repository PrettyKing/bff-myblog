import React from 'react'
import { Layout, Row, Col } from 'antd';
import "../style/Index.less"
import IndexHeader from "../components/IndexHeader"
import Author from "../components/Author"
import { Route } from "react-router-dom";

import Index from "../pages/Index"
import List from "../pages/List"
import Detail from "../pages/detail"

const IndexLayout = () => {
    return <Layout>
        <IndexHeader />
        <Row className="comm-main" type="flex" justify="center">
            <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}>
                <div>
                    <Route path="/" exact component={Index} />
                    <Route path="/list/:id" exact component={List} />
                    <Route path="/detail/:id" exact component={Detail} />
                </div>
            </Col>

            <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
                <Author />
            </Col>
        </Row>
    </Layout>
}

export default IndexLayout