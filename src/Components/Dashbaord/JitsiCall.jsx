import React, { useEffect, useState } from "react";

const JitsiCall = () => {
  const containerId = "jitsi-container";
  const [jitsiApi, setJitsiApi] = useState(null);

  // load Jitsi script dynamically
  const loadScript = () => {
    return new Promise((resolve) => {
      if (document.getElementById("jitsi-script")) {
        resolve();
        return;
      }
      const script = document.createElement("script");
      script.id = "jitsi-script";
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = resolve;
      document.body.appendChild(script);
    });
  };

  const initJitsi = async () => {
    await loadScript();

    if (!window.JitsiMeetExternalAPI) {
      console.error("Jitsi API not loaded");
      return;
    }

    const domain = "meet.jit.si"; // free public server
    const options = {
      roomName: "ReactTestRoom12345", // FIXED ROOM (for testing)
      parentNode: document.getElementById(containerId),
      userInfo: {
        displayName: "React User " + Math.floor(Math.random() * 1000),
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        disableInviteFunctions: true,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          "microphone",
          "camera",
          "hangup",
          "chat",
        ],
      },
    };

    const api = new window.JitsiMeetExternalAPI(domain, options);

    // dispose on leave
    api.addEventListener("videoConferenceLeft", () => {
      api.dispose();
    });

    setJitsiApi(api);
  };

  useEffect(() => {
    initJitsi();
    return () => {
      jitsiApi?.dispose?.();
    };
  }, []);

  return (
    <div
      id={containerId}
      style={{ width: "100%", height: "100vh", background: "#000" }}
    />
  );
};

export default JitsiCall;
