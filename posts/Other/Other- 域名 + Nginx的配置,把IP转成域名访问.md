### Other: 域名 + Nginx的配置,把IP转成域名访问
1. 首先要申请自己的一个域名, 整个流程比较耗时,大概需要半个月多一些. 我的是在阿里云上购买的.
2. 阿里云 => 域名服务 => 解析 => 添加记录
```bash
	记录类型: A-将域名指向一个IPV4地址
	主机记录: 我配置的是 `egg.leslie1943.top`
		www: 解析后的域名为 www.aliyun.com.
		@: 直接解析主域名 aliyun.com.
		*: 泛解析，匹配其他所有域名 *.aliyun.com.
		mail: 将域名解析为mail.aliyun.com，通常用于解析邮箱服务器.
		二级域名: 如: abc.aliyun.com，填写abc.
		手机网站: 如: m.aliyun.com，填写m.
		显性URL: 不支持泛解析(泛解析: 将所有子域名解析到同一地址)
	解析线路:
		一般选择为 默认
	记录值: 填写自己的主机IP地址
	TTL: 默认 10分钟
```
- 切换到阿里云终端: `cd /etc/nginx/`, 然后`ls` 得到以下文件:
- 创建一个 `xxx.conf` 配置, `conf`后缀的文件名称会被`nginx.conf`解析
```bash
	server{
		# 监听端口
		listen 80;
		# 域名可以有多个, 用空格隔开
		# server_name www.xxxx.cn xxxx.cn;
		server_name egg.leslie1943.top; # 🎃🎃 要访问的域名名称, 也就是我们刚刚配置那个域名
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
			proxy_pass http://127.0.0.1:7001; # 🎃🎃 代理服务的地址和端口号. 注意 这个 127.0.0.1 是相对于服务器自身的本机地址
		}
	}
```
- 重启 `nginx`服务, `systemctl reload nginx`
- 原本需要通过 `47.114.105.120:3343/api/v1/videos`访问的接口,现在只需要通过`http://egg.leslie1943.top/api/v1/videos`了
- 不需要加端口号是因为给`http`配置了 `80`端口

- 同理, 如果你还有其他的服务在服务器上, 那么配置一个域名解析规则,然后单独配置一个能够被`nginx.conf`识别的`.conf`文件就可以了
- 在配置一个域名解析规则: `youtobe.leslie1943.top` 来代理本地的 `http://127.0.0.1:3000`服务
```bash
	server{
		# 监听端口
		listen 80;
		# 域名可以有多个, 用空格隔开
		# server_name www.xxxx.cn xxxx.cn;
		server_name youtobe.leslie1943.top; # 🎃🎃 要访问的域名名称, 也就是我们刚刚配置那个域名
		# 对 / 启用反向代理
		location / {
			proxy_set_header X-Real-IP $remote_addr;
			# 后端的web服务器可以通过 X-Forwarded-For 获取用户真实IP
			proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
			# 获取真实的请求主机名
			proxy_set_header Host $http_host;
			# 标识该请求由 Nginx 转发
			proxy_set_header X-Nginx-Proxy true;
			# 代理到本地的 3000 端口号 
			proxy_pass http://127.0.0.1:3000; # 🎃🎃 代理服务的地址和端口号. 注意 这个 127.0.0.1 是相对于服务器自身的本机地址
		}
	}
```