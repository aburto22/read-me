import { useState } from "react";
import axios from "axios";

type LinkFormProps = {
  setLinks: (links: LinkT[]) => void;
};

const LinkForm = ({ setLinks }: LinkFormProps): JSX.Element => {
  const [link, setLink] = useState<string>("");

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setLink(event.target.value);
  };

  const handleSubmit: React.FormEventHandler = async (event) => {
    event.preventDefault();
    const { data } = await axios.post("http://localhost:5000/new-link", {
      link,
    });

    setLink("");
    setLinks(data.links);
  };

  return (
    <form className="flex flex-col" onSubmit={handleSubmit}>
      <label htmlFor="link" className="mb-4">
        <span className="block mb-2">Insert link:</span>
        <input
          type="text"
          name="link"
          onChange={handleChange}
          value={link}
          className="p-1 border border-gray-500 rounded w-80"
        />
      </label>
      <button
        type="submit"
        className="py-2 px-4 border border-gray-500 rounded bg-black text-white w-max mx-auto"
      >
        Create
      </button>
    </form>
  );
};

export default LinkForm;
