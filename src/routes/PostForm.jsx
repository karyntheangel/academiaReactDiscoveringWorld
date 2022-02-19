import { useContext } from "react";
import { Button, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { DataContext } from "../context/DataContext";

const PostForm = () => {
    const { data, setData, setShowModal, selEntry, postHandler } =useContext(DataContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (comment) => {
    postHandler(data, setData, setShowModal, comment, selEntry);
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formEntryAuthor">
        <Form.Label>Author</Form.Label>
        <Form.Control
          type="text"
          placeholder="Author, max 50 characters in this field"
          {...register("author", { required: true, maxLength: 30 })}
        />
        <div className="invalid-feedback m-2 d-block">
          {(errors.author?.type === "required" &&
            "Text is required in this field") ||
            (errors.author?.type === "maxLength" &&
              "Maximum 50 characters for this field")}
        </div>
      </Form.Group>
      <Form.Group className="mb-3" controlId="formEntryComment">
        <Form.Label>Comment</Form.Label>
        <Form.Control
          type="text"
          as="textarea"
          placeholder="Comment"
          {...register("comment", { required: true })}
        />
        <div className="invalid-feedback d-block">
          {errors.comment?.type === "required" &&
            "Text is required in this field"}
        </div>
      </Form.Group>
      <div className="d-flex justify-content-start">
      <Button type="submit" className="text-white mx-3">
          Save
        </Button>
      </div>
    </Form>
  )
}

export default PostForm