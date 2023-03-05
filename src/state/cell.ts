export type CellTypes = 'code' | 'text';
export type Direction = 'up' | 'down';

export interface Cell {
  id: string;
  type: CellTypes;
  content: string;
}

export const randomId = () => {
  return Math.random().toString(36).substring(0, 4);
};
