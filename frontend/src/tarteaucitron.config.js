(function waitForTarteaucitron(retries = 0, maxRetries = 10) {
  if (typeof window.tarteaucitron !== "undefined") {
    const lang = navigator.language;

    window.tarteaucitronForceLanguage = lang; // Language configuration

    window.tarteaucitron.init({
      privacyUrl: "",
      bodyPosition: "top",
      hashtag: "#tarteaucitron",
      cookieName: "tarteaucitron",
      orientation: "middle",
      groupServices: false,
      showDetailsOnClick: true,
      serviceDefaultState: "wait",
      showAlertSmall: false,
      cookieslist: false,
      closePopup: true,
      showIcon: true,
      iconPosition: "BottomRight",
      adblocker: false,
      DenyAllCta: true,
      AcceptAllCta: true,
      highPrivacy: true,
      alwaysNeedConsent: false,
      handleBrowserDNTRequest: false,
      removeCredit: false,
      moreInfoLink: true,
      useExternalCss: false,
      useExternalJs: false,
      readmoreLink: "",
      mandatory: true,
      mandatoryCta: false,
      googleConsentMode: true,
      partnersList: true,
    });

    (window.tarteaucitron.job = window.tarteaucitron.job || []).push(
      "recaptcha"
    );

    // Code to execute when the save button is clicked

    // Callback for the MutationObserver
    const mutationCallback = () => {
      // Check if the save button exists
      const tarteaucitronSaveButton = document.getElementById(
        "tarteaucitronSaveButton"
      );

      if (tarteaucitronSaveButton) {
        // Define the function to handle the save button click
        const handleConsentSave = () => {
          window.location.reload();
        };

        // Add event listener to the save button
        tarteaucitronSaveButton.addEventListener("click", handleConsentSave);

        // Stop observing the target node since we found the button
        observer.disconnect();
      }
    };

    // Create an instance of MutationObserver and pass the callback function
    const observer = new MutationObserver(mutationCallback);

    // Start observing the target node
    observer.observe(document.body, {
      childList: true,
      subtree: true,
    });

    // Retry if tarteaucitron is not yet loaded
    return () => {
      observer.disconnect();
    };
  } else if (retries < maxRetries) {
    if (process.env.NODE_ENV === "development") {
      console.log(
        "Waiting for tarteaucitron...",
        retries + 1,
        "of",
        maxRetries
      );
    }

    setTimeout(() => waitForTarteaucitron(retries + 1, maxRetries), 500); // Retry every 500ms
  } else {
    console.error("tarteaucitron failed to load after", maxRetries, "attempts");
  }
})();
