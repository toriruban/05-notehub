import ReactPaginate from 'react-paginate';
import { useEffect, useState } from 'react';
import { useDebounce } from "use-debounce";
import css from '../App/App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';
import SearchBox from '../SearchBox/SearchBox';

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

export default function App() {
  return (
    <div className={ css.app }>
	<header className={ css.toolbar }>
		<SearchBox onSearch={ handleSearch }/>
		{totalPage > 1 && (
      <Pagination
        currentPage={ currentPage }
        totalPages={ totalPage }
        onPageChange={ handlePageChange } 
      />
    )}
		<button className={css.button}>Create note +</button>
  </header>
      <NoteList 
           page={ currentPage }
           setTotalPages={ setTotalPages } 
           search={ debouncedSearch }
      />
</div>
  )
}