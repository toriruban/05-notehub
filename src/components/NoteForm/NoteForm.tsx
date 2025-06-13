import { Formik, Form, Field, ErrorMessage, FormikHelpers } from 'formik';
import * as Yup from "yup";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { createNote } from '../../services/noteService';
import css from '../NoteForm/NoteForm.module.css';

const validationSchema = Yup.object({
title: Yup.string()
    .min(3, 'Minimum 3 symbols')
    .max(50, 'Maximum 50 symbols')
    .required('Title is required'),
content: Yup.string()
    .max(500, 'Maximum 500 symbols'),
tag: Yup.string()
    .oneOf([ 'Todo', 'Work', 'Personal', 'Meeting', 'Shopping' ], 'Choose the accurate one')
    .required('Tag is required'),
});
interface FormValues {
    title: string,
    content: string,
    tag: 'Work' | 'Personal' | 'Meeting' | 'Shopping' | 'Todo',
}

const initialValues: FormValues = {
    title: '',
    content: '',  
    tag: 'Todo',  
};

interface NoteFormProps {
    onClose: () => void;
}

export default function NoteForm({ onClose }: NoteFormProps) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createNote,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey:['notes'] });
            onClose();
        },
      });
    
      const handleSubmit = (values: FormValues, actions: FormikHelpers<FormValues>) => {
        mutation.mutate(values, {
          onSuccess: () => {
            actions.resetForm();
            onClose();
          }
        });
      };
      
    return (
        <Formik<FormValues>
          initialValues={ initialValues }
          validationSchema={ validationSchema }
          onSubmit={ handleSubmit }
        >
            {({ isSubmitting }) => {
                return (
            <Form className={ css.form }>
                <div className={ css.formGroup }>
                <label htmlFor="title">Title</label>
                <Field id="title" name="title" type="text" className={ css.input } />
                <ErrorMessage name="title" component="span" className={ css.error } />
                </div>

                <div className={ css.formGroup }>
                <label htmlFor="content">Content</label>
                <Field
                    as="textarea"
                    id="content"
                    name="content"
                    rows={8}
                    className={ css.textarea }
                />
                 <ErrorMessage name="content" component="span" className={ css.error } />
                </div>

                <div className={ css.formGroup }>
                <label htmlFor="tag">Tag</label>
                <Field name="tag" as="select" id="tag" className={ css.select }>
                     <option value="">Choose tag</option>
                     <option value="Todo">Todo</option>
                     <option value="Work">Work</option>
                     <option value="Personal">Personal</option>
                     <option value="Meeting">Meeting</option>
                     <option value="Shopping">Shopping</option>
                </Field>
                <ErrorMessage name="tag" component="span" className={ css.error } />
                </div>

                <div className={ css.actions }>
                <button type="button" className={ css.cancelButton } onClick={ onClose }>Cancel</button>
                <button
                     type="submit"
                     className={ css.submitButton }
                     disabled={ isSubmitting }
                >
                    Create note
                </button>
                </div>
           </Form>
           )
            }}
        </Formik>
    )
}
        

