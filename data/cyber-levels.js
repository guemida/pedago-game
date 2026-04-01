// ═══════════════════════════════════════════════
// CYBER LEVELS DATA — Pedago Game
// Used by: cyber.html via buildLevel()
// Only declarative levels; custom generators stay in cyber.html
// ═══════════════════════════════════════════════

var CYBER_LEVELS = {

  // ─── SCAN / RECONNAISSANCE ───
  scan: {
    id: "scan", title: "RECONNAISSANCE", topic: "Scan réseau & Reconnaissance",
    commands: {
      help: ["╔══════════════════════════════════════════════╗","║           COMMANDES DISPONIBLES              ║","╠══════════════════════════════════════════════╣","║  scan            - Scanner le réseau         ║","║  connect <ip>    - Se connecter à une cible  ║","║  nmap <ip>       - Détail des ports          ║","║  mission / hint / score                      ║","╚══════════════════════════════════════════════╝"]
    },
    scenarios: [
      {
        q: "Scannez le réseau pour identifier la cible vulnérable. Tapez 'help' pour les commandes.",
        hint: "Tapez 'scan' puis connectez-vous à la cible marquée VULNÉRABLE.",
        check: { type: "regex", pattern: "^connect 192\\.168\\.1\\.42$" },
        win: ["✓ Connexion établie avec 192.168.1.42", "", "⚠ LEÇON : La reconnaissance est la 1ère étape d'un pentest.", "→ Outils réels : Nmap, Masscan, Shodan.", "→ Défense : fermer les ports inutiles, IDS/IPS."],
        commands: {
          scan: ["⟳ Scanning réseau...", "  ├─ 192.168.1.1       [ROUTER]     Port 80,443", "  ├─ 192.168.1.25      [CAMERA]     Port 554", "  ├─ 10.0.0.1          [DNS]        Port 53,80", "  └─ 192.168.1.42      [SERVER]     Port 22,8080 ⚠ VULNÉRABLE", "", "→ Cible détectée ! Tapez 'connect 192.168.1.42'"]
        },
        defaultFeedback: [
          { pattern: "^connect ", msg: ["✗ Connexion refusée."] },
          { pattern: "^nmap 192\\.168\\.1\\.42$", msg: ["NMAP 192.168.1.42:", "  Type: SERVER", "  Ports: 22,8080 ⚠ VULNÉRABLE"] },
          { pattern: "^nmap 192\\.168\\.1\\.1$", msg: ["NMAP 192.168.1.1:", "  Type: ROUTER", "  Ports: 80,443"] },
          { pattern: "^nmap 192\\.168\\.1\\.25$", msg: ["NMAP 192.168.1.25:", "  Type: CAMERA", "  Ports: 554"] },
          { pattern: "^nmap 10\\.0\\.0\\.1$", msg: ["NMAP 10.0.0.1:", "  Type: DNS", "  Ports: 53,80"] },
          { pattern: "^nmap ", msg: ["✗ Hôte non trouvé."] }
        ]
      },
      {
        q: "Scannez le réseau pour identifier la cible vulnérable. Tapez 'help' pour les commandes.",
        hint: "Tapez 'scan' puis connectez-vous à la cible marquée VULNÉRABLE.",
        check: { type: "regex", pattern: "^connect 10\\.0\\.0\\.17$" },
        win: ["✓ Connexion établie avec 10.0.0.17", "", "⚠ LEÇON : La reconnaissance est la 1ère étape d'un pentest.", "→ Outils réels : Nmap, Masscan, Shodan.", "→ Défense : fermer les ports inutiles, IDS/IPS."],
        commands: {
          scan: ["⟳ Scanning réseau...", "  ├─ 192.168.1.10      [PRINTER]    Port 22,80", "  ├─ 172.16.0.1        [GATEWAY]    Port 80,443", "  ├─ 10.0.0.50         [MAIL]       Port 25,587", "  └─ 10.0.0.17         [DATABASE]   Port 22,443,3306 ⚠ VULNÉRABLE", "", "→ Cible détectée ! Tapez 'connect 10.0.0.17'"]
        },
        defaultFeedback: [
          { pattern: "^connect ", msg: ["✗ Connexion refusée."] },
          { pattern: "^nmap 10\\.0\\.0\\.17$", msg: ["NMAP 10.0.0.17:", "  Type: DATABASE", "  Ports: 22,443,3306 ⚠ VULNÉRABLE"] },
          { pattern: "^nmap 192\\.168\\.1\\.10$", msg: ["NMAP 192.168.1.10:", "  Type: PRINTER", "  Ports: 22,80"] },
          { pattern: "^nmap 172\\.16\\.0\\.1$", msg: ["NMAP 172.16.0.1:", "  Type: GATEWAY", "  Ports: 80,443"] },
          { pattern: "^nmap 10\\.0\\.0\\.50$", msg: ["NMAP 10.0.0.50:", "  Type: MAIL", "  Ports: 25,587"] },
          { pattern: "^nmap ", msg: ["✗ Hôte non trouvé."] }
        ]
      },
      {
        q: "Scannez le réseau pour identifier la cible vulnérable. Tapez 'help' pour les commandes.",
        hint: "Tapez 'scan' puis connectez-vous à la cible marquée VULNÉRABLE.",
        check: { type: "regex", pattern: "^connect 172\\.16\\.0\\.99$" },
        win: ["✓ Connexion établie avec 172.16.0.99", "", "⚠ LEÇON : La reconnaissance est la 1ère étape d'un pentest.", "→ Outils réels : Nmap, Masscan, Shodan.", "→ Défense : fermer les ports inutiles, IDS/IPS."],
        commands: {
          scan: ["⟳ Scanning réseau...", "  ├─ 192.168.1.1       [ROUTER]     Port 80,443", "  ├─ 10.0.0.50         [MAIL]       Port 25,587", "  ├─ 192.168.1.25      [CAMERA]     Port 554", "  └─ 172.16.0.99       [WEB SERVER] Port 21,22,80 ⚠ VULNÉRABLE", "", "→ Cible détectée ! Tapez 'connect 172.16.0.99'"]
        },
        defaultFeedback: [
          { pattern: "^connect ", msg: ["✗ Connexion refusée."] },
          { pattern: "^nmap 172\\.16\\.0\\.99$", msg: ["NMAP 172.16.0.99:", "  Type: WEB SERVER", "  Ports: 21,22,80 ⚠ VULNÉRABLE"] },
          { pattern: "^nmap 192\\.168\\.1\\.1$", msg: ["NMAP 192.168.1.1:", "  Type: ROUTER", "  Ports: 80,443"] },
          { pattern: "^nmap 10\\.0\\.0\\.50$", msg: ["NMAP 10.0.0.50:", "  Type: MAIL", "  Ports: 25,587"] },
          { pattern: "^nmap 192\\.168\\.1\\.25$", msg: ["NMAP 192.168.1.25:", "  Type: CAMERA", "  Ports: 554"] },
          { pattern: "^nmap ", msg: ["✗ Hôte non trouvé."] }
        ]
      }
    ]
  },

  // ─── OSINT — RENSEIGNEMENT ───
  osint: {
    id: "osint", title: "OSINT - RENSEIGNEMENT", topic: "OSINT & Ingénierie Sociale",
    commands: {
      help: ["╔══════════════════════════════════════════════╗","║  profile / posts / try <password> / explain  ║","╚══════════════════════════════════════════════╝"],
      explain: ["📖 OSINT","━━━━━━━━","Noms d'animaux → passwords","Dates perso → codes PIN","Outils : Maltego, Sherlock, Google Dorks"]
    },
    scenarios: [
      {
        q: "Cible : Alex Morin (@alexm_dev). Tapez 'try <password>'.",
        hint: "Chat + date naissance JJMM.",
        check: { type: "regex", pattern: "^try pixel1503$", flags: "i" },
        win: ["✓ ACCÈS ! Password : \"Pixel1503\"", "", "→ Ne JAMAIS utiliser d'infos personnelles.", "→ Utiliser un générateur aléatoire."],
        commands: {
          profile: ["👤 @alexm_dev", "   Alex Morin", "   Bio: Full-stack dev | Paris | Cat lover | Born 15/03/1995", "   Followers: 847"],
          posts: ["📱 @alexm_dev :", "  🕐 2h │ Deployed on AWS us-east-1 !", "  🕑 1j │ Birthday dinner 🎂", "  🕒 3j │ My cat Pixel turned 3 !", "  🕓 1sem │ Working from Café de Flore"]
        },
        defaultFeedback: [{ pattern: "^try ", msg: ["✗ Incorrect. Analysez le profil."] }]
      },
      {
        q: "Cible : Sarah Benali (@sarah.benali). Tapez 'try <password>'.",
        hint: "Chien + date importante JJMM.",
        check: { type: "regex", pattern: "^try oscar0707$", flags: "i" },
        win: ["✓ ACCÈS ! Password : \"Oscar0707\"", "", "→ Ne JAMAIS utiliser d'infos personnelles.", "→ Utiliser un générateur aléatoire."],
        commands: {
          profile: ["👤 @sarah.benali", "   Sarah Benali", "   Bio: Marketing @TechCorp | Lyon | Dog mom to Oscar", "   Followers: 1253"],
          posts: ["📱 @sarah.benali :", "  🕐 2h │ Oscar fête ses 5 ans !", "  🕑 1j │ Paris Marathon 4h12 !", "  🕒 3j │ Throwback wedding 07/07/2019", "  🕓 1sem │ Working late..."]
        },
        defaultFeedback: [{ pattern: "^try ", msg: ["✗ Incorrect. Analysez le profil."] }]
      },
      {
        q: "Cible : Thomas Leroy (@tom_leroy92). Tapez 'try <password>'.",
        hint: "Chien + date naissance JJMM.",
        check: { type: "regex", pattern: "^try rex2208$", flags: "i" },
        win: ["✓ ACCÈS ! Password : \"Rex2208\"", "", "→ Ne JAMAIS utiliser d'infos personnelles.", "→ Utiliser un générateur aléatoire."],
        commands: {
          profile: ["👤 @tom_leroy92", "   Thomas Leroy", "   Bio: DevOps @CloudCorp | Nantes | Fan de Rugby | Né le 22/08/1992", "   Followers: 612"],
          posts: ["📱 @tom_leroy92 :", "  🕐 2h │ All Blacks vs France 🏉 !", "  🕑 1j │ Mon labrador Rex a 4 ans !", "  🕒 3j │ Vacances à Biarritz 🏖️", "  🕓 1sem │ Nouveau job @CloudCorp !"]
        },
        defaultFeedback: [{ pattern: "^try ", msg: ["✗ Incorrect. Analysez le profil."] }]
      }
    ]
  },

  // ─── ANALYSE RÉSEAU ───
  network: {
    id: "network", title: "ANALYSE RÉSEAU", topic: "Analyse de trafic réseau",
    commands: {
      help: ["╔══════════════════════════════════════════════╗","║  logs / whois <ip> / flag <ip> / explain     ║","╚══════════════════════════════════════════════╝"],
      explain: ["📖 ANALYSE RÉSEAU","━━━━━━━━━━━━━━━━━","Ports suspects : 4444=Metasploit, 5555=ADB","Outils : Wireshark, tcpdump, Suricata"]
    },
    scenarios: [
      {
        q: "Identifiez la machine compromise. Tapez 'logs' puis 'flag <ip>'.",
        hint: "Port 4444 = Metasploit. flag 192.168.1.105",
        check: { type: "regex", pattern: "^flag 192\\.168\\.1\\.105$" },
        win: ["✓ MACHINE COMPROMISE : 192.168.1.105", "  Reverse shell port 4444 vers 185.143.223.1", "", "→ Surveiller les ports non-standard.", "→ Outils : Wireshark, Suricata, Splunk."],
        commands: {
          logs: ["📋 CAPTURE :", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "10:01:03 | 192.168.1.100 → 192.168.1.1   | TCP | Port 80   | HTTP", "10:01:05 | 192.168.1.100 → 8.8.8.8        | UDP | Port 53   | DNS", "10:01:07 | 192.168.1.105 → 45.33.32.156   | TCP | Port 443  | TLS", "10:01:09 | 192.168.1.105 → 185.143.223.1  | TCP | Port 4444 | DATA ████", "10:01:11 | 192.168.1.100 → 192.168.1.1    | TCP | Port 443  | HTTPS", "10:01:13 | 185.143.223.1 → 192.168.1.105  | TCP | Port 4444 | DATA ████", "10:01:15 | 192.168.1.100 → 192.168.1.50   | TCP | Port 22   | SSH", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"]
        },
        defaultFeedback: [
          { pattern: "^whois 185\\.143\\.223\\.1$", msg: ["🔍 185.143.223.1 : Russie, Bulletproof Hosting ⚠"] },
          { pattern: "^whois 192\\.168\\.1\\.105$", msg: ["🔍 192.168.1.105 : DESKTOP-PC105, j.martin"] },
          { pattern: "^whois ", msg: ["🔍 Réseau local."] },
          { pattern: "^flag ", msg: ["✗ Mauvaise IP."] }
        ]
      },
      {
        q: "Identifiez la machine compromise. Tapez 'logs' puis 'flag <ip>'.",
        hint: "Port 5555 = backdoor. flag 10.0.0.87",
        check: { type: "regex", pattern: "^flag 10\\.0\\.0\\.87$" },
        win: ["✓ MACHINE COMPROMISE : 10.0.0.87", "  Reverse shell port 5555 vers 91.215.85.22", "", "→ Surveiller les ports non-standard.", "→ Outils : Wireshark, Suricata, Splunk."],
        commands: {
          logs: ["📋 CAPTURE :", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "14:22:01 | 10.0.0.10 → 10.0.0.1        | TCP | Port 443  | HTTPS", "14:22:03 | 10.0.0.87 → 91.215.85.22    | TCP | Port 5555 | DATA ████", "14:22:05 | 10.0.0.10 → 8.8.4.4         | UDP | Port 53   | DNS", "14:22:07 | 91.215.85.22 → 10.0.0.87    | TCP | Port 5555 | DATA ████", "14:22:09 | 10.0.0.10 → 10.0.0.50       | TCP | Port 25   | SMTP", "14:22:11 | 10.0.0.87 → 91.215.85.22    | TCP | Port 5555 | DATA ████", "14:22:13 | 10.0.0.10 → 172.16.0.1      | TCP | Port 80   | HTTP", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"]
        },
        defaultFeedback: [
          { pattern: "^whois 91\\.215\\.85\\.22$", msg: ["🔍 91.215.85.22 : Ukraine, VPS anonyme ⚠"] },
          { pattern: "^whois 10\\.0\\.0\\.87$", msg: ["🔍 10.0.0.87 : LAPTOP-DEV87, s.durand"] },
          { pattern: "^whois ", msg: ["🔍 Réseau local."] },
          { pattern: "^flag ", msg: ["✗ Mauvaise IP."] }
        ]
      },
      {
        q: "Identifiez la machine compromise. Tapez 'logs' puis 'flag <ip>'.",
        hint: "Port 4444 = Metasploit. flag 172.16.0.33",
        check: { type: "regex", pattern: "^flag 172\\.16\\.0\\.33$" },
        win: ["✓ MACHINE COMPROMISE : 172.16.0.33", "  Reverse shell port 4444 vers 45.95.11.34", "", "→ Surveiller les ports non-standard.", "→ Outils : Wireshark, Suricata, Splunk."],
        commands: {
          logs: ["📋 CAPTURE :", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "08:45:01 | 172.16.0.10 → 172.16.0.1     | TCP | Port 80   | HTTP", "08:45:03 | 172.16.0.10 → 1.1.1.1        | UDP | Port 53   | DNS", "08:45:05 | 172.16.0.33 → 45.95.11.34    | TCP | Port 4444 | DATA ████", "08:45:07 | 172.16.0.10 → 172.16.0.50    | TCP | Port 443  | HTTPS", "08:45:09 | 45.95.11.34 → 172.16.0.33    | TCP | Port 4444 | DATA ████", "08:45:11 | 172.16.0.33 → 45.95.11.34    | TCP | Port 4444 | DATA ████", "08:45:13 | 172.16.0.10 → 172.16.0.20    | TCP | Port 22   | SSH", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"]
        },
        defaultFeedback: [
          { pattern: "^whois 45\\.95\\.11\\.34$", msg: ["🔍 45.95.11.34 : Pays-Bas, Hosting anonyme ⚠"] },
          { pattern: "^whois 172\\.16\\.0\\.33$", msg: ["🔍 172.16.0.33 : SRV-COMPTA, p.lambert"] },
          { pattern: "^whois ", msg: ["🔍 Réseau local."] },
          { pattern: "^flag ", msg: ["✗ Mauvaise IP."] }
        ]
      }
    ]
  }

};
