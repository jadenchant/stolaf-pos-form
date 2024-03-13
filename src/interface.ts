export interface ClassData {
  id: string;
  name: string;
  prerequisite: string;
}

export interface ElectiveSelectProps {
  data: ClassData;
  setSelectedElectiveValues: React.Dispatch<
    React.SetStateAction<string[]>
  >;
}
