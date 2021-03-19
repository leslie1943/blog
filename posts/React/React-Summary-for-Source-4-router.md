## 5.路由
- `npm install react-router-dom`


#### ⛵ 5.1 路由的基本使用
```jsx
// App.js
import React from 'react'
import { BrowserRouter as Router, Route, Link} from 'react-router-dom'

function Index(){
    return <div>首页</div>
}

function News(){
    return <div>新闻</div>
}

/*
    Router: 这个组件放在应用程序的最外层
    Route: 设置路由规则,匹配路由规则
    Link: 设置链接
*/
function App(){
    return(
        <Router>
            <div>
                <Link to="/index">首页</Link>
                <Link to="/news">新闻</Link>
            </div>

            <div>
                <Route path="/index" component={Index}></Route> 
                <Route path="/news" component={News}></Route> 
            </div>
        </Router>
    )
}
```

#### ⛵ 5.2 路由嵌套
```jsx
function News(props){
    return(
        <div>
            <div>
                {/* props.match.url 获取的是 上级组件中 Link 的 to 属性 */}
                <Link to={`${props.match.url}/company`}>公司新闻</Link>
                <Link to={`${props.match.url}/industry`}>行业新闻</Link>
            </div>

            <div>
                {/* props.match.path 获取的是 上级组件中 Route 的 path 属性 */}
             <Route path={`${props.match.path}/company`} component={CompanyNews}></Route> 
             <Route path={`${props.match.path}/industry`} component={IndustryNews}></Route> 
            </div>
        </div>
    )
}

function CompanyNews(){
    return <div>公司新闻</div>
}

function IndustryNews(){
    return <div>行业新闻</div>
}
```

#### ⛵ 5.3 路由传参
```jsx
import url from 'url'
class News extends Component{
    constructor(props){
        super(props)
        this.state = {
            list: [{id:1,title:'news 1'},{id:2,title:'news 2'}]
        }
    }
    render(){
        return(
            <div>
                <div>新闻列表组件</div>
                <ul>
                    {this.state.list.map((item,index)=>{
                        return (
                            <li key={index}>
                                <Link to={`/detail?id=${item.id}`}>{item.title}</Link>
                            </li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}


class Detail extends Component{
    constructor(props){
        super(props)
    }
    const {query} = url.parse(this.props.location.search,true)
    console.info(query) // {id: 1}
    render(){
        return <div>新闻详情</div>
    }
}
```

#### ⛵ 5.4 路由重定向
```jsx
import { Redirect } from 'react-router-dom'
class Login extends Component {
    render(){
        if(this.state.isLogin){
            return <Redirect to="/" />
        }
    }
}
```