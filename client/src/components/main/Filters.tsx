interface IFiltersProps {
  show: string;
  setShow: (show: string) => void;
}

const Filters = ({ show, setShow }: IFiltersProps): JSX.Element => {
  const handleShow = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setShow(event.currentTarget.value);
  };

  return (
    <div className="mb-2 flex justify-center">
      <p className="font-bold text-center mr-4">Filters:</p>
      <select
        name="filters"
        onChange={handleShow}
        value={show}
        className="px-1 text-sm bg-transparent border-b border-white"
      >
        <option value="all" className="bg-gray-dark">
          Show all
        </option>
        <option value="unread" className="bg-gray-dark">
          Show unread
        </option>
        <option value="read" className="bg-gray-dark">
          Show read
        </option>
      </select>
    </div>
  );
};

export default Filters;
