import axios from 'axios';
import { Note, NoteTag } from '../types/note';
export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface CreateNote {
  title: string;
  content?: string;
  tag: NoteTag;
}
const BASE_URL = 'https://notehub-public.goit.study/api';
const API_TOKEN = import.meta.env.VITE_NOTEHUB_TOKEN;

export const fetchNotes = async (
  search: string = '',
  page: number
): Promise<FetchNotesResponse> => {
  const params: { search?: string; page: number } = { page };
  if (search) {
    params.search = search;
  }

  const { data } = await axios.get<FetchNotesResponse>(
    `${BASE_URL}/notes`,
    {
      params,
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );

  return data;
};

export const createNote = async (
  newNote: CreateNote
): Promise<Note> => {
  const { data } = await axios.post<Note>(
    `${BASE_URL}/notes`,
    newNote,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );

  return data;
};

export const deleteNote = async (
  noteId: number
): Promise<Note> => {
  const { data } = await axios.delete<Note>(
    `${BASE_URL}/notes/${noteId}`,
    {
      headers: { Authorization: `Bearer ${API_TOKEN}` },
    }
  );

  return data;
};
