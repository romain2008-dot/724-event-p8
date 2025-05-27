import { useCallback, useState } from "react";
import PropTypes from "prop-types";
import Field, { FIELD_TYPES } from "../../components/Field";
import Select from "../../components/Select";
import Button, { BUTTON_TYPES } from "../../components/Button";

const mockContactApi = () =>
  new Promise((resolve) => {
    setTimeout(resolve, 500);
  });

const Form = ({ onSuccess, onError }) => {
  const [sending, setSending] = useState(false);
  const [selectedType, setSelectedType] = useState("");
  const [errors, setErrors] = useState({});
  const sendContact = useCallback(
    async (evt) => {
      evt.preventDefault();
      const newErrors = {
        nom: "",
        prenom: "",
        email: "",
        message: "",
        type: "",
      };

      const formData = new FormData(evt.target);

      if (!formData.get("nom")) newErrors.nom = "Le nom est requis";
      if (!formData.get("prenom")) newErrors.prenom = "Le prénom est requis";
      if (!formData.get("email")) newErrors.email = "L'email est requis";
      if (!formData.get("message")) newErrors.message = "Le message est requis";
      if (!selectedType) newErrors.type = "Veuillez sélectionner un type";

      const hasError = Object.values(newErrors).some((val) => val !== "");

      if (hasError) {
        setErrors(newErrors);
        return;
      }

      setErrors({});
      setSending(true);
      try {
        await mockContactApi();
        setSending(false);
        onSuccess();
      } catch (err) {
        setSending(false);
        onError(err);
      }
    },
    [selectedType, onSuccess, onError]
  );

  return (
    <form onSubmit={sendContact}>
      <div className="row">
        <div className="col">
          <Field name="nom" label="Nom" error={errors.nom} />
          <Field name="prenom" label="Prénom" error={errors.prenom} />
          <Select
            selection={["Personel", "Entreprise"]}
            onChange={setSelectedType}
            label="Personel / Entreprise"
            titleEmpty
            name="type"
          />
          {errors.type && <p className="error-message">{errors.type}</p>}
          <Field name="email" label="Email" error={errors.email} />
          <Button type={BUTTON_TYPES.SUBMIT} disabled={sending}>
            {sending ? "En cours" : "Envoyer"}
          </Button>
        </div>
        <div className="col">
          <Field
            placeholder="message"
            label="Message"
            name="message"
            type={FIELD_TYPES.TEXTAREA}
            error={errors.message}
          />
        </div>
      </div>
    </form>
  );
};

Form.propTypes = {
  onError: PropTypes.func,
  onSuccess: PropTypes.func,
};

Form.defaultProps = {
  onError: () => null,
  onSuccess: () => null,
};

export default Form;
