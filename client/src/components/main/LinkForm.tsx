import { useState, useRef, useEffect, useContext } from "react";
import { LinksContext } from "../../context/LinksContext";
import { addLink } from "../../api/apiLinks";
import Svg from "../common/svg";
import { tagsStringToArr } from "../../api/tags";

const LinkForm = (): JSX.Element => {
  const { setLinks } = useContext(LinksContext);
  const [link, setLink] = useState<string>("");
  const [tags, setTags] = useState<string>("");
  const [isTagsShowing, setIsTagsShowing] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const tagsInputRef = useRef<HTMLInputElement>(null);
  const linkInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isTagsShowing && tagsInputRef.current) {
      tagsInputRef.current.focus();
    }
  }, [isTagsShowing]);

  useEffect(() => {
    if (linkInputRef.current) {
      linkInputRef.current.focus();
    }
  }, []);

  const handleChangeLink = (event: React.FormEvent<HTMLInputElement>): void => {
    setLink(event.currentTarget.value);
  };

  const handleChangeTags = (event: React.FormEvent<HTMLInputElement>): void => {
    setTags(event.currentTarget.value);
  };

  const handleSubmit = async (event: React.FormEvent): Promise<void> => {
    event.preventDefault();
    const tagsArr = tagsStringToArr(tags);
    setLoading(true);
    const data = await addLink(link, tagsArr);
    if (!(data instanceof Error)) {
      setLink("");
      setError("");
      setTags("");
      setLinks(data);
    } else {
      setError(data.message);
    }
    setLoading(false);
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
          ref={linkInputRef}
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
            ref={tagsInputRef}
            className="p-1 border border-gray-500 rounded w-full text-gray-primary text-sm"
          />
          <p className="text-xs text-gray-300">
            Separate each tag by a comma. Tags cannot contain special
            characters.
          </p>
        </div>
      </div>
      <button
        type="submit"
        disabled={!isLinkValid || loading}
        className={`py-2 px-4 border border-gray-500 w-24 bg-gray-dark rounded text-white mx-auto flex justify-center ${
          (!isLinkValid || loading) && "opacity-50 cursor-default"
        }`}
      >
        {loading ? (
          <Svg name="spinner" className="text-white w-6 h-6 animate-spin" />
        ) : (
          "Create"
        )}
      </button>
    </form>
  );
};

export default LinkForm;
