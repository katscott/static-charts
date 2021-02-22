export enum ChartType {
  Bar = 'bar',
}

export interface Chart {
  id: string;
  type: ChartType;
  name: string;
  code: string;
}
