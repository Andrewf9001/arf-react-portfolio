import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faEdit,
  faEnvelope,
  faMapMarkedAlt,
  faPhone,
  faSpinner,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";

export const solidIcons = () => {
  library.add(faEdit, faTrash, faSpinner, faEnvelope, faPhone, faMapMarkedAlt);
};
