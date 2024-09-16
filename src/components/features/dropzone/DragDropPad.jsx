import { forwardRef } from "react";

const DragDropPad = forwardRef(({ children, accept }, ref) => {
  const handleOnDrop = () => {
    e.preventDefault();

    const droppedFiles =
      e.target.type === "file" ? e.target.files : e.dataTransfer.files;

    if (droppedFiles) {
      ref.current;
    }
  };

  const handleOnDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="drag-drop-container"
      onDragOver={handleOnDragOver}
      onDrop={handleOnDrop}
    >
      <input ref={ref} type="file" accept={accept} />

      {children}
    </div>
  );
});

export default DragDropPad;

/* 
  TODO:
    - build onSuccessfulDrop function
    - Identify how to set the images to the refs
    - create previews when an image is selected
*/
