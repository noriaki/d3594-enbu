import getImageDimensions from './getImageDimensions';
import { trunc } from './utils';

const getScrollableDimensions = async (image) => {
  const { width, height } = await getImageDimensions(image);
  const margin = {
    top: trunc(width * 0.075),
    right: trunc(width * 0.04),
    bottom: trunc(width * 0.025),
    left: trunc(width * 0.04),
  };
  return {
    x: margin.left,
    y: margin.top,
    width: width - margin.left - margin.right,
    height: height - margin.top - margin.bottom,
    margin,
  };
};
export default getScrollableDimensions;
