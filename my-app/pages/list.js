
import React,{ useState, useEffect } from 'react'
import axios from 'axios'
import  servicePath  from '../config/apiUrl'
import Link from 'next/link'
import Head from 'next/head'
import { Row, Col, List, Breadcrumb } from 'antd'
import {
  TagsFilled,
  FireTwoTone,
  FieldTimeOutlined
} from '@ant-design/icons';

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

// import './static/styles/pages/index.css'
const Mylist = (list) => {

  const [ mylist , setMylist ] = useState(list.data);
  // console.log(list.data);
  useEffect(()=>{
    setMylist(list.data)
   })
  return (
    <>
      <Head>
        <title>列表页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <div>
            <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  {/* <Breadcrumb.Item>life</Breadcrumb.Item> */}
                </Breadcrumb>
            </div>
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  <Link href={{pathname:'/detail', query:{id:item.id}}} >
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
                      <span><FieldTimeOutlined /> {item.addTime}</span>
                      <span><TagsFilled  /> {item.typeName}</span>
                      <span><FireTwoTone twoToneColor="#ea4" /> {item.view_count}</span>
                </div>
                <div className="list-context">{item.introduce}</div>
              </List.Item>
            )}
          />
          </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
        </Col>
      </Row>  
      <Footer />
    </>
  )
}



Mylist.getInitialProps = async (context) => {

  let id = context.query.id
  const promise = new Promise((resolve) => {
    axios(servicePath.getListById + id).then(
      (res) => resolve(res.data)
    )
  })
  return await promise
}

export default Mylist