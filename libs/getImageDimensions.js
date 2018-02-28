const getImageDimensions = image => new Promise((resolve) => {
  const img = new Image();
  function onLoadImage() {
    resolve({
      width: this.width,
      height: this.height,
    });
  }
  img.onload = onLoadImage;
  img.src = image.src;
});
export default getImageDimensions;
