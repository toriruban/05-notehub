export interface Note {
    id: number,
    title: string,
    content: string,
    createdAt: string,
    updatedAt: string,
    tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo',
}

export interface NoteTag {
    title: string,
    content: string,
    tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo',
}