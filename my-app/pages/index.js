
import React, { useState }  from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { Row, Col, List } from 'antd'
import {
  RedEnvelopeTwoTone,
  BulbTwoTone,
  MehTwoTone,
} from '@ant-design/icons';
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'

import './static/styles/pages/index.css'
import servicePath from '../config/apiUrl'
const Home = (list) => {
  console.log('list', list)
  const [mylist, setMylist] = useState(list.data)
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
    sanitize:false,
    xhtml: false,
    highlight: function (code) {
            return hljs.highlightAuto(code).value;
    }
  }); 

  return (
    <>
      <Head>
        <title>Home</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
          <List
            header={<div>最新日志</div>}
            itemLayout="vertical"
            dataSource={mylist}
            renderItem={item => (
              <List.Item>
                <div className="list-title">
                  {/* 跳转文章详情页 */}
                  <Link href={{pathname:'/detail', query:{id:item.id}}}>
                    <a>{item.title}</a>
                  </Link>
                </div>
                <div className="list-icon">
            <span><RedEnvelopeTwoTone twoToneColor="#ea4"/> {item.addTime}</span>
            <span><BulbTwoTone  twoToneColor="#ea4"/> {item.typeName}</span>
            <span><MehTwoTone twoToneColor="#ea4" /> {item.view_count}人</span>
                </div>
                <div 
                  className="list-context"
                  dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                >
                </div>
              </List.Item>
            )}
          />
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

//  next 获取中台数据
Home.getInitialProps = async ()=>{
  const promise = new Promise((resolve)=>{
    axios(servicePath['getArticleList']).then(
      (res)=>{
        //console.log('远程获取数据结果:',res.data.data)
        resolve(res.data)
      }
    )
  })

  return await promise
}
export default Home