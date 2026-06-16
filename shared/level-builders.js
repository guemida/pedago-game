// ═══════════════════════════════════════════════
// SHARED LEVEL BUILDERS — Pedago Game
// Builds game levels from declarative data objects
// Depends on: shared/utils.js (pick)
// ═══════════════════════════════════════════════

var buildLevel;
var buildDifficultyLevel;
var buildChallengeLevel;

(function () {

  // ─── Normalize helpers ───
  var normalizers = {
    removeSpaces: function (s) { return s.replace(/\s/g, ""); },
    removeQuotes: function (s) { return s.replace(/['"]/g, ""); },
    alphaOnly: function (s) { return s.replace(/[^a-z]/g, ""); },
    removeSpacesQuotes: function (s) { return s.replace(/\s/g, "").replace(/"/g, "'"); }
  };

  var applyNorm = function (s, norm) {
    if (!norm) return s.toLowerCase();
    var lo = s.toLowerCase();
    return normalizers[norm] ? normalizers[norm](lo) : lo;
  };

  // ─── Build checkWin from check descriptor ───
  var mkCheck = function (check) {
    if (!check) return function () { return false; };

    if (check.type === "regex") {
      var re = new RegExp(check.pattern, check.flags || "");
      return function (input) { return re.test(input); };
    }

    if (check.type === "regexAny") {
      var res = check.patterns.map(function (p) { return new RegExp(p, check.flags || ""); });
      var repl = check.inputReplace;
      return function (input) {
        var inp = repl ? input.replace(new RegExp(repl[0], "g"), repl[1]) : input;
        return res.some(function (r) { return r.test(inp); });
      };
    }

    if (check.type === "regexAll") {
      var resa = check.patterns.map(function (p) { return new RegExp(p, check.flags || ""); });
      return function (input) {
        return resa.every(function (r) { return r.test(input); });
      };
    }

    if (check.type === "answer") {
      return function (input) {
        if (!input.startsWith("answer ")) return false;
        var ans = applyNorm(input.slice(7).trim(), check.normalize);
        var expected = applyNorm(check.answer, check.normalize);
        if (ans === expected) return true;
        if (check.alt) return check.alt.some(function (a) { return applyNorm(a, check.normalize) === ans; });
        return false;
      };
    }

    if (check.type === "includes") {
      return function (input) {
        if (!input.startsWith("answer ")) return false;
        var ans = applyNorm(input.slice(7).trim(), check.normalize);
        return check.keywords.some(function (k) { return ans.includes(applyNorm(k, check.normalize)); });
      };
    }

    if (check.type === "score") {
      var scoreRes = check.patterns.map(function (p) { return new RegExp(p, "i"); });
      return function (input) {
        if (!input.startsWith("answer ")) return false;
        var ans = input.slice(7).trim();
        var sc = 0;
        for (var i = 0; i < scoreRes.length; i++) { if (scoreRes[i].test(ans)) sc++; }
        return sc >= check.minScore;
      };
    }

    return function () { return false; };
  };

  // ─── Build defaultResponse from feedback descriptor ───
  var mkDefault = function (fb) {
    if (!fb) return function () { return null; };

    // Array of ordered conditions (first match wins)
    if (Array.isArray(fb)) {
      var checks = fb.map(function (f) {
        return { re: new RegExp(f.pattern, f.flags || ""), msg: f.msg };
      });
      return function (input) {
        for (var i = 0; i < checks.length; i++) {
          if (checks[i].re.test(input)) return checks[i].msg;
        }
        return null;
      };
    }

    // Answer-prefix feedback
    if (fb.prefix) {
      return function (input) {
        if (input.startsWith(fb.prefix)) return Array.isArray(fb.msg) ? fb.msg : [fb.msg];
        return null;
      };
    }

    // Single regex-based feedback
    if (fb.pattern) {
      var re = new RegExp(fb.pattern, fb.flags || "");
      return function (input) {
        if (re.test(input)) return Array.isArray(fb.msg) ? fb.msg : [fb.msg, "  Tapez 'hint' pour un indice."];
        return null;
      };
    }

    return function () { return null; };
  };

  // ─── Build commands object (wrap arrays in {response:}) ───
  var mkCommands = function (cmdsData) {
    if (!cmdsData) return {};
    var commands = {};
    var keys = Object.keys(cmdsData);
    for (var i = 0; i < keys.length; i++) {
      var k = keys[i];
      var val = cmdsData[k];
      commands[k] = Array.isArray(val) ? { response: val } : val;
    }
    return commands;
  };

  // ─── Build mission text ───
  var mkMission = function (levelData, s) {
    // Single table display
    if (s.table && s.schema && s.rows) {
      var display = [s.schema, "-".repeat(s.schema.length)].concat(s.rows).join("\n");
      return "Table \"" + s.table + "\" :\n\n" + display + "\n\n" + s.q;
    }
    // Multi-table display (joins)
    if (s.tables) {
      var displays = s.tables.map(function (t) {
        return "Table \"" + t.name + "\" :\n" + t.schema + "\n" + "-".repeat(t.schema.length) + "\n" + t.rows.join("\n");
      }).join("\n\n");
      return displays + "\n\n" + s.q;
    }
    // Context-based mission
    if (s.context) {
      return (levelData.contextPrefix || "📋 CONTEXTE :\n") + s.context + "\n\n" + s.q;
    }
    // Standard prefix + q + suffix
    return (levelData.missionPrefix || "") + s.q + (levelData.missionSuffix || "");
  };

  // ═══════════════════════════════════════════════
  // PUBLIC: Build a level from scenario-based data
  // ═══════════════════════════════════════════════
  buildLevel = function (data) {
    var s = pick(data.scenarios);
    var mission = mkMission(data, s);

    // Build commands: level defaults + scenario overrides
    var commands = mkCommands(data.commands);
    if (s.explain) commands.explain = { response: s.explain };
    if (s.commands) {
      var skeys = Object.keys(s.commands);
      for (var i = 0; i < skeys.length; i++) {
        var k = skeys[i];
        commands[k] = Array.isArray(s.commands[k]) ? { response: s.commands[k] } : s.commands[k];
      }
    }
    // Auto-add schema command for table-based scenarios
    if (s.schema && !commands.schema) {
      commands.schema = { response: ["📋 STRUCTURE :", s.schema] };
    }

    return {
      id: data.id,
      title: data.title,
      topic: data.topic,
      mission: mission,
      hint: s.hint,
      commands: commands,
      checkWin: mkCheck(s.check),
      winResponse: Array.isArray(s.win) ? s.win : [s.win],
      defaultResponse: mkDefault(s.defaultFeedback || data.defaultFeedback)
    };
  };

  // ═══════════════════════════════════════════════
  // PUBLIC: Build a level from difficulty-based data
  // ═══════════════════════════════════════════════
  buildDifficultyLevel = function (data, difficulty) {
    var ch = pick(data.challenges[difficulty]);
    var mission = ch.desc + (data.missionSuffix || "");
    var commands = mkCommands(data.commands);

    var checkWin = function (input) {
      if (!input.startsWith("answer ")) return false;
      var a = input.slice(7).trim();
      var norm = ch.normalize ? applyNorm(a, ch.normalize) : a.toLowerCase().replace(/['"]/g, "");
      var expected = ch.normalize ? applyNorm(ch.answer, ch.normalize) : ch.answer.toLowerCase();
      if (norm === expected) return true;
      if (ch.alt) return ch.alt.some(function (x) { return x.toLowerCase() === norm; });
      return false;
    };

    var defaultResponse = function (input) {
      if (input.startsWith("answer ")) {
        if (checkWin(input)) return null;
        return [data.defaultMsg || "✗ Incorrect."];
      }
      return null;
    };

    var winResponse = data.winTemplate
      ? data.winTemplate.map(function (line) { return line.replace(/\{answer\}/g, ch.answer); })
      : ["✓ Correct ! " + ch.answer];

    return {
      id: data.id,
      title: data.title,
      topic: data.topic,
      mission: mission,
      hint: ch.hint,
      commands: commands,
      checkWin: checkWin,
      winResponse: winResponse,
      defaultResponse: defaultResponse
    };
  };

  // ═══════════════════════════════════════════════
  // PUBLIC: Build a level from a pool of "answer"
  // challenges. Handles both flat pools (data.challenges
  // is an array) and difficulty-tiered pools
  // (data.challenges[difficulty]).
  //   match: "exact"    → answer/alt matched after normalize (default)
  //   match: "includes" → answer exact OR any alt matched bidirectionally
  // Optional: data.missionTemplate with {desc} {code} {error},
  //   data.codeCommand (auto "code" command from ch.code),
  //   data.winTemplate with {answer} {fix}.
  // ═══════════════════════════════════════════════
  buildChallengeLevel = function (data, difficulty) {
    var pool = Array.isArray(data.challenges) ? data.challenges : data.challenges[difficulty];
    var ch = pick(pool);
    var normName = ch.normalize || data.normalize;

    var indent = function (lines) { return lines.map(function (l) { return "  " + l; }); };

    var mission;
    if (data.missionTemplate) {
      mission = data.missionTemplate
        .replace(/\{desc\}/g, ch.desc || "")
        .replace(/\{code\}/g, ch.code ? indent(ch.code).join("\n") : "")
        .replace(/\{error\}/g, ch.error || "");
    } else {
      mission = (ch.desc || "") + (data.missionSuffix || "");
    }

    var matchAnswer = function (raw) {
      var norm = applyNorm(raw, normName);
      var main = applyNorm(ch.answer, normName);
      if (norm === main) return true;
      var alts = (ch.alt || []).map(function (a) { return applyNorm(a, normName); });
      if (data.match === "includes") {
        return alts.some(function (a) { return norm.indexOf(a) !== -1 || a.indexOf(norm) !== -1; });
      }
      return alts.indexOf(norm) !== -1;
    };

    var checkWin = function (input) {
      if (!input.startsWith("answer ")) return false;
      return matchAnswer(input.slice(7).trim());
    };

    var defaultResponse = function (input) {
      if (input.startsWith("answer ")) {
        return checkWin(input) ? null : [data.defaultMsg || "✗ Incorrect."];
      }
      return null;
    };

    var commands = mkCommands(data.commands);
    if (data.codeCommand && ch.code) {
      commands.code = { response: ["📋 CODE :"].concat(indent(ch.code)).concat(["", "Erreur : " + ch.error]) };
    }

    var winResponse = (data.winTemplate || ["✓ Correct ! {answer}"]).map(function (line) {
      return line.replace(/\{answer\}/g, ch.answer).replace(/\{fix\}/g, ch.fix || "");
    });

    return {
      id: data.id,
      title: data.title,
      topic: data.topic,
      mission: mission,
      hint: ch.hint,
      commands: commands,
      checkWin: checkWin,
      winResponse: winResponse,
      defaultResponse: defaultResponse
    };
  };

})();
