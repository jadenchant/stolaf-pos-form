export interface ClassData {
  id: string;
  name: string;
  prerequisite: string;
}

export interface ElectiveSelectProps {
  data: ClassData[];
  setSelectedElectiveValues: React.Dispatch<
    React.SetStateAction<ClassData[]>
  >;
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
