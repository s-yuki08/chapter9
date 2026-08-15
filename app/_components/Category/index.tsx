import classes from "./Category.module.css";
import type { ReactNode } from "react";

type CategoryProps = {
  children: ReactNode;
};

const Category = ({ children }: CategoryProps) => (
  <span className={classes.category}>{children}</span>
);

export default Category;
