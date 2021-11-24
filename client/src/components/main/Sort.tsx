interface ISortProps {
  sort: string;
  setSort: (sort: string) => void;
}

const Sort = ({ sort, setSort }: ISortProps): JSX.Element => {
  const handleSort = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setSort(event.currentTarget.value);
  };

  return (
    <div className="mb-4 flex justify-center">
      <p className="font-bold text-center mr-4">Sort:</p>
      <select
        name="sort"
        onChange={handleSort}
        value={sort}
        className="px-1 text-sm bg-transparent border-b border-white"
      >
        <option value="none" className="bg-gray-dark text-sm">
          None
        </option>
        <option value="unread" className="bg-gray-dark text-sm">
          Unread first
        </option>
        <option value="read" className="bg-gray-dark">
          Read first
        </option>
      </select>
    </div>
  );
};

export default Sort;
