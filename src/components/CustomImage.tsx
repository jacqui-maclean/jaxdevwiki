import useImageDimensions from "./hooks/useImageDimensions";

interface Props {
  imagePath: string;
}

const CustomImage = ({ imagePath }: Props) => {
  const { imageDimensions, isLandscape } = useImageDimensions(imagePath);

  return (
    <div>
      <img
        src={imagePath}
        alt="Image"
        style={isLandscape ? { transform: "rotate(-90deg)" } : undefined}
        width="100px"
        height="100px"
      />
    </div>
  );
};

export default CustomImage;
