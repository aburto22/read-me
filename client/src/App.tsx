import { useState, useEffect } from "react";
import LinkForm from "./components/LinkForm";
import { getLinks } from "./api/api";
import ReadingLink from "./components/ReadingLink";
import Tag from "./components/Tag";
import Filters from "./components/Filters";
import Sort from "./components/Sort";

const App = (): JSX.Element => {
  // TODO: Let users add tags when creating a link.
  const [links, setLinks] = useState<ILink[]>([]);
  const [show, setShow] = useState<string>("all");
  const [sort, setSort] = useState<string>("none");
  const [filterTags, setFilterTags] = useState<string[]>([]);

  useEffect(() => {
    getLinks().then((data) => setLinks(data));
  }, []);

  const checkTagsInFilterTags = (tags: string[]): boolean =>
    tags.reduce(
      (bool: boolean, tag) => bool || filterTags.includes(tag),
      false
    );

  const filteredLinks = links
    .filter((link) => {
      switch (show) {
        case "all":
          return true;
        case "read":
          return link.isRead;
        case "unread":
          return !link.isRead;
        default:
          return false;
      }
    })
    .sort((a, b) => {
      if (b.isRead === a.isRead) {
        return 0;
      }
      switch (sort) {
        case "none":
          return 0;
        case "read":
          return b.isRead && !a.isRead ? 1 : -1;
        case "unread":
          return !b.isRead && a.isRead ? 1 : -1;
        default:
          return 0;
      }
    });

  const TagsComponent = filteredLinks
    .reduce((arr: string[], link) => {
      const newArr = [...arr];
      link.tags.forEach((tag) => {
        if (!newArr.includes(tag)) {
          newArr.push(tag);
        }
      });
      return newArr;
    }, [])
    .map((tag) => <Tag tag={tag} key={tag} setFilterTags={setFilterTags} />);

  const LinksComponent = filteredLinks
    .filter((link) => !filterTags.length || checkTagsInFilterTags(link.tags))
    .map((link) => (
      <ReadingLink key={link._id} link={link} setLinks={setLinks} />
    ));

  if (LinksComponent.length === 0 && filterTags.length > 0) {
    setFilterTags([]);
  }

  return (
    <div className="min-h-screen flex flex-col items-start justify-center lg:flex-row bg-gray-primary text-white px-2 w-full">
      <div className="flex items-center mt-8 lg:mt-0 max-w-sm w-full mx-auto lg:mr-12 lg:ml-0 relative lg:h-screen">
        <div className="lg:fixed w-full max-w-sm">
          <h1 className="text-2xl mb-6 text-center">Read Me</h1>
          <LinkForm setLinks={setLinks} />
          <Filters show={show} setShow={setShow} />
          <Sort sort={sort} setSort={setSort} />
          {TagsComponent.length > 0 && (
            <div>
              <p className="font-bold text-center mr-4">Tags:</p>
              <ul className="flex justify-center">{TagsComponent}</ul>
            </div>
          )}
        </div>
      </div>
      <div className="flex flex-col items-center lg:min-h-screen lg:justify-center w-full pb-8 pt-4 lg:py-8 mx-auto lg:mx-0 max-w-md">
        {links.length > 0 ? (
          <ul className="max-w-full">{LinksComponent}</ul>
        ) : (
          <p>Add links to create a reading list.</p>
        )}
      </div>
    </div>
  );
};

export default App;
