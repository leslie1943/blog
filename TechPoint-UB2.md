### Ubuntu
- 🎃 远程传输文件
```bash
  scp filename root@47.114.105.120:/root
```

- 🎃 剪切/移动文件到当前文件夹
```bash
  mv ~/filename.xx .
```

- 🎃 copy文件 当前文件夹
```bash
  cp ~/filenameSource.xx filenameDest.xx 
```

- 🎃 解压文件
```bash
 unzip filename
 ```

 - 🎃 删除文件
```bash
 rm filename
 ```

- 🎃 查询端口号
```bash
#找到服务的端口号: 
  sudo lsof -i:port
#找到服务的端口号对应的pid
  sudo kill pid
```
- 🎃 阿里云操作数据库
### 阿里云操作数据库
```bash
# mongo
# use youtobe
# show dbs
# show collections
# db.users.find();
```

- 🎃 重启 nginx服务器
```bash
systemctl reload nginx
```