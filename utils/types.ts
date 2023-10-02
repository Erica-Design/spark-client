export interface Post {
  id: number;
  length: number;
  map: any;
  author: {
    id: number;
    departmentCode: string;
    shortStudentNumber: string;
    username: string;
  };
  categories: string[];
  images: {
    id: number;
    url: string;
    order: number;
  }[];
  scraped: boolean;
  thumbnail: string;
  title: string;
}
