import {Component, OnInit} from '@angular/core';
import {MDBBootstrapModule} from 'angular-bootstrap-md';
import {MatButtonModule} from '@angular/material/button';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';

@Component({
  selector: 'app-sorting-app',
  templateUrl: './sorting-app.component.html',
  styleUrls: ['./sorting-app.component.css']
})
export class SortingAppComponent implements OnInit {
  chartLabels = [];
  datasize = 20;
  timer = 0;
  running = false;
  selected = 'bubble';

  constructor() {
  }

  change_time(val) {
    this.timer = Math.abs(val.value);
  }

  change_data_size(val) {
    this.datasize = val.value;
    this.reset();
  }

  data_arr = [];
  bg_color = [];

  ngOnInit(): void {
    this.reset();
    this.running = false;
    this.selected= 'bubble';

  }

  reset() {
    this.data_arr = [];
    this.bg_color = [];
    this.chartDatasets = [
      {data: []}
    ];
    this.chartColors = [
      {
        backgroundColor: [],
      }
    ];
    this.chartLabels = [];
    for (let i: number = 0; i <= this.datasize; i = i + 1) {
      this.chartLabels.push('');
      this.data_arr.push(Math.floor(Math.random() * 100) % 50);
      this.bg_color.push('rgba(255,14,184,0.6)');
    }
    this.chartDatasets = [
      {data: this.data_arr}
    ];
    this.chartColors = [
      {
        backgroundColor: this.bg_color,
      }
    ]
  }

  public chartType: string = 'bar';

  public chartDatasets: Array<any> = [
    {data: this.data_arr, label: ''}
  ];


  //public chartLabels: Array<any> = ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'];

  public chartColors: Array<any> = [
    {
      backgroundColor: this.bg_color,
      borderColor: [
        'rgba(255,99,132,1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 0,
    }
  ];

  public chartOptions: any = {
    responsive: true,
    animation: false,
    scales: {
      xAxes: [{
        gridLines: {
          color: 'white'
        },
        display: false,
        scaleLabel: {
          display: false,
        }
      }],
      yAxes: [{
        gridLines: {
          color: 'white'
        },
        display: false,

        scaleLabel: {
          display: false,
        }
      }],
    }
  };


  sort = async () => {
    this.running = true;

    for (let i = 0; i < this.data_arr.length && this.running; i++) {
      for (let j = 0; j < this.data_arr.length - i - 1 && this.running; j++) {
        this.bg_color[j] = 'rgba(87,255,14,0.85)';
        this.bg_color[j + 1] = 'rgba(45,255,18,0.6)';

        if (this.data_arr[j] > this.data_arr[j + 1]) {
          let temp = this.data_arr[j];
          this.data_arr[j] = this.data_arr[j + 1];
          this.data_arr[j + 1] = temp;
        }
        this.chartDatasets = [
          {data: this.data_arr, label: ' '}
        ];

        await new Promise(resolve => setTimeout(resolve, this.timer));
        this.bg_color[j] = 'rgba(255,14,184,0.6)';
        if(j+1!=this.data_arr.length-i-1)
        this.bg_color[j + 1] = 'rgba(255,14,184,0.6)';
      }
    }
    if(this.running) this.bg_color[0]='rgba(87,255,14,0.85)';
    //  console.log('here');
    this.running=false;

  };

  insertionsort = async () => {
    this.running = true;
    for (let i = 0; i < this.data_arr.length && this.running; i++)
    {
      this.bg_color[i]='rgba(255,14,184,0.6)';
    }

    for (let i = 1; i < this.data_arr.length && this.running; i++) {
      for (let j = i-1; j >=0 && this.running; j--) {
        this.bg_color[j] = 'rgba(255,186,31,0.85)';
        this.bg_color[j + 1] =  'rgba(255,186,31,0.85)';

        if (this.data_arr[j] > this.data_arr[j + 1]) {
          let temp = this.data_arr[j];
          this.data_arr[j] = this.data_arr[j + 1];
          this.data_arr[j + 1] = temp;
          this.chartDatasets = [
            {data: this.data_arr, label: ' '}
          ];
        }
        else {
          break;
        }
        await new Promise(resolve => setTimeout(resolve, this.timer));
        this.bg_color[j+1] = 'rgba(87,255,14,0.85)';

      }
      for (let j = 0; j <= i && this.running; j++)
      {
        this.bg_color[j]= 'rgba(87,255,14,0.85)';
      }

    }
    if(this.running)
    {
      for (let j = 0; j <this.data_arr.length && this.running; j++)
      {
        console.log('jere');
        this.bg_color[j]= 'rgba(87,255,14,0.85)';
      }
      this.chartDatasets = [
        {data: this.data_arr, label: ' '}
      ];
    }
    this.running=false;

  };
  mergesort = async () => {

    await this.mergeSort(this.data_arr, 0, this.data_arr.length - 1);
    this.chartColors = [
      {backgroundColor: this.bg_color}
    ];
    this.running=false;

    //
  };
  merge = async (arr, l, m, r) => {
   //
    // console.log('2');
    for (let i = l; i <= r; i++) {
      this.bg_color[i] = 'rgba(87,255,14,0.85)';
    }
    this.chartColors = [
      {backgroundColor: this.bg_color}
    ];


    let i, j, k;
    let n1 = m - l + 1;
    let n2 = r - m;
    let L: number[] = [];
    let R: number[] = [];
    for (i = 0; i < n1; i++) L.push(0);
    for (i = 0; i < n2; i++) R.push(0);

    /* Copy data to temp arrays L[] and R[] */
    for (i = 0; i < n1; i++)
      L[i] = arr[l + i];
    for (j = 0; j < n2; j++)
      R[j] = arr[m + 1 + j];

    i = 0;
    j = 0;
    k = l;
    for (; i < n1 && j < n2 && this.running;) {
      if (L[i] <= R[j]) {
        arr[k] = L[i];
        i++;
      } else {
        arr[k] = R[j];
        j++;
      }
      k++;
      this.chartDatasets = [
        {data: this.data_arr}
      ];
      await new Promise(resolve => setTimeout(resolve, this.timer));
    }

    for (; i < n1 && this.running;) {
      arr[k] = L[i];
      i++;
      k++;
      this.chartDatasets = [
        {data: this.data_arr}
      ];
      await new Promise(resolve => setTimeout(resolve, this.timer));
    }
    for (; j < n2 && this.running;) {
      arr[k] = R[j];
      j++;
      k++;
      this.chartDatasets = [
        {data: this.data_arr}
      ];
      await new Promise(resolve => setTimeout(resolve, this.timer));

    }


    for (let i = l; i <= r && this.running; i++) {
      this.bg_color[i] = 'rgba(255,14,184,0.6)';
    }
    if(l==0&&r==this.data_arr.length-1)
    {
      for (let i = l; i <= r && this.running; i++) {
        this.bg_color[i] = 'rgba(87,255,14,0.85)';
      }
    }
    this.chartColors = [
      {backgroundColor: this.bg_color}
    ]
  };
  mergeSort = async (arr, l, r) => {
  //  console.log('1');
    if (l < r && this.running) {
      let m = Math.floor(l + (r - l) / 2);
      if (this.running)
        await this.mergeSort(arr, l, m);
      if (this.running)
        await this.mergeSort(arr, m + 1, r);
   //   console.log('here');
     // console.log(this.running);

      if(this.running)
        await this.merge(arr, l, m, r);
    }
    this.chartColors = [
      {backgroundColor: this.bg_color}
    ]
  };
  selectionsort = async () => {
    this.running = true;
    for (let i = 0; i < this.data_arr.length && this.running; i++) {
      let id = 0;
      for (let j = 0; j < this.data_arr.length - i && this.running; j++) {
        this.bg_color[j] = 'rgba(255,139,12,0.85)';
        if (j > 0) {
          if (j - 1 != id)
            this.bg_color[j - 1] = 'rgba(255,14,184,0.6)';
        } else {
          this.bg_color[j] = 'rgba(255,5,0,0.85)';
        }
        if (this.data_arr[j] > this.data_arr[id]) {
          this.bg_color[id] = 'rgba(255,14,184,0.6)';
          id = j;
          this.bg_color[j] = 'rgba(255,5,0,0.85)';

        }

        await new Promise(resolve => setTimeout(resolve, this.timer));
        this.chartDatasets = [
          {data: this.data_arr, label: ' '}
        ];
      }
      let temp = this.data_arr[id];
      this.data_arr[id] = this.data_arr[this.data_arr.length - 1 - i];
      this.data_arr[this.data_arr.length - 1 - i] = temp;

      this.bg_color[id] = 'rgba(255,14,184,0.6)';
      this.bg_color[this.data_arr.length - 1 - i] = 'rgba(87,255,14,0.85)';
      this.chartDatasets = [
        {data: this.data_arr, label: ' '}
      ];
      await new Promise(resolve => setTimeout(resolve, this.timer));
    }
    this.running=false;

  };
  ////////////QickSort//////////////
  partition = async (arr, low, high) => {
    let pivot = arr[high]; // pivot
    let i = (low - 1); // Index of smaller element
    for (let j = low; j <= high - 1 && this.running; j++) {
      this.bg_color[j] = 'rgba(255,139,12,0.85)';
    }
    this.bg_color[high] = 'rgba(255,1,0,0.85)';
    this.chartDatasets = [
      {data: this.data_arr, label: ' '}
    ];


    for (let j = low; j <= high - 1 && this.running; j++) {

      this.bg_color[j] = 'rgba(87,255,14,0.85)';
      if (arr[j] < pivot) {
        i++;
        let temp = this.data_arr[i];
        this.data_arr[i] = this.data_arr[j];
        this.data_arr[j] = temp;
        this.chartDatasets = [
          {data: this.data_arr, label: ' '}
        ];
        await new Promise(resolve => setTimeout(resolve, this.timer));

      }
      this.chartDatasets = [
        {data: this.data_arr, label: ' '}
      ];
    }
    if (this.running) {
      let temp = this.data_arr[i + 1];
      this.data_arr[i + 1] = this.data_arr[high];
      this.data_arr[high] = temp;
      this.chartDatasets = [
        {data: this.data_arr}
      ];
      await new Promise(resolve => setTimeout(resolve, this.timer));
      for(let k=low;k<=high;k++)
      {
        this.bg_color[k]= 'rgba(255,14,184,0.6)';
      }
      this.chartDatasets = [
        {data: this.data_arr}
      ];

      return (i + 1);
    }
  };
  quickSort = async (arr, low, high) => {
    if (low < high && this.running) {
      let pi = await this.partition(arr, low, high);
      if (this.running) await this.quickSort(arr, low, pi - 1);
      if (this.running) await this.quickSort(arr, pi + 1, high);
    }
  };

// Driver Code
  QuickSort = async () => {
    this.running = true;
    //  console.log(this.data_arr);

    await this.quickSort(this.data_arr, 0, this.datasize);
    if(this.running)
    {
      for(let k=0;k<this.data_arr.length;k++)
      {
        this.bg_color[k]= 'rgba(87,255,14,0.85)';
      }

    }
    this.chartDatasets = [
      {data: this.data_arr}
    ];
    this.running=false;


  };

  chartHovered($event) {

  }

  stop() {
    this.running = false;
  }
  driver= async () =>
  {
    if(this.selected=='bubble')
    {
      this.running=true;
      await this.sort();
      this.running=false;
    }
    if(this.selected=='selection')
    {
      this.running=true;
      await this.selectionsort();
      this.running=false;
    }
    if(this.selected=='merge')
    {
      this.running=true;
      await this.mergesort();

    }
    if(this.selected=='quick')
    {
      this.running=true;
      await this.QuickSort();
      this.running=false;
    }
    if(this.selected=="insertion")
    {
      this.running=true;
      await this.insertionsort();
      this.running=false;
    }
  }


}
