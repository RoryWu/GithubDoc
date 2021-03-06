# 初级面试题


#### 在Activity中如何保存/恢复状态？

分别调用onSaveInstanceState和onRestoreInstanceState 2个方法保存和恢复状态。

#### launchMode之singleTask与taskAffinity

taskAffinity是用来指示Activity属于哪一个Task的。taskAffinity能够决定以下两件事情（前提是Activity的launchMode为singleTask或者设置了FLAG_ACTIVITY_NEW_TASK）,默认情况下，在一个app中的所有Activity都有一样的taskAffinity，但是我们可以设置不同的taskAffinity，为这些Activity分Task。甚至可以在不同的app之中，设置相同的taskAffinity，以达到不同app的activity公用同一个Task的目的。

#### res/raw和asserts的区别

这两个目录下的文件都会被打包进APK，并且不经过任何的压缩处理。
assets与res/raw不同点在于，assets支持任意深度的子目录，这些文件不会生成任何资源ID，只能使用AssetManager按相对的路径读取文件。如需访问原始文件名和文件层次结构，则可以考虑将某些资源保存在assets目录下。

#### 图片放错目录会产生的问题吗？

高密度（density）的系统去使用低密度目录下的图片资源时，会将图片长宽自动放大以去适应高密度的精度，当然图片占用的内存会更大。所以如果能提各种dpi的对应资源那是最好，可以达到较好内存使用效果。如果提供的图片资源有限，那么图片资源应该尽量放在高密度文件夹下，这样可以节省图片的内存开支。

#### drawable-nodpi文件夹

这个文件夹是一个密度无关的文件夹，放在这里的图片系统就不会对它进行自动缩放，原图片是多大就会实际展示多大。但是要注意一个加载的顺序，drawable-nodpi文件夹是在匹配密度文件夹和更高密度文件夹都找不到的情况下才会去这里查找图片的，因此放在drawable-nodpi文件夹里的图片通常情况下不建议再放到别的文件夹里面。

#### Bitmap和Drawable

Bitmap是Android系统中的图像处理的最重要类。可以简单地说，Bitmap代表的是图片资源在内存中的数据结构，如它的像素数据，长宽等属性都存放在Bitmap对象中。Bitmap类的构造函数是私有的，只能是通过JNI实例化，系统提供BitmapFactory工厂类给我们从从File、Stream和byte[]创建Bitmap的方式。
Drawable官文文档说明为可绘制物件的一般抽象。View也是可以绘制的，但Drawable与View不同，Drawable不接受事件，无法与用户进行交互。我们知道很多UI控件都提供设置Drawable的接口，如ImageView可以通过setImageDrawable(Drawable drawable)设置它的显示，这个drawable可以是来自Bitmap的BitmapDrawable，也可以是其他的如ShapeDrawable。
也就是Drawable是一种抽像，最终实现的方式可以是绘制Bitmap的数据或者图形、Color数据等。理解了这些，你很容易明白为什么我们有时候需要进行两者之间的转换。

#### 要加载很大的图片怎么办？

如果图片很大，比如他们的占用内存算下来就直接OOM了，那么我们肯定不能直接加载它。解决主法还是有很多的，系统也给我们提供了一个类BitmapRegionDecoder，可以用来分块加载图片。

#### 图片圆角（或称矩形圆角）或者圆形头像的实现方式

除了把原图直接做成圆角外，常见有三种方式实现：
使用Xfermode混合图层；
使用BitmapShader；
通过裁剪画布区域实现指定形状的图形（ClipPath）

#### Context

ContextWrapper是上下文功能的封装类，而ContextImpl则是上下文功能的实现类，Context的具体能力是由ContextImpl类去实现。那么Context到底可以实现哪些功能呢？这个就实在是太多了，弹出Toast、启动Activity、启动Service、发送广播、操作数据库等等等等都需要用到Context。
getApplicationContext()比getApplicatio()作用域会更广一些，但实际上获取的对象是同一个。
除了上面两个方法之外，其实还有一个getBaseContext()方法，这个方法实际上获得的是一个ContextImpl对象。ContextWrapper的attachBaseContext()方法其实是由系统来调用的，它会把ContextImpl对象作为参数传递到attachBaseContext()方法当中，从而赋值给mBase对象，之后ContextWrapper中的所有方法其实都是通过这种委托的机制交由ContextImpl去具体实现的，所以说ContextImpl是上下文功能的实现类是非常准确的。

#### 内存泄漏的原因：

导致内存泄漏有很多原因，最常见的有内部类的使用，因为内部类持有外部引用。
还有例如：1.资源对象没关闭造成的内存泄漏（源性对象比如(Cursor，File文件等)往往都用了一些缓冲，我们在不使用的时候，应该及时关闭它们，以便它们的缓冲及时回收内存） 2.构造Adapter时，没有使用缓存的convertView 3.Bitmap对象不在使用时调用recycle()释放内存（视情况而定） 4.使用Application context。这个context的生存周期和你的应用的生存周期一样长，而不是取决于activity的生存周期。如果你想保持一个长期生存的对象，并且这个对象需要一个context,记得使用application对象。你可以通过调用 Context.getApplicationContext() or Activity.getApplication()来获得 5.注册没取消造成的内存泄漏（一些Android程序可能引用我们的Anroid程序的对象(比如注册机制)。即使我们的Android程序已经结束了，但是别的引用程序仍然还有对我们的Android程序的某个对象的引用，泄漏的内存依然不能被垃圾回收。调用registerReceiver后未调用unregisterReceiver。） 6.集合中对象没清理造成的内存泄漏（我们通常把一些对象的引用加入到了集合中，当我们不需要该对象时，并没有把它的引用从集合中清理掉，这样这个集合就会越来越大。如果这个集合是static的话，那情况就更严重了。）
http://www.jackywang.tech/AndroidInterview-Q-A/chinese/android/%E4%BB%80%E4%B9%88%E6%83%85%E5%86%B5%E5%AF%BC%E8%87%B4%E5%86%85%E5%AD%98%E6%B3%84%E6%BC%8F-%E7%BE%8E%E5%9B%A2.html

#### oom和内存泄漏

内存泄漏：就是存在一些被分配的对象，这些对象有下面两个特点，首先，这些对象是可达的，及有引用指向，存在通路可以与其相连；其次，这些对象是无用的，即程序以后不会再使用这些对象。如果对象满足这两个条件，这些对象就可以判定为Java中的内存泄漏，这些对象不会被GC所回收，然而它却占用内存。
内存泄露的原因：
1.资源对象没关闭造成的内存泄漏，如查询数据库后没有关闭游标cursor
2.构造Adapter时，没有使用 convertView 重用
3.Bitmap对象不在使用时调用recycle()释放内存
4.对象被生命周期长的对象引用，如activity被静态集合引用导致activity不能释放
内存泄漏示例：非静态的内部类和匿名内部类都会隐式地持有其外部类的引用。静态的内部类不会持有外部类的引用
不会导致内存泄露的代码如下:
当这个Activity退出时消息队列中还有未处理的消息或者正在处理消息，而消息队列中的Message持有mHandler实例的引用，mHandler又持有Activity的引用，所以导致该Activity的内存资源无法及时回收，引发内存泄漏

https://www.androiddesignpatterns.com/2013/01/inner-class-handler-memory-leak.html

#### 四种引用的区别

**1、强引用**
通常我们编写的代码都是强引用，eg ：Object obj = new Object();当内存空间不足，Java虚拟机宁愿抛出OutOfMemoryError错误，使程序异常终止，也不会靠随意回收具有强引用的对象来解决内存不足问题。比如你创建一个很长的数组Object[] objArr = new Object[10000];当运行至这句时，如果内存不足，JVM会抛出OOM错误也不会回收数组中的object对象。不过要注意的是，当方法运行完之后，数组和数组中的对象都已经不存在了，所以它们指向的对象都会被JVM回收。
**2、软引用**
只要有足够的内存，就一直保持对象。一般可用来实现 `缓存`，通过java.lang.ref.SoftReference类实现。内存非常紧张的时候会被回收，其他时候不会被回收，所以在使用之前需要判空，从而判断当前时候已经被回收了。
**3、弱引用**
通过java.lang.ref.WeakReference或java.util.WeakHashMap类实现，eg : WeakReference p = new WeakReference(new Person(“Rain”));不管内存是否足够，系统垃圾回收时必定会回收。
**4、虚引用**
不能单独使用，主要是用于追踪对象被垃圾回收的状态。通过java.lang.ref.PhantomReference类和引用队列ReferenceQueue类联合使用实现。

#### 如何打多渠道包

在AndroidMainfest.xml配置相应的渠道

<meta-data android:value="UMENG_CHANNEL"              android:name="${UMENG_CHANNEL_VALUE}"/>  <!--动态更改渠道号-->

在build.gradle中配置渠道信息和自动替换脚本

//多渠道打包    productFlavors {        xiaomi {}        huawei {}        yingyongbao {}        wandoujia {}    }

//自动替换清单文件中的渠道号    productFlavors.all {        flavor -> flavor.manifestPlaceholders = [UMENG_CHANNEL_VALUE: name]    }

#### 比如会问在一个工作线程中创建自己的消息队例应该怎么做

Looper.prepare（在每个线程只允许执行一次）

#### handler

handler通过post（Runnable）和sendMessage（Message）传递Runnable和Message，最后调用的是sendMessageAtTime
MessageQueue核心方法：enqueueMessage和next(实现原理：synchronized 和 for(;;))
Looper核心方法：Looper.prepare()和Looper.loop()，其中loop()方法里面是一个for(;;)死循环
msg.target = this

#### Android中为什么主线程不会因为Looper.loop()里的死循环卡死？

事实上，会在进入死循环之前便创建了新binder线程，在代码ActivityThread.main()中：thread.attach(false)；便会创建一个Binder线程（具体是指ApplicationThread，Binder的服务端，用于接收系统服务AMS发送来的事件），该Binder线程通过Handler将Message发送给主线程。对于主线程，我们是绝不希望会被运行一段时间，自己就退出，那么如何保证能一直存活呢？简单做法就是可执行代码是能一直执行下去的，死循环便能保证不会被退出，例如，binder线程也是采用死循环的方法，通过循环方式不同与Binder驱动进行读写操作，当然并非简单地死循环，无消息时会休眠。
主线程的死循环一直运行是不是特别消耗CPU资源呢？** 其实不然，这里就涉及到**Linux pipe/epoll机制**，简单说就是在主线程的MessageQueue没有消息时，便阻塞在loop的queue.next()中的nativePollOnce()方法里，此时主线程会释放CPU资源进入休眠状态，直到下个消息到达或者有事务发生，通过往pipe管道写端写入数据来唤醒主线程工作。

#### 链式存储结构和顺序存储结构

顺序表适宜于做查找这样的静态操作；链表宜于做插入、删除这样的动态操作。
若线性表的长度变化不大，且其主要操作是查找，则采用顺序表；
若线性表的长度变化较大，且其主要操作是插入、删除操作，则采用链表。
顺序表平均需要移动近一半元素
链表不需要移动元素，只需要修改指针

#### MVP（要特别熟悉，能说出优点）

任何事务都存在两面性，MVP当然也不列外，我们来看看MVP的优缺点。
**优点：**

* 1.降低耦合度，实现了Model和View真正的完全分离，可以修改View而不影响Modle
* 2.模块职责划分明显，层次清晰
* 3.Presenter可以复用，一个Presenter可以用于多个View，而不需要更改Presenter的逻辑（当然是在View的改动不影响业务逻辑的前提下）
* 4.利于测试驱动开发。以前的Android开发是难以进行单元测试的（虽然很多Android开发者都没有写过测试用例，但是随着项目变得越来越复杂，没有测试是很难保证软件质量的；而且近几年来Android上的测试框架已经有了长足的发展——开始写测试用例吧），在使用MVP的项目中Presenter对View是通过接口进行，在对Presenter进行不依赖UI环境的单元测试的时候。可以通过Mock一个View对象，这个对象只需要实现了View的接口即可。然后依赖注入到Presenter中，单元测试的时候就可以完整的测试Presenter应用逻辑的正确性。
* 5.View可以进行组件化。在MVP当中，View不依赖Model。这样就可以让View从特定的业务场景中脱离出来，可以说View可以做到对业务完全无知。它只需要提供一系列接口提供给上层操作。这样就可以做到高度可复用的View组件。
* 6.代码灵活性
  **缺点：**
* 1.Presenter中除了应用逻辑以外，还有大量的View->Model，Model->View的手动同步逻辑，造成Presenter比较笨重，维护起来会比较困难。
* 2.由于对视图的渲染放在了Presenter中，所以视图和Presenter的交互会过于频繁。
* 3.如果Presenter过多地渲染了视图，往往会使得它与特定的视图的联系过于紧密。一旦视图需要变更，那么Presenter也需要变更了。
* 4.额外的代码复杂度及学习成本。

#### 组件化方案和思想

组件化开发就是将一个app分成多个模块，每个模块都是一个组件（Module），开发的过程中我们可以让这些组件相互依赖或者单独调试部分组件等，但是最终发布的时候是将这些组件合并统一成一个apk，这就是组件化开发。
组件中提供common库：
1.我们将给给整个工程提供统一的依赖第三方库的入口，前面介绍的Common库的作用之一就是统一依赖开源库，因为其他业务组件都依赖了Common库，所以这些业务组件也就间接依赖了Common所依赖的开源库。
2.在Common组件中我们封装了项目中用到的各种Base类，这些基类中就有BaseApplication 类。
Gradle构建工具在组件的build.gradle中有如下用法：

//设置了resourcePrefix值后，所有的资源名必须以指定的字符串做前缀，否则会报错。    //但是resourcePrefix这个值只能限定xml里面的资源，并不能限定图片资源，所有图片资源仍然需要手动去修改资源名。    resourcePrefix "girls_"

http://blog.csdn.net/guiying712/article/details/55213884

#### 做SDK类项目的要求

1.暴露的接口尽可能少，最大程度减少 SDK 接入方需要了解的细节。
2.license
3.调用尽可能简单
4.library，aar两种

#### aar和jar的区别

aar： *.aar文件中包含所有资源，class以及res资源文件。
jar：只包含了class文件与清单文件 ，不包含资源文件，如图片等所有res中的文件。
如果你只是一个简单的类库那么使用生成的* .jar文件即可；如果你的是一个UI库，包含一些自己写的控件布局文件以及字体等资源文件那么就只能使用*.aar文件。

#### 性能优化（分类优化：UI，内存，cpu，电量，网络）

ui优化：约束布局
内存优化：上下文，handler，线程，单例的，图片，native，java（不保留活动 java堆内存）
cpu优化：看电话热不热
电量优化： 大的东西一直不放
网络优化：gip压缩，图片webp，策略
1.在发现某个页面或者操作会卡顿时，可以使用 TraceView 定位问题代码。它可以加载 trace 文件，用图形的形式展示代码的执行时间、次数及调用栈，便于我们分析。
2.查看布局深度：HierarchyViewer工具
3.Systrace在一些分析显示的问题上特别有用，如应用画图慢，显示动作或动画时变形等。Systrace会自动分析信息，将性能问题直接以alerts的方式高亮显示，我们只要修改这些alerts就可以。如果我们想要知道方法的更详细信息，我们可以结合Traceview来解决问题。
http://developer.51cto.com/art/201511/496263.htm（35个代码优化小细节）
http://www.jackywang.tech/AndroidInterview-Q-A/chinese/subject/%E6%80%A7%E8%83%BD%E4%BC%98%E5%8C%96.html (性能优化)
VectorDrawable for smaller APKs 针对不同的分辨率提供多张精度的图片会额外增加APK的大小，针对这个问题的解决方案是考虑使用VectorDrawable，它仅仅只需要一个文件，能够动态生成对应分辨率的图片。
Using LINT for Performance Tips Lint已经集成到Android Studio中了，我们可以手动去触发这个工具，点击工具栏的Analysis -> Inspect Code，触发之后，Lint会开始工作，并把结果输出到底部的工具栏，我们可以逐个查看原因并根据指示做相应的优化修改。
Tool: Strict Mode Android提供了一个叫做Strict Mode的工具，我们可以通过手机设置里面的开发者选项，打开Strict Mode选项，如果程序存在潜在的隐患，屏幕就会闪现红色。我们也可以通过StrictMode API在代码层面做细化的跟踪，可以设置StrictMode监听那些潜在问题，出现问题时如何提醒开发者，可以对屏幕闪红色，也可以输出错误日志。

#### 匿名内部类

调用方式

new 父类构造器（参数列表）|实现接口（）      {       //匿名内部类的类体部分      }

**当所在的方法的形参需要被内部类里面使用时，该形参必须为final。**
在这里我们看到使用匿名内部类我们必须要继承一个父类或者实现一个接口，这个引用是隐式的。由于匿名内部类不能是抽象类，所以它必须要实现它的抽象父类或者接口里面所有的抽象方法。对于匿名内部类的使用它是存在一个缺陷的，就是它仅能被使用一次，创建匿名内部类时它会立即创建一个该类的实例，该类的定义会立即消失，所以匿名内部类是不能够被重复使用。
**在使用匿名内部类的过程中，我们需要注意如下几点：**
1、使用匿名内部类时，我们必须是继承一个类或者实现一个接口，但是两者不可兼得，同时也只能继承一个类或者实现一个接口。
2、匿名内部类中是不能定义构造函数的。
3、匿名内部类中不能存在任何的静态成员变量和静态方法。
4、匿名内部类为局部内部类，所以局部内部类的所有限制同样对匿名内部类生效。
5、匿名内部类不能是抽象的，它必须要实现继承的类或者实现的接口的所有抽象方法。
**匿名内部类初始化：**
使用构造代码块！利用构造代码块能够达到为匿名内部类创建一个构造器的效果。

#### 多线程（同步，原子类，原子操作）

**同步：**
1.同步方法 synchronized
2.同步代码块 synchronized
3.使用特殊域变量(volatile)实现线程同步
a.volatile关键字为域变量的访问提供了一种免锁机制，
b.使用volatile修饰域相当于告诉虚拟机该域可能会被其他线程更新，
c.因此每次使用该域就要重新计算，而不是使用寄存器中的值
d.volatile不会提供任何原子操作，它也不能用来修饰final类型的变量
4.lock() : 获得锁 unlock() : 释放锁
5.ThreadLocal 类的常用方法
6.使用阻塞队列实现线程同步
使用LinkedBlockingQueue来实现线程的同步
7.使用原子变量实现线程同步
**原子类：**
在java的util.concurrent.atomic包中提供了创建了原子类型变量的工具类，使用该类可以简化线程同步。其中AtomicInteger 表可以用原子方式更新int的值。（AtomicInteger，AtomicBoolean，AtomicLong）
**原子操作：**
原子操作就是指将读取变量值、修改变量值、保存变量值看成一个整体来操作即-这几种行为要么同时完成，要么都不完成。

#### 多线程CAS算法

CAS（Compare and Swap），即比较并替换。CAS的思想很简单：三个参数，一个当前内存值V、旧的预期值A、即将更新的值B，当且仅当预期值A和内存值V相同时，将内存值修改为B并返回true，否则什么都不做，并返回false。
独占锁是一种悲观锁，synchronized就是一种独占锁，会导致其它所有需要锁的线程挂起，等待持有锁的线程释放锁。而另一个更加有效的锁就是乐观锁。所谓乐观锁就是，每次不加锁而是假设没有冲突而去完成某项操作，如果因为冲突失败就重试，直到成功为止。乐观锁用到的机制就是CAS，Compare and Swap。
**CAS虽然很高效的解决原子操作，但是CAS仍然存在三大问题**

1. ABA问题。因为CAS需要在操作值的时候检查下值有没有发生变化，如果没有发生变化则更新，但是如果一个值原来是A，变成了B，又变成了A，那么使用CAS进行检查时会发现它的值没有发生变化，但是实际上却变化了。ABA问题的解决思路就是使用版本号。在变量前面追加上版本号，每次变量更新的时候把版本号加一，那么A－B－A 就会变成1A-2B－3A。
   从Java1.5开始JDK的atomic包里提供了一个类AtomicStampedReference来解决ABA问题。这个类的compareAndSet方法作用是首先检查当前引用是否等于预期引用，并且当前标志是否等于预期标志，如果全部相等，则以原子方式将该引用和该标志的值设置为给定的更新值。
2. 循环时间长开销大。自旋CAS如果长时间不成功，会给CPU带来非常大的执行开销。如果JVM能支持处理器提供的pause指令那么效率会有一定的提升，pause指令有两个作用，第一它可以延迟流水线执行指令（de-pipeline）,使CPU不会消耗过多的执行资源，延迟的时间取决于具体实现的版本，在一些处理器上延迟时间是零。第二它可以避免在退出循环的时候因内存顺序冲突（memory order violation）而引起CPU流水线被清空（CPU pipeline flush），从而提高CPU的执行效率。
3. 只能保证一个共享变量的原子操作。当对一个共享变量执行操作时，我们可以使用循环CAS的方式来保证原子操作，但是对多个共享变量操作时，循环CAS就无法保证操作的原子性，这个时候就可以用锁，或者有一个取巧的办法，就是把多个共享变量合并成一个共享变量来操作。比如有两个共享变量i＝2,j=a，合并一下ij=2a，然后用CAS来操作ij。从Java1.5开始JDK提供了AtomicReference类来保证引用对象之间的原子性，你可以把多个变量放在一个对象里来进行CAS操作。

#### 线程阻塞（sleep、await、yield）

wait是Object类的方法，sleep和yield是Thread类的静态方法。
await:wait( )方法导致当前线程进入等待状态直到它被通知（其他线程调用notify或notifyAll方法。notify/notifyAll方法解除等待线程的阻塞状态）。wait( )后，线程会释放掉它所占有的对象的锁，从而使线程所在对象中的其它synchronized数据可被别的线程使用。wait方法只能在一个同步方法中调用。
sleep:sleep(long millis)可能使任意优先级的其他线程得到执行机会。sleep(long millis)不会释放锁。调用sleep方法的线程在唤醒之后不保证能获取到CPU，它会先进入就绪态，与其他线程竞争CPU。
yield:yield方法也不会释放锁。yield只能把CPU让给相同优先级的其他线程，而不会把CPU给更高或更低优先级的其他线程。若此时没有其他线程跟它在有一个优先级，则该线程继续获得CPU时间，因此可能某线程刚调用yield方法又马上被执行。
https://www.jianshu.com/p/ff8f2e5906fd
suspend()和resume()必须要成对出现，否则非常容易发生死锁。
因为suspend方法并不会释放锁，如果使用suspend的目标线程对一个重要的系统资源持有锁，那么没任何线程可以使用这个资源直到要suspend的目标线程被resumed，如果一个线程在resume目标线程之前尝试持有这个重要的系统资源锁再去resume目标线程，这两条线程就相互死锁了，也就冻结线程。
http://blog.csdn.net/woaigaolaoshi/article/details/51298759

#### synchronized和lock

在JDK1.5中，synchronized是性能低效的。 到了JDK1.6，发生了变化，对synchronize加入了很多优化措施，有自适应自旋，锁消除，锁粗化，轻量级锁，偏向锁等等。导致在JDK1.6上synchronize的性能并不比Lock差。官方也表示，他们也更支持synchronize。
好多android原生里面用的都是synchronize，比如handler里面
synchronized
1.对于同步方法，锁是当前实例对象。
2.对于静态同步方法，锁是当前对象的Class对象。
3.对于同步方法块，锁是Synchonized括号里配置的对象。

#### 死锁

如何避免：避免嵌套封锁、只对有请求的进行封锁（针对最需要的地方进行锁）、避免无限期的等待
suspend()和resume()必须要成对出现，否则非常容易发生死锁。

#### android 多线程

Activity.runOnUiThread(Runnable)
View.post(Runnable),View.postDelay(Runnable,long)：`https://www.jianshu.com/p/b1d5e31e2011`调用View.post()既方便又可以保证指定的任务在视图操作中顺序执行。
Handler
AsyncTask

#### 使用线程池的原因

1.无线创建线程的不足
在生产环境中，为每一个任务都分配一个线程这种方法存在一些缺陷：
a.线程生命周期的开销：线程的创建与销毁都会消耗大量资源，频繁创建与销毁线程会带来很大的资源开销
b.资源消耗：活跃的线程会消耗系统资源。如果可运行的线程数量大于可用的处理器数量，闲置的线程会占用许多内存，并且频繁的线程上下文切换也会带来很大的性能开销
c.稳定性：操作系统在可创建的线程数量上有一个限制。在高负载情况下，应用程序很有可能突破这个限制，资源耗尽后很可能抛出OutOfMemoryError异常
`注`一般而言，对于线程数为最小值的线程池，一个新线程一旦创建出来，至少应该保留几分钟，以处理任何负载飙升。空闲时间应该以分钟计，而且至少在10分钟到30分钟之间，这样可以防止频繁创建线程。
2.提高响应速度
任务到达时，不再需要创建线程就可以立即执行
3.线程池提供了管理线程的功能
比如，可以统计任务的完成情况，统计活跃线程与闲置线程的数量等

#### threadlocal

可以总结为一句话：ThreadLocal的作用是提供线程内的局部变量，这种变量在线程的生命周期内起作用，减少同一个线程内多个函数或者组件之间一些公共变量的传递的复杂度。
三个方法：get，set，init
参考：https://www.jianshu.com/p/f4ed71560771

#### Java 自动装箱拆箱

目的是将原始类型值转自动地转换成对应的对象,Java1.5下进行过编程的话，你一定不会陌生这一点，你不能直接地向集合(Collections)中放入原始类型值，因为集合只接收对象。
自动装箱就是Java自动将原始类型值转换成对应的对象，比如将int的变量转换成Integer对象，这个过程叫做装箱，反之将Integer对象转换成int类型值，这个过程叫做拆箱
自动装箱时编译器调用valueOf将原始类型值转换成对象，同时自动拆箱时，编译器通过调用类似intValue(),doubleValue()这类的方法将对象转换成原始类型值。
自动装箱有一个问题，那就是在一个循环中进行自动装箱操作的情况，如下面的例子就会创建多余的对象，影响程序的性能。如下列例子会创建4000多个对象

Integer sum = 0; for(int i=1000; i<5000; i++){   sum+=i; }

因为自动装箱会隐式地创建对象，像前面提到的那样，如果在一个循环体中，会创建无用的中间对象，这样会增加GC压力，拉低程序的性能。所以在写循环时一定要注意代码，避免引入不必要的自动装箱操作。

#### Java 按值传递按引用传递

指的是在方法调用时，传递的参数是按值的拷贝传递。

public class TempTest { private void test1(int a){ a = 5; System.out.println("test1方法中的a==="+a); } public static void main(String[] args) { TempTest t = new TempTest(); int a = 3; t.test1(a);//传递后，test1方法对变量值的改变不影响这里的a System.out.println(”main方法中的a===”+a); } } 运行结果是： test1方法中的a===5 main方法中的a===3

Java里面只有基本类型和按照下面这种定义方式的String是按值传递，其它的都是按引用传递。就是直接使用双引号定义字符串方式：String str = “J

#### Java中的字符串常量池

String str1 = "droid";

JVM检测这个字面量，这里我们认为没有内容为droid的对象存在。JVM通过字符串常量池查找不到内容为droid的字符串对象存在，那么会创建这个字符串对象，然后将刚创建的对象的引用放入到字符串常量池中,并且将引用返回给变量str1。

String str3 = new String("droid");

当我们使用了new来构造字符串对象的时候，不管字符串常量池中有没有相同内容的对象的引用，新的字符串对象都会创建。

#### https 原理

加密、解密、密钥、加密算法（非对称加密和hash算法）、证书
1、 客户端发起一个https的请求，把自身支持的一系列Cipher Suite（密钥算法套件，简称Cipher）发送给服务端
2、服务端，接收到客户端所有的Cipher后与自身支持的对比，如果不支持则连接断开，反之则会从中选出一种加密算法和HASH算法，以证书的形式返回给客户端 证书中还包含了 公钥 颁证机构 网址 失效日期等等
3、客户端收到了服务器发来的数据包后，会做这么几件事情：
 1）验证一下证书是否合法。一般来说，证书是用来标示一个站点是否合法的标志。如果说该证书由权威的第三方颁发和签名的，则说明证书合法。
 2）如果证书合法，或者客户端接受和信任了不合法的证书，则客户端就会随机产生一串序列号，使用服务器发来的公钥进行加密。
 3） 用最开始约定好的HASH方式，把握手消息取HASH值， 然后用 随机数加密 “握手消息+握手消息HASH值(签名)” 并一起发送给服务端
4、服务器接受到客户端发来的消息后，会做这么几件事情：
 1）使用私钥解密上面第2）中公钥加密的消息，得到客户端产生的随机序列号。
 2）使用该随机序列号，对该消息进行加密，验证的到的校验值是否与客户端发来的一致。如果一致则说明消息未被篡改，可以信任。
 3）最后，使用该随机序列号，加上之前第2步中选择的加密算法，加密一段握手消息，发还给客户端。同时HASH值也带上。（ 在这里之所以要取握手消息的HASH值，主要是把握手消息做一个签名，用于验证握手消息在传输过程中没有被篡改过。）
5、客户端收到服务器端的消息后，接着做这么几件事情：
 1）计算HASH值是否与发回的消息一致
 2）检查消息是否为握手消息
6、握手结束后，客户端和服务器端使用握手阶段产生的随机数以及挑选出来的算法进行对称加解密的传输。
**客户端如何验证 证书的合法性？**

1. 验证证书是否在有效期内。
   在服务端面返回的证书中会包含证书的有效期，可以通过失效日期来验证 证书是否过期
2. 验证证书是否被吊销了。
   被吊销后的证书是无效的。验证吊销有CRL(证书吊销列表)和OCSP(在线证书检查)两种方法。
   证书被吊销后会被记录在CRL中，CA会定期发布CRL。应用程序可以依靠CRL来检查证书是否被吊销了。
   CRL有两个缺点，一是有可能会很大，下载很麻烦。针对这种情况有增量CRL这种方案。二是有滞后性，就算证书被吊销了，应用也只能等到发布最新的CRL后才能知道。
   增量CRL也能解决一部分问题，但没有彻底解决。OCSP是在线证书状态检查协议。应用按照标准发送一个请求，对某张证书进行查询，之后服务器返回证书状态。
   OCSP可以认为是即时的（实际实现中可能会有一定延迟），所以没有CRL的缺点。
3. 验证证书是否是上级CA签发的。
   windows中保留了所有受信任的根证书，浏览器可以查看信任的根证书，自然可以验证web服务器的证书，
   是不是由这些受信任根证书颁发的或者受信任根证书的二级证书机构颁发的（根证书机构可能会受权给底下的中级证书机构，然后由中级证书机构颁发中级证书）
   在验证证书的时候，浏览器会调用系统的证书管理器接口对证书路径中的所有证书一级一级的进行验证，只有路径中所有的证书都是受信的，整个验证的结果才是受信

#### http和https的区别

http是无状态的，实际上cancel一个请求就是说在逻辑上做一些处理，比如说不走onResponse回调
http：通常和tcp直接通信
通信使用明文(不加密), 内容可能会被窃听
不验证通信方的身份, 因此有可能遭遇伪装
无法证明报文的完整性, 所有有可能已遭篡改
https:先和ssl通信再由ssl和tcp通信
HTTP+加密+认证+完整性保护 = HTTPS

#### TCP

位码即tcp标志位，有6种标示：SYN(synchronous建立联机) ACK(acknowledgement 确认) PSH(push传送) FIN(finish结束) RST(reset重置) URG(urgent紧急)Sequence number(顺序号码) Acknowledge number(确认号码)
1、建立连接协议（三次握手）
（1）客户 端发送一个带SYN标志的TCP报文到服务器。这是三次握手过程中的报文1。
（2） 服务器端回应客户端的，这是三次握手中的第2个报文，这个报文同时带ACK标志和SYN标志。因此它表示对刚才客户端SYN报文的回应；同时又标志SYN给客户端，询问客户端是否准备好进行数据通 讯。
（3） 客户必须再次回应服务段一个ACK报文，这是报文段3。
2、连接终止协议（四次握手）
　 　由于TCP连 接是全双工的，因此每个方向都必须单独进行关闭。这原则是当一方完成它的数据发送任务后就能发送一个FIN来终止这个方向的连接。收到一个 FIN只意味着这一方向上没有数据流动，一个TCP连接在收到一个FIN后仍能发送数据。首先进行关闭的一方将执行主动关闭，而另一方执行被动关闭。
　（1） TCP客 户端发送一个FIN，用来关闭客户到服务器的数据传送（报文段4）。
　（2） 服务器收到这个FIN，它发回一个ACK，确认序号为收到的序号加1（报文段5）。和SYN一样，一个FIN将占用一个序号。
　（3） 服务器关闭客户端的连接，发送一个FIN给客户端（报文段6）。
　（4） 客户段发回ACK报文确认，并将确认序号设置为收到序号加1（报文段7）。

TCP建立连接的三次握手过程，以及关闭连接的四次握手过程

#### 设计模式在安卓中的使用

**1.单例模式**
Android中最常见的单例是Application类，它全局只有一个。不过Application的构造函数并非是私有的，也就是说我们可以new一个新的Application对象，因此Application这个类并不符合单例的规范。但是，即使我们重新new出来一个Application，它并没有绑定相关的上下文，也会是无效的，也就保证了全局只有一个有效的Application对象。
**2.观察者模式**
观察者模式在Android中无处不在，Android中的各种Listener，单击、双击、触摸事件的监听处理，都是观察者模式。另外ContentObserver、DataSetObserver这些用于数据变化观察的类也属于观察者模式。
**3.适配器模式**
通过ListView或GridView的Adapter，不同的数据源都可以向同一个ListView或GridView提供数据，Adapter起到的就是适配的功能。
**4.代理模式**
Android大量使用了代理模式来向用户层提供系统服务。由于系统服务是运行在单独的远程进程中，Android系统通过Binder为远程服务提供了代理对象，应用可以通过代理对象来间接的访问系统服务。比如ActivityManagerService的主要作用是进行Activity的管理，用户无法直接访问ActivityManagerService，系统为我们提供了一个代理对象ActivityManager，通过它就可以获得ActivityManagerService提供的相关功能。
**5.工厂方法模式**
工厂方法模式在Android中比较明显的使用就是BitmapFactory，通过各种decodeXXX()方法就可以用不同方式获得Bitmap对象。

#### 多进程：优缺点，多进程时其他进程能否回收

进程：是一个具有独立功能的程序关于某个数据集合的一次运行活动。进程是系统进行资源分配和调度的一个独立单位。
线程：线程比进程更小，基本上不拥有系统资源，故对它的调度所用资源小，能更高效的提高系统内多个程序间并发执行的程度。线程是进程的一个实体,是CPU调度和分派的基本单位,它是比进程更小的能独立运行的基本单位.

<service    android:name="com.qihoo.security.services.ScanEngineService"    android:process=":engine"/>

设置android:process属性，要注意：如果是android:process=”:deamon”，以:开头的名字，表示这是一个应用程序的私有进程，否则它是一个全局进程。私有进程的进程名称是会在冒号前自动加上包名，而全局进程则不会。一般我们都是有私有进程，很少使用全局进程。
**进程间的内存空间是不可见的。开启多进程后，会引发以下问题：**
1）Application的多次重建。
2）静态成员的失效。
3）文件共享问题。(多进程情况下会出现两个进程在同一时刻访问同一个数据库文件的情况。解决办法就是多进程的时候不并发访问同一个文件，比如子进程涉及到操作数据库，就可以考虑调用主进程进行数据库的操作。)
4）断点调试问题。

#### 加密算法

非对称加密算法：RSA, DSA/DSS
对称加密算法： AES, 3DES
HASH算法：MD5, SHA1, SHA256

#### 两个程序间如何共享数据

1.aidl
2.可以安排两个应用共享同一 Linux 用户 ID，在这种情况下，它们能够相互访问彼此的文件(比如data目录、组件信息等)。为了节省系统资源，可以安排具有相同用户 ID 的应用在同一 Linux 进程中运行，并共享同一 VM，而这时两个应用还要必须使用相同的证书签署。

#### 泛型中 extends 和 super 的区别？

上界通配符：Plate<？ extends Fruit> = new Plate(new Apple());
下界通配符：Plate<？ super Fruit> = new Plate(new Food());
频繁往外读取内容的，适合用上界Extends。经常往里插入的，适合用下界Super。

#### HashMap的实现原理

数组和链表
https://www.cnblogs.com/chengxiao/p/6059914.html
HashMap几乎可以等价于Hashtable，除了HashMap是非synchronized的，并可以接受null(HashMap可以接受为null的键值(key)和值(value)，而Hashtable则不行)。
哈希表：相比上述几种数据结构，在哈希表中进行添加，删除，查找等操作，性能十分之高，不考虑哈希冲突的情况下，仅需一次定位即可完成，时间复杂度为O(1)，接下来我们就来看看哈希表是如何实现达到惊艳的常数阶O(1)的。
　　我们知道，数据结构的物理存储结构只有两种：顺序存储结构和链式存储结构（像栈，队列，树，图等是从逻辑结构去抽象的，映射到内存中，也这两种物理组织形式），而在上面我们提到过，在数组中根据下标查找某个元素，一次定位就可以达到，哈希表利用了这种特性，哈希表的主干就是数组。
比如我们要新增或查找某个元素，我们通过把当前元素的关键字 通过某个函数映射到数组中的某个位置，通过数组下标一次定位就可完成操作。

#### Parcelable比Serializable：

Parcelable比Serializable性能高，所以应用内传递数据推荐使用Parcelable,但是Parcelable不能使用在要将数据存储在磁盘上的情况，因为Parcelable不能很好的保证数据的持续性在外界有变化的情况下。尽管Serializable效率低点，但此时还是建议使用Serializable
Parcel类是一种最快的序列化/反序列化机制，专为Android中的进程间通信而设计。该类提供了一些方法来将成员容纳到容器中，以及从容器展开成员。
现在我们知道了如何传递自定义的对象，那么在两个Activity之前传递对象还要注意什么呢？
一定要要注意对象的大小，Intent中的Bundle是在使用Binder机制进行数据传递的，能使用的Binder的缓冲区是有大小限制的（有些手机是2M），而一个进程默认有16个binder线程，所以一个线程能占用的缓冲区就更小了（以前做过测试，大约一个线程可以占用128KB）。所以当你看到“The Binder transaction failed because it was too large.”这类TransactionTooLargeException异常时，你应该知道怎么解决了。因此，使用Intent在Activity之间传递List和Bitmap对象是有风险的。

#### 多态

多态的作用：消除类型之间的耦合关系。
多态存在的三个必要条件 一、要有继承； 二、要有重写； 三、父类引用指向子类对象。

#### classLoader

引导类加载器（bootstrap class loader）
　　—用来加载java 的核心库（String 、Integer、List。。。）在jre/lib/rt.jar路径下的内容，是用C代码来实现的，并不继承自java.lang.ClassLoader。
　　—加载扩展类和应用程序类加载器。并指定他们的父类加载器。
扩展类加载器（extensions class loader）
　　—用来加载java的扩展库（jre/ext/*.jar路径下的内容）java虚拟机的实现会自动提供一个扩展目录。该类加载器在此目录里面查找并加载java类。
应用程序类加载器（application class loader）
　　—它根据java应用的类路径（classpath路径），一般来说，java应用的类都是由它来完成加载的。
自定义类加载器
　　—开发人员可以通过继承java.lang.ClassLoader类的方式实现自己的类加载器，以满足一些特殊的需求。
Java 虚拟机不仅要看类的全名是否相同，还要看加载此类的类加载器是否一样。
双亲委派过程：当一个类加载器收到类加载任务时，立即将任务委派给它的父类加载器去执行，直至委派给最顶层的启动类加载器为止。如果父类加载器无法加载委派给它的类时，将类加载任务退回给它的下一级加载器去执行;除了启动类加载器以外，每个类加载器拥有一个父类加载器，用户的自定义类加载器的父类加载器是AppClassLoader；双亲委派模型可以保证全限名指定的类，只被加载一次；双亲委派模型不具有强制性约束，是Java设计者推荐的类加载器实现方式；
https://segmentfault.com/a/1190000008995781

#### 事件传递

所有的Touch事件都封装到MotionEvent里面
事件处理包括三种情况，分别为：传递—-dispatchTouchEvent()函数、拦截——onInterceptTouchEvent()函数、消费—-onTouchEvent()函数和OnTouchListener
事件类型分为ACTION_DOWN, ACTION_UP, ACTION_MOVE, ACTION_POINTER_DOWN, ACTION_POINTER_UP, ACTION_CANCEL等，每个事件都是以ACTION_DOWN开始ACTION_UP结束
Android事件传递流程：ong
事件都是从Activity.dispatchTouchEvent()开始传递
事件由父View传递给子View，ViewGroup可以通过onInterceptTouchEvent()方法对事件拦截，停止其向子view传递
如果事件从上往下传递过程中一直没有被停止，且最底层子View没有消费事件，事件会反向往上传递，这时父View(ViewGroup)可以进行消费，如果还是没有被消费的话，最后会到Activity的onTouchEvent()函数。
如果View没有对ACTION_DOWN进行消费，之后的其他事件不会传递过来，也就是说ACTION_DOWN必须返回true，之后的事件才会传递进来
OnTouchListener优先于onTouchEvent()对事件进行消费

#### Java并发编程-阻塞队列(BlockingQueue)的实现原理

http://blog.csdn.net/chenchaofuck1/article/details/51660119
LinkedBlockingQueue的一个方法，通过Lock实现阻塞

/**    * @throws NullPointerException {@inheritDoc}    */   public boolean offerLast(E e) {       if (e == null) throw new NullPointerException();       Node`<E>` node = new Node`<E>`(e);       final ReentrantLock lock = this.lock;       lock.lock();       try {           return linkLast(node);       } finally {           lock.unlock();       }   }

1.ArrayBlockingQueue：是一个基于数组结构的有界阻塞队列，此队列按 FIFO（先进先出）原则对元素进行排序。
2.LinkedBlockingQueue：一个基于链表结构的阻塞队列，此队列按FIFO （先进先出） 排序元素，吞吐量通常要高于ArrayBlockingQueue。静态工厂方法Executors.newFixedThreadPool()使用了这个队列。
3.SynchronousQueue：一个不存储元素的阻塞队列。每个插入操作必须等到另一个线程调用移除操作，否则插入操作一直处于阻塞状态，吞吐量通常要高于LinkedBlockingQueue，静态工厂方法Executors.newCachedThreadPool使用了这个队列。
4.PriorityBlockingQueue：一个具有优先级的无限阻塞队列。

#### postInvalidate() 和 invalidate()

利用invalidate()刷新界面
实例化一个Handler对象，并重写handleMessage方法调用invalidate()实现界面刷新;而在线程中通过sendMessage发送界面更新消息。
使用postInvalidate()刷新界面
使用postInvalidate则比较简单，不需要handler，直接在线程中调用postInvalidate即可。

#### Service

1.手动调用startService()启动服务，自动调用内部方法：onCreate()、onStartCommand()，如果一个Service被startService()多次启动，那么onCreate()也只会调用一次。
2.手动调用stopService()关闭服务，自动调用内部方法：onDestory()，如果一个Service被启动且被绑定，如果在没有解绑的前提下使用stopService()关闭服务是无法停止服务的。
3.手动调用bindService()后，自动调用内部方法：onCreate()、onBind()。
4.手动调用unbindService()后，自动调用内部方法：onUnbind()、onDestory()。
5.startService()和stopService()只能开启和关闭Service，无法操作Service，调用者退出后Service仍然存在；bindService()和unbindService()可以操作Service，调用者退出后，Service随着调用者销毁。

#### Receiver

两种注册类型的区别是：
a.第一种是常驻型广播，也就是说当应用程序关闭后，如果有信息广播来，程序也会被系统调用自动运行。
b.第二种不是常驻广播，也就是说广播跟随程序的生命周期。
因广播数据在本应用范围内传播，不用担心隐私数据泄露的问题。 不用担心别的应用伪造广播，造成安全隐患。 相比在系统内发送全局广播，它更高效。

#### Android数字签名

数字证书都是有有效期的，Android只是在应用程序安装的时候才会检查证书的有效期。如果程序已经安装在系统中，即使证书过期也不会影响程序的正常功能。

#### 广播接受者的生命周期

广播接收者的生命周期非常短。当执行onRecieve方法之后，广播就会销毁
在广播接受者不能进行耗时较长的操作
在广播接收者不要创建子线程。广播接收者完成操作后，所在进程会变成空进程，很容易被系统回收

#### Activity Window View三者的差别

Activity像一个工匠（控制单元），Window像窗户（承载模型），View像窗花（显示视图） LayoutInflater像剪刀，Xml配置像窗花图纸。

#### 网络通信流程

正常的通信流程是：http请求——dns解析——获取到ip——socket通信

#### 数据结构：二叉树：深度遍历 广度遍历 求高度

二叉树：对一棵相对平衡的有序二叉树，对其进行插入，查找，删除等操作，平均复杂度均为O(logn)。

[图片上传失败…(image-ad0cd2-1536496112163)]

#### 台阶问题 两个栈实现队列 一个数组，求数组元素连续求和最大值

台阶问题：
当n>2时，第一次跳的时候就有两种选择：一是第一次只跳1级，此时跳法数目等于后面剩下的n-1级台阶的跳法数目，即f（n-1）；另外一种就是第一次跳两级，此时跳法数目等于后面剩下的n-2级台阶的跳法数目，即为f（n-2）。因此n级台阶时的不同跳法的总数f（n）= f（n-1） + f（n-2）

public long JumpFloor(long target) {         if(target==1)             return 1;         if(target==2)             return 2;         long a = 2;         long b = 1;         long sum = 0;         for(long i=3;i<=target;i++){             sum = a + b;             b = a;             a = sum;         }         return sum;     }

#### Retroit

Retrofit:
Actually, it has one simple reason: we want to use the same objects (OkHttpClient, Retrofit, …) throughout the app to just open one socket connection that handles all the request and responses including caching and many more. It’s common practice to just use one OkHttpClient instance to reuse open socket connections. That means, we either need to inject the OkHttpClient to this class via dependency injection or use a static field. As you can see, we chose to use the static field. And because we use the OkHttpClient throughout this class, we need to make all fields and methods static.

#### 插件化方案

插件可以提供一种动态扩展能力，使得应用程序在运行时加载原本不属于该应用的功能，并且做到动态更新和替换。
1.让用户不用重新安装 APK 就能升级应用功能，减少发版本频率，增加用户体验。
2.提供一种快速修复线上 BUG 和更新的能力。
3.按需加载不同的模块，实现灵活的功能配置，减少服务器对旧版本接口兼容压力。
4.模块化、解耦合、并行开发、 65535 问题。

#### 热修复

有没有办法以补丁的方式动态修复紧急Bug，不再需要重新发布App，不再需要用户重新下载，覆盖安装？
于是涌现出来很多热补丁方案。

#### binder原理

onTransAct，asInterface，stub，return binder stub
在Android系统用到最多的通信机制就是Binder，binder主要由Client,Sevice.ServiceManager和Binder 驱动程序组成。其中Client,Service和ServiceManager运行在用户空间，而Binder驱动程序运行在内核空间。
在init进程启动之后，servcieManager的进程启动远比zygote要早（啰嗦一下，在Anroid系统中所有的应用程序以及系统
服务进程SystemService都是由于zygote进程孕育出来的）因为在启动zygote进程时需要用到serviceManager进程服务，
ServiceManager是一个守护进程，它维护着系统服务和客户端的binder通讯。

#### recyclerview 缓存原理

#### java回调

https://www.cnblogs.com/snowbook/p/5802804.html

#### 说说 LruCache 底层原理

LruCache 使用一个 LinkedHashMap 简单的实现内存的缓存，没有软引用，都是强引用。
如果添加的数据大于设置的最大值，就删除最先缓存的数据来调整内存。maxSize 是通过构造方法初始化的值，他表示这个缓存能缓存的最大值是多少。
size 在添加和移除缓存都被更新值， 他通过 safeSizeOf 这个方法更新值。 safeSizeOf 默认返回 1，但一般我们会根据 maxSize 重写这个方法，比如认为 maxSize 代表是 KB 的话，那么就以 KB 为单位返回该项所占的内存大小。
除异常外，首先会判断 size 是否超过 maxSize，如果超过了就取出最先插入的缓存，如果不为空就删掉，并把 size 减去该项所占的大小。这个操作将一直循环下去，直到 size 比 maxSize 小或者缓存为空。
一般来说最大值的1/8左右就可以了。

#### 从网络加载一个10M的图片，说下注意事项

图片缓存、异常恢复、质量压缩

#### retrofit中 怎么对 okhttp包装，代理模式的使用，注解的使用

#### 列举java的集合和继承关系

[图片上传失败…(image-b1bae0-1536496112163)]

#### 注解

其实同 classs 和 interface 一样，注解也属于一种类型。
注解的定义：

public @interface TestAnnotation { }

元注解：
元注解是可以注解到注解上的注解，或者说元注解是一种基本注解，但是它能够应用到其它的注解上面。
元标签有 @Retention、@Documented、@Target、@Inherited、@Repeatable 5 种。
http://blog.csdn.net/briblue/article/details/73824058
注解与反射。
注解通过反射获取。首先可以通过 Class 对象的 isAnnotationPresent() 方法判断它是否应用了某个注解

public boolean isAnnotationPresent(Class<? extends Annotation> annotationClass) {}

然后通过 getAnnotation() 方法来获取 Annotation 对象。

public `<A extends Annotation>` A getAnnotation(Class`<A>` annotationClass) {}

或者是 getAnnotations() 方法。

public Annotation[] getAnnotations() {}

前一种方法返回指定类型的注解，后一种方法返回注解到这个元素上的所有注解。
用法demo:(Retrofit中header注解)

/** Make a HEAD request. */ @Documented @Target(METHOD) @Retention(RUNTIME) public @interface HEAD {  /**   * A relative or absolute path, or full URL of the endpoint. This value is optional if the first   * parameter of the method is annotated with {@link Url @Url}.   * `<p>`   * See {@linkplain retrofit2.Retrofit.Builder#baseUrl(HttpUrl) base URL} for details of how   * this is resolved against a base URL to create the full endpoint URL.   */  String value() default ""; }

#### 动态代理

http://blog.csdn.net/scplove/article/details/52451899
个人观点：代理一个类的所有自责，并可以进行拓展（通过代理层这一中间层，有效的控制对于真实委托类对象的直接访问，同时可以实现自定义的控制策略，设计上获得更大的灵活性。）
其目的就是为其他对象提供一个代理以控制对某个真实对象的访问。代理类负责为委托类预处理消息，过滤消息并转发消息，以及进行消息被委托类执行后的后续处理。

demo:

public `<T>` T create(final Class`<T>` service) {    Utils.validateServiceInterface(service);    if (validateEagerly) {      eagerlyValidateMethods(service);    }    return (T) Proxy.newProxyInstance(service.getClassLoader(), new Class<?>[] { service },        new InvocationHandler() {          private final Platform platform = Platform.get();          @Override public Object invoke(Object proxy, Method method, @Nullable Object[] args)              throws Throwable {            // If the method is a method from Object then defer to normal invocation.            if (method.getDeclaringClass() == Object.class) {              return method.invoke(this, args);            }            if (platform.isDefaultMethod(method)) {              return platform.invokeDefaultMethod(method, service, proxy, args);            }            ServiceMethod<Object, Object> serviceMethod =                (ServiceMethod<Object, Object>) loadServiceMethod(method);            OkHttpCall`<Object>` okHttpCall = new OkHttpCall<>(serviceMethod, args);            return serviceMethod.callAdapter.adapt(okHttpCall);          }        });  }

#### ANR

ANR的全称application not responding 应用程序未响应。文件目录/data/anr/
在android中Activity的最长执行时间是5秒。
BroadcastReceiver的最长执行时间则是10秒。
Service的最长执行时间则是20秒。

#### 常用的排序

冒泡：

public static void bubbleSort(int[] array) {        int temp = 0;        for (int i = 0; i < array.length - 1; i++) {            for (int j = 0; j < array.length - 1 - i; j++) {                if (array[j] > array[j + 1]) {                    temp = array[j + 1];                    array[j + 1] = array[j];                    array[j] = temp;                }            }        }    }

选择排序：

public static void selectSort(int[] array) {        int temp = 0;        for (int i = 0; i < array.length; i++) {            for (int j = array.length - 1; j > i; j--) {                if (array[i] > array[j]) {                    temp = array[i];                    array[i] = array[j];                    array[j] = temp;                }            }        }    }

二分查找：

public static int binarySearch(int[] array, int searchKey){        int begin = 0;        int end = array.length - 1;        while (begin <= end){            int middle = (begin + end) / 2;            if (searchKey == array[middle]){                return middle;            }else if(searchKey <= array[middle]){                begin = middle + 1;            }else {                end = middle -1;            }        }        return -1;    }

#### java JVM基本机构 内存分配 垃圾回收

https://www.cnblogs.com/LeonJ-Java/p/6497782.html
经过javac编译器的编译,我们需要将.java后缀的源码编译为.class后缀的字节码,JVM作用就是将这些字节码通过类加载器加载到内存当中,从而实现我们的业务逻辑需求.
**JVM的内存区域分为5大块：**
**1.虚拟机栈(Stack)** :一般俗称栈区,是线程私有的.栈区一般与线程紧密相联,一旦有新的线程被创建,JVM就会为该线程分配一个对应的java栈区,在这个栈区中会有许多栈帧,每运行一个方法就创建一个栈帧,用于存储局部变量,方法返回值等.栈帧中存储的局部变量随着线程的结束而结束,其生命周期取决于线程的生命周期,所以讲java栈中的变量都是线程私有的.
**2.堆(Heap)** :真正存储对象的区域,当进行Object obj = new Object()这样一个操作时,真正的obj对象实例就会在heap中.
**3.方法区(Method Area)** :包含常量池,静态变量等,有人说常量池也属于heap的一部分,但是严格上讲方法区只是堆的逻辑部分,方法区还有个别名叫做非堆(non-heap),所以方法区和堆还是有不同的.
**4.程序计数器(Program Couter Register)** :用于保存当前线程的执行的内存地址.因为JVM是支持多线程的,多线程同时执行的时候可能会轮流切换,为了保证线程切换回来后还能恢复到原先状态,就需要一个独立的计数器,记录之前中断的位置,由此可以看出程序计数器也是线程私有的.
**5.本地方法栈(Native Method Stack)** :性质与虚拟机栈类似,是为了方便JVM去调用本地方法接口的栈区,此处开发者很少去关存储机制：
http://www.yanwushu.com/post/38.html
https://www.cnblogs.com/zyj-bozhou/p/6723863.html
注,我也是了解有限,因此不深入探究其作用.
每个方法都会建立自己的内存栈，在这个方法定义的变量将会放到这块栈内存里，随着方法的结束，这个方法的内存栈也将自动销毁。（不需要GC回收）

当我们在程序中创建一个对象时，这个对象会被保存到运行时数据区中，以便反复利用（复用，因为创建对象的成本通常较大），这个运行时数据区就是堆内存。堆内存中的对象不会随着方法的结束而销毁，即使方法结束后，这个对象还可能被另外一个引用变量所引用（在方法的参数传递时很常见），则这个对象依然不会被销毁。只有当一个对象没有任何引用变量去引用它时，系统的垃圾回收器（GC）才会在合适的时候回收它。

**方法区:**

1.又叫静态区，跟堆一样，被所有的线程共享。方法区包含所有的class文件和static变量，方法。 虚拟机必须为每个被装载的类型维护一个常量池。常量池就是该类型所用到常量的一个有序集和，包括直接常量（string,integer和 floating point常量）和对其他类型，字段和方法的符号引用。

2.方法区中包含的都是在整个程序中永远唯一的元素，如class文件，static变量，方法。

Java虚拟机运行时的数据区，包括方法区、虚拟机栈、堆、程序计数器、本地方法栈。

无论是虚拟机栈,程序计数器以及本地方法栈均属于线程私有,其生命周期与线程的生命周期一致,当线程执行完毕,其所占用的内存空间也就随之释放,因此这三部分是不存在垃圾回收问题的.Java开发者平常所说的垃圾回收,主要针对的是堆区和方法区而言的。

JVM的内存分配一般是先一次性分配出一个较大的空间,内存申请一般分为静态内存和动态内存.静态内存比较容易理解,编译时就能确定的内存就是静态内存,即内存是固定的,系统可以直接进行分配,比如short,int类型的变量,其占用的内存大小是固定的.而动态内存分配是只有当程序运行时,才能知道所要分配的内存空间大小,在运行之前是不确定的,因此属于动态内存.
**垃圾回收：** （如果一个对象，没有一个引用指向它，那么它就被认为是一个垃圾。）
**年轻代(Young)** :
在年轻代中,又划分为伊甸园区(Eden),幸存0区(Survivor0)和幸存1区(Survivor1).所有对象最初被创建的时候都会在Eden区,当Eden区被填满时会进行Minor GC,如果还有对象存活,那么就会被JVM转移到幸存区0区或幸存1区.一般地,幸存0区和幸存1区中总有一个是空的,当其中一个区被填满时就会再进行Minor GC,就这样还能存活的对象就会在幸存0区和幸存1区之间来回切换.在幸存区经过很多次GC后依然还能存活的对象会被转移到年老代(一般需要设定一个存活阈值,可以通过参数 -XX:MaxTenuringThreshold 来设置),当超过这个临界值时,就将还依旧存活的对象转移到年老代当中.
**年老代(Old)** :
处于该代的java对象都是在年轻代久经考验而存活的对象,一般都是生命周期较长的对象.当年老代的空间被占满时,则不会进行Minor GC,而会触发Major GC/Full GC,回收整个堆内存.

public class Sample {    int s1 = 0;    Sample mSample1 = new Sample();    public void method() {        int s2 = 1;        Sample mSample2 = new Sample();    } } Sample mSample3 = new Sample();

Sample 类的局部变量 s2 和引用变量 mSample2 都是存在于栈中，但 mSample2 指向的对象是存在于堆上的。mSample3 指向的对象实体存放在堆上，包括这个对象的所有成员变量 s1 和 mSample1，而它自己存在于栈中。
**结论：**
局部变量的基本数据类型和引用存储于栈中，引用的对象实体存储于堆中。—— 因为它们属于方法中的变量，生命周期随方法而结束。
成员变量全部存储与堆中（包括基本数据类型，引用和引用的对象实体）—— 因为它们属于类，类对象终究是要被new出来使用的。
了解了 Java 的内存分配之后，我们再来看看 Java 是怎么管理内存的。
**Java内存分配中的栈**
　　在函数中定义的一些基本类型的变量数据和对象的引用变量都在函数的栈内存中分配。当在一段代码块定义一个变量时，Java就在栈中为这个变量分配内存空间，当该变量退出该作用域后，Java会自动释放掉为该变量所分配的内存空间，该内存空间可以立即被另作他用。
**Java内存分配中的堆**
　　堆内存用来存放由new创建的对象和数组。 在堆中分配的内存，由Java虚拟机的自动垃圾回收器来管理。

#### java方法区在对内存吗？

三种情况： java7之前，方法区位于永久代(PermGen)，永久代和堆相互隔离，永久代的大小在启动JVM时可以设置一个固定值，不可变； java7中，static变量从永久代移到堆中； java8中，取消永久代，方法存放于元空间(Metaspace)，元空间仍然与堆不相连，但与堆共享物理内存，逻辑上可认为在堆中

#### Android系统启动流程

* 1.启动电源以及系统启动
  当电源按下时引导芯片代码开始从预定义的地方（固化在ROM）开始执行。加载引导程序Bootloader到RAM，然后执行。
* 2.引导程序BootLoader
  引导程序BootLoader是在Android操作系统开始运行前的一个小程序，它的主要作用是把系统OS拉起来并运行。
* 3.Linux内核启动
  内核启动时，设置缓存、被保护存储器、计划列表、加载驱动。当内核完成系统设置，它首先在系统文件中寻找init.rc文件，并启动init进程。
* 4.init进程启动
  初始化和启动属性服务，并且启动Zygote进程。
* 5.Zygote进程启动
  创建JavaVM并为JavaVM注册JNI，创建服务端Socket，启动SystemServer进程。
* 6.SystemServer进程启动
  启动Binder线程池和SystemServiceManager，并且启动各种系统服务。
  7.Launcher启动
  被SystemServer进程启动的ActivityManagerService会启动Launcher，Launcher启动后会将已安装应用的快捷图标显示到界面上。
*
