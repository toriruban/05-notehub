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

export const fetchNotes = async (search: string,  page: number, perPage: number): Promise<FetchNotesResponse> => {
   const response = await axios.get<FetchNotesResponse>(`${ BASE_URL }/notes`, {
    params: { search, page, perPage},
    headers: { Authorization: `Bearer ${ API_TOKEN }` }
   })

   return response.data;
}

export const createNote = async (newNote: NoteTag) => {
    const response = await axios.post<Note>(`${ BASE_URL }/notes/`, newNote, {
        headers: { Authorization: `Bearer ${ API_TOKEN }` }
    })
    return response.data;
}

export const deleteNote = async (noteId: number) => {
    const response = await axios.delete(`${ BASE_URL }/notes/${ noteId }`,{
        headers: { Authorization: `Bearer ${ API_TOKEN }` }
    })
    return response.data;
}
