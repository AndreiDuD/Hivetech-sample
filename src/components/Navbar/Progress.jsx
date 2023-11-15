import { useEffect } from "react";

const Progress = () => {
  const onScroll = () => {
    let pixelsFromTop = window.scrollY;
    let documentHeight = document.body.clientHeight;
    let windowHeight = window.innerHeight;
    let difference = documentHeight - windowHeight;
    let percentage = (100 * pixelsFromTop) / difference;
    const progressBars = document.getElementsByClassName("progress_bar");
    if (progressBars.length > 0) {
      const progressBar = progressBars[0]; // Get the first element from the collection
      progressBar.style.width = `${percentage}%`;
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  });

  return (
    <div className="progress_wrapper z-20">
      <div className="progress_bar"></div>
    </div>
  );
};

export default Progress;
