import UseQuoteFetch from '@/hooks/UseQuoteFetch';
import { headerInterface } from '@/redux/slices/headerSlice';
import { useDispatch, useSelector } from 'react-redux';
import Quote from './Quote/Quote';
import { Progress } from '@/components/ui/progress';
import styles from "./Quotes.module.css";
import { useCallback, useEffect, useRef, useState } from 'react';
import { incrementPageNumber, quotesInterface } from '@/redux/slices/quotesSlice';

export default function Quotes() {
  const dispatch = useDispatch();
  const searchText = useSelector((state: {headerSlice: headerInterface}) => state.headerSlice.searchText);
  const pageNumber = useSelector((state: {quotesSlice: quotesInterface}) => state.quotesSlice.pageNumber);
  const filterValue = useSelector((state: {headerSlice: headerInterface}) => state.headerSlice.filterValue);
  const quotes = useSelector((state: {quotesSlice: quotesInterface}) => state.quotesSlice.quotes);
  const [progress, setProgress] = useState(10);

  useEffect(() => {
    setProgress(30);
    const timer = setTimeout(() => {setProgress(90)}, 200);
    return () => clearTimeout(timer);
  }, [])

  const filteredQuotes = quotes
    .filter((element) => element.quote.toLowerCase().includes(searchText.toLowerCase()))
    .filter((element) => filterValue === "reset" || element.author.includes(filterValue));

  
  const {loading, error, hasMore} = UseQuoteFetch(pageNumber);

  const observer = useRef<IntersectionObserver|null>(null);
  const lastQuoteElementRef = useCallback((node:any) => {

    if (loading) 
    {
      return;
    }
    if (observer.current)
    {
      observer.current.disconnect();
    }

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore)
      {
        dispatch(incrementPageNumber());
      }
    })

    if (node) 
    {
      observer.current.observe(node);
    }

  }, [loading, hasMore])

  return (
    <>
      {
        filteredQuotes.map((element:any, ind) => {
          if (ind + 1 == filteredQuotes.length)
          {
            return <Quote ref={lastQuoteElementRef} key={element.id} {...element} />
          }
          else
          {
            return <Quote key={element.id} {...element} />
          }
        })
      }
      {loading && <Progress value={progress} className={styles.progress} />}
      <p>{error && "Error"}</p>
    </>
  )
}
