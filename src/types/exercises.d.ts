export interface ExercisesType {
     NAME: string,
     CATEGORY_ID: number,
     DESCRIPTION: string,
     VIDEO?: File,
     IMAGE?: File
} 

export interface ExercisesListType {
     ID: number,
     NAME: string,
     CATEGORY?: string,
} 