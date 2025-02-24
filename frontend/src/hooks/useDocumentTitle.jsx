import { useEffect } from "react";

function useDocumentTitle(title) {
  useEffect(() => {
    document.title = `${title} | John Doe Portfolio`; // Change the title;
  }, [title]);
}

export default useDocumentTitle;
