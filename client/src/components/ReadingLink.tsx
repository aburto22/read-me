/* eslint-disable react/no-danger */
import { useState } from "react";
import Svg from "./common/svg";
import { deleteLink, setReadLink } from "../api/api";

interface IReadingLinkParams {
  name: string;
  description: string;
  link: string;
  linkId: string;
  isRead: boolean;
  image: string;
  setLinks: (links: ILink[]) => void;
}

const ReadingLink = ({
  name,
  description,
  link,
  linkId,
  isRead,
  image,
  setLinks,
}: IReadingLinkParams): JSX.Element => {
  const [read, setRead] = useState(isRead);

  const handleDelete = async (): Promise<void> => {
    const links = await deleteLink(linkId);
    setLinks(links);
  };

  const handleClick = async (): Promise<void> => {
    if (!isRead) {
      setRead(true);
      const links = await setReadLink(linkId, true);
      setLinks(links);
    }
  };

  const handleToggle = async (): Promise<void> => {
    setRead((val) => !val);
    const links = await setReadLink(linkId, !read);
    setLinks(links);
  };

  return (
    <li
      key={linkId}
      className={`border border-gray-300 rounded flex mb-1 bg-gray-dark ${
        read && "border-green-500"
      }`}
    >
      <div className="flex relative">
        <div className="w-20 h-full rounded-l hidden sm:flex bg-blue-image flex-shrink-0 sm:items-center sm:justify-center">
          {image ? (
            <img
              src={image}
              alt="Read link cover"
              className="object-cover rounded-l w-full h-full"
            />
          ) : (
            <p className="text-5xl text-white">{name[0]}</p>
          )}
        </div>
        <div className="mr-2 flex-grow py-2 pl-3 max-w-list-small sm:max-w-list-reg">
          <h2
            className="text-sm font-bold overflow-ellipsis overflow-hidden whitespace-nowrap"
            dangerouslySetInnerHTML={{ __html: name }}
          />
          <a
            className="text-xs block overflow-ellipsis overflow-hidden whitespace-nowrap mb-2"
            href={link}
            target="_blank"
            rel="noreferrer"
            onClick={handleClick}
          >
            {link}
            <div className="absolute inset-0" />
          </a>
          <p
            className="text-sm break-normal max-w-xxs sm:max-w-xs line-clamp-2"
            dangerouslySetInnerHTML={{ __html: description }}
          />
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
          className="text-xs"
          onClick={handleToggle}
          title="Toggle read/unread"
        >
          {read ? "read" : "unread"}
        </button>
      </div>
    </li>
  );
};

export default ReadingLink;
