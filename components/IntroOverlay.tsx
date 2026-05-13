import { STAR } from "@/lib/data";

export default function IntroOverlay() {
  return (
    <>
      <div className="intro" data-intro>
        <div className="intro-meta">
          <span>Maison Noire · Est. 2014</span>
          <span>NN · Brooklyn</span>
        </div>
        <div className="intro-inner">
          <div className="intro-eyebrow" data-intro-eyebrow>
            Salon <span className="star">{STAR}</span> Atelier{" "}
            <span className="star">{STAR}</span> By appointment
          </div>
          <h1 className="intro-title">
            <span className="row">
              <span data-intro-line>Maison</span>
            </span>
            <span className="row">
              <span data-intro-line>
                <em>Noire.</em>
              </span>
            </span>
          </h1>
        </div>
        <div className="intro-cue" data-intro-cue>
          <span>Scroll to enter</span>
          <div className="arrow" />
        </div>
      </div>
      <div className="intro-spacer" data-intro-spacer />
    </>
  );
}
