import "./client.css"; // import CSS for styling

const LoadingClient = () => {
  return (
    <div className="text-xl sm:text-2xl md:text-xl lg:text-3xl ">
    <div className="loader-client">
      <p>loading</p>
      <div className="words">
        <span className="word">clients</span>
        <span className="word">clients</span>
        <span className="word">clients</span>
        <span className="word">clients</span>
        <span className="word">clients</span>
        <span className="word">clients</span>
      </div>
    </div>
    </div>
  );
};
export default LoadingClient;
