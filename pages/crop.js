import React, { Fragment } from 'react';
import { lifecycle } from 'recompose';

import getScrollableDimensions from '../libs/getScrollableDimensions';

const style = 'img { width: 100% }';

const CropPage = ({ iPhoneSrc, iPadSrc, AndroidSrc }) => (
  <Fragment>
    <h1>Background subtraction page</h1>
    <style dangerouslySetInnerHTML={{ __html: style }} />
    <img id="iPhone" src="/static/images/devices/SS-iOS-iPhone7.png" alt="001" />
    { iPhoneSrc && <img id="iPhoneCropped" src={iPhoneSrc} alt="cropped iPhone" /> }
    <img id="iPad" src="/static/images/devices/SS-iOS-iPadmini4.png" alt="002" />
    { iPadSrc && <img id="iPadCropped" src={iPadSrc} alt="cropped iPad" /> }
    <img id="Android" src="/static/images/devices/SS-Android-Nexus5.png" alt="003" />
    { AndroidSrc && <img id="AndroidCropped" src={AndroidSrc} alt="cropped Android" /> }
  </Fragment>
);

async function componentDidMount() {
  const iPhoneImage = document.getElementById('iPhone');
  const iPadImage = document.getElementById('iPad');
  const AndroidImage = document.getElementById('Android');
  const iPhoneSrc = await getCroppedImageDataURL(iPhoneImage);
  const iPadSrc = await getCroppedImageDataURL(iPadImage);
  const AndroidSrc = await getCroppedImageDataURL(AndroidImage);
  this.setState({
    iPhoneSrc,
    iPadSrc,
    AndroidSrc,
  });
}

export default lifecycle({ componentDidMount })(CropPage);

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
