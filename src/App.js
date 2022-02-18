import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarTitle from "./components/NavbarTitle";
import { Navbar, Container, Button } from "react-bootstrap";
import BtnGroup from "./components/BtnGroup";
import Entries from "./components/Entries";
import Post from "./routes/Post";
import EntryModal from "./components/EntryModal";
import { useContext } from "react";
import { DataContext } from "./context/DataContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";

const voidEntry = {
  id: undefined,
  tittle: "",
  category: "",
  description: "",
  imgUrl: "",
  comments: [],
};

function App() {
  const { setShowModal, setSelEntry } = useContext(DataContext);
  return (
    <div className="App mb-2">
      <div className="float-end fixed-top" style={{marginLeft:'80%',marginTop:'10%'}}>
              <Button 
              className="rounded-circle orangeBtn"
              onClick={() => {
                setShowModal(true);
                setSelEntry(voidEntry);
              }}
            > <FontAwesomeIcon className="text-white px-1 pt-2 pb-2"
            icon={solid("pen")}/> </Button>
              </div>
      <Navbar>
        <Container className="justify-content-center ">
          <section>
            <NavbarTitle/>
            <BtnGroup />
          </section>
        </Container>
      </Navbar>
      <section className="row mt-4 mx-0 d-flex justify-content-center">
        <Entries />
      </section>
      <EntryModal />
    </div>
  );
}

export default App;
