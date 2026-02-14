// ═══════════════════════════════════════════════
// SHARED RAIN CANVAS — Pedago Game
// React.createElement only (no JSX, no Babel needed)
// Depends on: shared/utils.js (pick)
// ═══════════════════════════════════════════════

var RainCanvas = (function () {
  var h = React.createElement;
  var useEffect = React.useEffect;
  var useRef = React.useRef;

  return function RainCanvas(props) {
    var chars = props.chars || "01";
    var colors = props.colors || ["#0f0"];
    var fontSize = props.fontSize || 14;
    var speed = props.speed || 55;
    var opacity = props.opacity || 0.12;
    var fadeAlpha = props.fadeAlpha || 0.04;

    var canvasRef = useRef(null);

    useEffect(function () {
      var canvas = canvasRef.current;
      if (!canvas) return;
      var ctx = canvas.getContext("2d");
      var resize = function () {
        canvas.width = canvas.parentElement.offsetWidth;
        canvas.height = canvas.parentElement.offsetHeight;
      };
      resize();
      var columns = Math.floor(canvas.width / fontSize);
      var drops = Array(columns).fill(1);
      var draw = function () {
        ctx.fillStyle = "rgba(0,0,0," + fadeAlpha + ")";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.font = fontSize + "px monospace";
        for (var i = 0; i < drops.length; i++) {
          var c = chars[Math.floor(Math.random() * chars.length)];
          ctx.globalAlpha = Math.random() * 0.25 + 0.05;
          ctx.fillStyle = pick(colors);
          ctx.fillText(c, i * fontSize, drops[i] * fontSize);
          if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) drops[i] = 0;
          drops[i]++;
        }
        ctx.globalAlpha = 1;
      };
      var interval = setInterval(draw, speed);
      window.addEventListener("resize", resize);
      return function () {
        clearInterval(interval);
        window.removeEventListener("resize", resize);
      };
    }, []);

    return h("canvas", {
      ref: canvasRef,
      style: {
        position: "absolute", top: 0, left: 0,
        width: "100%", height: "100%",
        opacity: opacity, pointerEvents: "none"
      }
    });
  };
})();
