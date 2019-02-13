# `ims-libp2p`

> TODO: description

## Usage

```
Transports：传输层
tcp,utp,uqic,sctp,ble,tor,l2p

Discovery：网络发现层
mdns,bootstrap,dns,kad-dht,pex,pki

Peer Routing: 节点路由
mdns,dns,dvs,kad-dht


NAT Traversal: NAT穿越层
kad-ice,ice,stun,turn


Content Routing: 内容寻址
mdns,pubsub,kad-dht
```


multihash: 自描述的hash
multicodec: 自描述的编码类型.
multiaddr: 自描述的网络地址
Record: IPLD(IPFS链接数据) 描述了实现 IPRS 的对象
Stream-Muxer: 流复用器
Muxed-Stream: 双工通信信道.
Connection: 节点之间的点对点连接
Transport: 用于建立与其他对等体的连接.
