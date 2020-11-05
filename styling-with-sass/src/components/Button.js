import React from "react";
import classNames from "classnames";

import "./Button.scss";

// size: large, medium, small
// color: blue, pink, gray
function Button({
  children,
  size /* ='medium' */,
  color,
  outline,
  fullWidth,
  ...rest
}) {
  return (
    <button
      className={classNames("Button", size, color, {
        outline,
        fullWidth,
      })}
      {...rest} // rest안에 모든 것들을 설정해주겠다 의미.
    >
      {children}
    </button>
  );
}

Button.defaultProps = {
  size: "medium",
  color: "blue",
};
// 주석처리한 미디움과 같은 의미,
// 이렇게 해야 리덕스 개발자 도구서도 볼수있음 정석적.

export default Button;
