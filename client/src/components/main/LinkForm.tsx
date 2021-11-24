import { useState } from "react";
import { addLink } from "../../api/api";
import Svg from "../common/svg";
import { tagsStringToArr } from "../../api/tags";

type LinkFormProps = {
  setLinks: (links: ILink[]) => void;
};

const LinkForm = ({ setLinks }: LinkFormProps): JSX.Element => {
  const [link, setLink] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isTagsShowing, setIsTagsShowing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");

  const handleChangeLink = (event: React.FormEvent<HTMLInputElement>): void => {
    setLink(event.currentTarget.value);
  };

  const handleChangeTags = (event: React.FormEvent<HTMLInputElement>): void => {
    setTags(event.currentTarget.value);
  };

  const handleSubmit = (event: React.FormEvent): void => {
    event.preventDefault();
    const tagsArr = tagsStringToArr(tags);
    addLink(link, tagsArr)
      .then((data) => {
        setLink("");
        setError("");
        setTags("");
        setLinks(data);
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  const isLinkValid = /^[^<>]+\.[^<>]+$/.test(link);

  return (
    <form className="flex flex-col w-full mb-10" onSubmit={handleSubmit}>
      <label htmlFor="link" className="mb-2">
        <div className="mb-2 flex items-center">
          <span>Insert link:</span>
          <span className="ml-auto text-red-500 text-sm">{error}</span>
        </div>
        <input
          type="text"
          name="link"
          onChange={handleChangeLink}
          value={link}
          className="p-1 border border-gray-500 rounded w-full text-gray-primary"
        />
      </label>
      <div className="mb-3">
        <button
          type="button"
          className="text-sm flex items-center"
          onClick={() => setIsTagsShowing((val) => !val)}
        >
          Add tags{"   "}
          {isTagsShowing ? (
            <span>
              <Svg name="chevronUp" className="w-4 h-4" />
            </span>
          ) : (
            <span>
              <Svg name="chevronDown" className="w-4 h-4" />
            </span>
          )}
        </button>
        <div className={`mt-2 mb-3 ${isTagsShowing ? "block" : "hidden"}`}>
          <input
            type="text"
            name="tags"
            onChange={handleChangeTags}
            value={tags}
            className="p-1 border border-gray-500 rounded w-full text-gray-primary text-sm"
          />
          <p className="text-xs">
            Separate each tag by a comma. Tags cannot contain special
            characters.
          </p>
        </div>
      </div>
      <button
        type="submit"
        disabled={!isLinkValid}
        className={`py-2 px-4 border border-gray-500 bg-gray-dark rounded text-white w-max mx-auto ${
          !isLinkValid && "opacity-50 cursor-default"
        }`}
      >
        Create
      </button>
    </form>
  );
};

export default LinkForm;
