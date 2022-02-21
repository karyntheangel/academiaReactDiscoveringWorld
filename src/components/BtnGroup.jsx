import { useContext } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { DataContext } from "../context/DataContext";
const BtnGroup = () => {
  const { setCategory,categoryArray} = useContext(DataContext);
  return (
    <section>
      <ButtonGroup className="mt-3">
        <Button  variant="outline-secondary" onClick={()=>setCategory('All')}>
          All
        </Button>
        {categoryArray.map((category)=> <Button  variant="outline-secondary" onClick={()=>setCategory(category)}>
          {category}
        </Button> )}
      </ButtonGroup>
    </section>
  );
};

export default BtnGroup;
