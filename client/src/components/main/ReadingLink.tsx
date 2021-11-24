/* eslint-disable react/no-danger */
import { useState, useRef, useEffect } from "react";
import Svg from "../common/svg";
import { deleteLink, setReadLink, setLinkTags } from "../../api/api";
import { tagsStringToArr, tagsArrToString } from "../../api/tags";

interface IReadingLinkParams {
  link: ILink;
  setLinks: (links: ILink[]) => void;
}

const ReadingLink = ({ link, setLinks }: IReadingLinkParams): JSX.Element => {
  // TODO: Sanitize input as user types.
  const [read, setRead] = useState(link.isRead);
  const [tags, setTags] = useState(link.tags);
  const [inputTags, setInputTags] = useState(tags.join(", "));
  const [isEditingTags, setIsEditingTags] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const exitInputEsc = (event: KeyboardEvent): void => {
      if (event.key === "Escape") {
        setIsEditingTags(false);
        setInputTags(tags.join(", "));
      }
    };

    if (isEditingTags && inputRef.current) {
      inputRef.current.focus();
      inputRef.current.addEventListener("keydown", exitInputEsc);
    }

    return () => {
      if (inputRef.current) {
        inputRef.current.removeEventListener("keydown", exitInputEsc);
      }
    };
  }, [isEditingTags]);

  const handleDelete = async (): Promise<void> => {
    const links = await deleteLink(link._id);
    setLinks(links);
  };

  const handleClick = async (): Promise<void> => {
    if (!link.isRead) {
      setRead(true);
      const links = await setReadLink(link._id, true);
      setLinks(links);
    }
  };

  const handleReadToggle = async (): Promise<void> => {
    setRead((val) => !val);
    const links = await setReadLink(link._id, !read);
    setLinks(links);
  };

  const handleInputToggle = (): void => {
    if (!isEditingTags) {
      setIsEditingTags(true);
    } else {
      setIsEditingTags(false);
      setInputTags(tags.join(", "));
    }
  };

  const handleUpdateTags = async (): Promise<void> => {
    const tagsArr = tagsStringToArr(inputTags);
    setTags(tagsArr);
    const tagsStr = tagsArrToString(tagsArr);
    setInputTags(tagsStr);
    setIsEditingTags(false);
    const links = await setLinkTags(link._id, tagsArr);
    setLinks(links);
  };

  const handleInputKey = (event: React.KeyboardEvent): void => {
    if (event.key === "Enter") {
      handleUpdateTags();
    }
  };

  return (
    <li
      className={`border border-gray-300 rounded flex mb-1 bg-gray-dark min-h-reading ${
        read && "border-green-500"
      }`}
    >
      <div className="flex relative">
        <div className="w-20 h-full rounded-l hidden sm:flex bg-blue-image flex-shrink-0 sm:items-center sm:justify-center">
          {link.image ? (
            <img
              src={link.image}
              alt="Read link cover"
              className="object-cover rounded-l w-full h-full"
            />
          ) : (
            <p className="text-5xl text-white">{link.name[0]}</p>
          )}
        </div>
        <div className="mr-2 flex-grow py-2 pl-3 max-w-list-small sm:max-w-list-reg flex flex-col justify-center">
          <h2
            className="text-sm font-bold overflow-ellipsis overflow-hidden whitespace-nowrap"
            dangerouslySetInnerHTML={{ __html: link.name }}
          />
          <a
            className="text-xs block overflow-ellipsis overflow-hidden whitespace-nowrap mb-1"
            href={link.link}
            target="_blank"
            rel="noreferrer"
            onClick={handleClick}
          >
            {link.link}
            {!isEditingTags && <div className="absolute inset-0" />}
          </a>
          <p
            className="text-sm break-normal max-w-xxs sm:max-w-xs line-clamp-2"
            dangerouslySetInnerHTML={{ __html: link.description }}
          />
          <div
            className={`text-xs italic mt-1 flex ${
              isEditingTags || tags.length > 0 ? "block" : "hidden"
            }`}
          >
            <p className="mr-1 py-1">
              tags:{" "}
              <span className={`${isEditingTags && "hidden"}`}>
                {tags.join(", ")}
              </span>
            </p>
            <div
              className={`${isEditingTags ? "block" : "hidden"} flex-grow flex`}
            >
              <input
                type="text"
                value={inputTags}
                onChange={(event) => setInputTags(event.target.value)}
                onKeyPress={handleInputKey}
                className="text-gray-primary px-1 flex-grow rounded-l outline-none"
                ref={inputRef}
              />
              <button
                type="button"
                className="px-2 bg-gray-200 rounded-r"
                title="Update tags"
                onClick={handleUpdateTags}
              >
                <Svg name="check" className="h-5 w-5 text-gray-primary" />
              </button>
            </div>
          </div>
        </div>
      </div>
      <div
        className={`flex flex-col justify-between items-center w-14 py-2 px-1 border-l ml-auto flex-shrink-0 ${
          read ? "border-green-500" : "border-gray-300"
        }`}
      >
        <button
          type="button"
          onClick={handleDelete}
          className=""
          title="Delete link"
        >
          <Svg name="trash" className="h-5 w-5" />
        </button>
        <button
          type="button"
          onClick={handleInputToggle}
          className=""
          title="Edit tags"
        >
          <Svg name="edit" className="h-5 w-5" />
        </button>
        <button
          type="button"
          className="text-xs"
          onClick={handleReadToggle}
          title="Toggle read/unread"
        >
          {read ? "read" : "unread"}
        </button>
      </div>
    </li>
  );
};

export default ReadingLink;
