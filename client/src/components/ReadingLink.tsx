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

  const handleClick = async (bool: boolean): Promise<void> => {
    setRead(bool);
    if (isRead !== bool) setReadLink(linkId, bool);
  };

  return (
    <li key={linkId} className="border border-gray-300 p-2 rounded flex">
      <div className={`mr-4 relative flex-grow ${read && "bg-green-200"}`}>
        <h2 className="text-sm font-bold">
          {name.length > 40 ? `${name.slice(0, 40)}...` : name}
        </h2>
        <a
          className="text-xs"
          href={link}
          target="_blank"
          rel="noreferrer"
          onClick={() => handleClick(true)}
        >
          {link.length > 40 ? `${link.slice(0, 40)}...` : link}
          <div className="absolute inset-0" />
        </a>
        <p className="text-sm break-normal max-w-xs">
          {description.length > 80
            ? `${description.slice(0, 80)}...`
            : description}
        </p>
      </div>
      <div>
        <button type="button" onClick={handleDelete} className="">
          <Svg name="trash" className="h-5 w-5" />
        </button>
      </div>
    </li>
  );
};

export default ReadingLink;
