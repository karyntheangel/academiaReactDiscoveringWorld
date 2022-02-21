import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { DataContext } from "../context/DataContext";

const EntryForm = () => {
  const { data,setData, selEntry, categoryArray, setShowModal, myHandlerSubmit } =
    useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (entry) => {
    myHandlerSubmit(entry,data,setData,setShowModal, selEntry);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Form.Group className="mb-3" controlId="formEntrytitle">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          defaultValue={selEntry.title}
          placeholder="Title, max 50 characters in this field"
          {...register("title", { required: true, maxLength: 30 })}
        />
        <div className="invalid-feedback m-2 d-block">
          {(errors.title?.type === "required" &&
            "Text is required in this field") ||
            (errors.title?.type === "maxLength" &&
              "Maximum 50 characters for this field")}
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEntryDescription">
        <Form.Label>Description</Form.Label>
        <Form.Control
          type="text"
          defaultValue={selEntry.description}
          as="textarea"
          placeholder="Description"
          {...register("description", { required: true })}
        />
        <div className="invalid-feedback d-block">
          {errors.description?.type === "required" &&
            "Text is required in this field"}
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEntryCategory">
        <Form.Label>Category</Form.Label>
        <Form.Select
          aria-label="Default select example"
          {...register("category")}
          defaultValue={selEntry.category}
        >
          
          {categoryArray.map((indCategory) => (
            <option key={indCategory} value={indCategory}>{indCategory}</option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEntryDescription">
        <Form.Label>Image Link</Form.Label>
        <Form.Control
          type="text"
          placeholder="Image Link"
          defaultValue={selEntry.imgUrl}
          {...register("imgUrl", { required: true })}
        />
        <div className="invalid-feedback d-block">
          {errors.imgUrl?.type === "required" &&
            "Text is required in this field"}
        </div>
      </Form.Group>
      <div className="d-flex justify-content-end">
        <Button variant="secondary" onClick={() => setShowModal(false)}>
          Cancel
        </Button>
        <Button type="submit" className="text-white mx-3">
          Save
        </Button>
      </div>
    </Form>
  );
};

export default EntryForm;
