//simple card that can be used for any purpose - based on bootstrap card
import { ReactNode } from "react";
import "./CardSimple/CardSimple.css";

interface Props {
  children: ReactNode;
}

const Card = ({ children }: Props) => {
  return (
    <div
      className="card mt-9 cardsize"
      style={{ width: "20rem", height: "100%" }}
    >
      {children}
    </div>
  );
};

export default Card;
