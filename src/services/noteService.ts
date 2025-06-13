import axios from 'axios';
import { Note, NoteTag } from '../types/note';

const BASE_URL = 'https://notehub-public.goit.study/api';
const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export interface FetchNotesResponse {
    notes: Note[],
    totalPages: number,
    page: number,
    perPage: number,
}
export interface CreateNote {
    title: string;
    content: string;
    tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo';
  }

export const fetchNotes = async (search: string,  page: number, perPage: number): Promise<FetchNotesResponse> => {
   const params: { page: number, perPage: number, search?: string } = {
    page, perPage
   };
   if (search){
    params.search = search;
   }
    const response = await axios.get<FetchNotesResponse>(`${ BASE_URL }/notes`, {
    params,
    headers: { Authorization: `Bearer ${ API_TOKEN }` }
   })
   return response.data;
}

export const createNote = async (newNote: CreateNote): Promise<Note> => {
    const response = await axios.post<Note>(`${ BASE_URL }/notes/`, newNote, {
        headers: { Authorization: `Bearer ${ API_TOKEN }` }
    })
    return response.data;
}

export const deleteNote = async (noteId: number): Promise<Note> => {
    const response = await axios.delete<Note>(`${ BASE_URL }/notes/${ noteId }`,{
        headers: { Authorization: `Bearer ${ API_TOKEN }` }
    })
    return response.data;
}
