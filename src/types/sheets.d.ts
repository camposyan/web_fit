export interface SheetsType {
     NAME: string,
     CATEGORY_ID: number,
     DESCRIPTION: string,
     VIDEO?: File,
     IMAGE?: File
} 

export interface SheetsListType {
     ID: number,
     NAME: string,
     CATEGORY?: string,
} 