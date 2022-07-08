export interface IFile {
  filename?: string;
  code: string;
}
export interface IDemo {
  title: string;
  text: string;
  code: IFile[];
}
