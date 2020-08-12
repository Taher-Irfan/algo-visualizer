import {Component, OnInit} from '@angular/core';
import {compareNumbers} from "@angular/compiler-cli/src/diagnostics/typescript_version";
import {MatInputModule} from '@angular/material/input';
import {NgForm} from '@angular/forms';
import {FormControl} from '@angular/forms';

@Component({
  selector: 'app-searching',
  templateUrl: './searching.component.html',
  styleUrls: ['./searching.component.css']
})
export class SearchingComponent implements OnInit {
  num_array: number[];
  index: number[];
  background_array: string[];
  timer: number;
  num_array_size: number;
  searching_number: number;
  mid_color = "rgb(84,244,103)";
  hi_low_color = "rgb(244,0,190)";
  end = false;
  running = false;
  sort_status = false;
  selected = 'binary';


  constructor() {
  }

  reset() {
    this.sort_status = false;
    this.num_array = [];
    this.background_array = [];
    for (let i = 0; i < this.num_array_size; i++) {
      this.index[i] = i;
      this.background_array[i] = "#b5140a";
      this.num_array[i] = (Math.floor(Math.random() * 100) % 100);
    }

  }

  ngOnInit(): void {
    this.sort_status = false;
    this.running = false;
    this.end = false;
    this.num_array_size = 20;
    this.index = [];
    console.log(this.num_array_size);
    this.num_array = [];
    this.background_array = [];
    for (let i = 0; i < this.num_array_size; i++) {
      this.index[i] = i;
      this.background_array[i] = "#b5140a";
      this.num_array[i] = (Math.floor(Math.random() * 100) % 50);
    }

    console.log(this.num_array);
    this.searching_number = null;
  }

  sorrt() {
    this.sort_status = true;
    this.num_array.sort((a, b) => {
      return a - b;
    });
    for (let i = 0; i < this.num_array_size; i++) {
      this.background_array[i] = "#b5140a";
    }
  }

  binary_search = async () => {
    if (this.running == true) return;
    if (this.searching_number == null) {
      alert('Please Enter a number');
      return;
    }
    if (this.sort_status == false) {
      alert('Please sort first');
      return;
    }
    let flag=false;
    this.running = true;
    let hi = this.num_array_size - 1;
    let low = 0;
    this.end = false;
    while (low <= hi) {
      if (this.end) {
        this.end = false;
        this.running = false;
        return;
      }
      for (let i = 0; i < this.num_array_size; i++) {
        this.background_array[i] = "#b5140a";
      }
      this.background_array[low] = this.hi_low_color;
      this.background_array[hi] = this.hi_low_color;
      let mid = Math.floor((low + hi) / 2);
      this.background_array[mid] = this.mid_color;
      if (this.num_array[mid] == this.searching_number) {

        this.running = false;
        this.background_array[mid] = 'rgb(0,22,256)';
        flag=true;
        break;
      }
      if (this.num_array[mid] > this.searching_number) {
        hi = mid - 1;
      } else low = mid + 1;
      await new Promise(resolve => setTimeout(resolve, this.timer));
    }
    this.running = false;
    if(flag==false)
    {
      alert("Number not found");
    }

  };
  linear_search = async () => {
    if (this.running == true) return;
    if (this.searching_number == null) {
      alert('Please Enter a number');
      return;
    }
    this.running = true;
    let md = 0;
    this.end = false;
    let flag=false;
    while (md < this.num_array_size) {
      if (this.end) {
        this.end = false;
        this.running = false;
        break;
      }
      for (let i = 0; i < this.num_array_size; i++) {
        this.background_array[i] = "#b5140a";
      }
      this.background_array[md] = this.mid_color;
      if (this.searching_number == this.num_array[md]) {
        this.background_array[md] = 'rgb(0,22,256)';
        flag=true;
        break;
      }
      md = md + 1;
      await new Promise(resolve => setTimeout(resolve, this.timer));
    }
    this.running = false;
    if(flag==false)
    {
      alert("Number not found");
    }
  };

  stop() {
    this.end = true;
    this.running = false;
  }

  change_time(val) {
    this.timer = Math.abs(val.value);
  }

  change_array__size(val) {
    this.num_array_size = val.value;
    this.reset();
  }

  driver() {
    if (this.selected === 'binary') {
      this.binary_search();
    } else this.linear_search();
  }
}
