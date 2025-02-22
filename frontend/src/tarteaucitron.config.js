(function waitForTarteaucitron() {
  if (typeof window.tarteaucitron !== "undefined") {
    const lang = navigator.language;

    window.tarteaucitronForceLanguage = lang; // Configuration de la langue

    window.tarteaucitron.init({
      privacyUrl: "",
      bodyPosition: "top",
      hashtag: "#tarteaucitron",
      cookieName: "tarteaucitron",
      orientation: "middle",
      groupServices: true,
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

    window.tarteaucitron.user.recaptchaapi =
      process.env.REACT_APP_RECAPTCHA_SITE_KEY;
    (window.tarteaucitron.job = window.tarteaucitron.job || []).push(
      "recaptcha"
    );
  } else {
    console.log("Waiting for tarteaucitron...");
    setTimeout(waitForTarteaucitron, 500); // Retry every 500ms
  }
})();
