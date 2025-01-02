<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

## 技术点

- Redis
- RedisModule
- RedisService
- redis hash
- SessionModule
- SessionService
- cookie-parser
- nginx 负载均衡
- createParamDecorator
- SetMetadata
- 默认情况下，`ValidationPipe` 不验证使用自定义装饰器注释的参数
- 装饰器组合`applyDecorators`

## 区别

- JWT 主要用于无状态的身份验证和授权
- 分布式 Session 则用于在服务器端维护丰富的用户会话状态。比如在电商系统中，用户的购物车状态、浏览历史等信息

## 分布式session
手动管理cookie sid

### nginx代理 & 负载均衡设置

```nginx
upstream multi-server {
  server 1.0.0.1:3001;
  server 1.0.0.1:3002;
}

server {
  location = /count {
    proxy_pass http://multi-server;
  }
}
```