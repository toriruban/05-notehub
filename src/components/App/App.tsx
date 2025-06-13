import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import { useDebounce } from "use-debounce";
import css from '../App/App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';
import NoteModal from '../NoteModal/NoteModal';

export default function App() {
  const[ currentPage, setCurrentPage ] = useState(1);
  const [ totalPage, setTotalPages ] = useState(1);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const [ search, setSearch ] = useState('');
  const [ debouncedSearch ] = useDebounce(search, 400);
  const handleSearch = (searchText: string) => {
    setSearch(searchText);
    setCurrentPage(1);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);


  return (
    <div className={ css.app }>
      <Toaster
  position="top-center"
  reverseOrder={false}
/>
	<header className={ css.toolbar }>
		<SearchBox onSearch={ handleSearch }/>
		{totalPage > 1 && (
      <Pagination
        currentPage={ currentPage }
        totalPages={ totalPage }
        onPageChange={ handlePageChange } 
      />
    )}
		<button className={css.button} onClick={() => setIsModalOpen(true)}>Create note +</button>
    {isModalOpen && <NoteModal onClose={() => setIsModalOpen(false)} />}
  </header>
      <NoteList 
           page={ currentPage }
           setTotalPages={ setTotalPages } 
           search={ debouncedSearch }
      />
</div>
  )
}