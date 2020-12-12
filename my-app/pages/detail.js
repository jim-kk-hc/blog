
import React, { useState } from 'react'
import ReactMarkdown from 'react-markdown'
import axios from 'axios'

import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

import Head from 'next/head'
import { Row, Col, List, Breadcrumb, Affix } from 'antd'
import {
  RedEnvelopeTwoTone,
  BulbTwoTone,
  MehTwoTone,
} from '@ant-design/icons';

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
const Detailed = (props) => {
  const renderer = new marked.Renderer();
  console.log('props', props);
  const tocify = new Tocify()
  // 二级目录
  renderer.heading = function(text, level, raw) {
    const anchor = tocify.add(text, level);
    return `<a id="${anchor}" href="#${anchor}" class="anchor-fix"><h${level}>${text}</h${level}></a>\n`;
  };
  marked.setOptions({
      renderer: renderer, 
      gfm: true,
      pedantic: false,
      sanitize: false,
      tables: true,
      breaks: false,
      smartLists: true,
      smartypants: false,
      highlight: function (code) {
              return hljs.highlightAuto(code).value;
      }
    }); 
  
  let html = marked(props.article_content)
  // console.log('props.article_content', props.article_content);
  // console.log('html', html);
  
  return  (
    <>
      <Head>
        <title>博客详细页</title>
      </Head>
      <Header />
      <Row className="comm-main" type="flex" justify="center">
        <Col className="comm-left" xs={24} sm={24} md={16} lg={18} xl={14}  >
            <div>
              <div className="bread-div">
                <Breadcrumb>
                  <Breadcrumb.Item><a href="/">首页</a></Breadcrumb.Item>
                  {/* <Breadcrumb.Item><a href='/'>文章列表</a></Breadcrumb.Item> */}
                  {/* <Breadcrumb.Item>xxxx</Breadcrumb.Item> */}
                </Breadcrumb>
              </div>

             <div>
                <div className="detailed-title">
                {props.introduce}
                </div>

                <div className="list-icon center">
                  <span><RedEnvelopeTwoTone twoToneColor="#ea4"/> {props.addTime}</span>
                  <span><BulbTwoTone  twoToneColor="#ea4"/> {props.title} </span>
                  <span><MehTwoTone twoToneColor="#ea4" /> {props.view_count}人</span>
                </div>

                <div 
                  className="detailed-content" 
                  dangerouslySetInnerHTML={{__html: html}}
                >
                </div>

             </div>

            </div>
        </Col>

        <Col className="comm-right" xs={0} sm={0} md={7} lg={5} xl={4}>
          <Author />
          <Advert />
          {/* 文章目录 */}
          <Affix offsetTop={5}>
            <div className="detailed-nav comm-box">
              <div className="nav-title">文章目录</div>
              <MarkNav
                className="article-menu"
                source={html}
                ordered={false}
              />
              <div className = "toc-list"> {
                  tocify && tocify.render()
                } 
              </div>
            </div>
          </Affix>
        </Col>
      </Row>
      <Footer/>

   </>
  )
}


Detailed.getInitialProps = async(context)=>{

  console.log(context.query.id)
  let id =context.query.id
  const promise = new Promise((resolve)=>{

    axios(servicePath['getArticleById']+id).then(
      (res)=>{
        resolve(res.data.data[0])
      }
    )
  })

  return await promise
}
export default Detailed