export interface CardCss {
  top: string;
  left: string;
}
// export interface Node {
//   value: number;
//   top: string;
//   left_value: number;
//   left: string;
//   background: string;
// }
export interface Line {
  x1: number;
  x2: number;
  y1: number;
  y2: number;
}


export interface Node
{
  value: number;
  center_x:number;
  center_y:number;
  left_padding: string;
  top_padding: string;
  background: string;
  height: string;
  width: string;
  visibility: boolean;
  index?: number
}
