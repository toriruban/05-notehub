import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '../../services/noteService';
import css from '../NoteList/NoteList.module.css';

export interface NoteListProps {
    page: number;
    setTotalPages: (n: number) => void;
}

export default function NoteList({ page, setTotalPages }: NoteListProps) {
    const perPage = 12; 
    const { data } = useQuery({
        queryKey: ['notes', '', page],
        queryFn: () => fetchNotes('', page, perPage),
    })

    if (!data || data.notes.length === 0) return null;

    return(
        <ul className={ css.list }>
	       {data.notes.map(note => (
            <li key={ note.id } className={ css.listItem }>
                <h2 className={ css.title }>{ note.title }</h2>
                <p className={ css.content }>{ note.content }</p>
            <div className={ css.footer }>
                <span className={ css.tag }>{ note.tag }</span>
                 <button className={ css.button }>Delete</button>
            </div>
          </li>
        ))}        
</ul>
    )
}