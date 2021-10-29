import styles from "./HowStep.module.scss";
import classNames from "classnames";

export default function HowStep({ number, title, description }) {
  return (
    <div className={classNames(styles.container)} maxWidth="xl">
      <div className={classNames(styles.numberContainer)}>
        <div className={classNames(styles.number)}>{number}</div>
      </div>
      <div className={classNames(styles.textContainer)}>
        <h4 className={classNames(styles.title)}>{title}</h4>
        <p className={classNames(styles.description)}>{description}</p>
      </div>
    </div>
  );
}
