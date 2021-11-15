import { useState, useEffect } from "react";
import LinkForm from "./components/LinkForm";
import { getLinks } from "./api/api";
import ReadingLink from "./components/ReadingLink";

const App = (): JSX.Element => {
  const [links, setLinks] = useState<ILink[]>([]);

  useEffect(() => {
    getLinks().then((data) => setLinks(data));
  }, []);

  const LinksComponent = links.map((link) => (
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
    <div className="min-h-screen flex items-center justify-center flex-col">
      <div className="mb-4">
        <LinkForm setLinks={setLinks} />
      </div>
      <ul>{LinksComponent}</ul>
    </div>
  );
};

export default App;
