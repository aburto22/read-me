import { useState, useEffect } from "react";
import LinkForm from "./components/LinkForm";
import { getLinks } from "./api/api";
import ReadingLink from "./components/ReadingLink";

const App = (): JSX.Element => {
  const [links, setLinks] = useState<ILink[]>([]);
  const [show, setShow] = useState<string>("all");

  useEffect(() => {
    getLinks().then((data) => setLinks(data));
  }, []);

  const handleShow = (event: React.ChangeEvent<HTMLSelectElement>): void => {
    setShow(event.currentTarget.value);
  };

  const LinksComponent = links
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
    .map((link) => (
      <ReadingLink
        key={link._id}
        name={link.name}
        description={link.description}
        linkId={link._id}
        link={link.link}
        isRead={link.isRead}
        setLinks={setLinks}
      />
    ));

  return (
    <div className="min-h-screen flex flex-col items-start justify-center lg:flex-row bg-gray-primary text-white px-2 w-full">
      <div className="flex items-center mt-8 lg:mt-0 max-w-sm w-full mx-auto lg:mr-12 lg:ml-0 relative lg:h-screen">
        <LinkForm setLinks={setLinks} />
      </div>
      <div className="flex flex-col items-center lg:min-h-screen lg:justify-center w-full py-8 mx-auto lg:mx-0 max-w-md">
        {links.length > 0 ? (
          <>
            <div className="mb-4">
              <p className="font-bold text-center mb-2">Filters:</p>
              <select
                name="filters"
                onChange={handleShow}
                value={show}
                className="text-gray-primary rounded px-1 text-sm"
              >
                <option value="all">Show all</option>
                <option value="unread">Show unread</option>
                <option value="read">Show read</option>
              </select>
            </div>
            <ul className="max-w-full">{LinksComponent}</ul>
          </>
        ) : (
          <p>Add links to create a reading list.</p>
        )}
      </div>
    </div>
  );
};

export default App;
