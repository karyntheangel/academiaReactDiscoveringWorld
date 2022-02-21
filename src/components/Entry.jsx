import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useContext } from "react";
import { Button } from "react-bootstrap";
import { Link, Outlet } from "react-router-dom";
import { solid } from "@fortawesome/fontawesome-svg-core/import.macro";
import { DataContext } from "../context/DataContext";

export const Entry = ({ entry }) => {
  const { selEntry, setSelEntry, setShowModal,deleteHandler, data, setData } = useContext(DataContext);
  return (
    <section
      className="entryContainer col-sm-12 col-md-6"
      style={{
        backgroundImage: `url(` + entry.imgUrl + `)`,
      }}
    >
      <div className="entryText ml-4 ">
        <Link
          className="text-white text-decoration-none"
          onClick={() => setSelEntry(entry)}
          to={`/posts/${entry.id}`}
        >
          <h4 key={entry.id}> {entry.title}</h4>
        </Link>
        <div>
          <p> {entry.comments ? entry.comments.length: '0'} comments on this post</p>
          <p>{entry.description}</p>
          <div className="d-flex justify-content-between align-items-center">
            <p>{entry.category}</p>
            <div className="pb-3">
              <Button
                className="entryOptions"
                onClick={() => {
                  setShowModal(true);
                  setSelEntry(entry);
                }}
              >
                {" "}
                <FontAwesomeIcon
                  className="text-white"
                  icon={solid("pen")}
                />{" "}
              </Button>
              <Button className="entryOptions" onClick={()=>deleteHandler(entry.id,setData,data )}>
                {" "}
                <FontAwesomeIcon
                  className="text-white"
                  icon={solid("trash")}
                />{" "}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Entry;
