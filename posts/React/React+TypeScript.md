#### 添加 TypeScript
- 新项目中
```bash
$ npx create-react-app my-app --typescript
$ # 或者
$ yarn create react-app my-app --typescript
```
- 已有项目中
```bash
$ npm install --save typescript @types/node @types/react @types/react-dom @types/jest
$ # 或者
$ yarn add typescript @types/node @types/react @types/react-dom @types/jest
```

#### 添加 sass 
```bash
$ npm install node-sass --save
$ # or
$ yarn add node-sass
```

#### React.Component()
- 声明不需要 `props`的组件
```js
// interface AppProps {} // ❌❌ 不需要定义组件的Props约束
interface AppState {
  title: string
  name?: string
}
// 第一种方式: Props约束接受 null, State正常接受
class App extends React.Component<null, AppState> {
    constructor(props: null) {
        super(props)
        this.state = { title: 'parent title', name: 'leslie' }
    }
}

// 第二种方式: 只接受State约束
class App extends React.Component<AppState> {
  readonly state = {
    title: 'parent title',
  }
  // 修改Title
  handleChangeTitle = (newTitle: string = 'parent title'): void => {
    this.setState({
      title: newTitle,
    })
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="parent-border">
            {`【parent title state】: ${this.state.title}`}
            <p className="child-container">
              <button onClick={() => this.handleChangeTitle()}>重置state</button>
            </p>
          </div>
        </header>
      </div>
    )
  }
}

export default App
```

- 声明需要 `props`的组件
```js
interface AppProps {
  name: string
}
interface AppState {
  title: string
  name: string
}

class App extends React.Component<AppProps, AppState> {
  constructor(props: AppProps) {
    super(props)
    this.state = { title: 'parent title', name: 'leslie' }
  }

  handleChangeTitle = (newTitle: string = 'parent title'): void => {
    this.setState({
      title: newTitle,
    })
  }
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <div className="parent-border">
            {`【parent title state】: ${this.state.title}`}
            <p className="child-container">
              <button onClick={() => this.handleChangeTitle()}>重置state</button>
            </p>
          </div>
        </header>
      </div>
    )
  }
}
export default App
```


#### babel config
```json
{
  "presets": [
    "@babel/preset-env",
    "@babel/preset-react"
  ],
  "plugins": [
    [
      "@babel/plugin-transform-runtime", {
        "helpers": true
      }
    ]
  ]
```
