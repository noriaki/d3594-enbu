import React, { Fragment } from 'react';
import { lifecycle } from 'recompose';

import getScrollableDimensions from '../libs/getScrollableDimensions';

const style = 'img { width: 100% }';

const BackgroundSubtractionPage = ({ subSrc, cropSrc001, cropSrc002 }) => (
  <Fragment>
    <h1>Background subtraction page</h1>
    <style dangerouslySetInnerHTML={{ __html: style }} />
    { subSrc && <img id="result" src={subSrc} alt="result" /> }
    <img id="h001" src="/static/images/0000/history/004.png" alt="001" />
    { cropSrc001 && <img id="cropped" src={cropSrc001} alt="cropped" /> }
    <img id="h002" src="/static/images/0000/history/005.png" alt="002" />
    { cropSrc002 && <img id="cropped" src={cropSrc002} alt="cropped" /> }
    <img id="h003" src="/static/images/0000/history/006.png" alt="003" />
  </Fragment>
);

async function componentDidMount() {
  const img001 = document.getElementById('h001');
  const img002 = document.getElementById('h002');
  const cropSrc001 = await getCroppedImageDataURL(img001);
  const cropSrc002 = await getCroppedImageDataURL(img002);
  this.setState({
    cropSrc001,
    cropSrc002,
  });
}

export default lifecycle({ componentDidMount })(BackgroundSubtractionPage);

const getCroppedImageDataURL = async (image, type = 'image/png') => {
  const canvas = document.createElement('canvas');
  const context = canvas.getContext('2d');
  const {
    x,
    y,
    width,
    height,
  } = await getScrollableDimensions(image);
  canvas.width = width;
  canvas.height = height;
  context.drawImage(image, x, y, width, height, 0, 0, width, height);
  return canvas.toDataURL(type);
};
