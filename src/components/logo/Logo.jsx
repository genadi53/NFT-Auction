// import styles from './Logo.module.scss';

export default function Logo({ type }) {
  const logoSrc =
    type === "muted" ? "/images/logo-muted.svg" : "/images/logo.svg";
  return <img className="logo" alt="logo" src={logoSrc} />;
}
