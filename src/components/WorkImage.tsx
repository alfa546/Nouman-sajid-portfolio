import { useState, useEffect } from "react";
import { MdArrowOutward } from "react-icons/md";
import { getFallbackImage } from "../utils/projectImages";

interface Props {
  id?: number;
  image: string;
  alt?: string;
  video?: string;
  link?: string;
}

const WorkImage = (props: Props) => {
  const [isVideo, setIsVideo] = useState(false);
  const [video, setVideo] = useState("");
  const [imgSrc, setImgSrc] = useState(props.image);

  useEffect(() => {
    setImgSrc(props.image);
  }, [props.image]);

  const handleMouseEnter = async () => {
    if (props.video) {
      setIsVideo(true);
      const response = await fetch(`src/assets/${props.video}`);
      const blob = await response.blob();
      const blobUrl = URL.createObjectURL(blob);
      setVideo(blobUrl);
    }
  };

  const handleImgError = () => {
    if (props.id) {
      setImgSrc(getFallbackImage(props.id));
    }
  };

  return (
    <div className="work-image">
      <a
        className="work-image-in"
        href={props.link}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={() => setIsVideo(false)}
        target="_blank"
        data-cursor={"disable"}
      >
        {props.link && (
          <div className="work-link">
            <MdArrowOutward />
          </div>
        )}
        <img src={imgSrc} alt={props.alt} onError={handleImgError} />
        {isVideo && <video src={video} autoPlay muted playsInline loop></video>}
      </a>
    </div>
  );
};

export default WorkImage;
