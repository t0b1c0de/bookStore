import SearchBookList from "./SearchBookList";
import SearchInput from "./SearchInput";
import SimpleBookList from "./SimpleBookList";
import useSearchBookStore from "./useSearchBookStore";

const BooksList = () => {
  const params = useSearchBookStore((s) => s.params);
  const setMainParams = useSearchBookStore((s) => s.setMainParams);

  return (
    <>
      <SearchInput onSearch={setMainParams} />
      {params.q || params.title || params.author ? (
        <SearchBookList />
      ) : (
        <SimpleBookList />
      )}
    </>
  );
};

export default BooksList;
