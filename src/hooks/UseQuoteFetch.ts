import { Quote, quotesInterface, setQuotes } from "@/redux/slices/quotesSlice";
import axios from "axios";
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";

export default function UseQuoteFetch(pageNumber:number) {
    const dispatch = useDispatch();
    const quotes = useSelector((state: {quotesSlice: quotesInterface}) => state.quotesSlice.quotes);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [hasMore, setHasMore] = useState(false);

    useEffect(() => {
        let cancel:any|null = null;
        const getBooks = async () => {
            try 
            {
                setLoading(true);
                setError(false);
                const response = await axios.get("https://dummyjson.com/quotes?limit=30", {
                    params: {
                        skip: pageNumber * 30
                    },
                    cancelToken: new axios.CancelToken(c => cancel = c)
                })
                const modifiedResponseQuotes = response.data.quotes.map((element:Quote) => ({...element, editMode: false, newQuote: element.quote, newAuthor: element.author}));
                dispatch(setQuotes([...quotes, ...modifiedResponseQuotes]));
                setHasMore(response.data.quotes.length > 0);
                setLoading(false);
            }
            catch(error)
            {
                if (axios.isCancel(error))
                {
                    return;
                }
                setLoading(false);
                setError(true);
            }
        }
        getBooks();
        return () => cancel();
    }, [pageNumber])

  return (
    {loading, error, quotes, hasMore}
  )
}
