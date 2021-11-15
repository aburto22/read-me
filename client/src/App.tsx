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
    <div className="min-h-screen flex flex-col items-center justify-center lg:flex-row">
      <div className="mb-8 lg:mb-0 lg:mr-8">
        <LinkForm setLinks={setLinks} />
      </div>
      <div className="flex flex-col items-center w-full max-w-md">
        <div className="mb-4">
          <p className="font-bold text-center">Filters:</p>
          <select name="filters" onChange={handleShow}>
            <option value="all" selected={show === "all"}>
              Show all
            </option>
            <option value="unread" selected={show === "unread"}>
              Show unread
            </option>
            <option value="read" selected={show === "read"}>
              Show read
            </option>
          </select>
        </div>
        <ul>{LinksComponent}</ul>
      </div>
    </div>
  );
};

export default App;
