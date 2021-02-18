# 充电第五单：JavaScript 深层前奏

## 预编译

### JS 引擎工作流程

1. 检查通篇的语法错误


```javascript
console.log(1);
console.log(2)； // 使用 中文 分号
console.log(3); 
```

当第二行代码出现语法错误时, 整个程序都没有执行，可见 JS 引擎在工作时，并没有一上来就解释一行执行一行而是在执行前先检查通篇代码，如果有语法错误，整篇代码都无法执行。

2. 预编译的过程

Js 引擎在检查语法错误后按照进行解释代码和执行代码。

**变量提升**

```javascript
var a = 10;
console.log(a); // 输出 10

console.log(b); // 输出 undefined
var b = 20;

console.log(c);	// 输出 undefined
var c;

console.log(d)  // d is not a defined
```

但在执行过程中发现先执行  `console.log(b)` 再执行 `var b = 20` 时，并未输出20，

- 与 c 未赋值时的输出一致
- 与 d 未声明时的输出不同

**变量的声明会提升到执行代码之上, 变量只有声明会提升，赋值不会提升**

所以充电第二弹中的 `var a = 1;` 是两个步骤，第一步声明变量，第二步赋值，进一步得到证明



<br>



**函数提升**

```javascript
test()
function test() {
    console.log(1);		// 输出 1
}
```

函数被调用没有错误证明函数声明被提升了，同时内容也被执行，可知

函数提升不仅仅是声明提升，而是声明的整体提升。



**理解提升机制**

```javascript
console.log(a)		// 输出 f a(a){var a = 1-; var a = function(){} }
function a(a) {
  var a = 10;
  var a = function() {
      
  }
}

var a = 1;
```

函数提升优先级会高于变量提升，在预编译阶段 JS 引擎会按顺序将函数提升至最顶部，其次是变量声明，最后是执行代码。

## 暗示全局变量

> imply global variable

变量在未声明就赋值时，默认就是全局变量，这就是一种暗示全局变量的体现

```javascript
a = 1;
console.log(a); // 输出 1

var b = 1;
console.log(b); // 输出 1
```

输出 a 时并没有报错，并且与 b 输出无异。

window 是一个全局域，全局变量的信息都存储在 window 对象上，当使用 var 关键字声明时或者直接赋值时都存在于 window对象上，在全局的概念中`a === window.a; b === window.b;`

**注意：未声明直接赋值时变量存储于 window 对象上**

```javascript
function test() {
  var a = 1;
  b = 2;
}	

test();
// console.log(a)		// a is not a defined
console.log(window.a);		// 输出 undefined
// 直接输出 a 会报错，但访问不存在的对象属性不会报错。
console.log(b, window.b);		// 输出 2 2
```

函数外部并不能访问到 a，而可以访问到 b，所以暗示全局变量在任何位置不声明就赋值都会添加到 window 上。



```javascript
function test() {
  var a = b = 1;
}

test();

console.log(b); 	// 输出 1
// console.log(a); 	// a is not a defined
```

执行过程

- 声明变量 a
- 将 1 赋值给变量 b
- 将 b 的值赋值给 a

整个执行过程 b 并没有被声明，所以 b 也是暗示全局变量





## 上下文机制

### AO: activation object 活跃对象， 执行机上下文

```javascript
function test(a) {
  console.log(a);
  var a = 1;
  console.log(a);
  function a() {}
  console.log(a);
  var b= function() {}
  console.log(b);
  function d() {}
}

test(2)

/**
* 1. 创建 AO 对象
* 	AO = {}
* 2. 寻找函数的形参和变量声明
* 	AO = {
*  	 a: undefined,
*    b: undefined
* 	}
* 3. 将实参的值赋值给形参
* 	AO = {
*  	 a: 2,
*    b: undefined
* 	}
* 4. 寻找函数声明，赋值函数体
* 	AO = {
*  	 a: function a () {},
*    b: undefined,
* 	 d: function d() {}
* 	}
* 5. 执行函数 test()  执行函数 test 时的变量声明和函数声明都不执行
*	5.1 console.log(a)  	// 输出 function a() {}  此时的 a 为第四步中的a，
*  	5.2 a = 1;
*	    此时 	AO = {
*				a: 1,
*				b: undefined,
*				d: function d() {}
*			}
*	5.3 console.log(a)		// 输出 1
*	5.4 console.log(a)  	// 输出 1
*	5.5 b = function() {}
*       此时 	AO = {
*				a: 1,
*				b: function() {},
*				d: function d() {}
*			}
*	5.6 console.log(b) 		// 输出匿名函数 function() {}
* 6. 执行完毕
*/
```

加深理解

```javascript
function test(a, b) {
  console.log(a)
  c = 0;
  var c;
  a = 5;
  b = 6;
  console.log(b);
  function b() {}
  function d() {}
  console.log(b);
}

test(1)
/**
*	AO = {					     1. 	创建 AO 对象
* 		a: undefined			 2. 	形参
*		  ——>  1		    	 3. 	实参赋值
*		  ——>  5				 5.3	代码执行 a = 5;
*		b: undefined			 2. 	形参
*		  ——>  function b() {}	  4. 	 函数声明
*		  ——>  6				 5.4    代码执行 b = 6;
*		c: undefined			 2. 	变量声明
*		  ——>   0 				 5.2	代码执行 c = 0
*		d: function d() { }		  4. 	 函数声明
* 	}
*	console.log(a)				 5.1	代码执行 console.log(a)   输出 1
*	console.log(b)				 5.5	代码执行 console.log(b)   输出 6
*	console.log(b)				 5.6	代码执行 console.log(b)   输出 6
*/


// 伪代码如下，从上到下的过程，只为加深理解使用
a
b
c	   				// 变量声明
a = 1 				// 实参赋值
function b() {} 	 // 函数声明  覆盖变量 b
function d() {} 	 // 函数声明
console.log(a)		 // 代码执行 输出 1
a = 5				// 代码执行
b = 6				// 代码执行
console.log(b)		 // 代码执行 输出 6
console.log(b)		 // 代码执行 输出 6
```

### **GO**: global object  全局上下文

GO 没有参数，所以省去参数部分

- 创建 GO 对象
- 查找变量
- 函数声明
- 执行代码

```javascript
var a = 1;
function a() {
  console.log(2)
}

console.log(a)

/**
*	GO = {						// 1. 创建 GO 对象
*  		a: undefined			 // 2. 变量声明
*		——>  function a() {console.log(2)}	// 3. 函数声明
* 	}
*		console.log(a)		// 4. 执行代码
*/

实际上  GO === window   GO 的过程就是 window 对象属性变化的过程
```

### GO 与 AO

AO对应的是函数执行阶段，当函数被调用执行时，会建立一个执行上下文

```javascript
// 报错 c is not a defined
console.log(c)
function test(data) {
    c = data;
    console.log(c)
}
test(1)
// 下述代码不会报错

function test(data) {
    c = data;
    console.log(c)
}
test(1)
console.log(c)
```



<br>



在全局 GO 中先提升变量，再提升函数，函数会覆盖前面提升的变量

在局部 AO 中，先提升变量再赋值实参，然后提升函数，函数覆盖前面提升的变量

```javascript
var b = 3;
console.log(a);
function a(a) {
    console.log(a);
    var a = 2;
    console.log(a);
    function a() { }
    var b = 5;
    console.log(b);
}

a(1);

/**
 *  GO = {                          //  1.  创建 GO 对象
 *      b : undefined               //  2.  变量提升
 *		  ——>   3                   //  4.  代码执行赋值
 *      a : function a() {大}       //  3.  函数提升
 *      console.log(a);             //  5.  输出   function a() {大}
 *      a(1)                        //  6.  调用函数 a
 * }
 *
 * 函数 a 的  AO = {                //  7.  创建 AO 对象
 *      a : undefined               //  8.  形参
 *        ——>  undefined            //  9.  变量声明
 *        ——>  1                    //  11. 实参赋值
 *        ——>  function a() {小}    //  12. 函数提升
 *        ——>  2                    //  14. 代码执行赋值    a = 2
 *      b : undefined               //  10. 变量声明
 *        ——>  5                    //  16. 代码执行赋值    b = 5
 *      console.log(a)              //  13. 代码执行 输出 function a() {小}
 *      console.log(a)              //  15. 代码执行 输出 2
 *      console.log(b);             //  17. 代码执行 输出 5
 *
 * }
 *
*/
```

**内部声明**

```javascript
a = 1;
function test() {
    console.log(a);
    a = 2;
    console.log(a);
    var a = 3;
    console.log(a);
}

test();

var a;

/**
 * GO = {
 *  a : undefined ——> 1
 *  test: function () {...}
 *  test()
 * }
 *
 * AO = {		   //  顺序
 *  a : undefined   //  1
 *     ——> 2        //  3
 *     ——> 3        //  5
 *  console.log(a)  //  2
 *  console.log(a)  //  4
 *  console.log(a)  //  6
 * }
 */
```

test 函数内的第一行 console 并不会输出外部的 a = 1, 因为在函数内部声明时，AO 已经存在 a，并且值为 undefined，当内部存在时，使用内部，内部不存在时再向上查找。

## 面试真题



