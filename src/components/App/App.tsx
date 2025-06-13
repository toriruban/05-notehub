import { useState } from 'react';
import { useQuery, useMutation, useQueryClient, keepPreviousData } from '@tanstack/react-query';
import { toast, Toaster } from 'react-hot-toast';
import { fetchNotes, createNote, deleteNote } from '../../services/noteService';
import { FetchNotesResponse } from '../../types/note';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import NoteModal from '../NoteModal/NoteModal';
import css from '../App/App.module.css';
import { FormValues } from '../NoteForm/NoteForm';
import { useDebounce } from 'use-debounce';

export default function App() {
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isFetching} = useQuery<FetchNotesResponse>({
    queryKey: ['notes', debouncedSearch, page],
    queryFn: () => fetchNotes(debouncedSearch, page),
    placeholderData: keepPreviousData,
  });

  const createMutation = useMutation({
    mutationFn: createNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      setModalOpen(false);
      toast.success('Note created!');
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['notes'] });
      toast.success('Note deleted!');
    },
  });

  const handleCreate = (values: FormValues, actions: any) => {
    createMutation.mutate(values, {
      onSuccess: () => {
        actions.resetForm();
        setModalOpen(false);
        toast.success('Note created!');
      }
    });
  };

  const handleDelete = (id: number) => deleteMutation.mutate(id);
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        <SearchBox value={search} onSearch={handleSearch} />
        {data && data.totalPages > 1 && (
          <Pagination
            currentPage={page}
            totalPages={data.totalPages}
            onPageChange={handlePageChange}
          />
        )}
        <button className={css.button} onClick={() => setModalOpen(true)}>
          Create note +
        </button>
      </header>
      <NoteList notes={data?.notes || []} onDelete={handleDelete} />
      {isModalOpen && (
        <NoteModal
          onClose={() => setModalOpen(false)}
          onCreate={handleCreate}
        />
      )}
    </div>
  );
}
