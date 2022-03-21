import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

class Square extends React.Component {
  render() {
    return (
      <button  id={this.props.id} className={this.props.result} onKeyDown={(e)=>this.props.onKeyDown(e)}>
        {this.props.value}
      </button>
    );
  }
}

class Answer extends React.Component{
  render(){
    return (
      <button className="answer" onKeyDown={(a)=>this.props.onKeyDown(a)}>
        {this.props.value}
      </button>

    )
  }
}
class Clear extends React.Component{
  render(){
    return (
      <div className="clear" onClick={()=>this.props.onClick()}>
        清除并重来
      </div>
    )
  }
}
class Circle extends React.Component {
  constructor(color, radius, v, angle, x, y) {
    super();
    this.color = color;
    this.radius = radius;
    this.v = v;
    this.angle = angle;
    this.x = x;
    this.y = y;
    // 创建一个 ref 来存储 canvas 的 DOM 元素
    this.canvas = React.createRef();
  }

  componentDidMount() {
    //获取真实canvasDOM
    const canvas = this.canvas.current;
    //圆对象数组
    let arr = [];
    //圆数量
    const CNT = 50;
    //绘制区域中心点
    let centerX, centerY;
    //绘制上下文
    const ctx = canvas.getContext("2d");
    //设置canvas满屏
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    //设置中心点
    centerX = canvas.width / 2;
    centerY = canvas.height / 2;
    //实例化圆
    for (let i = 0; i < CNT; i++) {
      let c1 = new Circle(
        //随机颜色
        "rgba(" +
        255 * Math.random() +
        "," +
        255 * Math.random() +
        "," +
        255 * Math.random() +
        "," +
        Math.random() +
        ")",
        //随机半径
        66 * Math.random() + 1,
        //随机速度
        4 * Math.random() + 1,
        //随机角度
        360 * Math.random(),
        //x坐标
        centerX,
        //y坐标
        centerY
      );
      arr.push(c1);
    }

    function draw() {
      //清除画布
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (let i = 0; i < CNT; i++) {
        //移动x坐标
        arr[i].x += arr[i].v * Math.cos(arr[i].angle);
        //移动y坐标
        arr[i].y += arr[i].v * Math.sin(arr[i].angle);
        //反弹（angle在笛卡尔坐标系）
        if (arr[i].y < arr[i].radius) {
          //上
          arr[i].angle = 0 - arr[i].angle;
        }
        if (arr[i].y > canvas.height - arr[i].radius) {
          //下
          arr[i].angle = 0 - arr[i].angle;
        }
        if (arr[i].x < arr[i].radius) {
          //左
          arr[i].angle = Math.PI - arr[i].angle;
        }
        if (arr[i].x > canvas.width - arr[i].radius) {
          //右
          arr[i].angle = Math.PI - arr[i].angle;
        }
        //调用圆的绘制方法
        arr[i].draw(ctx);
      }
      //延迟50ms
      setTimeout(draw, 42);
    }
    //调用绘制
    draw();
  }

  /**
   * 绘制圆
   * @param  ctx 绘制上下文
   */
  draw(ctx) {
    //开始绘制路径
    ctx.beginPath();
    //绘制圆
    ctx.arc(this.x, this.y, this.radius, 0, 2 * Math.PI);
    //关闭绘制路径
    ctx.closePath();
    //设置fill颜色
    ctx.fillStyle = this.color;
    //fill
    ctx.fill();
  }

  render() {
    return <canvas ref={this.canvas} className="circle"></canvas>;
  }
}
export default Circle;
class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      answers: Array(4).fill(null),
      squares: Array(4).fill(null),
      letters: "",
      condition: Array(4).fill(0),
      results: Array(4).fill("little"),
    };
  }
  handleKeyDown1=(i,e)=>{
    const squares=this.state.squares.slice();
    const answers=this.state.answers.slice();
    var letters=this.state.letters.slice();
    const condition=this.state.condition.slice();
    const results_sample=this.state.results.slice();
    var results=this.state.results.slice();
    if (answers[i]!=squares[i]){
        squares[i]=String.fromCharCode(e.which);
        this.setState({squares:squares});
    }
    if(answers[i]===squares[i]&&condition[i]===0){
        condition[i]=1;
        letters+=answers[i]+' ';
        this.setState({letters:letters,condition:condition});
    }
    if(answers===squares){
        for(i=0;i<4;i++){
            results=results_sample.slice();
            results[i]="large";
            this.setState({results:results});
            setTimeout(5);
        }
        this.setState({results:results_sample});
    }
  }
  handleKeyDown2=(i,a)=>{
    const answers=this.state.answers.slice();
    answers[i]=String.fromCharCode(a.which);
    this.setState({answers:answers,letters:"",condition: Array(4).fill(0)});
  }
  handleClick=()=>{
    this.setState({answers: Array(4).fill(null),
      squares: Array(4).fill(null),
      letters: "",
      condition: Array(4).fill(0),
      });

  }
  renderSquare(i,k,result) {
    var _id;
    if(k===1){
        _id="true";
     }else{
        _id="false";
     }
    return <Square
     value={this.state.squares[i]}
     id={_id}
     result={result}
     onKeyDown={(e)=>this.handleKeyDown1(i,e)}
    />;
  }
  renderAnswer(i) {
    return <Answer
     value={this.state.answers[i]}
     onKeyDown={(a)=>this.handleKeyDown2(i,a)}
    />;
  }
  renderClear(){
    return <Clear
      onClick={()=>this.handleClick()}
    />;
  }
  renderCircle(){
    return <Circle/>;
  }
  render() {
    const status = 'This is a game named Wordle !';
    return (
      <div>
        <div id="azx">
            <img src={require(".//headimage.jpg")}/>
            <div>
            <p>来自工信2122 软件工程</p>
            <p>希望可以进入求是潮学习</p>
            </div>

        </div>
        <div className="status">{status}</div>
        <div className="you_decide">Please set your answer here</div>
        <div className="answer">
          {this.renderAnswer(0,0,"little")}
          {this.renderAnswer(1,0,"little")}
          {this.renderAnswer(2,0,"little")}
          {this.renderAnswer(3,0,"little")}
        </div>
        <div className="tips">The answers include {this.state.letters}</div>
        <div className="board">
          {this.renderSquare(0,this.state.condition[0],this.state.results[0])}
          {this.renderSquare(1,this.state.condition[1],this.state.results[1])}
          {this.renderSquare(2,this.state.condition[2],this.state.results[2])}
          {this.renderSquare(3,this.state.condition[3],this.state.results[3])}
        </div>
        {this.renderClear()}

        {this.renderCircle()}
      </div>

    );
  }
}


// ========================================


/////
ReactDOM.render(
  <Board/>,
  document.getElementById('root')
);
