import React from 'react'
import PropTypes from "prop-types";
import './MaterialInput.scss'

function MaterialInput ({...props})
{
    const {
        submitted,
        hasError,
        error,
        label,
        inputProps
      } = props;
    return (
        <div className={'mdl-group' + (submitted && hasError ? ' has-error' : '')}>
            <input {...inputProps} />
            <span className="highlight"></span>
            <span className="bar"></span>
            <label htmlFor={inputProps.name}>{label}</label>
            {submitted && hasError &&
                <div className="help-block">{error}</div>
            }
        </div>
    );
}
MaterialInput.propTypes = {
    submitted: PropTypes.bool,
    hasError: PropTypes.bool,
    error: PropTypes.string,
    label: PropTypes.string,
    inputProps: PropTypes.object
  };

export default MaterialInput;