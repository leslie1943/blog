### Other: 域名 由 HTTP 转成 HTTPS

#### 步骤 - (1) - https 端口
- 确保服务器防火墙允许访问 `443`

#### 步骤 - (2) - 申请证书
- 以 `阿里云` 为例
- `阿里云`-`产品与服务`-`安全`-`SSL证书`-`购买`: 然后选择
- 域名类型: `单个域名`
- 证书类型: `DV域名级SSL`
- 证书等级: `免费版`
```bash
# 为了解决免费证书近期存在的吊销、统计等问题, 自2021年起, 免费证书申请将切换到证书资源包下
# 每个实名个人/企业主体在一个自然年内可以一次性领取20张免费证书, 请点击证书资源包中领取
```
- 点击里面的【证书资源包】链接
- 选择 `数量:20`(其他的数量收费), 然后点击购买. 一直下一步
- 点击付款, 因为是0元, 所以直接跳转到`支付完成`界面
- 根据提示返回控制台, 点击左侧的`SSL`证书就会出现自己剩余的证书了
- 点击`证书申请`, 填写域名`egg.leslie1943.top`为例
- ✔勾选 `签发`
- 其他的都默认选项
- 然后进行验证,会在`域名解析`的菜单生成一条记录,在验证通过之前不要删除
- 点击下载, 选择`nginx`, 得到一个本地的压缩包 `xxxxx_egg.leslie1943.top_nginx`
- 把压缩包传到服务器
```bash
    scp 5634948_egg.leslie1943.top_nginx.zip root@47.114.105.120:/root
```
- 然后查看证书的帮助文档
- 在`etc/nginx/`下创建目录`cert`并进入该目录
```bash
    mkdir cert
    cd cert
```
- 然后移动上传的压缩包到该文件夹
```bash
    mv ~/5634948_egg.leslie1943.top_nginx.zip .
```
- 然后解压
```bash
 unzip filename
```
- 得到 `pem`和`key`文件
```bash
# inflating: 5634948_egg.leslie1943.top.pem  
# inflating: 5634948_egg.leslie1943.top.key  
```
- 配置对应的 conf 文件
```bash
server {
	# 监听端口
	listen 443 ssl; # 别忘了 ssl
	
	# 域名可以有多个, 用空格隔开
	# server_name www.w3cschool.cn w3school.cn;
	server_name egg.leslie1943.top;
	ssl_certificate cert/5634948_egg.leslie1943.top.pem;
	ssl_certificate_key cert/5634948_egg.leslie1943.top.key;
	ssl_session_timeout 5m;
	ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
	# 表示使用的加密套件的类型
	ssl_protocols TLSv1 TLSv1.1 TLSv1.2; # 表示使用TLS协议的类型
	ssl_prefer_server_ciphers on;

	# 对 / 启用反向代理
	location / {
		proxy_set_header X-Real-IP $remote_addr;

		# 后端的web服务器可以通过 X-Forwarded-For 获取用户真实IP
		proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;

		# 获取真实的请求主机名
		proxy_set_header Host $http_host;

		# 标识该请求由 Nginx 转发
		proxy_set_header X-Nginx-Proxy true;

		# 代理到本地的 7001 端口号 
		proxy_pass http://127.0.0.1:7001;
	}
}

# 让 原先的 http 重定向到 https 请求上
server {
	# 监听端口
	listen 80;
	# 域名可以有多个, 用空格隔开
	# server_name www.w3cschool.cn w3school.cn;
	server_name egg.leslie1943.top;
	rewrite ^(.*)$ https://$host$1; #将所有HTTP请求通过rewrite指令重定向到HTTPS。
}

```
- 重新加载 nginx 服务
```bash
    systemctl reload nginx
```
- 访问 `http://egg.leslie1943.top/api/v1` 自动跳转到 `https://egg.leslie1943.top/api/v1`