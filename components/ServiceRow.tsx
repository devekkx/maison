"use client";

import { type Service } from "@/lib/data";
import { openContact } from "@/lib/contact";

interface ServiceRowProps {
  /** The service to render — sourced from the SERVICES array in lib/data.ts. */
  service: Service;
}

export default function ServiceRow({ service: s }: ServiceRowProps) {
  const label = `${s.name} ${s.italic}`;

  return (
    <button
      type="button"
      className="svc"
      data-svc-row
      role="listitem"
      onClick={() => openContact({ service: label })}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openContact({ service: label });
        }
      }}
    >
      <div className="num">{s.num}</div>
      <div className="name">
        {s.name} <em>{s.italic}</em>
      </div>
      <div className="desc">{s.desc}</div>
      <div className="price">
        {s.price}
        <small>{s.dur}</small>
      </div>
    </button>
  );
}
