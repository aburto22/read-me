const ReadingSkeleton = (): JSX.Element => (
  <li className="border border-gray-300 rounded flex mb-1 bg-gray-dark">
    <div className="flex relative">
      <div className="w-20 h-full rounded-l hidden sm:flex bg-gray-200 flex-shrink-0 sm:items-center sm:justify-center animate-pulse" />
      <div className="mr-2 flex-grow py-2 pl-3 max-w-list-small sm:max-w-list-reg w-60">
        <div className="bg-gray-200 animate-pulse h-5 mb-1 w-full rounded" />
        <div className="mb-1 bg-gray-200 animate-pulse h-4 w-full rounded" />
        <div className="max-w-xxs sm:max-w-xs bg-gray-200 animate-pulse h-10 w-full rounded" />
      </div>
    </div>
    <div className="flex flex-col justify-between items-center w-14 py-2 px-1 border-l ml-auto flex-shrink-0">
      <div className="bg-gray-200 animate-pulse h-5 w-5 rounded" />
      <div className="bg-gray-200 animate-pulse h-5 w-5 rounded" />
      <div className="bg-gray-200 animate-pulse h-5 w-10 rounded" />
    </div>
  </li>
);

export default ReadingSkeleton;
