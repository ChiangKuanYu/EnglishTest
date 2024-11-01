import React, { useCallback } from "react";
import { FaRegQuestionCircle } from "react-icons/fa";
import "./Section.css";

function Section(props) {
  function selectionHandle(event) {
    props.onChange(event.target.getAttribute("value"));
  }

  const onHover = useCallback(
    (event) => {
      //   console.log(event);
      const x = event.pageX,
        y = event.pageY,
        value = event.target.getAttribute("value");
      props.onHover({ x, y, value });
    },
    [props]
  );

  function outHover() {
    props.onHover(null);
  }

  return (
    <div className="section">
      <div
        className="title"
        onMouseLeave={outHover}
        onMouseMove={onHover}
        value={props.title}
      >
        <label value={props.title}>{props.title}</label>
        <FaRegQuestionCircle className="icon" value={props.title} />
      </div>
      <div className="selectionlabel">
        {props.selection.map((event) => (
          <label
            className={props.section === event.value ? "active" : null}
            key={event.name}
            value={event.value}
            onClick={selectionHandle}
          >
            {event.name}
          </label>
        ))}
      </div>
    </div>
  );
}

export default Section;
