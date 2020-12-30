import React, { useState } from 'react';
import { Form, Row, Col, Input, Button, message } from 'antd';
import '../pages/static/styles/components/CommentInput.css'
import axios from 'axios'
import servicePath from '../config/apiUrl'



const CommentInput = (props) => {
  const [form] = Form.useForm();
  const info = [
      {
          name:'NickName',
          placeholder:'我们需要你的NickName',
          rules: [{
              validator: async (_, names) => {
                if (!names || names.length < 2) {
                  return Promise.reject(new Error('please input your NickName, at least 2 words'));
                }
              }
          }]
      },{
          name:'email',
          placeholder:'我们需要你的email',
          rules: [{
              required: true,
              info: 'please input email format',
              type: 'email'
          }]
      }
  ]
  const getFields = () => {
    
    const children = [];

    for (let i = 0; i < 2; i++) {
      children.push(
        <Col span={8} key={i}>
          <Form.Item
            name={`${info[i].name}`}
            label={`${info[i].name}`}
            rules={info[i].rules}
          >
            <Input placeholder={`${info[i].name}`} />
          </Form.Item>
        </Col>,
      );
    }

    return children;
  };
  //	提交表单且数据验证成功后回调事件
  const onFinish = (values) => {
    const params = {
      values: values,
      type_id: props.type_id
    }
    console.log('params', params);
    axios({
        method: 'post',
        url: servicePath.postComment,
        data: params,
        withCredentials: true
    }).then(
        res => {
          if (res.data.isScuccess) {
              message.success('评论发表成功')
              form.resetFields()
              props.updataComment();
          } else {
              message.error('评论发表失败')
          }
        }
    ).catch(err => {
      console.log(err);
    })
  };

  return (
    <div>
        <div className='commentInput-box'>
            <Form
              form={form}
              name="advanced_search"
              onFinish={onFinish}
              >
              <Row gutter={24}>{getFields()}</Row>
              <Row>
              <Form.Item 
                  name={['user', 'introduction']} 
                  label="comment" 
                  rules={[
                      {
                          required: true,
                          info: 'Input something!',
                      },
                  ]}>
                  <Input.TextArea className='textAreaInput' autoSize={{ minRows: 4, maxRows: 7 }}   placeholder='如果你愿意的话，可以留下你的建议，很高兴能够和你交流...' showCount/>
              </Form.Item>
              </Row>
              <Row>
                  <Col
                  span={24}
                  style={{
                      textAlign: 'right',
                  }}
                  >
                  <Button type="primary" htmlType="submit" >
                      Submit
                  </Button>
                  <Button
                      style={{
                      margin: '0 8px',
                      }}
                      onClick={() => {
                      form.resetFields();
                      }}
                  >
                      Clear
                  </Button>
                  
                  </Col>
              </Row>
              </Form>
        </div>
      </div>
   
  );
};

export default CommentInput;