#### 三次握手
- 三次握手: `Three-way handshake`, 建立一个TCP连接时, 需要客户端和服务器总共发出3个包
- ACK: 表示验证字段
- SYN: 位数置1, 表示建立TCP连接
- FIN: 位数置1, 表示断开TCP连接
- 目的: 确认两端的数据传输通道是否正常.

#### 为什么要进行第三次握手
- 为了防止服务器端开启一些无用的连接增加服务器开销以及防止已失效的连接请求报文突然又传送到了服务器,因为产生错误.
- 客户端可能设置了超时时间,时间到了就关闭连接的请求,再重新发出创建连接的请求, 如果没有第三次握手的话. 客户端确认接收完消息.
- 

#### 三次握手图示 - 1
![image](https://user-images.githubusercontent.com/13994442/99750073-b0c86800-2b1a-11eb-9d62-c16653352524.png)
![image](https://user-images.githubusercontent.com/13994442/99750085-b7ef7600-2b1a-11eb-8b57-a5461f3a5466.png)


#### 三次握手图示 - 2
![image](https://user-images.githubusercontent.com/13994442/99750136-c9d11900-2b1a-11eb-9bc9-420886f22f92.png)
![image](https://user-images.githubusercontent.com/13994442/99750150-d2295400-2b1a-11eb-9fef-494bc7d71bac.png)
![image](https://user-images.githubusercontent.com/13994442/99750157-d5244480-2b1a-11eb-9175-1170e36da76e.png)

#### 四次挥手
- 四次挥手- `Four-Way Wavehand`
- 所谓4次挥手也就是TCP连接的释放, 连接的释放必须是一方主动释放,另外一方被动释放.


#### 四次挥手过程
- 1. 首先客户端想要释放连接, 向服务器端发送一段TCP报文 ===> (`FIN-WAIT-1`阶段, 即半关闭阶段)
- 2. 服务器端接收到从客户端发出的TCP报文之后, 确认了客户端想要释放连接, 随后服务器端结束ESTABLISHED阶段 ===> `CLOSE-WAIT`阶段（半关闭状态）
- 3. 服务器端自从发出ACK确认报文之后, 经过`CLOSED-WAIT`阶段, 做好了释放服务器端到客户端方向上的连接准备, 再次向客户端发出一段TCP报文 (`LAST-ACK`)
- 4. 客户端收到从服务器端发出的TCP报文, 确认了服务器端已做好释放连接的准备, 结束`FIN-WAIT-2阶`段, 进入`TIME-WAIT`阶段, 并向服务器端发送一段报文

#### 四次挥手图示 - 1
![image](https://user-images.githubusercontent.com/13994442/99750190-e4a38d80-2b1a-11eb-8185-6908231fd2c7.png)
![image](https://user-images.githubusercontent.com/13994442/99750198-e8371480-2b1a-11eb-8c15-8f1d309e2292.png)


## 为什么3次握手4次挥手
- 建立连接时, 被动方服务器端结束CLOSED阶段进入“握手”阶段并不需要任何准备, 可以直接返回SYN和ACK报文, 开始建立连接。
- 释放连接时, 被动方服务器, 突然收到主动方客户端释放连接的请求时并不能立即释放连接, 因为还有必要的数据需要处理, 所以服务器先返回ACK确认收到报文, 经过CLOSE-WAIT阶段准备好释放连接之后, 才能返回FIN释放连接报文。
