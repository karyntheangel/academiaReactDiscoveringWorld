import { useParams } from "react-router-dom";
import { Navbar, Container } from "react-bootstrap";
import NavbarTitle from "../components/NavbarTitle";
import { DataContext } from "../context/DataContext";
import { useContext, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { Link, Outlet } from "react-router-dom";
import PostForm from "./PostForm";
export default function  Post() {
  let params = useParams();

  const { selEntry,setSelEntry, data } = useContext(DataContext); 

  useEffect(() => {
    setSelEntry(data.find(entry=> entry.id===parseInt(params.id)))
  }, [data])
 
  return (
    <>
      <Navbar>
        <Container className="justify-content-center ">
          <section>
            <NavbarTitle />
          </section>
        </Container>
      </Navbar>
      <section
        className="entryContainer"
        style={{
          backgroundImage: `url(` + selEntry.imgUrl + `)`,
        }}
      >
        <div className="pt-3 px-3">
          <Link to={`/`} className="text-white h6 pb-0 mb-0">
            {"< "} View Posts
          </Link>
        </div>
        <div style={{ paddingBottom: "15%", paddingTop: "15%" }}>
          <div className="text-white text-center ml-4 ">
            <h2 className="display-4 fw-bolder" key={selEntry.id}>
              {" "}
              {selEntry.tittle}
            </h2>
          </div>
        </div>
      </section>
      <section className="descriptionContainer">
        <div className=" d-flex justify-content-center">
          <div className="w-75 mt-2 mb-2 pt-5 pb-5">
            <p className=" h5 fw-bolder">{selEntry.description}</p>
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className=" w-50 text pb-5">
            <h5>Comments</h5>
            { selEntry.comments ? selEntry.comments.map((comm) => (
              <div key={comm.id} className="card mt-2 mb-2">
                <div className="d-flex justify-content-start align-items-center  mx-2">
                  <div className="rounded-circle bgRoundedIcon d-flex justify-content-center p-1 mx-1 bg-dark text-white">
                    <FontAwesomeIcon icon={solid("user")} />{" "}
                  </div>
                  <h6 className="px-2 pt-2">{comm.author}</h6>
                </div>
                <div className="d-flex justify-content-center px-5 pb-2">
                  {comm.comment}
                </div>
              </div>
            )): "No Comments here"}
          </div>
        </div>
        <div className="d-flex justify-content-center">
          <div className=" w-75 p-5">
          <h5>Write a comment</h5>
          <PostForm />
          </div>
        </div>
      </section>
    </>
  );
}
