import { Link } from "@tanstack/react-router";

const PageNotFound = () => {
  return (
    <div>
      <p>This is the notFoundComponent configured on root route</p>
      <Link to="/">Start Over</Link>
    </div>
  );
};

export default PageNotFound;
