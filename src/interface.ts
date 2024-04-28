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

export interface FacultyClassList {
  faculty: string;
  student: string;
  major: string;
  status: Array<string>;
  updated: string;
  id: string;
}

export interface FilterObject {
  unfilteredSearchQ: boolean;
  searchTerm: string;
  professors: Array<string>;
  formStatus: Array<string>;
  timeFrame: string;
}
