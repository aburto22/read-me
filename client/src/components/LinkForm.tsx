import { useState } from "react";
import { addLink } from "../api/api";

type LinkFormProps = {
  setLinks: (links: ILink[]) => void;
};

const LinkForm = ({ setLinks }: LinkFormProps): JSX.Element => {
  const [link, setLink] = useState<string>("");

  const handleChange = (event: React.FormEvent<HTMLInputElement>): void => {
    setLink(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    addLink(link).then((data) => {
      setLink("");
      setLinks(data);
    });
  };

  return (
    <form
      className="flex flex-col lg:fixed w-full max-w-sm"
      onSubmit={handleSubmit}
    >
      <label htmlFor="link" className="mb-4">
        <span className="block mb-2">Insert link:</span>
        <input
          type="text"
          name="link"
          onChange={handleChange}
          value={link}
          className="p-1 border border-gray-500 rounded w-full text-gray-primary"
        />
      </label>
      <button
        type="submit"
        className="py-2 px-4 border border-gray-500 rounded bg-gray-dark text-white w-max mx-auto"
      >
        Create
      </button>
    </form>
  );
};

export default LinkForm;
