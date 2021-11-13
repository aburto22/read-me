import { useState, useEffect } from "react";
import LinkForm from "./components/LinkForm";
import { getLinks } from "./api/api";

const App = (): JSX.Element => {
  const [links, setLinks] = useState<ILink[]>([]);

  useEffect(() => {
    getLinks().then((data) => setLinks(data));
  }, []);

  const LinksComponent = links.map((link) => (
    <li key={link._id} className="border border-gray-300 p-2 rounded">
      <p>{link.name}</p>
      <p>{link.description}</p>
      <a href={link.link}>{link.link}</a>
    </li>
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
