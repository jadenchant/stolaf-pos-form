export interface ScreenSize {
  width: number;
  height: number;
}

export interface ClassData {
  id: string;
  name: string;
  prerequisite: string;
}

export interface FormData {
  id: string;
  name: string;
  prerequisite: string;
  term?: 'fall' | 'jterm' | 'spring' | 'summer';
  year?: number;
}
