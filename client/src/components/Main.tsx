import { useState, useEffect } from "react";
import LinkForm from "./main/LinkForm";
import { getLinks } from "../api/apiLinks";
import ReadingLink from "./main/ReadingLink";
import Tag from "./main/Tag";
import Filters from "./main/Filters";
import Sort from "./main/Sort";
import ReadingSkeleton from "./main/ReadingSkeleton";

const Main = (): JSX.Element => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [show, setShow] = useState<string>("all");
  const [sort, setSort] = useState<string>("none");
  const [filterTags, setFilterTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setIsLoading(true);
    getLinks().then((data) => {
      setIsLoading(false);
      if (!(data instanceof Error)) {
        setLinks(data);
      }
    });
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

  const ListContent =
    links.length > 0 ? (
      <ul className="max-w-full">{LinksComponent}</ul>
    ) : (
      <p>Add links to create a reading list.</p>
    );

  const LoadingContent = Array(4)
    .fill(0)
    .map((val) => <ReadingSkeleton key={val + Math.random()} />);

  return (
    <main className="flex flex-col items-start justify-center xl:flex-row px-2 w-full">
      <div className="flex items-center mt-8 max-w-sm w-full mx-auto xl:mr-12 xl:ml-0 relative xl:h-screen-navbar xl:mt-navbar">
        <div className="xl:fixed w-full max-w-sm xl:min-h-form-link">
          <h1 className="text-2xl mb-6 text-center">Read My List</h1>
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
      <div className="flex flex-col items-center xl:min-h-screen-navbar xl:justify-center w-full pb-8 pt-4 xl:py-8 mx-auto xl:mx-0 max-w-md xl:mt-navbar">
        {isLoading ? (
          <ul className="max-w-full">{LoadingContent}</ul>
        ) : (
          ListContent
        )}
      </div>
    </main>
  );
};

export default Main;
