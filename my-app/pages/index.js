
import React, { useState }  from 'react'
import Head from 'next/head'
import Link from 'next/link'
import axios from 'axios'
import { Row, Col, List, Tag  } from 'antd'
import {
  TagsFilled,
  FireTwoTone,
  FieldTimeOutlined
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


class Home extends React.Component{
  constructor(props) {
    super(props);
    this.sums = {};
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);

  }
  
  handleMouseEnter(e) {
    let id = e.currentTarget.dataset.id
    this.sums[id].className =this.sums[id].className + ' item-active'
  }
  handleMouseLeave(e) {
    let id = e.currentTarget.dataset.id
    this.sums[id].className = 'list-com'
  }
  render() {
    const mylist = this.props.data;
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
      <div>
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
                    <List.Item >
                      <div className="list-com"  ref={(refItem) => this.sums[item.id] = refItem} onMouseEnter={this.handleMouseEnter} onMouseLeave={this.handleMouseLeave} data-id={item.id}>
                        <div className='item-poster'>
                        <img height='220rem'  src={item.img}  />
                        </div>
                        <div className="item-intro">
                            <div className="list-title">
                              <Link href={{pathname:'/detail', query:{id:item.id}}}>
                                <a>{item.title}</a>
                              </Link>
                            </div>
                            <div className="list-icon">
                              <div>{item.tag ? createTag(item.tag.split(' ')) : ''}</div>
                              <span><FieldTimeOutlined /> {item.addTime.slice(0, 10)}</span>
                              <span><TagsFilled  /> {item.typeName}</span>
                              <span><FireTwoTone twoToneColor="#ea4" /> {item.view_count}</span>
                              
                            </div>
                            <div 
                              className="list-context"
                              dangerouslySetInnerHTML={{__html:marked(item.introduce)}}
                            >
                          </div>
                        </div>
                      
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
          </div>
    )
  }
}


function createTag(props) {
  const colors = ['red', 'magenta', 'volcano', 'orange', 'gold', 'volcano', 'blue', 'cyan', 'geekblue', 'purple'];
  
  const tags = props.map((item, idx) => {
    const num = colors[parseInt(Math.random()*10)]
    return  <Tag key={idx} color={num}>#{item}</Tag>
  }
   
  )
  return (
    <div>{tags}</div>
  )
}
//  next 获取中台数据
Home.getInitialProps = async (context)=>{


  const promise = new Promise((resolve)=>{
    axios(servicePath.getArticleList).then(
      (res)=>{
       
        resolve(res.data)
      }
    )
  })

  return await promise
}
export default Home