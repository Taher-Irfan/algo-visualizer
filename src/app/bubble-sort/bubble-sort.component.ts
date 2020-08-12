import {Component, OnInit} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {compareNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import PriorityQueue from "priorityqueue";


@Component({
  selector: 'app-bubble-sort',
  templateUrl: './bubble-sort.component.html',
  styleUrls: ['./bubble-sort.component.css']
})
export class BubbleSortComponent implements OnInit {
  matrix: string[][];
  level: number[][];
  visited: boolean[][];
  block_matrix: boolean[][];
  dijkastra_node_value: number[][];
  dijkastra_till_dist: number[][];
  start_row: number;
  start_col: number;
  end_row: number;
  end_col: number;
  cols: number = 15;
  rows: number = 15;
  row_arr: number[];
  col_arr: number[];
  map = new Map();
  timer = 0;
  add_block_cell: boolean;
  start_change_status: boolean;
  end_change_status: boolean;
  eight_cell_connection_status: boolean;
  dir4i = [0, 0, 1, -1];
  dir4j = [1, -1, 0, 0];
  dir8i = [0, 0, 1, 1, 1, -1, -1, -1];
  dir8j = [1, -1, 0, 1, -1, 0, 1, -1];
  dijkastra_statue: boolean;
  running: boolean;


  constructor() {
  }


  ngOnInit(): void {
    this.end_change_status = false;
    this.start_change_status = false;
    this.reset(2, 2, 10, 10);
    this.dijkastra_statue = false;
    this.add_block_cell = false;
    this.running = false;
    this.eight_cell_connection_status = false;

  }


  reset(sr, sc, endr, endc) {
    this.matrix = [];
    this.visited = [];
    this.level = [];
    this.block_matrix = [];
    for (let i = 0; i < this.rows; i++) {
      this.matrix[i] = [];
      this.visited[i] = [];
      this.level[i] = [];
      this.block_matrix[i] = [];
      for (let j = 0; j < this.cols; j++) {
        this.matrix[i][j] = 'card';
        this.visited[i][j] = false;
        this.block_matrix[i][j] = false;
      }
    }
    this.row_arr = [];
    for (let i = 0; i < this.rows; i++) {
      this.row_arr[i] = i;
    }
    this.col_arr = [];
    for (let i = 0; i < this.cols; i++) {
      this.col_arr[i] = i;
    }
    this.start_row = sr;
    this.start_col = sc;
    this.matrix[this.start_row][this.start_col] = 'start_card';

    this.end_row = endr;
    this.end_col = endc;
    this.matrix[this.end_row][this.end_col] = 'end_card';
    if (this.dijkastra_statue == true) {
      this.dijkastra_statue = false;
      this.dijkastra_statue_change();
    }

  }

  dijkastra_statue_change() {
    this.reset(this.start_row, this.start_col, this.end_row, this.end_col);
    if (this.dijkastra_statue === false) {
      this.dijkastra_node_value = [];
      this.dijkastra_till_dist = [];
      for (let i = 0; i < this.rows; i++) {
        this.dijkastra_node_value[i] = [];
        this.dijkastra_till_dist[i] = [];
        for (let j = 0; j < this.cols; j++) {
          this.dijkastra_node_value[i][j] = Math.floor(Math.random() * 100) % 20;
          // console.log('here');
          if (this.dijkastra_node_value[i][j] == 0) {
            this.dijkastra_node_value[i][j] = 15;
          }
          this.dijkastra_till_dist[i][j] = 1000009;


        }
      }


    }


    this.dijkastra_statue = !this.dijkastra_statue;
    // console.log('there');
    // console.log(this.dijkastra_statue);

  }

  change_start(i, j) {
    if (i == this.end_row && j == this.end_col) return;
    if (i == this.start_row && j == this.start_col) return;


    if (this.start_change_status == true) {
      if (this.block_matrix[this.start_row][this.start_col] == true) {
        this.matrix[this.start_row][this.start_col] = 'block';
      } else {
        this.matrix[this.start_row][this.start_col] = 'card';
      }

      this.start_row = i;
      this.start_col = j;

      this.matrix[this.start_row][this.start_col] = 'start_card';
    } else if (this.end_change_status == true) {
      if (this.block_matrix[this.end_row][this.end_col] == true) {
        this.matrix[this.end_row][this.end_col] = 'block';
      } else {
        this.matrix[this.end_row][this.end_col] = 'card';
      }

      this.end_row = i;
      this.end_col = j;
      this.matrix[this.end_row][this.end_col] = 'end_card';
    }

  }

  change_start_status() {
    this.start_change_status = true;
    this.end_change_status = false;
  }

  change_end_status() {
    this.start_change_status = false;
    this.end_change_status = true;
  }

  bfs = async () => {
    this.running = true;
    let Q = [];
    let found: boolean = false;
    this.map.clear();
    this.block_matrix[this.end_row][this.end_col] = false;
    Q.push([this.start_row, this.start_col]);
    this.visited[this.start_row][this.start_col] = true;
    this.matrix[this.start_row][this.start_col] = 'vis_card';
    this.level[this.start_row][this.start_col] = 0;
    let dirx;
    let diry;
    if (this.eight_cell_connection_status === true) {
      dirx = this.dir8i;
      diry = this.dir8j;
    } else {
      dirx = this.dir4i;
      diry = this.dir4j;
    }
    while (this.running == true && Q.length > 0 && found == false) {
      let x = Q[0];
      Q.shift();
      let i = x[0], j = x[1];
      this.matrix[i][j] = 'queue_card';
      for (let a = 0; a < dirx.length; a++) {
        i = dirx[a] + x[0];
        j = diry[a] + x[1];
        if (i >= 0 && i < this.rows && j >= 0 && j <= this.cols && this.visited[i][j] == false && this.block_matrix[i][j] === false) {
          this.visited[i][j] = true;
          this.level[i][j] = this.level[x[0]][x[1]] + 1;
          this.map.set(`[${i}, ${j}]`, [x[0], x[1]]);
          if (i == this.end_row && j == this.end_col) {
            found = true;
            break;
          }
          this.matrix[i][j] = 'vis_card';
          Q.push([i, j]);
          await new Promise(resolve => setTimeout(resolve, this.timer));
        }
      }
      this.matrix[x[0]][x[1]] = 'vis_card';
      if (this.start_row == x[0] && this.start_col == x[1]) {
        this.matrix[x[0]][x[1]] = 'start_card';
      }
      if (this.end_row == x[0] && this.end_col == x[1]) {
        this.matrix[x[0]][x[1]] = 'end_card';
      }


    }
    if (found === true) {
      this.find_path();
    }

  };

  start = async () => {
    this.running = true;
    this.add_block_cell=false;


    if (this.dijkastra_statue == false) {
      await this.bfs();
      this.running = false;
    } else {
      class Point {
        x;
        y;
        z;

        constructor(x, y, z) {
          this.x = x;
          this.y = y;
          this.z = z;
        }
      }

      const numericCompare = (a, b) => (a > b ? 1 : a < b ? -1 : 0);

      const comparator = (a, b) => {
        const x = numericCompare(a.x, b.x);
        const y = numericCompare(a.y, b.y);
        return x ? x : y;
      };
      const Q = new PriorityQueue({comparator});
      let found: boolean = false;
      this.map.clear();
      this.block_matrix[this.end_row][this.end_col] = false;
      Q.push(new Point(0, this.start_row, this.start_col));
      this.matrix[this.start_row][this.start_col] = 'vis_card';
      this.dijkastra_till_dist[this.start_row][this.start_col] = 0;
      this.dijkastra_node_value[this.end_row][this.end_row] = 0;
      let dirx;
      let diry;
      if (this.eight_cell_connection_status === true) {
        dirx = this.dir8i;
        diry = this.dir8j;
      } else {
        dirx = this.dir4i;
        diry = this.dir4j;
      }
      while (this.running == true && Q.length > 0 && found == false) {

        let p = Q.pop();
        // console.log(p);
        let cur_dist = -(p.x), i = p.y, j = p.z;
        if (i == this.end_row && j == this.end_col) {
          this.matrix[p.y][p.z] = 'end_card';
          found = true;
          break;
        }
        this.matrix[i][j] = 'queue_card';

        for (let a = 0; a < dirx.length; a++) {
          i = dirx[a] + p.y;
          j = diry[a] + p.z;
          if (i >= 0 && i < this.rows && j >= 0 && j <= this.cols && this.block_matrix[i][j] === false && cur_dist + this.dijkastra_node_value[i][j] < this.dijkastra_till_dist[i][j]) {

            this.dijkastra_till_dist[i][j] = cur_dist + this.dijkastra_node_value[i][j];
            this.map.set(`[${i}, ${j}]`, [p.y, p.z]);

            this.matrix[i][j] = 'vis_card';
            Q.push(new Point(-(cur_dist + this.dijkastra_node_value[i][j]), i, j));
            await new Promise(resolve => setTimeout(resolve, this.timer));
          }
        }
        this.matrix[p.y][p.z] = 'vis_card';
        if (this.start_row == p.y && this.start_col == p.z) {
          this.matrix[p.y][p.z] = 'start_card';
        }
        if (this.end_row == p.y && this.end_col == p.z) {
          this.matrix[p.y][p.z] = 'end_card';
        }


      }
      if (found === true) {
        this.find_path();
      }
    }
    this.running = false;


  };

  find_path() {

    let x = this.map.get(`[${this.end_row}, ${this.end_col}]`);

    while (x[0] != this.start_row || x[1] != this.start_col) {
      this.matrix[x[0]][x[1]] = 'path';
      x = this.map.get(`[${x[0]}, ${x[1]}]`);
    }


  }

  block_cell() {
    if (this.add_block_cell === false) this.add_block_cell = true;
    else this.add_block_cell = false;
  }

  eight_cell_connection() {
    this.eight_cell_connection_status = !this.eight_cell_connection_status;
  }

  click(i, j) {
    if (this.start_change_status == true || this.end_change_status == true) {
      this.change_start(i, j);
    } else {

    }
  }

  res(i, j) {
    if (this.add_block_cell === true) {
      if ((i != this.start_row || j != this.start_col) && (i != this.end_row || j != this.end_col)) {
        if (this.block_matrix[i][j] == false) {
          this.block_matrix [i][j] = true;
          this.matrix[i][j] = 'block';
        } else {
          this.block_matrix [i][j] = false;
          this.matrix[i][j] = 'card';
        }
      }
    }
    this.start_change_status = false;
    this.end_change_status = false;
  }

  change_time(val) {
    this.timer = Math.abs(val.value);
  }

  change_grid(val) {
    this.cols = val.value;
    this.rows = val.value;
    this.reset(2, 2, 10, 10);
  }

  stop() {
    this.running = false;
  }

}
