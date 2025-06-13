import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { toast, Toaster} from 'react-hot-toast';
import { fetchNotes, createNote, deleteNote, FetchNotesResponse } from '../../services/noteService';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import NoteModal from '../NoteModal/NoteModal';
import css from '../App/App.module.css'


export default function App() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [isModalOpen, setModalOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data } = useQuery<FetchNotesResponse>({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page, 12),
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

  const handleDelete = (id: number) => deleteMutation.mutate(id);
  const handlePageChange = (newPage: number) => setPage(newPage);
  const handleSearch = (value: string) => {
    setSearch(value);
    setPage(1);
  };

  return (
    <div className={ css.app }>
      <Toaster position="top-center" />
      <header className={css.toolbar}>
        <SearchBox value={ search } onSearch={ handleSearch } />
        <button onClick={() => setModalOpen(true)}>Create note +</button>
      </header>
      <NoteList notes={data?.notes || []} onDelete={ handleDelete } />
      {data && data.totalPages > 1 && (
        <Pagination
          currentPage={page}
          totalPages={data.totalPages}
          onPageChange={ handlePageChange }
        />
      )}
      {isModalOpen && (
        <NoteModal
          onClose={() => setModalOpen(false)}
          onCreate={values => createMutation.mutate(values)}
        />
      )}
    </div>
  );
}
