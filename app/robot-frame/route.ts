const ROBOT_SCENE = "https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"

export const dynamic = "force-static"

export function GET() {
  const html = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex" />
    <title>Vista by Lara 3D AI Robot</title>
    <style>
      html,
      body {
        width: 100%;
        height: 100%;
        margin: 0;
        overflow: hidden;
        background:
          radial-gradient(circle at top right, rgba(87, 217, 255, 0.16), transparent 24%),
          radial-gradient(circle at 14% 10%, rgba(106, 90, 255, 0.08), transparent 24%),
          radial-gradient(circle at 80% 88%, rgba(32, 114, 255, 0.06), transparent 28%),
          #04050b;
      }

      spline-viewer {
        width: 100%;
        height: 100%;
        display: block;
        background:
          radial-gradient(circle at 50% 48%, rgba(87, 217, 255, 0.14), transparent 34%),
          #04050b;
      }

      spline-viewer canvas {
        background: transparent !important;
      }

      .watermark-cover {
        position: fixed;
        right: 0;
        bottom: 0;
        z-index: 2147483647;
        width: 210px;
        height: 76px;
        pointer-events: none;
        background:
          radial-gradient(circle at 72% 42%, rgba(87, 217, 255, 0.12), transparent 34%),
          linear-gradient(135deg, rgba(4, 5, 11, 0.72), rgba(4, 5, 11, 0.98) 58%, #04050b);
      }
    </style>
    <script>
      window.addEventListener("error", function (event) {
        event.preventDefault();
        return false;
      });

      window.addEventListener("unhandledrejection", function (event) {
        event.preventDefault();
        return false;
      });

      customElements.whenDefined("spline-viewer").then(function () {
        var viewer = document.querySelector("spline-viewer");
        if (!viewer || !viewer.shadowRoot) return;

        var style = document.createElement("style");
        style.textContent = [
          ":host, canvas { background: transparent !important; }",
          "a[href*='spline'], [href*='spline'], [class*='logo'], [id*='logo'], [class*='watermark'], [id*='watermark'] { display: none !important; opacity: 0 !important; visibility: hidden !important; pointer-events: none !important; }"
        ].join("\\n");
        viewer.shadowRoot.appendChild(style);
      });
    </script>
    <script type="module" src="https://unpkg.com/@splinetool/viewer@1.10.57/build/spline-viewer.js"></script>
  </head>
  <body>
    <spline-viewer url="${ROBOT_SCENE}"></spline-viewer>
    <div class="watermark-cover" aria-hidden="true"></div>
  </body>
</html>`

  return new Response(html, {
    headers: {
      "content-type": "text/html; charset=utf-8",
      "cache-control": "public, max-age=3600, s-maxage=86400",
    },
  })
}
