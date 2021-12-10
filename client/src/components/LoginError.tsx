const LoginError = (): JSX.Element => (
  <div className="xl:pt-navbar maxs-w-screen-sm mx-auto min-h-screen-navbar flex flex-col justify-around items-center">
    <div className="px-4">
      <h1 className="text-3xl mb-8 text-center">
        Ooops, looks like there was an error.
      </h1>
      <p className="text-center">
        Sorry, it looks like something happened at the back and we couldn&apos;t
        complete your request.
      </p>
      <p className="text-center">Please try again later.</p>
    </div>
  </div>
);

export default LoginError;
