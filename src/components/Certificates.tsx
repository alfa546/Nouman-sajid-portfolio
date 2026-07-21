import "./styles/Work.css";
import WorkImage from "./WorkImage";
import { config } from "../config";

interface Certificate {
  title: string;
  image: string;
  link?: string;
}

const Certificates = () => {
  const certificates: Certificate[] = (config as { certificates?: Certificate[] }).certificates || [];
  if (certificates.length === 0) return null;

  return (
    <div className="work-section" id="certificates" style={{ backgroundColor: "#111", paddingBottom: "100px" }}>
      <div className="work-container section-container">
        <h2 style={{ marginBottom: "50px" }}>
          My <span>Certificates</span>
        </h2>
        <div className="work-flex" style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "2rem" }}>
          {certificates.map((cert: Certificate, index: number) => (
            <div className="work-box" key={index} style={{ width: "45%", minWidth: "300px", flexShrink: 0 }}>
              <div className="work-info">
                <div className="work-title">
                  <h3>0{index + 1}</h3>
                  <div>
                    <h4>{cert.title}</h4>
                  </div>
                </div>
              </div>
              <WorkImage image={cert.image} alt={cert.title} link={cert.link} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Certificates;
