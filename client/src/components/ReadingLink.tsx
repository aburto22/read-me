import { useState } from "react";
import Svg from "./common/svg";
import { deleteLink, setReadLink } from "../api/api";

interface IReadingLinkParams {
  name: string;
  description: string;
  link: string;
  linkId: string;
  isRead: boolean;
  setLinks: (links: ILink[]) => void;
}

const ReadingLink = ({
  name,
  description,
  link,
  linkId,
  isRead,
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

  const nameLong = name.length > 48 ? `${name.slice(0, 45)}...` : name;
  const descriptionLong =
    description.length > 83 ? `${description.slice(0, 80)}...` : description;
  const linkLong = link.length > 48 ? `${link.slice(0, 45)}...` : link;

  return (
    <li
      key={linkId}
      className={`border border-gray-300 rounded flex mb-1 bg-gray-dark ${
        read && "border-green-500"
      }`}
    >
      <div className={`mr-2 relative flex-grow py-2 pl-3 `}>
        <h2 className="text-sm font-bold">
          <span className="sm:hidden">{nameShort}</span>
          <span className="hidden sm:inline">{nameLong}</span>
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
          <span className="sm:hidden">{descriptionShort}</span>
          <span className="hidden sm:inline">{descriptionLong}</span>
        </p>
      </div>
      <div
        className={`flex flex-col justify-between items-center w-16 py-2 px-1 border-l ${
          isRead ? "border-green-500" : "border-gray-300"
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
