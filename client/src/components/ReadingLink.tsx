import Svg from "./common/svg";
import { deleteLink } from "../api/api";

interface IReadingLinkParams {
  name: string;
  description: string;
  link: string;
  linkId: string;
  setLinks: (links: ILink[]) => void;
}

const ReadingLink = ({
  name,
  description,
  link,
  linkId,
  setLinks,
}: IReadingLinkParams): JSX.Element => {
  const handleClick = async (): Promise<void> => {
    const links = await deleteLink(linkId);
    setLinks(links);
  };

  return (
    <li key={linkId} className="border border-gray-300 p-2 rounded relative">
      <button
        type="button"
        onClick={handleClick}
        className="absolute top-3 right-2"
      >
        <Svg name="trash" className="h-5 w-5" />
      </button>
      <p>{name}</p>
      <p>{description}</p>
      <a href={link}>{link}</a>
    </li>
  );
};

export default ReadingLink;
