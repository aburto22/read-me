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

  const nameShort = name.length > 33 ? `${name.slice(0, 30)}...` : name;
  const descriptionShort =
    description.length > 63 ? `${description.slice(0, 60)}...` : description;
  const linkShort = link.length > 33 ? `${link.slice(0, 30)}...` : link;

  const nameLong = name.length > 38 ? `${name.slice(0, 35)}...` : name;
  const descriptionLong =
    description.length > 83 ? `${description.slice(0, 80)}...` : description;
  const linkLong = link.length > 43 ? `${link.slice(0, 40)}...` : link;

  return (
    <li
      key={linkId}
      className={`border border-gray-300 rounded flex mb-1 bg-gray-dark ${
        read && "border-green-500"
      }`}
    >
      <div className="flex relative">
        <div className="w-20 h-full rounded-l hidden sm:block bg-blue-image flex-shrink-0">
          {image && (
            <img
              src={image}
              alt="Read link cover"
              className="object-cover rounded-l w-full h-full"
            />
          )}
        </div>
        <div className="mr-2 flex-grow py-2 pl-3">
          <h2 className="text-sm font-bold">
            <span
              className="sm:hidden"
              dangerouslySetInnerHTML={{ __html: nameShort }}
            />
            <span
              className="hidden sm:inline"
              dangerouslySetInnerHTML={{ __html: nameLong }}
            />
          </h2>
          <a
            className="text-xs"
            href={link}
            target="_blank"
            rel="noreferrer"
            onClick={handleClick}
          >
            <span className="sm:hidden">{linkShort}</span>
            <span className="hidden sm:inline">{linkLong}</span>
            <div className="absolute inset-0" />
          </a>
          <p className="text-sm break-normal max-w-xxs sm:max-w-xs">
            <span
              className="sm:hidden"
              dangerouslySetInnerHTML={{ __html: descriptionShort }}
            />
            <span
              className="hidden sm:inline"
              dangerouslySetInnerHTML={{ __html: descriptionLong }}
            />
          </p>
        </div>
      </div>
      <div
        className={`flex flex-col justify-between items-center w-14 py-2 px-1 border-l ml-auto flex-shrink-0 ${
          read ? "border-green-500" : "border-gray-300"
        }`}
      >
        <button type="button" onClick={handleDelete} className="">
          <Svg name="trash" className="h-5 w-5" />
        </button>
        <button type="button" className="text-xs" onClick={handleToggle}>
          {read ? "read" : "unread"}
        </button>
      </div>
    </li>
  );
};

export default ReadingLink;
