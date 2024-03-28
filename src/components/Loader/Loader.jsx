import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="loading">
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color="#4fa94d"
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </div>
  );
};

export default Loader;
