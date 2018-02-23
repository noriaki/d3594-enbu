import React from 'react';
import PropTypes from 'prop-types';

const FileInput = ({ handleChangeFile }) => (
  <fieldset>
    <label htmlFor="file">Select some files</label>
    <input
      id="file"
      type="file"
      multiple
      accept="image/*"
      onChange={handleChangeFile} />
  </fieldset>
);
FileInput.propTypes = {
  handleChangeFile: PropTypes.func.isRequired,
};
export default FileInput;
