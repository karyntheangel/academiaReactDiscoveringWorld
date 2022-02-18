import { DataContext } from "../context/DataContext";
import Entry from "./Entry";
import { useContext } from "react";

const filterContent = (data) => {
  return data.length > 0 ? (
    data.map((entry) => <Entry className='' key={entry.id}  entry={entry} />)
  ) : (
    <section className="mt-3">
      <h4>Content not found</h4>
    </section>
  );
};

const Entries = () => {
  const { data, setData, category, categoryArray } = useContext(DataContext);

  return category === "All" || category === ""
    ? data.map((entry) => <Entry key={entry.id} id={entry.id} entry={entry} />)
    : filterContent(data.filter((dat) => dat.category === category));
};

export default Entries;
