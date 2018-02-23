import React, { PureComponent } from 'react';

import FileInput from '../components/FileInput';
import PreviewImage from '../components/PreviewImage';

class FileUploaderWithPreview extends PureComponent {
  state = {
    files: [],
  }

  handleChangeFile = event => this.setState({
    files: [...event.target.files],
  })

  render() {
    const { files } = this.state;
    return (
      <form>
        <FileInput handleChangeFile={this.handleChangeFile} />
        <PreviewImage files={files} />
      </form>
    );
  }
}
export default FileUploaderWithPreview;
