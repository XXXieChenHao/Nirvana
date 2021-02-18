# JS 基础

## 浏览器
### 浏览器介绍
> 主流浏览器都拥有自己的内核

   

| 5大主流浏览器 |      内核      |
| :-----: | :----------: |
|   IE    |   trident    |
| chrome  | webkit blink |
| safari  |    webkit    |
| firefox |    gecko     |
|  opera  |    presto    |

​       

### 浏览器历史与 JS 诞生

**1. 1990 年**
  - 蒂姆·伯纳斯·李（超文本分享资讯的人）
  - world wide web  移植到 c 改名为 libwww ——> nexus
  - libwww 是真正意义上的浏览器，可以分享资讯
  - 允许用户浏览他人编写的网站

**2. 1993 年**
  - 美国伊利诺大学 NCSA 组织成员 (马克·安德森)
  - 开发 MOSIAC 浏览器 显示图片 图形化浏览器

**3. 1994 年**
  - 马克·安德森 和 吉姆·克拉克（硅图SGI公司） 成立公司
  - MOSIAC communication corporation(公司名)
  - MOSIAC 商标权 伊利诺大学 ——> spy glass公司
  - 公司改名为 Netscape communication corporation (网景公司)
  - 网景公司开发 netscape navigator 浏览器 ——> 2003 年

**4. 1996 年**
  - 微软公司收购 spy glass
  - IE internet exploror 1.0 诞生
  - IE 的内核时是在 MOSIAC 的基础上加一些内容
  - IE3 的诞生 出现了第一个脚本语言 JScript

**5. 1996 年**
  - 网景公司 布兰登·艾奇(Brendan eich) 在 NETSCAPE NAVIGATOR 开发了 livescript

**6. 1996 年**
  - JAVA (SUN公司) 具有一定知名度
  - livescript 与 SUN 公司合作推广产品，改名为 JavaScript

**7. 2001 年**
  - IE6 XP 诞生
  - 在渲染引擎中将 JavaScript 引擎从中剥离出来

**8. 2003 年**
  - mozilla 公司 firefox 根据 netscape navigator 改的

**9. 2008 年**
  - google 基于 WEBKIT BLINKK GEARS 开发出 chrome 浏览器
  - V8 JS引擎
    1. 直接翻译机器码
    2. 独立与浏览器运行

**10. 2009 年**
  - 甲骨文oracle 收购 SUN 公司
  - JavaScript 所有权是甲骨文（JAVA 也是）


### ECMA
> European Computer Manufactures Association 欧洲计算机制造联合会（日内瓦）
> 评估、开发和认可电信和计算机标准

ECMA - 262 规范 （ECMAScript 规范）

规范化脚本语言 ES5 ES6 ...

**1. 编程语言**
1. 编译型 解释型
- 编译性
  - 源码通过编译器编译机器语言 ——> 可执行的文件
  - 在执行之前已经翻译完成，只需要翻译一次
  - 优缺点
    - 需要跨平台移植
    - 执行速度快
- 解释型
  - 源码通过解释器解释一行执行一行
  - 每次运行都需要解释翻译
  - 优缺点
    - 不需要根据不同的系统平台移植（有解释器一定能运行）
    - 执行速度慢

2. 脚本语言
  - 一定有脚本引擎
  - 通过脚本引擎的解释器解释后运行
  - 脚本语言 前后端都有脚本语言
    - JavaScript (客户端脚本)  客户端可查看
    - php (服务端脚本)  客户端看不到


### JavaScript
> JavaScript 三大组成模块
1. EcMAScript
2. DOM document object model
3. BOM browser object model

**1. 线程**
 - 单线程： 连续按照顺序执行一个线程的任务
 - 多线程： 同一时间执行多于一个线程的任务

**2. JS线程**
  - JS 引擎是单线程的
  - JS 可以模拟多线程（轮转时间片）

**轮转时间片**
  - 短时间内轮流执行多个任务的片段
    1. 多任务
    2. 切分任务分为时间片
    3. 随机排列任务片段，组成队列
    4. 按照队列顺序将任务片段送进 JS 进程
    5. JS 线程执行一个又一个任务片段
    6. 时间片用完后，必须轮转给下一个任务，无论是否完成













