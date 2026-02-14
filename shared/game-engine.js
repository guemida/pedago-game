// ═══════════════════════════════════════════════
// SHARED GAME ENGINE — Pedago Game
// React.createElement only (no JSX, no Babel needed)
// Depends on: shared/utils.js, shared/rain.js
// ═══════════════════════════════════════════════

var GameEngine = (function () {
  var h = React.createElement;
  var useState = React.useState;
  var useEffect = React.useEffect;
  var useRef = React.useRef;
  var useCallback = React.useCallback;

  return function GameEngine(props) {
    var title = props.title || "TERMINAL";
    var icon = props.icon || ">";
    var profiles = props.profiles;
    var rainConfig = props.rainConfig || null;
    var backgroundColor = props.backgroundColor || "#0a0a0a";
    var headerBg = props.headerBg || "#111";
    var headerBorder = props.headerBorder || "#1a1a1a";
    var themeColor = props.themeColor || "#0f0";
    var terminalColors = props.terminalColors || {};
    var promptSymbol = props.promptSymbol || "❯❯";
    var inputPlaceholder = props.inputPlaceholder || "Tapez une commande...";
    var subtitleText = props.subtitleText || "";
    var schoolText = props.schoolText || "ÉCOLE IT VALENCIENNES";
    var victoryTitle = props.victoryTitle || "MISSION ACCOMPLIE";
    var baseScores = props.baseScores || { "débutant": 500, "intermédiaire": 750, "expert": 1000 };
    var preprocessInput = props.preprocessInput || null;
    var getInputPrefix = props.getInputPrefix || function (original) { return promptSymbol + " " + original; };
    var getUnknownMsg = props.getUnknownMsg || function () { return "Commande non reconnue. Tapez 'help'."; };
    var globalCommands = props.globalCommands || {};
    var lineStyles = props.lineStyles || {};
    var topicIcon = props.topicIcon || "";

    var colors = {
      system: terminalColors.system || themeColor,
      input: terminalColors.input || "#e2e8f0",
      success: terminalColors.success || "#4ade80",
      error: terminalColors.error || "#f87171",
      hint: terminalColors.hint || "#facc15",
      mission: terminalColors.mission || "#94a3b8",
      response: terminalColors.response || "#aaa"
    };

    // ─── State ───
    var _screen = useState("menu");
    var screen = _screen[0]; var setScreen = _screen[1];
    var _profile = useState(null);
    var profile = _profile[0]; var setProfile = _profile[1];
    var _levels = useState([]);
    var levels = _levels[0]; var setLevels = _levels[1];
    var _levelIdx = useState(0);
    var levelIdx = _levelIdx[0]; var setLevelIdx = _levelIdx[1];
    var _lines = useState([]);
    var lines = _lines[0]; var setLines = _lines[1];
    var _input = useState("");
    var input = _input[0]; var setInput = _input[1];
    var _hintsUsed = useState(0);
    var hintsUsed = _hintsUsed[0]; var setHintsUsed = _hintsUsed[1];
    var _startTime = useState(null);
    var startTime = _startTime[0]; var setStartTime = _startTime[1];
    var _playerName = useState("");
    var playerName = _playerName[0]; var setPlayerName = _playerName[1];
    var _leaderboard = useState([]);
    var leaderboard = _leaderboard[0]; var setLeaderboard = _leaderboard[1];

    var termRef = useRef(null);
    var inputRef = useRef(null);

    var scrollToBottom = useCallback(function () {
      if (termRef.current) setTimeout(function () { termRef.current.scrollTop = termRef.current.scrollHeight; }, 50);
    }, []);
    useEffect(function () { scrollToBottom(); }, [lines, scrollToBottom]);

    var addLines = function (newLines, type) {
      type = type || "response";
      setLines(function (prev) {
        return prev.concat(newLines.map(function (text) { return { type: type, text: text }; }));
      });
    };

    var startGame = function (profileKey) {
      var p = profiles[profileKey];
      var gen = typeof p.levels === "function" ? p.levels() : p.levels;
      setProfile(profileKey); setLevels(gen); setLevelIdx(0); setHintsUsed(0); setStartTime(Date.now());
      setLines([
        { type: "system", text: "══════ NIVEAU 1/" + gen.length + " : " + gen[0].title + " ══════" },
        { type: "system", text: (topicIcon ? topicIcon + " " : "") + gen[0].topic },
        { type: "mission", text: gen[0].mission },
        { type: "empty", text: "" }
      ]);
      setScreen("game");
    };

    var advanceLevel = function () {
      if (levelIdx < levels.length - 1) {
        var next = levelIdx + 1;
        setLevelIdx(next);
        setTimeout(function () {
          addLines(["", "══════ NIVEAU " + (next + 1) + "/" + levels.length + " : " + levels[next].title + " ══════", (topicIcon ? topicIcon + " " : "") + levels[next].topic], "system");
          addLines([levels[next].mission], "mission");
          addLines([""], "empty");
        }, 800);
      } else {
        setTimeout(function () { setScreen("victory"); }, 1000);
      }
    };

    var handleCommand = function (cmd) {
      var original = cmd.trim();
      var trimmed = original.toLowerCase();
      if (!trimmed) return;

      // 1. Display input
      setLines(function (prev) { return prev.concat([{ type: "input", text: getInputPrefix(original) }]); });

      // 2. Standard commands
      if (trimmed === "clear") { setLines([]); return; }
      if (trimmed === "mission") { addLines([levels[levelIdx].mission], "mission"); return; }
      if (trimmed === "hint") {
        setHintsUsed(function (h) { return h + 1; });
        addLines(["💡 " + levels[levelIdx].hint], "hint");
        return;
      }
      if (trimmed === "score") {
        var e = Math.floor((Date.now() - startTime) / 1000);
        addLines(["Niveau: " + (levelIdx + 1) + "/" + levels.length + " | Hints: " + hintsUsed + " | Temps: " + formatTime(e)], "system");
        return;
      }

      var cl = levels[levelIdx];

      // 3. Preprocess input
      var proc = preprocessInput ? preprocessInput(original, trimmed) : trimmed;

      // 4. Check win
      if (cl.checkWin && cl.checkWin(proc)) {
        if (cl.winResponse) addLines(cl.winResponse, "success");
        advanceLevel();
        return;
      }

      // 5. Level commands
      if (cl.commands && cl.commands[trimmed]) {
        var r = cl.commands[trimmed];
        addLines(r.response, r.nextLevel ? "success" : "response");
        if (r.nextLevel) advanceLevel();
        return;
      }

      // 6. Level default response
      if (cl.defaultResponse) {
        var dr = cl.defaultResponse(proc);
        if (dr) { addLines(dr, "response"); return; }
      }

      // 7. Global commands
      var gcKeys = Object.keys(globalCommands);
      for (var gi = 0; gi < gcKeys.length; gi++) {
        var gk = gcKeys[gi];
        if (trimmed.startsWith(gk)) {
          var gr = globalCommands[gk](trimmed, original);
          if (gr) { addLines(gr.lines, gr.type || "response"); return; }
        }
      }

      // 8. Unknown
      addLines([getUnknownMsg(original)], "error");
    };

    var handleKeyDown = function (e) {
      if (e.key === "Enter") { handleCommand(input); setInput(""); }
    };
    var focusInput = function () { if (inputRef.current) inputRef.current.focus(); };
    var getScore = function () { return calculateScore(startTime, hintsUsed, profile, baseScores); };

    // ═══════════════════════════════════════════
    // MENU SCREEN
    // ═══════════════════════════════════════════
    if (screen === "menu") {
      var menuBgAlpha = backgroundColor.length <= 7 ? backgroundColor + "cc" : backgroundColor;
      var profileEntries = Object.keys(profiles).map(function (key) { return [key, profiles[key]]; });

      return h("div", { style: { minHeight: "100vh", background: backgroundColor, fontFamily: "'Fira Code','Cascadia Code',monospace", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" } },
        rainConfig ? h(RainCanvas, rainConfig) : null,
        h("div", { style: { zIndex: 10, textAlign: "center", maxWidth: "700px", padding: "20px" } },
          h("div", { style: { color: themeColor + "66", fontSize: "11px", letterSpacing: "8px", marginBottom: "16px" } }, schoolText),
          h("h1", { style: { color: themeColor, fontSize: "36px", margin: "0 0 6px", textShadow: "0 0 30px " + themeColor + "66", letterSpacing: "4px" } }, title),
          h("div", { style: { color: themeColor + "88", fontSize: "13px", letterSpacing: "5px", marginBottom: "40px" } }, subtitleText),
          h("div", { style: { marginBottom: "30px" } },
            h("input", {
              value: playerName,
              onChange: function (e) { setPlayerName(e.target.value); },
              placeholder: "Votre pseudo (optionnel)",
              maxLength: 20,
              style: { background: "rgba(255,255,255,0.03)", border: "1px solid " + themeColor + "33", color: themeColor, padding: "10px 16px", fontSize: "14px", fontFamily: "inherit", textAlign: "center", borderRadius: "4px", outline: "none", width: "250px" },
              onFocus: function (e) { e.target.style.borderColor = themeColor; },
              onBlur: function (e) { e.target.style.borderColor = themeColor + "33"; }
            })
          ),
          h("div", { style: { color: "#888", fontSize: "13px", marginBottom: "24px", letterSpacing: "2px" } }, "CHOISISSEZ VOTRE NIVEAU"),
          h("div", { style: { display: "flex", gap: "16px", justifyContent: "center", flexWrap: "wrap" } },
            profileEntries.map(function (entry) {
              var key = entry[0]; var p = entry[1];
              var lvlCount = typeof p.levels === "function" ? p.levels().length : p.levels.length;
              return h("button", {
                key: key,
                onClick: function () { startGame(key); },
                style: { background: "rgba(0,0,0,0.8)", border: "1px solid " + p.color + "33", color: p.color, padding: "20px 24px", fontFamily: "inherit", fontSize: "13px", cursor: "pointer", borderRadius: "4px", width: "200px", textAlign: "left", transition: "all 0.3s", boxShadow: "0 0 20px " + p.color + "11" },
                onMouseOver: function (e) { e.currentTarget.style.borderColor = p.color; e.currentTarget.style.boxShadow = "0 0 30px " + p.color + "33"; },
                onMouseOut: function (e) { e.currentTarget.style.borderColor = p.color + "33"; e.currentTarget.style.boxShadow = "0 0 20px " + p.color + "11"; }
              },
                h("div", { style: { fontSize: "16px", marginBottom: "8px", fontWeight: "bold" } }, p.label),
                h("div", { style: { color: "#888", fontSize: "11px", lineHeight: "1.5" } }, p.desc),
                h("div", { style: { color: "#555", fontSize: "10px", marginTop: "8px" } }, lvlCount + " niveaux")
              );
            })
          ),
          leaderboard.length > 0
            ? h("div", { style: { marginTop: "40px", maxWidth: "400px", margin: "40px auto 0" } },
                h("div", { style: { color: themeColor, fontSize: "12px", letterSpacing: "2px", marginBottom: "12px" } }, "🏆 LEADERBOARD"),
                leaderboard.slice(0, 8).map(function (e, i) {
                  return h("div", { key: i, style: { display: "flex", justifyContent: "space-between", color: i === 0 ? themeColor : "#666", fontSize: "12px", padding: "4px 0", borderBottom: "1px solid #111" } },
                    h("span", null, (i + 1) + ". " + e.name),
                    h("span", null, e.score + " pts")
                  );
                })
              )
            : null
        )
      );
    }

    // ═══════════════════════════════════════════
    // VICTORY SCREEN
    // ═══════════════════════════════════════════
    if (screen === "victory") {
      var elapsed = Math.floor((Date.now() - startTime) / 1000);
      var score = getScore();
      var p = profiles[profile];
      var victoryBg = backgroundColor.length <= 7 ? backgroundColor + "e6" : backgroundColor;

      return h("div", { style: { minHeight: "100vh", background: backgroundColor, fontFamily: "'Fira Code',monospace", display: "flex", alignItems: "center", justifyContent: "center", position: "relative", overflow: "hidden" } },
        rainConfig ? h(RainCanvas, rainConfig) : null,
        h("div", { style: { zIndex: 10, textAlign: "center", padding: "50px", border: "1px solid " + p.color + "44", borderRadius: "8px", background: victoryBg, boxShadow: "0 0 60px " + p.color + "15" } },
          h("div", { style: { fontSize: "48px", marginBottom: "16px" } }, "🏆"),
          h("h1", { style: { color: p.color, fontSize: "26px", margin: "0 0 6px", letterSpacing: "4px" } }, victoryTitle),
          h("div", { style: { color: "#555", fontSize: "12px", letterSpacing: "3px", marginBottom: "30px" } }, p.label),
          h("div", { style: { color: "#888", marginBottom: "30px", lineHeight: "2.2", fontSize: "14px" } },
            h("div", null, "Niveaux : ", h("span", { style: { color: p.color } }, levels.length + "/" + levels.length)),
            h("div", null, "Temps : ", h("span", { style: { color: p.color } }, formatTime(elapsed))),
            h("div", null, "Indices : ", h("span", { style: { color: hintsUsed === 0 ? "#4ade80" : "#facc15" } }, hintsUsed)),
            h("div", { style: { fontSize: "22px", marginTop: "8px" } }, "Score : ", h("span", { style: { color: p.color } }, score))
          ),
          h("div", { style: { color: "#475569", fontSize: "11px", marginBottom: "24px", maxWidth: "380px", lineHeight: "1.6" } },
            levels.map(function (l) { return l.topic; }).join(" · ")
          ),
          h("div", { style: { display: "flex", gap: "12px", justifyContent: "center", flexWrap: "wrap" } },
            h("button", {
              onClick: function () {
                setLeaderboard(function (prev) {
                  return prev.concat([{ name: playerName || "Anonyme", score: score, profile: p.label }]).sort(function (a, b) { return b.score - a.score; });
                });
                setScreen("menu");
              },
              style: { background: p.color, color: backgroundColor, border: "none", padding: "12px 28px", fontFamily: "inherit", fontSize: "13px", fontWeight: "bold", cursor: "pointer", letterSpacing: "2px", borderRadius: "3px" }
            }, "SAUVER & MENU"),
            h("button", {
              onClick: function () { startGame(profile); },
              style: { background: "transparent", color: p.color, border: "1px solid " + p.color, padding: "12px 28px", fontFamily: "inherit", fontSize: "13px", cursor: "pointer", letterSpacing: "2px", borderRadius: "3px" }
            }, "REJOUER")
          )
        )
      );
    }

    // ═══════════════════════════════════════════
    // GAME SCREEN
    // ═══════════════════════════════════════════
    var p = profiles[profile];

    return h("div", {
      style: { minHeight: "100vh", background: backgroundColor, fontFamily: "'Fira Code',monospace", display: "flex", flexDirection: "column", position: "relative" },
      onClick: focusInput
    },
      // Header
      h("div", { style: { background: headerBg, borderBottom: "1px solid " + headerBorder, padding: "10px 16px", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "8px", zIndex: 10 } },
        h("div", { style: { display: "flex", alignItems: "center", gap: "12px", flexWrap: "wrap" } },
          h("span", { style: { color: themeColor, fontSize: "13px", fontWeight: "bold" } }, icon + " " + title),
          h("span", { style: { color: headerBorder } }, "|"),
          h("span", { style: { color: p.color, fontSize: "11px" } }, p.label),
          h("span", { style: { color: headerBorder } }, "|"),
          h("span", { style: { color: colors.success, fontSize: "11px" } }, levels[levelIdx] && levels[levelIdx].title)
        ),
        h("div", { style: { display: "flex", gap: "10px", alignItems: "center" } },
          playerName ? h("span", { style: { color: "#555", fontSize: "11px" } }, playerName) : null,
          h("span", { style: { color: "#555", fontSize: "11px" } }, "LVL " + (levelIdx + 1) + "/" + levels.length),
          h("div", { style: { display: "flex", gap: "3px" } },
            levels.map(function (_, i) {
              return h("div", {
                key: i,
                style: {
                  width: "7px", height: "7px", borderRadius: "50%",
                  background: i < levelIdx ? colors.success : i === levelIdx ? p.color : headerBorder,
                  boxShadow: i < levelIdx ? "0 0 4px " + colors.success : i === levelIdx ? "0 0 6px " + p.color : "none",
                  transition: "all 0.3s"
                }
              });
            })
          ),
          h("button", {
            onClick: function () { setScreen("menu"); },
            style: { background: "none", border: "1px solid " + headerBorder, color: "#555", padding: "2px 8px", fontFamily: "inherit", fontSize: "10px", cursor: "pointer", borderRadius: "2px" }
          }, "MENU")
        )
      ),
      // Terminal output
      h("div", { ref: termRef, style: { flex: 1, overflowY: "auto", padding: "14px 16px", paddingBottom: "65px" } },
        lines.map(function (line, i) {
          if (line.type === "empty") return h("div", { key: i, style: { height: "10px" } });
          var baseStyle = {
            color: colors[line.type] || colors.response,
            fontSize: "13px", lineHeight: "1.7", whiteSpace: "pre-wrap", fontFamily: "inherit"
          };
          var extra = lineStyles[line.type] || {};
          var merged = {};
          var bk;
          for (bk in baseStyle) merged[bk] = baseStyle[bk];
          for (bk in extra) merged[bk] = extra[bk];
          return h("div", { key: i, style: merged }, line.text || "\u00A0");
        })
      ),
      // Input bar
      h("div", { style: { position: "fixed", bottom: 0, left: 0, right: 0, background: headerBg, borderTop: "1px solid " + headerBorder, padding: "10px 16px", display: "flex", alignItems: "center", gap: "8px", zIndex: 10 } },
        h("span", { style: { color: themeColor, fontSize: "13px", fontWeight: "bold" } }, promptSymbol),
        h("input", {
          ref: inputRef,
          value: input,
          onChange: function (e) { setInput(e.target.value); },
          onKeyDown: handleKeyDown,
          autoFocus: true,
          placeholder: inputPlaceholder,
          style: { flex: 1, background: "transparent", border: "none", outline: "none", color: colors.input, fontSize: "14px", fontFamily: "inherit", caretColor: themeColor }
        }),
        h("span", { style: { color: headerBorder, fontSize: "10px" } }, "ENTER ↵")
      )
    );
  };
})();
