import React from 'react'
import PropTypes from 'prop-types';
import './MaterialButton.scss'

function MaterialButton ({...props})
{
    const {
        name,
        onClick
      } = props;
    return (
        <button 
            className="button"
            onClick={onClick}>{name}</button>
    );
}
MaterialButton.propTypes = {
    name: PropTypes.string,
  };

export default MaterialButton;