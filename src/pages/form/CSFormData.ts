import {ClassData} from '@/interface';

export const foundationData: ClassData[] = [
  {
    id: 'csci121',
    name: 'Intro to CS course',
    prerequisite: 'None',
  },
  {
    id: 'csci125',
    name: 'Intro to CS course',
    prerequisite: 'Calculus I',
  },
  {
    id: 'csci221',
    name: 'Intro to Data Structures in C++',
    prerequisite: 'csci121 || csci125',
  },
  {
    id: 'math220',
    name: 'Elementary Linear Algebra',
    prerequisite: 'CSCI 221 or Calculus I',
  },
];

export const requiredData: ClassData[] = [
  {
    id: 'csci241',
    name: 'Hardware Design',
    prerequisite: 'CSCI 221',
  },
  {
    id: 'csci251',
    name: 'Software Design',
    prerequisite: 'CSCI 221',
  },
  {
    id: 'csci263',
    name: 'Ethical Issues in Software Design',
    prerequisite: 'CSCI 251',
  },
  {
    id: 'math234',
    name: 'Discrete Math Reasoning',
    prerequisite: 'CSCI 221 || Calculus II',
  },
  {
    id: 'csci353',
    name: 'Analysis of Algorithms',
    prerequisite: 'CSCI 251 && MATH 234',
  },
];

export const electiveData: ClassData[] = [
  {
    id: 'csci273',
    name: 'Operating Systems',
    prerequisite: 'csci241 && csci251',
  },
  {
    id: 'csci276',
    name: 'Programming Languages',
    prerequisite: 'csci251',
  },
  {
    id: 'csci379',
    name: 'Artificial Intelligence',
    prerequisite: 'csci251 && math234',
  },
  {
    id: 'csci333',
    name: 'Theory of Computation',
    prerequisite: 'math234',
  },
];

export const otherElectiveData: ClassData[] = [
  {
    id: 'csci200',
    name: 'Topics in CS',
    prerequisite: 'varies',
  },
  {
    id: 'csci300',
    name: 'Topics in CS',
    prerequisite: 'varies',
  },
  {
    id: 'csci284',
    name: 'Mobile Computing Applications',
    prerequisite: 'csci251',
  },
  {
    id: 'csci336',
    name: 'Logic Programming',
    prerequisite: 'csci251',
  },
  {
    id: 'csci356',
    name: 'Parallel and Distributed Systems',
    prerequisite: 'csci241 && csci251',
  },
  {
    id: 'csci390',
    name: 'Senior Capstone',
    prerequisite: 'csci263 && csci353',
  },
  {
    id: 'csci391',
    name: 'Senior Capstone',
    prerequisite: 'csci263 && csci353',
  },
  {
    id: 'math282',
    name: 'Computational Geometry',
    prerequisite: 'none',
  },
  {
    id: 'mscs341',
    name: 'Algorithms for Decision Making',
    prerequisite: 'csci251 || math220 || stat272',
  },
  {
    id: 'phys246',
    name: 'Electronics',
    prerequisite: 'phys125 || phys131',
  },
];
