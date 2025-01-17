import { useState, forwardRef, ChangeEvent } from 'react';
import styles from './Quote.module.css';
import { HoverCard } from '@radix-ui/react-hover-card';
import { HoverCardContent, HoverCardTrigger } from '@/components/ui/hover-card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useDispatch } from 'react-redux';
import { changeQuote, removeElement, setEditMode } from '@/redux/slices/quotesSlice';

interface QuoteProps {
  author: string;
  newAuthor: string;
  quote: string;
  newQuote: string;
  id: number;
  editMode: boolean;
}

const Quote = forwardRef<HTMLDivElement, QuoteProps>(
  (props, ref) => {
    const { author, newAuthor, quote, newQuote, id, editMode } = props;
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const handleQuoteChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeQuote({id, newQuote: e.target.value, newAuthor}));
    }

    const handleAuthorChange = (e: ChangeEvent<HTMLInputElement>) => {
      dispatch(changeQuote({id, newQuote, newAuthor: e.target.value}))
    }

    const handleDelete = (id: number) => {
      dispatch(removeElement(id));
    };

    return (
      <div ref={ref}>
      <HoverCard open={open}>
        <HoverCardTrigger
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <div className={styles.element}>
            {editMode ? (
              <>
                <Input
                  className={styles.text}
                  value={newQuote}
                  // onChange={handleElementChange("text")}
                  onChange={handleQuoteChange}
                />
                <Input
                  className={styles.author}
                  value={newAuthor}
                  // onChange={handleElementChange("author")}
                  onChange={handleAuthorChange}
                />
              </>
            ) : (
              <>
                <h3 className={styles.text}>{quote}</h3>
                <p className={styles.author}>@{author}</p>
              </>
            )}
          </div>
        </HoverCardTrigger>
        <HoverCardContent
          className={styles.trigger}
          onMouseEnter={() => setOpen(true)}
          onMouseLeave={() => setOpen(false)}
        >
          <Button onClick={() => dispatch(setEditMode(id))}>
            {editMode ? 'Save' : 'Edit'}
          </Button>
          <Button onClick={() => handleDelete(id)}>Delete</Button>
        </HoverCardContent>
      </HoverCard>
      </div>
    );
  }
);

export default Quote;
