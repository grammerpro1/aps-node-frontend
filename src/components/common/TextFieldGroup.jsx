import React from "react";
import PropTypes from "prop-types";

const TextFieldGroup = ({
  field,
  value,
  label,
  error,
  type,
  onChange,
  placeholder,
  disabled
}) => {
  return (
    <div>
      <div className="form-group">
        <label className="control-label">{label}</label>
        <input
          type={type}
          name={field}
          className="form-control"
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          disabled={disabled}
        />
        {error && <span className="form-text text-danger">{error}</span>}
      </div>
    </div>
  );
};

TextFieldGroup.propTypes = {
  field: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  error: PropTypes.string,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired
};

TextFieldGroup.defaultProps = {
  type: "text"
};

export default TextFieldGroup;
