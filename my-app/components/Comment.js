
import "../pages/static/styles/components/comment.css"
import moment from 'moment';
// import {
//     QqOutlined,
//     WechatOutlined,
//     GithubOutlined,
//   } from '@ant-design/icons';
import { Comment, Tooltip, Avatar } from 'antd';
const Comments =(props)=>{
    console.log('content props:', props)
    
    return (
        <div className='comment-box'>
                 <Comment
                    author={<a>{props.comment.nickname}</a>}
                    avatar={
                        <Avatar
                        src={props.comment.avatar}
                        alt="Han Solo"
                        />
                    }
                    content={
                        <p>
                        {props.comment.content}
                        </p>
                    }
                />
        </div>
    )

}

export default Comments