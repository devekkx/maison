import Image from "next/image";
import { OWNER } from "@/lib/data";

export default function Owner() {
  return (
    <section className="artists" id="artists" data-screen-label="04 The Stylist">
      <div className="artists-head">
        <h2 data-reveal-y>
          One <em>chair.</em>
          <br />
          One <em>pair</em> of hands.
        </h2>
        <div className="meta" data-reveal-y>
          The studio is run, and
          <br />
          worked, by a single stylist.
          <br />
          Booking is with him, directly.
        </div>
      </div>

      <div className="owner-stage" data-owner-stage>
        <figure className="owner-card owner-a" data-owner-card>
          <span className="index">N° 01</span>
          <Image
            src={OWNER.img}
            alt={OWNER.name}
            fill
            sizes="(max-width: 980px) 100vw, 40vw"
            style={{ objectFit: "cover" }}
          />
          <figcaption className="artist-meta">
            <div className="name">{OWNER.name}</div>
            <div className="role">{OWNER.role}</div>
          </figcaption>
        </figure>

        <figure className="owner-card owner-b" data-owner-card>
          <Image
            src={OWNER.portrait2}
            alt={`${OWNER.name} — portrait`}
            fill
            sizes="(max-width: 980px) 50vw, 20vw"
            style={{ objectFit: "cover" }}
          />
        </figure>

        <figure className="owner-card owner-c" data-owner-card>
          <Image
            src={OWNER.portrait3}
            alt={`${OWNER.name} — at work`}
            fill
            sizes="(max-width: 980px) 50vw, 20vw"
            style={{ objectFit: "cover" }}
          />
        </figure>

        <div className="owner-bio" data-reveal-y>
          <p>{OWNER.bio}</p>
          <div className="sig">{OWNER.signature}</div>
        </div>
      </div>
    </section>
  );
}
