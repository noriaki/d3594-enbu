import React from 'react';
import loadImage from 'blueimp-load-image';

const PreviewImage = ({ files }) => {
  const imageRefs = [];
  return files.map((file, index) => {
    loadImage.parseMetaData(file, (data) => {
      const options = {
        maxHeight: 375,
        maxWidth: 375,
        canvas: true,
      };
      if (data.exif) { options.orientation = data.exif.get('Orientation'); }
      loadImage(file, (canvas) => {
        const dataUri = canvas.toDataURL(file.type);
        const imgNode = imageRefs[index];
        if (imgNode) { imgNode.src = dataUri; }
      }, options);
    });
    return (
      <img
        key={`${file.lastModified}`}
        ref={(image) => { imageRefs[index] = image; }}
        alt={file.name}
        src="" />
    );
  });
};
export default PreviewImage;
