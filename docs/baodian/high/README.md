# 高级面试题


基础篇
Java基础
静态内部类和非静态内部类有什么区别
谈谈你对java多态的理解+java方法的多态性理解
java中接口和继承的区别
线程池的好处+线程池的优点及其原理+线程池的优点 (重点)
为什么不推荐通过Executors直接创建线程池
不怕难之BlockingQueue及其实现
深入理解ReentrantLock与Condition
Java多线程：线程间通信之Lock
Synchronized 关键字原理
ReentrantLock原理
HashMap中的Hash冲突解决和扩容机制
Java并发
Java虚拟机
JVM常见面试题
Java虚拟机(JVM)面试题（2020最新版）
JVM 面试题汇总
JVM方法区存储内容 是否会动态扩展 是否会出现内存溢出 出现的原因有哪些。
如何解决同时存在的对象创建和对象回收问题？
JVM中最大堆大小有没有限制？
Java运行时数据区域，导致内存溢出的原因。
java中一个对象从创建到销毁的过程和 JVM类加载过程
https://blog.csdn.net/m0_37914467/article/details/106441824
JVM内存结构
JVM内存结构 【方法区+虚拟机栈+本地方法栈+程序计数器+堆】
Java中的对象一定在堆上分配吗？
类加载机制/双亲委托
java类加载机制和类加载器以及双亲委派原则解析
Android基础
Activity知识点(必问)
Activity启动过程全解析
启动模式以及使用场景
onSaveInstanceState以及onRestoreInstanceState使用
onConfigurationChanged使用以及问题解决
Fragment知识点
Fragment生命周期
Fragment的懒加载
Fragment之间的通信
FragmentPagerAdapter 和FragmentStatePagerAdapter区别
为什么不建议直接通过使用new Fragment的方式传入数据
为什么官方推荐Fragment.setArguments(Bundle bundle)这种方式来传递参数，而不推荐通过构造方法直接来传递参数呢？
Androidx 下 Fragment 懒加载的新实现
推荐阅读：

Fragment全解析系列（一）：那些年踩过的坑
Google-Fragment概览
Google-与其他Fragment通信
Service知识点
Handler知识点(必问)
Handler Looper Message 关系是什么？
Messagequeue 的数据结构是什么？为什么要用这个数据结构？
如何在子线程中创建 Handler?
Handler post 方法原理？
Handler消息机制，postDelayed会造成线程阻塞吗？对内存有什么影响？
当访问大量数据出现线程租塞用什么技术解决？

Android主线程阻塞处理及优化
深入聊聊Android消息机制中的消息队列的设计
深入理解MessageQueue
你真的懂Handler.postDelayed()的原理吗?
Handler.postDelayed()是如何精确延迟指定时间的
Handler延迟消息执行机制，会阻塞吗？
Intent知识点
Android跨进程传递大内存数据
数据存储
文件和数据库哪个效率高？

UI控件篇
屏幕适配
dp+自适应布局+weight比例布局直接适配
今日头条适配方式
宽高限定符适配方式
smallestWidth适配
推荐阅读：

Android屏幕适配和方案【整理】
Android 目前稳定高效的UI适配方案
主要控件优化
RecyclerView优化
RecyclerView 性能优化
RecyclerView与ListView 对比浅析：缓存机制 RecyclerView和ListView的区别(必问)
RecyclerView 源码分析
RecyclerView 预加载机制源码分析
RecyclerView 中的设计模式
Recyclerview 滑动相关功能总结
事件分发与嵌套滚动
一篇文章让你轻松弄懂NestedScrollingParent & NestedScrollingChild
动态化页面构建方案
电商类的APP使用居多

Android | Tangram动态页面之路
Android动态界面开发框架Tangram使用完整教程
网络通信篇
网络协议
WebSocket 原理
推荐阅读

看完让你彻底理解 WebSocket 原理，附完整的实战代码（包含前端和后端）
架构设计篇
MVP架构设计
高级MVP架构封装演变全过程
Android—我所理解的MVP模式
组件化架构
业务大了代码多了会用到。
为什么要用组件化？
组件之间如何通信？
组件之间如何跳转？

Android为什么要用组件化？
性能优化篇
【面试重点】性能优化：包括启动优化（主要是冷启动）、内存优化、绘制优化、稳定性优化、安装包体积优化等，优化是面试的重中之重。
你在开发中是如何做性能优化的？

面试官: 说一下你做过哪些性能优化?
启动优化
Activity启动流程
Android性能优化–启动优化
内存优化
Android性能优化：这是一份全面&详细的内存优化指南
Android性能优化：手把手带你全面了解 内存泄露 & 解决方案
Android内存优化（使用SparseArray和ArrayMap代替HashMap）
绘制优化
什么情况下使用 ViewStub、include、merge？
他们的原理是什么？

Android性能优化：那些不可忽略的绘制优化
Android布局优化，全面复盘一波优化思路和优化方案
安装包优化
Android 安装包优化–减小安装包体积
稳定性优化
源码流程篇
开源库源码分析
RxJava的实现原理，它是如何实现线程的控制？
Retrofit的框架结构是什么？底层是怎么实现的？
网络框架是如何搭建？okhttp的底层实现是什么，和Retrofit有什么不同？
图片加载框架gilde、Picasso、fresco有什么不同，各自的实现原理是什么？如何搭建一个网络框架？

Glide源码分析
【面试题】
Glide的优点有哪些？
Glide的缓存原理是什么？

Glide的优点主要包括：

多种图片格式的缓存，适用于更多的内容表现形式（如Gif、WebP、缩略图、Video）
生命周期集成（根据Activity或者Fragment的生命周期管理图片加载请求)Glide可以感知调用页面的生命周期，这就是优势
高效处理Bitmap（bitmap的复用和主动回收，减少系统回收压力）
高效的缓存策略，灵活（Picasso只会缓存原始尺寸的图片，Glide缓存的是多种规格），加载速度快且内存开销小（默认Bitmap格式的不同，使得内存开销是Picasso的一半）
Android面试题：Glide
day 20 面试题：Glide面试题
聊一聊关于Glide在面试中的那些事
面试官：简历上如果写Glide，请注意以下几点
Glide OOM问题解决方法汇总
LeakCanary源码分析
OkHttp源码分析
【面试问题】
如何使用OkHttp进行异步网络请求，并根据请求结果刷新UI？
可否介绍一下OkHttp的整个异步请求流程？
OkHttp对于网络请求都有哪些优化，如何实现的？
OkHttp框架中都用到了哪些设计模式？

OkHttp源码解析
Okhttp面试简答
okhttp面试题----拦截器interceptor
Okhttp3 总结研究 （面试）
okhttp连接池复用机制
okhttp 流程和优化的实现
一篇让你受用的okhttp分析
OkHttp面试之–OkHttp的整个异步请求流程
OkHttp面试之–HttpEngine中的sendRequest方法详解
OkHttp解析大总结
Okhttp任务队列工作原理
Android高频面试专题 - 架构篇（二）okhttp面试必知必会
Android 网络优化，使用 HTTPDNS 优化 DNS，从原理到 OkHttp 集成
Retrofit源码分析
Android：手把手带你 深入读懂 Retrofit 2.0 源码
RxJava源码分析
理解源码之前需要先了解一些RXJava基本知识

RxJava操作符之创建操作符(三)
RxJava操作符之转换操作符(四)
RxJava操作符之过滤操作符(五)
RxJava操作符之组合操作符(六)
RxJava原理与源码分析

RxJava的消息订阅和线程切换原理
Android：图文解析带你快速了解RxJava原理
RxJava如何进行线程切换的？

RxJava 是如何实现线程切换的（上）
RxJava 线程切换原理
RxJava2线程切换原理分析
Rxjava内存泄漏防止方案——RxLifecycle，AutoDispose，RxLife框架

Android 使用RxLifecycle解决RxJava内存泄漏
解决RxJava内存泄漏（前篇）：RxLifecycle详解及原理分析 理解过滤操作符之takeUntil操作符的使用
RxLifecycle详细解析
使用Rxjava2导致的内存泄露问题
Rxjava解除订阅②：AutoDispose
Tinker源码分析
ARouter源码分析
路由框架原理：ARouter 【官方文档】
【ARouter：现在模块化（组件化）算是比较常见的开发模式了，尤其是在大厂，所以有必要知道ARouter的实现原理，2个模块之间是怎样实现的页面跳转，以及ARouter为了优化性能做了哪些工作】
核心要点：将Route注解中的path地址和Activity.class文件的映射关系保存到它自己生成的java文件的map中
隐式跳转方案,但是一个项目中不可能所有的跳转都是隐式的，这样Manifest文件会有很多过滤配置，而且非常不利于后期维护。
反射跳转方案：需要拿到Activity的类文件，在组件开发的时候，想拿到其他module的类文件是很麻烦的，因为组件开发的时候组件module之间是没有相互引用的，你只能通过找到类的路径去反射拿到这个class。大量的使用反射跳转对性能会有影响。
APT是Annotation Processing Tool的简称,即注解处理工具。apt是在编译期对代码中指定的注解进行解析，然后做一些其他处理（如通过javapoet生成新的Java文件

ARouter原理剖析及手动实现
ARouter组件化框架原理分析 其实ARouter没有用到隐式调转，也没有用到反射技术。而是按需加载路由表类把路由映射关系保存在内存中。
Android之ARouter使用和原理解析
手动实现一个路由框架EasyRouter 仿照ARouter来实现一个简易版的路由框架，实现了组件之间的路由跳转。省略了拦截器等功能
Arouter核心思路和源码详解
ARouter源码分析（四）—— 缓存与优化
我所理解的Android组件化之通信机制
ARouter系列三：依赖注入暴露服务
ARouter系列一：Activity跳转原理详解
Android框架层源码解析
Java层源码解析
HashMap底层实现，它和LinkHashMap有什么区别？

算法设计
时间复杂度
算法的时间与空间复杂度（一看就懂）
数据结构
图解数据结构和算法-网站
浅谈单链表与双链表的区别
新技术篇
实战问题篇
Android工程中方法数超过65536解决方法
面试篇
开源文档
Awesome-Android-Interview 随着Android技术发展的成熟，Kotlin、大前端技术Flutter、RN、小程序等一下子就进入了我们的视野内，同时，Android自身的技术栈也正在不断扩展，比如在国外大热的Jetpack。因此，Android开发者们越来越焦虑，越来越迷茫，每个人的时间和精力是有限的，我们到底应该学什么才能有效地提高自身的竞争力呢?其实，首先我们应该优先深入学习工作中用到的技术，其次，关注这2年来Android最新的面试题所涉及的知识点，根据自身的实际情况有选择地进行针对性的学习和提升。只有这样，自身才不会被所谓的 互联网寒冬 吓倒。Awesome-Android-Interview搜集了国内一线及二线互联网公司最常出现的面试题，非常全面，笔者花费了很大的精力和时间，希望得到大家的支持。
AndroidGuide 这是一份 Android 开发从基础入门到进阶的完整（并不是）指南，所有文章都是本人这几年时间里一字一字码出来的，文章的更新方向和更新频率以我的学习计划为导向，会一直持续密集更新下去…
LearningNotes
Android和Flutter笔记文档 基于开源文档Mkdocs部署搭建的学习笔记个人网站
BAT大厂Android面试知识点，请客官拿好 年年寒冬，年年也挡不住一个安卓程序员追求大厂的决心。想要进入大厂，我们需要掌握哪些知识点呢？这里，我为大家梳理了一个整体的知识架构。整体包括Java、Android、算法、网络等，并且我也在相应知识点下推荐了与该知识点相关的书籍与博客。希望大家阅读之后，能帮助大家完善与整理自己的知识体系。祝大家早日进入自己理想的公司~~
面试文献
Android 高级开发面试题以及答案整理
Android 中高级面试必知必会
Android 高级面试高频知识点
Android面试重难点高频问题
Android面试题集
通过三轮面试斩获腾讯offer的Android菜鸟亲述：末流渣本原来也有“春天”
Android 面试题积累 (高阶)
个人面经
我跳槽了！2020年Android找工作面试，你必须提前知道的一些事
2018已经很冷，2019年Android工作或更难找——面试基础技能罗列
2017年Android面试体验之我一个周面了20多次
社区网站篇
面圈网：http://www.mianshigee.com/job/Android/s2/
————————————————
版权声明：本文为CSDN博主「yundashi168」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
原文链接：https://blog.csdn.net/yundashi168/article/details/115084750
