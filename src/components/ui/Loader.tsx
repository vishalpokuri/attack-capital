import React from "react";

function Loader() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-rose-600"></div>
    </div>
  );
}

export default Loader;
