import { Link } from "react-router-dom";

const LearnMore = () => {
  return (
    <div>
      Signing up drivers can only be done by Administrators. To add a user, please contact the administrator of this project at <a href="https://yaswanth820.github.io/my-portfolio-site/">Link</a>.
    <Link to="/signup"><button>Back</button></Link>
	</div>
  );
};

export default LearnMore;