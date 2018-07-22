function getCropRect(width, height, ratio) {
  if (width > height * ratio) {
    const targetWidth = height * ratio;
    const x = (width - targetWidth) / 2;
    return {
      x: x,
      y: 0,
      width: targetWidth,
      height: height,
    }
  } else {
    const targetHeight = width / ratio;
    const y = (height - targetHeight) / 2;
    return {
      x: 0,
      y: y,
      width: width,
      height: targetHeight,
    }
  }
}

export default function corpImage(url, ratio) {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    const img = new Image()
    img.crossOrigin = "anonymous"
    img.onload = function() {
      const rect = getCropRect(img.width, img.height, ratio)
      canvas.width = rect.width
      canvas.height = rect.height
      context.drawImage(img, rect.x, rect.y,rect.width,rect.height,0,0,rect.width, rect.height);
      canvas.toBlob(function(blob) {
        resolve(blob)
      }, 'image/png', 90);
    };
    img.src = url + '?_' // add ?_ to skip the disk cache https://stackoverflow.com/questions/12648809/cors-policy-on-cached-image
  });
}