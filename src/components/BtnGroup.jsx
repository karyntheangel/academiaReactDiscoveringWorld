import { useContext } from "react";
import { ButtonGroup, Button } from "react-bootstrap";
import { DataContext } from "../context/DataContext";
const BtnGroup = () => {
  const { setCategory} = useContext(DataContext);
  return (
    <section>
      <ButtonGroup className="mt-3">
        <Button  variant="outline-secondary" onClick={()=>setCategory('All')}>
          All
        </Button>
        <Button  variant="outline-secondary" onClick={()=>setCategory('Travel')}>
          Travel
        </Button>
        <Button  variant="outline-secondary" onClick={()=>setCategory('Lifestyle')}>
          Lifestyle
        </Button>
        <Button  variant="outline-secondary" onClick={()=>setCategory('Business')}>
          Business
        </Button>
        <Button  variant="outline-secondary" onClick={()=>setCategory('Food')}>
          Food
        </Button>
        <Button  variant="outline-secondary" onClick={()=>setCategory('Work')}>
          Work
        </Button>
      </ButtonGroup>
    </section>
  );
};

export default BtnGroup;
