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
  id: string;
  faculty: string;
  student: string;
  major: string;
  status: string[];
  updated: string;
}

export interface FilterObject {
  unfilteredSearchQ: boolean;
  searchTerm: string;
  professors: string[];
  formStatus: string[];
  timeFrame?: string;
}
