import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { async } from '@angular/core/testing';
import { of } from 'rxjs';
import { Observable } from 'rxjs';
import { Node } from './models';

@Component({
  selector: 'app-binary-tree',
  templateUrl: './binary-tree.component.html',
  styleUrls: ['./binary-tree.component.css']
})
export class BinaryTreeComponent implements OnInit {

  public configStage: Observable<any> = of({
    width: 1000,
    height: 700,
  });
  public list: Array<any> = [];
  nodeList: Node[] = [];
  queryNodeList: Node[] = [];
  width: number = 40;
  dx: number = 30;
  dy: number = 40;
  timer: number = 0;
  qL: number;
  qR: number;
  selected = 'sumtree';
  update_index : number = 1;
  update_value : number = 0;
  inputArray: Node[] = [];
  running: boolean = false;
  paddingCalculate(x: number) {
    return (x - this.width).toString() + 'px';
  }
  ngOnInit() {
    this.createSumTree();
  }
  generate() {
    if (this.selected == 'maxtree') {
      this.createMaxTree();
    } else if (this.selected === 'mintree') {
      this.createMinTree();
    } else this.createSumTree();
  }
  createSumTree() {
    this.queryNodeList = [];
    this.nodeList = [];
    let temp: Node = {
      value: Math.floor(Math.random() * 100) % 10,
      center_x: 130,
      center_y: 550,
      left_padding: this.paddingCalculate(130 - 20),
      top_padding: this.paddingCalculate(550 - 20),
      background: 'blueviolet',
      height: this.width.toString() + 'px',
      width: this.width.toString() + 'px',
      visibility: true,
    };
    this.nodeList.push(temp);
    let gap: number = 50;
    for (let i: number = 1; i <= 30; i++) {
      let id: number = i - 1;
      let temp1: Node = this.nodeList[id];
      let temp2: Node = {
        value: Math.floor(Math.random() * 100) % 10,
        center_x: temp1.center_x + gap,
        center_y: temp1.center_y,
        left_padding: this.paddingCalculate(temp1.center_x + gap - 20),
        top_padding: this.paddingCalculate(temp1.center_y - 20),
        background: 'blueviolet',
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
      };
      this.nodeList.push(temp2);
    }
    this.nodeList.reverse();
    let p1 = 15,
      p2 = 30;
    while (p1 < p2) {
      let temp = this.nodeList[p1];
      this.nodeList[p1] = this.nodeList[p2];
      this.nodeList[p2] = temp;
      p1++;
      p2--;
    }

    // console.log(this.nodeList);
    for (let i: number = 14; i >= 0; i--) {
      let id: number = i * 2 + 1;
      let temp1: Node = this.nodeList[id];
      let temp3: Node = this.nodeList[id + 1];
      let cx = Math.floor((temp1.center_x + temp3.center_x) / 2);
      let cy = temp1.center_y - 90;
      let temp2: Node = {
        value: temp1.value + temp3.value,
        center_x: cx,
        center_y: cy,
        left_padding: this.paddingCalculate(cx - 20),
        top_padding: this.paddingCalculate(cy - 20),
        background: 'blueviolet',
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
      };
      this.list.push(
        of({
          sceneFunc: function (context: any) {
            context.beginPath();
            context.moveTo(cx - 40, cy - 80);
            context.lineTo(temp1.center_x - 40, temp1.center_y - 80);
            // context.quadraticCurveTo(150, 100, 260, 170);
            context.closePath();
            // special Konva.js method
            context.fillStrokeShape(this);
          },
          fill: '#00D2FF',
          stroke: 'red',
          strokeWidth: 2,
        })
      );
      this.list.push(
        of({
          sceneFunc: function (context: any) {
            context.beginPath();
            context.moveTo(cx - 40, cy - 80);
            context.lineTo(temp3.center_x - 40, temp3.center_y - 80);
            // context.quadraticCurveTo(150, 100, 260, 170);
            context.closePath();
            // special Konva.js method
            context.fillStrokeShape(this);
          },
          fill: '#00D2FF',
          stroke: 'red',
          strokeWidth: 2,
        })
      );

      this.nodeList[i] = temp2;
      
    }
    this.createInputArray();
  
  }
  createMinTree() {
    this.queryNodeList = [];
    this.nodeList = [];
    let temp: Node = {
      value: Math.floor(Math.random() * 100) % 100,
      center_x: 130,
      center_y: 550,
      left_padding: this.paddingCalculate(130 - 20),
      top_padding: this.paddingCalculate(550 - 20),
      background: 'blueviolet',
      height: this.width.toString() + 'px',
      width: this.width.toString() + 'px',
      visibility: true,
    };
    this.nodeList.push(temp);
    let gap: number = 50;
    for (let i: number = 1; i <= 30; i++) {
      let id: number = i - 1;
      let temp1: Node = this.nodeList[id];
      let temp2: Node = {
        value: Math.floor(Math.random() * 100) % 100,
        center_x: temp1.center_x + gap,
        center_y: temp1.center_y,
        left_padding: this.paddingCalculate(temp1.center_x + gap - 20),
        top_padding: this.paddingCalculate(temp1.center_y - 20),
        background: 'blueviolet',
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
      };
      this.nodeList.push(temp2);
    }
    this.nodeList.reverse();
    let p1 = 15,
      p2 = 30;
    while (p1 < p2) {
      let temp = this.nodeList[p1];
      this.nodeList[p1] = this.nodeList[p2];
      this.nodeList[p2] = temp;
      p1++;
      p2--;
    }

    // console.log(this.nodeList);
    for (let i: number = 14; i >= 0; i--) {
      let id: number = i * 2 + 1;
      let temp1: Node = this.nodeList[id];
      let temp3: Node = this.nodeList[id + 1];
      let cx = Math.floor((temp1.center_x + temp3.center_x) / 2);
      let cy = temp1.center_y - 90;
      let temp2: Node = {
        value: Math.min(temp1.value, temp3.value),
        center_x: cx,
        center_y: cy,
        left_padding: this.paddingCalculate(cx - 20),
        top_padding: this.paddingCalculate(cy - 20),
        background: 'blueviolet',
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
      };
      this.list.push(
        of({
          sceneFunc: function (context: any) {
            context.beginPath();
            context.moveTo(cx - 40, cy - 80);
            context.lineTo(temp1.center_x - 40, temp1.center_y - 80);
            // context.quadraticCurveTo(150, 100, 260, 170);
            context.closePath();
            // special Konva.js method
            context.fillStrokeShape(this);
          },
          fill: '#00D2FF',
          stroke: 'red',
          strokeWidth: 2,
        })
      );
      this.list.push(
        of({
          sceneFunc: function (context: any) {
            context.beginPath();
            context.moveTo(cx - 40, cy - 80);
            context.lineTo(temp3.center_x - 40, temp3.center_y - 80);
            // context.quadraticCurveTo(150, 100, 260, 170);
            context.closePath();
            // special Konva.js method
            context.fillStrokeShape(this);
          },
          fill: '#00D2FF',
          stroke: 'red',
          strokeWidth: 2,
        })
      );

      this.nodeList[i] = temp2;
    }
    this.createInputArray();
  }
  createMaxTree() {
    this.queryNodeList = [];
    this.nodeList = [];
    let temp: Node = {
      value: Math.floor(Math.random() * 100) % 100,
      center_x: 130,
      center_y: 550,
      left_padding: this.paddingCalculate(130 - 20),
      top_padding: this.paddingCalculate(550 - 20),
      background: 'blueviolet',
      height: this.width.toString() + 'px',
      width: this.width.toString() + 'px',
      visibility: true,
    };
    this.nodeList.push(temp);
    let gap: number = 50;
    for (let i: number = 1; i <= 30; i++) {
      let id: number = i - 1;
      let temp1: Node = this.nodeList[id];
      let temp2: Node = {
        value: Math.floor(Math.random() * 100) % 100,
        center_x: temp1.center_x + gap,
        center_y: temp1.center_y,
        left_padding: this.paddingCalculate(temp1.center_x + gap - 20),
        top_padding: this.paddingCalculate(temp1.center_y - 20),
        background: 'blueviolet',
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
      };
      this.nodeList.push(temp2);
    }
    this.nodeList.reverse();
    let p1 = 15,
      p2 = 30;
    while (p1 < p2) {
      let temp = this.nodeList[p1];
      this.nodeList[p1] = this.nodeList[p2];
      this.nodeList[p2] = temp;
      p1++;
      p2--;
    }
    // console.log(this.nodeList);
    for (let i: number = 14; i >= 0; i--) {
      let id: number = i * 2 + 1;
      let temp1: Node = this.nodeList[id];
      let temp3: Node = this.nodeList[id + 1];
      let cx = Math.floor((temp1.center_x + temp3.center_x) / 2);
      let cy = temp1.center_y - 90;
      let temp2: Node = {
        value: Math.max(temp1.value, temp3.value),
        center_x: cx,
        center_y: cy,
        left_padding: this.paddingCalculate(cx - 20),
        top_padding: this.paddingCalculate(cy - 20),
        background: 'blueviolet',
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
      };
      this.list.push(
        of({
          sceneFunc: function (context: any) {
            context.beginPath();
            context.moveTo(cx - 40, cy - 80);
            context.lineTo(temp1.center_x - 40, temp1.center_y - 80);
            // context.quadraticCurveTo(150, 100, 260, 170);
            context.closePath();
            // special Konva.js method
            context.fillStrokeShape(this);
          },
          fill: '#00D2FF',
          stroke: 'red',
          strokeWidth: 2,
        })
      );
      this.list.push(
        of({
          sceneFunc: function (context: any) {
            context.beginPath();
            context.moveTo(cx - 40, cy - 80);
            context.lineTo(temp3.center_x - 40, temp3.center_y - 80);
            // context.quadraticCurveTo(150, 100, 260, 170);
            context.closePath();
            // special Konva.js method
            context.fillStrokeShape(this);
          },
          fill: '#00D2FF',
          stroke: 'red',
          strokeWidth: 2,
        })
      );

      this.nodeList[i] = temp2;
    }
    this.createInputArray();
  }
  change_time(val) {
    this.timer = Math.abs(val.value);
  }
  start = async () => {
    this.queryNodeList = [];
    for(let i= 0; i<= 15; i++)
    {
      this.inputArray[i].background='blueviolet';
    }
    for (let i = 0; i <= 30; i++) this.nodeList[i].background = 'blueviolet';
    if (!this.qL || !this.qR) {
      alert('Input valid range');
      return 0;
    }
    if (this.qL < 1 || this.qL > 16) {
      alert('Input valid range');
      return 0;
    }
    if (this.qR < 1 || this.qR > 16) {
      alert('Input valid range');
      return 0;
    }
    if (this.qL > this.qR) {
      alert('Input valid range');
      return 0;
    }
    for(let i= this.qL-1; i<= this.qR-1; i++)
    {
      this.inputArray[i].background='#ff4081';
    }
    this.running = true;
    await this.query(0, 0, 15, this.qL - 1, this.qR - 1);
    this.running = false;
  };
  query = async (
    node: number,
    left: number,
    right: number,
    queryLeft: number,
    queryRight: number
  ) => {
    


    await new Promise((resolve) => setTimeout(resolve, this.timer));
    this.nodeList[node].background = '#20c997';
    console.log(
      node.toString() + ' ' + left.toString() + ' ' + right.toString()
    );
    if (left > queryRight) {
      let v: number;
      if (this.selected === 'maxtree') {
        v = -1;
      } else if (this.selected === 'mintree') {
        v = 99999;
      } else if (this.selected === 'sumtree') v = 0;
      let temp1: Node = {
        value: v,
        background: '#007bff',
        center_x: this.nodeList[node].center_x,
        center_y: this.nodeList[node].center_y,
        top_padding: (this.nodeList[node].center_y - 110).toString() + 'px',
        left_padding: this.nodeList[node].left_padding,
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
      };
      this.queryNodeList.push(temp1);
     
      await new Promise((resolve) => setTimeout(resolve, this.timer));
      this.nodeList[node].background = 'blueviolet';
      return v;
    }
    if (right < queryLeft) {
      let v: number;
      if (this.selected === 'maxtree') {
        v = -1;
      } else if (this.selected === 'mintree') {
        v = 99999;
      } else if (this.selected === 'sumtree') v = 0;
      let temp1: Node = {
        value: v,
        background: '#007bff',
        center_x: this.nodeList[node].center_x,
        center_y: this.nodeList[node].center_y,
        top_padding: (this.nodeList[node].center_y - 110).toString() + 'px',
        left_padding: this.nodeList[node].left_padding,
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
      };
      this.queryNodeList.push(temp1);
      await new Promise((resolve) => setTimeout(resolve, this.timer));
      this.nodeList[node].background = 'blueviolet';
      return v;
    }
    if (left >= queryLeft && right <= queryRight) {
      // console.log(node);
      //  console.log(node.toString() + '---> ' +  this.nodeList[node].value.toString());
      //this.nodeList[node].background='red';
      let temp1: Node = {
        value: this.nodeList[node].value,
        background: '#007bff',
        center_x: this.nodeList[node].center_x,
        center_y: this.nodeList[node].center_y,
        top_padding: (this.nodeList[node].center_y - 110).toString() + 'px',
        left_padding: this.nodeList[node].left_padding,
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
      };
      this.queryNodeList.push(temp1);
      await new Promise((resolve) => setTimeout(resolve, this.timer));
      this.nodeList[node].background = 'blueviolet';
      return this.nodeList[node].value;
    }
    let mid = Math.floor((left + right) / 2);
    let x = await this.query(node * 2 + 1, left, mid, queryLeft, queryRight);
    let y = await this.query(
      node * 2 + 2,
      mid + 1,
      right,
      queryLeft,
      queryRight
    );
    console.log(node.toString() + '===> ' + (x + y).toString());
    let v: number;
    if (this.selected === 'maxtree') {
      v = Math.max(x, y);
    } else if (this.selected === 'mintree') {
      v = Math.min(x, y);
    } else if (this.selected === 'sumtree') v = x + y;
    let temp1: Node = {
      value: v,
      background: '#007bff',
      center_x: this.nodeList[node].center_x,
      center_y: this.nodeList[node].center_y,
      top_padding: (this.nodeList[node].center_y - 110).toString() + 'px',
      left_padding: this.nodeList[node].left_padding,
      height: this.width.toString() + 'px',
      width: this.width.toString() + 'px',
      visibility: true,
    };
    this.queryNodeList.push(temp1);
    await new Promise((resolve) => setTimeout(resolve, this.timer));
    this.nodeList[node].background = 'blueviolet';
    return v;
  };
  createInputArray() {
    this.inputArray = [];
    for (let i = 15; i <= 30; i++) {
      let temp2 = this.nodeList[i];
      let temp1: Node = {
        value: temp2.value,
        center_x: temp2.center_x,
        center_y: 650,
        left_padding: this.paddingCalculate(temp2.center_x - 20),
        top_padding: this.paddingCalculate(650 - 20),
        background: '#6f42c1',
        height: this.width.toString() + 'px',
        width: this.width.toString() + 'px',
        visibility: true,
        index: i-15+1,
      };
      this.inputArray.push(temp1);
    }
  }
  update = async()=>
  {
    if(this.update_index>16||this.update_value<1)
    {
      alert("Index range should be between 1 and 16");
      return ;
    }
    this.running = true;
    this.inputArray[this.update_index-1].background = '#22d6d0';
    this.inputArray[this.update_index-1].value=this.update_value;
    await this.UpdateFunc(0, 0, 15, this.update_index-1, this.update_value);
    this.inputArray[this.update_index-1].background = '#6f42c1',
    this.running = false;
  }
  UpdateFunc = async(
    node: number,
    left: number,
    right: number,
    index: number,
    value: number
  ) =>{
    this.nodeList[node].background = '#22d6d0';
    await new Promise((resolve) => setTimeout(resolve, this.timer));
    
    if(left>index||right<index)
    {
      await new Promise((resolve) => setTimeout(resolve, this.timer));
      this.nodeList[node].background = 'blueviolet';
      return ;
    }
    if(left == right && index == left)
    {
      await new Promise((resolve) => setTimeout(resolve, this.timer));
      this.nodeList[node].background = 'blueviolet';
      this.nodeList[node].value = value;
      return ;
    }
    let mid = Math.floor((left+right)/2);
    await this.UpdateFunc(node * 2 + 1, left , mid, index, value);
    await this.UpdateFunc(node * 2 + 2, mid+1 , right, index, value);


    this.nodeList[node].background = 'blueviolet';
    let v: number=0;
    if (this.selected === 'maxtree') {
      v = Math.max(this.nodeList[2*node+1].value, this.nodeList[2*node+2].value);
    } 
    else if (this.selected === 'mintree') {
      v = Math.min(this.nodeList[2*node+1].value, this.nodeList[2*node+2].value);
    } 
    else if (this.selected === 'sumtree') {
      v = parseInt(this.nodeList[2*node+1].value.toString()) + parseInt(this.nodeList[2*node+2].value.toString());
    }
    this.nodeList[node].value = v;
    await new Promise((resolve) => setTimeout(resolve, this.timer));
    return ;
  }
}