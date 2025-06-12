import ReactPaginate from 'react-paginate';
import { useState } from 'react';
import css from '../App/App.module.css';
import NoteList from '../NoteList/NoteList';
import Pagination from '../Pagination/Pagination';

const[ currentPage, setCurrentPage ] = useState(1);
const [ totalPage, setTotalPages ] = useState(1);
const handlePageChange = (page: number) => {
  setCurrentPage(page);
};

export default function App() {
  return (
    <div className={ css.app }>
	<header className={ css.toolbar }>
		{/* Компонент SearchBox */}
		{totalPage > 1 && (
      <Pagination
        currentPage={ currentPage }
        totalPages={ totalPage }
        onPageChange={ handlePageChange } 
      />
    )}
		{/* Кнопка створення нотатки */}
  </header>
      <NoteList 
           page={ currentPage }
           setTotalPages={ setTotalPages } 
      />
</div>
  )
}