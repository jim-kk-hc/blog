
import {Avatar,Divider} from 'antd'
import "../pages/static/styles/components/author.css"
import {
    QqOutlined,
    WechatOutlined,
    GithubOutlined,
  } from '@ant-design/icons';
const Author =()=>{

    return (
        <div className="author-div comm-box">
            <div> <Avatar size={100} src="http://ww1.sinaimg.cn/large/005RxfLbly1gl7h46lf8jj30tx0rr4d0.jpg"  /></div>
            <div className="author-introduction">
                Happiness is a butterfly, try to catch  it like every night. It escapes form my hands into moonlight...
                <Divider>社交账号</Divider>
                <a href="https://github.com/jim-kk-hc" target="_blank">
                    <GithubOutlined  className="account"  style={{ fontSize: '30px', color: "black" }}/>
                </a>
                <a className="MyMessage" data-tooltip="wx:kb470606">
                    <WechatOutlined  className="account"  style={{ fontSize: '30px', color: '#2d9' }}/>
                </a>
                <a className="MyMessage" data-tooltip="QQ:1973916958">
                    <QqOutlined      className="account"  style={{ fontSize: '30px', color: '#08d' }}/>
                </a>

            </div>
        </div>
    )

}

export default Author