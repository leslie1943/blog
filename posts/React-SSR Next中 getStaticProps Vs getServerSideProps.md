## React 服务器端渲染 Next 的 预渲染方式
- 支持两种预渲染形式: 静态生成(`getStaticProps`) 和  服务器端渲染(`getServerSideProps`)
- 静态生成和服务器端渲染是生成 `HTML` 的时机不同
- 静态生成: 静态生成是在构建时生成 `HTML`, 以后的每个请求都共用构建时生成好的 `HTML`
- 服务器端渲染: 请求时生成 `HTML`, 每个请求都会`重新`生成 `HTML`
- 允许为每个页面选择不同的预渲染方式
- 静态生成: 一次构建,反复使用. 营销页面, 博客文章, 电子商务列表, 帮助文档
- 服务器端渲染访问速度不如静态生成快, 但是由于每次请求都会重新渲染, 所以适用数据频繁更新的页面或页面内容随请求变化而变化的页面

### 静态生成 getStaticProps
 - `getStaticProps` 方法的作用是获取组件静态生成需要的数据, 并通过 `props` 的方式将数据传递给组件
- 该方法是一个异步方法, 需要在组件内部进行导出
- 在开发模式下, `getStaticProps` 为在每个请求上运行
```js
export async function getStaticProps({ params }){
  const id = params.id
  // get data logic
  return {
    props:{
      data
    }
  }
}
```

### 服务器端渲染 getServerSideProps 不会生成 html, 而是生成 .js文件
- 如果采用服务器端渲染, 需要在组件中导出 `getServerSideProps` 方法
- 参数 `context`: 上下文对象, 可获取路由的参数及其他信息
- 每次请求都会执行这个方法
- 引入的 `node` 模块的 `path`,`fs`,`util`不会被打包, `tree-shaking`
```js
export async function getServerSideProps(context){
   // http://localhost:3000/list?id=100
  console.info('getServerSideProps context.query', context.query) // { id: '100' }
  // get data
  return {
    props: {
      data
    }
  }
}
```


### getStaticProps Vs getServerSideProps
- `getStaticProps` 会在 `.next/pages`下生成 对应的 `xx.html` 文件
- `getServerSideProps` 会在 `.next/pages`下生成 对应的 `xx.js` 文件
- <font color="red">不能一起使用</font> 
```bash
# You can not use getStaticProps or getStaticPaths with getServerSideProps. To use SSG, please remove getServerSideProps
```

### 基于动态路由的静态生成
- 基于参数为页面组件生成HTML页面, <font color="#f56c6c">有多少参数就生成多少 HTML 页面</font>
- 在构建应用时, 先获取用户可以访问的所有路由参数, 再根据路由参数获取具体数据, 然后根据数据静态生成HTML
- step-1: 创建基于动态路由的页面组件文件, 命名时在文件名称外面加上[], 比如[id].js
- step-2: 导出异步函数 `getStaticPaths`, 用于获取所有用户可以访问的路由参数
```js
  export async function getStaticPaths(){
    // 此处获取所有用户可以访问的路由参数
    return{
      // 返回固定格式的路由参数
      paths: [{params: {id:1}}, {params:{id:2}}]
      // 当用户访问的路由参数没有在当前函数中返回时, 是否显示404页面, false: 显示 true: 不显示
      fallback: false
    }
  }
```
- step-3: 导出异步函数 `getStaticProps`, 用于根据路由参数获取具体的数据
```bash
  # getStaticPaths 和 getStaticProps 只运行在服务器端, 永远不会运行在客户端,设置不会被打包到客户端
  # 就是说这里可以所以写服务器端代码, 比如查询数据库
```
```js
import { useRouter } from 'next/router'

export default function Post({ data }) {
  const router = useRouter()
  // 页面是否正在静态生成
  if (router.isFallback) return <div>Loading</div>
  // 如果生成成功了, 继续渲染
  return (
    <div >
      <h1>
        This is "{data.id}- {data.title}" Page
      </h1>
    </div>
  )
}

// 返回用户可以访问到的所有的路由参数
export async function getStaticPaths() {
  return {
    // 静态页面生成范围
    paths: [{ params: { id: '1' } }, { params: { id: '2' } }],
    // 不在页面范围内的数据是否重新生成
    fallback: false,
  }
}

// 返回路由参数所对应的具体的数据
export async function getStaticProps({ params }) {
  console.info('params', params)
  // console.info('query', query)
  const id = params.id
  let data
  switch (id) {
    case '1':
      data = { id: 1, title: 'Dora' }
      break
    case '2':
      data = { id: 2, title: 'Mark' }
      break

    /**
     * 如果 getStaticPaths 方法中返回的 paths 中不在静态渲染范围
     * 如果 getStaticPaths 方法中返回的 fallback 为 true
     * 那么会在浏览器请求时重新执行当前函数进行静态生成
     */
    case '3':
      data = { id: 3, title: 'Justin' }
      break
    default:
      data = {}
  }
  return {
    props: {
      data,
    },
  }
}

```
- <font color="#f56c6c">不要在 `getStaticPaths` 或者 `getStaticProps` 函数中访问 API Routes, 因为这两个函数就是在服务器端运行的, 可以直接写服务器端代码</font>