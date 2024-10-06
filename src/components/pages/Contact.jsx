import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const Contact = () => {
  return (
    <div className="contact-container">
      <div className="left-column">
        <div className="row-wrapper">
          <FontAwesomeIcon icon="fa-solid fa-phone" />
          <div>888-888-8888</div>
        </div>

        <div className="row-wrapper">
          <FontAwesomeIcon icon="fa-solid fa-envelope" />
          <div>andrewf9001@gmail.com</div>
        </div>

        <div className="row-wrapper">
          <FontAwesomeIcon icon="fa-solid fa-map-marked-alt" />
          <div>SLC, UT</div>
        </div>
      </div>

      <div className="background-image" />
    </div>
  );
};

export default Contact;
