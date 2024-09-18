import { useRef } from "react";

const DragDropPad = ({ children, accept, onSuccessfulDrop }) => {
  const inputRef = useRef(null);

  const handleOnDrop = (e) => {
    e.preventDefault();

    const droppedFiles =
      e.target.type === "file" ? e.target.files : e.dataTransfer.files;

    console.log("dropped files", droppedFiles);

    // if (droppedFiles) {
    //   ref.current;
    // }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="drag-drop-container"
      onClick={() => inputRef.current.click()}
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
    >
      <input
        type="file"
        ref={inputRef}
        accept={accept}
        onChange={handleOnDrop}
      />

      {children}
    </div>
  );
};

export default DragDropPad;

/* 
  TODO:
    - build onSuccessfulDrop function
    - Identify how to set the images to the refs
    - create previews when an image is selected
*/
