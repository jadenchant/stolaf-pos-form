export interface ScreenSize {
  width: number;
  height: number;
}

export interface ClassData {
  id: string;
  name: string;
  prerequisite: string;
}

export interface ClassTableProps {
  formStatus: string;
  selectedValues: ClassData[];
  formValues: FormData[];
  setFormValues: React.Dispatch<React.SetStateAction<FormData[]>>;
  classNames?: string;
}

export interface ElectiveSelectProps {
  formStatus: string;
  classes: ClassData[];
  formValues: FormData[];
  setFormValues: React.Dispatch<React.SetStateAction<FormData[]>>;
  isOtherElective?: boolean;
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
