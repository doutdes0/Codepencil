import github_logo from '../../assets/github-logo.svg';
import './footer.css';

const Footer: React.FC = () => {
  return (
    <div className="footer">
      <div className="footer-content">
        <p>©2023 Codepencil</p>
        <p>Artem Gromakov</p>
        <a
          href="https://github.com/doutdes0"
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={github_logo}
            alt="github-logo"
          />
        </a>
      </div>
    </div>
  );
};

export default Footer;
