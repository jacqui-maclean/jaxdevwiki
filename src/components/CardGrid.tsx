//simple flex grid for cards
interface Props {
  children: React.ReactNode;
}

const CardList = ({ children }: Props) => {
  return (
    <div className="d-flex flex-wrap justify-content-around align-items-center">
      {children}
    </div>
  );
};

export default CardList;
