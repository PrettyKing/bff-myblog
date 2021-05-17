import React, { useState, useEffect } from "react";
import "../style/Header.less";
import { Row, Col, Menu, Icon } from "antd";
import axios from "axios";
import servicePath from "../defaultUrl";
import {
    DesktopOutlined,
    PieChartOutlined,
} from '@ant-design/icons';
import { Link ,Router} from "react-router-dom";

const Header = props => {
  const [navArray, setNavArray] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const result = await axios(servicePath.getTypeInfo).then(res => {
        setNavArray(res.data.data);
        return res.data.data;
      });
      setNavArray(result);
    };
    fetchData();
  }, []);

  return (
    <div className="header">
      <Row type="flex" justify="center">
        <Col xs={24} sm={24} md={10} lg={13} xl={11}>
          <span className="header-logo">
            <Link to="/">
              卫辰
            </Link>
          </span>
          <span className="header-txt">长风破浪会有时，直挂云帆济沧海。</span>
        </Col>

        <Col className="memu-div" xs={0} sm={0} md={14} lg={10} xl={7}>
          <Menu mode="horizontal">
            <Menu.Item key="0">
              <DesktopOutlined/>
              <Link to="/">
              博客首页
            </Link>
            </Menu.Item>
            {navArray.map(item => {
              return (
                <Menu.Item key={item.Id}>
                  <PieChartOutlined/>
                  <Link to={`/list/${item.Id}`}>{item.typeName}</Link>
                </Menu.Item>
              );
            })}
          </Menu>
        </Col>
      </Row>
    </div>
  );
};

export default Header;
