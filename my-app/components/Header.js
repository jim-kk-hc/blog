//  Header 的 css放置在全局中_api
import {
    Row,
    Col,
    Menu
} from 'antd'
import React, {
    useState,
    useEffect
} from 'react'
import Router from 'next/router'
import Link from 'next/link'
import axios from 'axios'
import servicePath from '../config/apiUrl'


import {
    HomeTwoTone,
    HeartTwoTone,
    SmileTwoTone,
  } from '@ant-design/icons';
const Header = () => {
    const [navArray, setNavArray] = useState([]);
    // useEffect 第二个参数使用 []的means 只有第一个进入调用第一个参数(函数), 第二个参数means 第二个参数
    // 变化 就会触发第一个参数的函数执行
    useEffect(() => {
        const fetchData = async () => {
            const result = await axios(servicePath.getTypeInfo).then((res) => {
                setNavArray(res.data.data);
                // console.log(res.data.data);
                return res.data.data;
            })
            setNavArray(result);
        }
        fetchData();
    }, []);

    // 点击路由跳转
        
    //跳转到列表页
    const handleClick = (e)=>{
        if(e.key==0){
            Router.push('/')
        }else{
            Router.push('/list?id='+e.key)
        }


    }

    return (
            <div className="header">
                <Row type="flex" justify="center">
                    <Col   xs={24} sm={24} md={10} lg={15} xl={12}>
                        <span className="header-logo">JIM</span>
                        <span className="header-txt">专注前端开发, 一位80年代开始写代码的lsp。</span>
                    </Col>

                    <Col className="header-logo" xs={0} sm={0} md={14} lg={8} xl={6}>
                        <Menu  
                            mode="horizontal"
                            onClick={handleClick}
                        >
                                <Menu.Item key="0">
                                <HomeTwoTone twoToneColor="#ea4"/>
                                    首页
                                </Menu.Item>
                                <Menu.Item key="1">
                                <SmileTwoTone  rotate={180}/>
                                    BLOG
                                </Menu.Item>
                                <Menu.Item key="2">
                                <HeartTwoTone twoToneColor="#eb2f" spin/>
                                    生活
                                </Menu.Item>
                        </Menu>
                    </Col>
                </Row>
            </div>
    )
}

export default Header