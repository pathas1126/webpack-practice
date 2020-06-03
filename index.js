import "normalize.css";
import styles from "./index.css";

const component = () => {
  const element = document.createElement("div");
  element.innerHTML = "Holy Moly!!!!";

  element.classList = styles.helloWebpack;

  return element;
};
window.onload = () => {
  document.body.appendChild(component());
};
