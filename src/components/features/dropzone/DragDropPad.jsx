import { forwardRef } from "react";

const DragDropPad = forwardRef((props, ref) => {
  const { children, accept, onSuccessfulDrop } = props;

  return (
    <div className="drag-drop-container">
      <input ref={ref} type="file" accept={accept} />

      {children}
    </div>
  );
});

export default DragDropPad;

// children = what to say in pad
