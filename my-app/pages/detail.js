
import React, { useState } from 'react'
// import ReactMarkdown from 'react-markdown'
import axios from 'axios'

import MarkNav from 'markdown-navbar'
import 'markdown-navbar/dist/navbar.css'
import marked from 'marked'
import hljs from "highlight.js";
import 'highlight.js/styles/monokai-sublime.css';
import Tocify from '../components/tocify.tsx'
import servicePath from '../config/apiUrl'

import Head from 'next/head'
import { Row, Col, List, Breadcrumb, Affix, Divider } from 'antd'
import {
  FireTwoTone,
  FieldTimeOutlined,
  TagFilled,
} from '@ant-design/icons';

import Header from '../components/Header'
import Author from '../components/Author'
import Advert from '../components/Advert'
import Footer from '../components/Footer'
import Comment from '../components/Comment'
import CommentInput from '../components/CommentInput'
const Detailed = (obj) => {
  const renderer = new marked.Renderer();
  const props = obj['0']
  const sortCommentById = obj['1'].sort((a, b) => {
    return a.id > b.id ? -1 : 1
  })
  console.log('sortCommentById', sortCommentById)
  const [comments, setComment] = useState(sortCommentById)
  // for comment 区别不同文章的评论添加
  const type_id = props.id


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
  

  const updataComment = () => {
    axios(servicePath['getCommentById'] + type_id).then(
      (res) => {
        console.log('res', res);
        res.data.data.sort((a, b) => {
          return a.id > b.id ? -1 : 1
        })
        setComment(res.data.data)
      }
    )
  }
  
  // comment-list 
  const CommentList = comments.map((item) =>
    <Comment key={item.addTime} comment={item}></Comment>
  );
 
  return  (
    <div>
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
              </Breadcrumb>
            </div>

          <div>
              <div className="detailed-title">
              {props.introduce}
              </div>

              <div className="list-icon center">
                <span><FieldTimeOutlined /> {props.addTime}</span>
                <span><TagFilled  /> {props.title} </span>
                <span><FireTwoTone  /> {props.view_count}</span>
              </div>

              <div 
                className="detailed-content" 
                dangerouslySetInnerHTML={{__html: html}}
              >
              </div>

          </div>

          </div>
          {/* Comment 分割线 */}
          <Divider>Comment</Divider>
          <CommentInput type_id={type_id} updataComment={updataComment}/>
          <div>{CommentList}</div>
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
   </div>
  )
}


Detailed.getInitialProps = async(context)=>{
  let id =context.query.id
  // console.log('id', id);
  const promise2 = new Promise((resolve) => {
    axios(servicePath.getCommentById + id).then(
      (res) => {
        resolve(res.data.data)
      }
    )
  })
  const promise1 = new Promise((resolve) => {

    axios(servicePath['getArticleById'] + id).then(
      (res) => {
        resolve(res.data.data[0])
      }
    )
  })
  
  return await Promise.all([promise1, promise2])
}
export default Detailed