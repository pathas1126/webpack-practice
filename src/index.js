import "@babel/polyfill";
import "normalize.css";
import styles from "./index.module.scss";
import $ from "jquery";
import slackImg from "./images/slack.jpg";
import svgImg from "./images/sample.svg";

const component = () => {
  const element = document.createElement("div");
  element.innerHTML = "Holy Moly GWAKA MOLY!!!!!!!";

  const imgElement = document.createElement("img");
  imgElement.src = svgImg;
  imgElement.classList = styles.svgImg;

  console.log(svgImg);
  console.log(styles);
  element.classList = styles.helloWebpack;
  element.appendChild(imgElement);

  return element;
};
window.onload = () => {
  document.body.appendChild(component());
  console.log($(`.${styles.helloWebpack}`).length);
  console.log(`IS PRODUCTION: ${IS_PRODUCTION}`);
};
