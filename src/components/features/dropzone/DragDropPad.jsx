import { useRef } from "react";

const DragDropPad = ({ children, imageType, accept, onSuccessfulDrop }) => {
  const inputRef = useRef(null);

  const handleOnDrop = (e) => {
    e.preventDefault();

    const droppedFiles =
      e.target.type === "file" ? e.target.files : e.dataTransfer.files;

    if (droppedFiles) {
      onSuccessfulDrop(droppedFiles[0], imageType);
    }
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

      {children ? (
        children
      ) : (
        <div>Click or Drop {imageType === "video" ? "video" : "image"}</div>
      )}
    </div>
  );
};

export default DragDropPad;
