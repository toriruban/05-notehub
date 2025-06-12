import { useQuery, useQueryClient, useMutation, Mutation } from '@tanstack/react-query';
import { fetchNotes, deleteNote  } from '../../services/noteService';
import css from '../NoteList/NoteList.module.css';

export interface NoteListProps {
    page: number;
    setTotalPages: (n: number) => void;
    search: string;
}

export default function NoteList({ page, setTotalPages, search }: NoteListProps) {
    const perPage = 12; 
    const queryClient = useQueryClient();

    const { data } = useQuery({
        queryKey: ['notes', search, page],
        queryFn: () => fetchNotes(search, page, perPage),
    });

    const deleteTask = useMutation({
        mutationFn: (noteId: number) => deleteNote(noteId),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['notes'] });
        }
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
                 <button className={ css.button }
                 onClick={() => deleteTask.mutate(note.id)}>Delete
                 </button>
            </div>
          </li>
        ))}        
</ul>
    )
}