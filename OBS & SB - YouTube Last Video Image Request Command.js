document.addEventListener("DOMContentLoaded", () => {
  try {
    const params = new URLSearchParams(location.search);
    const client = new StreamerbotClient({
      host: params.get("host") || "127.0.0.1",
      port: parseInt(params.get("port") || 8080, 10),
      endpoint: params.get("endpoint") || "/",
      password: params.get("password") || "",
      autoReconnect: true,
      immediate: true,
      onConnect: () => {
        console.log("✅ Streamer.bot verbunden!");
      },
      onDisconnect: () => {
        console.warn("⚠️ Streamer.bot getrennt - versuche Reconnect...");
      },
      onError: () => {
        console.error("❌ Streamer.bot Verbindungsfehler!");
      },
    });

    const htmlProperty = "html";
    const headProperty = "head";
    const bodyProperty = "body";

    const html =
      document.documentElement || document.querySelector(htmlProperty);
    const head = document.head || document.querySelector(headProperty);
    const body = document.body || document.querySelector(bodyProperty);

    const copy = "copy";
    const dragstart = "dragstart";
    const keydown = "keydown";
    const select = "select";

    const fontFamilyVar = "--font-family-var";
    const robotoBold = getComputedStyle(html)
      .getPropertyValue(fontFamilyVar)
      .trim();

    const none = "none";
    const def = "default";

    const clear = "";
    const zero = 0;

    let ytLastVidId = null || clear;
    let ytLastVidTitle = null || clear;
    let duration = null || zero;

    client.on("Misc.GlobalVariableUpdated", ({ data }) => {
      if (!data || !data.name) return;

      if (data.name === "ytLastVidId") {
        ytLastVidId = data.newValue;
        headStyleToken();
        createYoutubeImgToken();
        console.log("🔄 Aktualisierte YouTube Video-ID:", ytLastVidId);
      }

      if (data.name === "ytLastVidTitle") {
        ytLastVidTitle = data.newValue;
        headStyleToken();
        createYoutubeImgToken();
        console.log("🔄 Aktualisierter YouTube Video-Titel:", ytLastVidTitle);
      }

      if (data.name === "ytfullUrlDelay") {
        duration = parseInt(data.newValue, 10);
        headStyleToken();
        createYoutubeImgToken();
        console.log("🔄 Aktualisierte Dauer (ms):", duration);
      }
    });

    function headStyleToken() {
      const style = document.querySelector("style");
      if (!style) return;

      const dataStyle = `
            .youtube-last-video-img[alt="${ytLastVidTitle}"] {
              background: rgba(0, 0, 0, 0);
              display: flex;
              align-items: center;
              align-content: center;
              justify-items: center;
              justify-content: center;
              text-align: center;
              font-size: 0px;
              color: rgba(0, 0, 0, 0);
              text-shadow: ${none};
              text-decoration: ${none};
              -webkit-user-select: ${none};
              user-select: ${none};
              cursor: ${def};
              pointer-events: ${none};
            }
        `;

      if (head && style) style.innerHTML = dataStyle;
    }
    headStyleToken();

    const diamond = "#";
    const get = (id) =>
      document.getElementById(id) || document.querySelector(diamond + id);

    const youtubeLastVideoImgDiv = get("youtubeLastVideoImgContainerId");
    const youtubeLastVideoImg = get("youtubeLastVideoImgId");

    function youtubeImgClearenToken() {
      const src = "src";
      const alt = "alt";

      if (youtubeLastVideoImgDiv && youtubeLastVideoImg) {
        youtubeLastVideoImg.setAttribute(src, clear);
        youtubeLastVideoImg.setAttribute(alt, clear);
      }
    }
    youtubeImgClearenToken();

    (function youtubeElementStyleToken() {
      const widthProperty = "width";
      const heightProperty = "height";

      const borderRadiusProperty = "border-radius";

      const cssWidthDiv = window
        .getComputedStyle(youtubeLastVideoImgDiv)
        .getPropertyValue(widthProperty)
        .trim();
      const cssHeightDiv = window
        .getComputedStyle(youtubeLastVideoImgDiv)
        .getPropertyValue(heightProperty)
        .trim();

      const cssWidthImg = window
        .getComputedStyle(youtubeLastVideoImg)
        .getPropertyValue(widthProperty)
        .trim();
      const cssHeightImg = window
        .getComputedStyle(youtubeLastVideoImg)
        .getPropertyValue(heightProperty)
        .trim();
      const cssBorderRadiusImg = window
        .getComputedStyle(youtubeLastVideoImg)
        .getPropertyValue(borderRadiusProperty)
        .trim();

      Object.assign(youtubeLastVideoImgDiv.style, {
        width: cssWidthDiv,
        height: cssHeightDiv,
      });

      Object.assign(youtubeLastVideoImg.style, {
        width: cssWidthImg,
        height: cssHeightImg,
        borderRadius: cssBorderRadiusImg,
      });
    })();

    function createYoutubeImgToken() {
      try {
        const src = "src";
        const alt = "alt";

        const ytLastVidImgId = ytLastVidId;
        const ytLastVidTitleTextAlt = ytLastVidTitle;
        const delay = duration;

        const ytLastVidImgUrl = `https://img.youtube.com/vi/${ytLastVidImgId}/maxresdefault.jpg`;

        if (youtubeLastVideoImgDiv && youtubeLastVideoImg) {
          youtubeLastVideoImg.setAttribute(src, ytLastVidImgUrl);
          youtubeLastVideoImg.setAttribute(alt, ytLastVidTitleTextAlt);

          setTimeout(() => {
            youtubeImgClearenToken();
          }, delay);
        }
      } catch (error) {
        console.error("Fehler beim Laden des YouTube Video Thumbnail:", error);
      }
    }
    createYoutubeImgToken();

    (function elementHtmlToken() {
      const elementArray = [body, youtubeLastVideoImgDiv, youtubeLastVideoImg];
      const eventArray = [copy, dragstart, keydown, select];

      elementArray.forEach((element) => {
        if (!element) return;

        eventArray.forEach((event) => {
          if (!event) return;

          element.addEventListener(event, (e) => e.preventDefault());
        });
      });

      elementArray.filter(Boolean).forEach((element) => {
        if (!element) return;

        Object.assign(element.style, {
          fontFamily: robotoBold,
          WebkitUserSelect: none,
          userSelect: none,
          cursor: def,
          pointerEvents: none,
        });
      });
    })();
  } catch (error) {
    console.error("Haupt-Fehler:", error);
  }
});
