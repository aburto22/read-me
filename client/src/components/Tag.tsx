import { useState } from "react";

interface ITagProps {
  tag: string;
  setFilterTags: (
    tags: string[] | ((filterTags: string[]) => string[])
  ) => void;
}

const Tag = ({ tag, setFilterTags }: ITagProps): JSX.Element => {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    if (isActive) {
      setFilterTags((filterTags) => filterTags.filter((val) => val !== tag));
      setIsActive(false);
    } else {
      setFilterTags((filterTags) => [...filterTags, tag]);
      setIsActive(true);
    }
  };

  return (
    <li>
      <button
        type="button"
        className={`px-2 py-1 m-1 text-sm border border-gray-500 bg-gray-dark rounded text-white opacity-70 ${
          isActive && "opacity-100"
        }`}
        onClick={handleClick}
      >
        {tag}
      </button>
    </li>
  );
};

export default Tag;
