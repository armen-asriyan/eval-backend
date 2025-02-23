import { useEffect } from "react";

// Function to update the document title
function useDocumentTitle(title) {
  //   const defaultTitle = useRef(document.title);

  useEffect(() => {
    document.title = `${title} | John Doe Portfolio`; // Change the title;
  }, [title]);

  //   useEffect(
  //     () => () => {
  //       if (!prevailOnUnmount) {
  //         document.title = defaultTitle.current;
  //       }
  //     },
  //     []
  //   );
}

export default useDocumentTitle;
