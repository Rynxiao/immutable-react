## React渲染问题研究以及Immutable的应用

### 写在前面

这里主要介绍自己在`React`开发中的一些总结，关于`react`的渲染问题的一点研究，加上之前已经介绍过`immutable`的API，可以参看这里[Immutable日常操作之深入API](http://www.rynxiao.com/%E6%8A%80%E6%9C%AF/2017/08/29/immutable-apis.html)，算是对其的一个补充。另外本文所有代码请参看`github`仓库：[HHAHAHAHA](1)

### 渲染房间列表

这个例子主要是写了同时渲染1000个房间，如果我添加一个房间或者修改一个房间，在`react`中不同的实现方式下`render`函数将会表现出什么样的结果？以及针对不同结果的一些思考和优化。大致的列表例子如下：生成1000个不同的房间盒子，颜色随机。

![rooms](./IRScreen/rooms.png)

项目整体目录结构大致是这样的：

![file-tree](./IRScreen/file-tree.png)

下面主要来看`ListDetail.js`中是如何写的：

- 父组件`List`
- 子组件`RoomDetail`,子组件的功能只是纯粹的渲染功能，自身并没有任何操作

子组件：

```javascript
// 子组件
class RoomDetail extends React.Component {

	constructor(props) {
		super(props);
	}

	render() {
		let room = this.props.room;
		
		return (
			<li 
          		className="list-item" 
          		style={{ backgroundColor: room.backgroundColor }}>
          		{ room.number }
          	</li>
		);
	}

}
```

父组件：

```javascript
// 父组件
export default class List extends React.Component {
	
  	// ...
  
	constructor(props) {
		super(props);
		this.addRoom = this.addRoom.bind(this);
		this.modifyRoom = this.modifyRoom.bind(this);
		this.state = {
			roomList: this.generateRooms(),
			newRoom: 0
		};
	}
  
  	// ...

	render() {
		return (
			<div>
                <h2 className="title">React的列表渲染问题</h2>
                <div><a className="back" href="#/">返回首页</a></div>
                <div className="btn-operator">
                	<button onClick={ this.addRoom }>Add A Room</button>
                	<button onClick={ this.modifyRoom }>Modify A Room</button>
                </div>
                <ul className="list-wrapper">
                	{
                		this.state.roomList.map((room, index) => {
                			return <RoomDetail key={ `roomDetail${index}` } room={ room } />
                		})
                	}
                </ul>
            </div>
		);
	}
}
```

下面我们来添加一个房间试试

```javascript
// 添加房间
addRoom() {
  	let newRoom = { number: `newRoom${++this.state.newRoom}`, backgroundColor: '#f00' };
  	let newList = this.state.roomList;
  	newList.push(newRoom);
  	this.setState({ roomList: newList });
}
```

这个操作主要是生成一个新的房间，然后从`state`中取出当前的房间列表，然后再当前的房间列表中添加一个新的房间，最后将整个列表从新设置到状态中。

很显然，此时由于父组件的状态发生了变化，会引起自身的`render`函数执行，同时列表开始重新遍历，然后将每一个房间信息**重新**传入到子组件中。是的，重新传入，就代表了子组件将会重新渲染。我们可以来做一个测试，在子组件的`render`方法中加入如下打印：

```javascript
render() {
	let room = this.props.room;
	console.log(`.No${room.number}`);
  
  	return (
    	// ...
  	);
}
```

不出意外的发现了所有的子组件渲染的证据：

![childrenAllRender](./IRScreen/childrenAllRender.png)

同时利用`chorme`的`Performance`检测的信息如下：

![chromeTotalBefore](./IRScreen/chromeTotalBefore.png)

调用的方法堆栈如下：

![chromeFunctionBefore](./IRScreen/chromeFunctionBefore.png)

渲染子组件的时间达到`764ms`，同时在堆栈中可以看到大量的`receiveComponent`和`updateChildren`方法的执行。那么有没有什么办法只渲染改变的部分呢？在[react官网](https://facebook.github.io/react/docs/optimizing-performance.html)性能监控这一小节中有提到一个方法，将子组件继承`React.PureComponent`可以局部有效防止渲染。加上之后的代码是这样的：

```javascript
class RoomDetail extends React.PureComponent {
	// ...
}
```

所有的东西都没有变化，只是将`Component`换成了`PureComponent`。下面我们再来测试一下：

![childrenOneRender](./IRScreen/childrenOneRender.png)

性能检测图如下：

![chromeTotalAfter](./IRScreen/chromeTotalAfter.png)

效果出奇的好，果然只是渲染了一次，并且速度提升了10几倍之多。

其中的原理是在组件的`shouldComponentUpdate`方法中进行了`props`与`state`的比较，如果认为他们相等，则会返回`false`，否则则会返回`true`。

```javascript
// react/lib/ReactComponentWithPureRenderMixin.js
var ReactComponentWithPureRenderMixin = {
  	shouldComponentUpdate: function (nextProps, nextState) {
    	return shallowCompare(this, nextProps, nextState);
  	}
};
```

同时官网也说了，这只是局部有效，为什么呢？因为这些值的比较都只是**浅比较**，也就是只是第一层的比较。那么会出现什么问题，我们来看下面的操作：

修改其中的一个房间：

```javascript
// 修改房间
modifyRoom() {
  	let newList2 = this.state.roomList;
  	newList2[0] = { number: 'HAHA111', backgroundColor: '#0f0' };
  	this.setState({ roomList: newList2 });
}
```

很意外，当我添加了一个房间之后，发现第一个房间并没有我们想象中的发生变化。为什么？

原因是我虽然修改了第一个房间的数据，当时我并没有修改他的引用地址。类似下面这样的：

```javascript
var arr = [{ a: 1 }, { b: 2 }];
var arr2 = arr1;
arr2[0] = { c: 1 };
arr === arr2; 	// true
```

因此在子组件中比较房间的时候，就会出现比较的值相等的情况，此时将会返回`false`

那么有没有办法改变这个问题，我找到了两个办法：

- 从数据源头入手
- 从子组件是否渲染条件入手

**从数据源头入手**，即为改造数据，将数据进行**深拷贝**，使得原先的引用与新得到的对象的引用不相同即可。关于深拷贝的实现方法有很多，我这里贴一个，之后再仔细做研究。

```javascript
// 这个函数可以深拷贝 对象和数组
var deepCopy = function(obj){
    var str, newobj = obj.constructor === Array ? [] : {};
    if(typeof obj !== 'object'){
        return;
    } else if(window.JSON){
        str = JSON.stringify(obj), //系列化对象
        newobj = JSON.parse(str); //还原
    } else {
        for(var i in obj){
            newobj[i] = typeof obj[i] === 'object' ? 
            cloneObj(obj[i]) : obj[i]; 
        }
    }
    return newobj;
};
```

在ES6中提供了一种解构方式，这种方式也可以实现数组的深层次拷贝。类似这样的

```javascript
let arr = [1, 2, 3, 4];
let arr1 = [...arr];
arr1 === arr; 	// false

// caution
let arr = [{ a: 1 }, { b: 2 }];
let arr1 = [...arr];
arr1 === arr; 			// false
arr1[0] = { c: 3 };
arr1[0] === arr[0];		// false
arr1[1] === arr[1]; 	// true
```

因此我把`modifyRoom`函数进行了如此改造：

```javascript
// 修改房间
modifyRoom() {
  	let newList2 = [...this.state.roomList];
  	newList2[0] = { number: 'HAHA111', backgroundColor: '#0f0' };
  	this.setState({ roomList: newList2 });
}
```

因此在比较第一个对象的时候，发现它们已经不相等了，则会重新渲染。

**从子组件是否渲染条件入手**，可以不需要使用`React.PureComponent`，而直接在`shouldComponentUpdate`方法入手。因为两次值改变之后，我清楚得可以知道，改变的值只是第一个对象中的数值改变。那么我可以这么写来判断：

```javascript
class RoomDetail extends React.Component {

	constructor(props) {
		super(props);
	}
  
  	shouldComponentUpdate(nextProps, nextState) {
		if (nextProps.room.number === this.props.room.number) {
			return false;
		} 
		return true;
	}

	render() {
		let room = this.props.room;
		
		return (
			<li 
          		className="list-item" 
          		style={{ backgroundColor: room.backgroundColor }}>
          		{ room.number }
          	</li>
		);
	}

}
```

同样得可以达到效果。但是如果在`shouldComponentUpdate`中存在着多个`props`和`state`中值改变的话，就会使得比较变得十分复杂。

### 应用Immutable.js来检测React中值的变化问题