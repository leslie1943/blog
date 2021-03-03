#### Restful: Representational State Transfer
- `表现型状态转换` => `资源约定法则`
- 所谓`资源`: 网络中的数据,包括文本,图片,文件等
- 所谓`法则`: 大家公认的写法

#### Restful的约定
`URL`代表资源, 没有`URL`前后台就失去了通信的媒介
1. 在`URL`的约定中,名称必须使用名称, 有单复数的区别
```bash
    # 如果是集合, 名词就必须使用复数, 而单个的则使用单数名词.
    # http://localhost:3000/users     ✅
```
2. `URL`名称中不能用动词定义,否则就不是`Restful API` 规范
```bash
    # http://localhost:3000/getusers  ❌
```
3. 避免层级过深的`URL`, 建议使用查询参数的形式
```bash
    # http://localhost:3000/users/id/1   ❌
    # http://localhost:3000/users?id=1   ✅
```
4. 几个常用的格式
```bash
    # GET ---- 从服务器获取资源
    # POST ---- 对服务器新建资源
    # PUT ---- 对服务器更新资源
    # DELETE ---- 从服务器删除资源

    # 对资源信息的过滤常使用以下形式：
    # GET /users?id=1 ——返回具体某个资源
    # GET /users?_page=2 ——返回数据中的某一页
    # GET /users?_page=2&_limit=20 ——对返回的数据进行分页
    # GET /users?_order=votes&_order=asc ——对数据进行点赞排序，升序（asc）降序（desc）
    # GET /users?_start=1&_end=3 ——筛选出从第二个到第四个（索引从0开始，不包含后者）
```