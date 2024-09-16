import { forwardRef } from "react";

const DragDropPad = forwardRef(({ children, accept }, ref) => {
  return (
    <div className="drag-drop-container">
      <input ref={ref} type="file" accept={accept} />

      {children}
    </div>
  );
});

export default DragDropPad;
