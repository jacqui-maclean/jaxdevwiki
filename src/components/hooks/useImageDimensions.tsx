import { useState, useEffect } from "react";

const useImageDimensions = (imagePath: string) => {
  const [imageDimensions, setImageDimensions] = useState({
    width: 0,
    height: 0,
  });

  useEffect(() => {
    const img = new Image();
    img.src = imagePath;

    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      setImageDimensions({ width: naturalWidth, height: naturalHeight });
    };
  }, [imagePath]);

  const isPortrait = imageDimensions.height > imageDimensions.width;
  const isLandscape = imageDimensions.height < imageDimensions.width;

  return { imageDimensions, isLandscape };
};

export default useImageDimensions;
