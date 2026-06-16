// ═══════════════════════════════════════════════
// NETWORK LEVELS DATA — Pedago Game
// Used by: network.html (custom inline engine, no Babel)
// Depends on: shared/utils.js (pick)
//   NETWORK_LEVELS.generate() → fresh randomized level array
//   NETWORK_LEVELS.LOGO_ASCII / VICTORY_ASCII → presentation art
// ═══════════════════════════════════════════════

var NETWORK_LEVELS = {

  LOGO_ASCII: [
    "  ┌─────────────────────────────────────────┐",
    "  │    _   _ _____ _____   ___   ____ _____ │",
    "  │   | \\ | | ____|_   _| / _ \\ |  _ \\_   _││",
    "  │   |  \\| |  _|   | |  | | | || |_) || |  │",
    "  │   | |\\  | |___  | |  | |_| ||  __/ | |  │",
    "  │   |_| \\_|_____| |_|   \\___/ |_|    |_|  │",
    "  │                                          │",
    "  │        NETWORK OPERATIONS TRAINING       │",
    "  └─────────────────────────────────────────┘",
  ],

  VICTORY_ASCII: [
    "",
    "  ╔═══════════════════════════════════════════════╗",
    "  ║                                               ║",
    "  ║      🏆  MISSION ACCOMPLIE !  🏆              ║",
    "  ║                                               ║",
    "  ║   Vous maîtrisez les fondamentaux réseau :    ║",
    "  ║                                               ║",
    "  ║   ✓ Scan & découverte réseau                  ║",
    "  ║   ✓ Diagnostic avec ping & traceroute         ║",
    "  ║   ✓ Calcul de sous-réseaux (subnetting)       ║",
    "  ║   ✓ Résolution DNS                            ║",
    "  ║   ✓ Configuration DHCP (processus DORA)       ║",
    "  ║   ✓ Règles firewall (iptables)                ║",
    "  ║   ✓ Segmentation VLAN                         ║",
    "  ║   ✓ Troubleshooting d'incident complet        ║",
    "  ║                                               ║",
    "  ║   Grade : INGÉNIEUR RÉSEAU JUNIOR             ║",
    "  ║                                               ║",
    "  ╚═══════════════════════════════════════════════╝",
    "",
    "  Tapez 'restart' pour rejouer avec de nouvelles valeurs.",
  ],

  generate: function generateLevels() {
    // Random subnet for level 2
    const subnetSets = [
      { mask: "255.255.255.0", cidr: "/24", hosts: "254", network: "192.168.1.0", broadcast: "192.168.1.255" },
      { mask: "255.255.255.128", cidr: "/25", hosts: "126", network: "10.0.0.0", broadcast: "10.0.0.127" },
      { mask: "255.255.0.0", cidr: "/16", hosts: "65534", network: "172.16.0.0", broadcast: "172.16.255.255" },
    ];
    const subnet = pick(subnetSets);

    // Random DNS for level 3
    const dnsSets = [
      { domain: "api.ecole-ingenieurs.fr", ip: "51.158.97.42", type: "A" },
      { domain: "mail.campus-tech.io", ip: "185.12.64.10", type: "A" },
      { domain: "intranet.univ-paris.fr", ip: "193.51.24.81", type: "A" },
    ];
    const dns = pick(dnsSets);

    // Random firewall port for level 5
    const fwSets = [
      { port: "3306", service: "MySQL", rule: "DENY" },
      { port: "5432", service: "PostgreSQL", rule: "DENY" },
      { port: "27017", service: "MongoDB", rule: "DENY" },
    ];
    const fw = pick(fwSets);

    // Random VLAN for level 6
    const vlanSets = [
      { id: "10", name: "ADMIN", subnet: "192.168.10.0/24" },
      { id: "20", name: "DEV", subnet: "192.168.20.0/24" },
      { id: "30", name: "GUEST", subnet: "192.168.30.0/24" },
    ];
    const vlan = pick(vlanSets);

    return [
      // ─── LEVEL 0: INTRO ───
      {
        id: 0,
        title: "INITIALISATION RÉSEAU",
        topic: "Introduction",
        mission: "Bienvenue, technicien réseau. Tapez 'help' pour commencer.",
        hint: "Commencez par taper: help",
        commands: {
          help: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║          COMMANDES DISPONIBLES                ║",
              "╠═══════════════════════════════════════════════╣",
              "║  help       - Afficher cette aide             ║",
              "║  ifconfig   - Voir la config réseau           ║",
              "║  scan       - Scanner le réseau local         ║",
              "║  mission    - Voir la mission en cours        ║",
              "║  hint       - Obtenir un indice               ║",
              "║  explain    - Cours sur le sujet du niveau    ║",
              "╚═══════════════════════════════════════════════╝",
            ],
          },
          ifconfig: {
            response: [
              "eth0:",
              "  inet 192.168.1.100/24",
              "  ether 0a:1b:2c:3d:4e:5f",
              "  gateway 192.168.1.1",
              "  status: UP",
              "",
              "lo:",
              "  inet 127.0.0.1/8",
              "  status: UP",
            ],
          },
          scan: {
            response: [
              "⟳ Scanning 192.168.1.0/24...",
              "",
              "  ┌──────────────────┬──────────┬─────────────────┐",
              "  │ IP               │ TYPE     │ PORTS OUVERTS   │",
              "  ├──────────────────┼──────────┼─────────────────┤",
              "  │ 192.168.1.1      │ ROUTER   │ 80, 443         │",
              "  │ 192.168.1.10     │ SERVEUR  │ 22, 80, 443     │",
              "  │ 192.168.1.20     │ SWITCH   │ 23, 161         │",
              "  │ 192.168.1.50     │ IMPRIM.  │ 631, 9100       │",
              "  │ 192.168.1.100    │ VOUS     │ —               │",
              "  └──────────────────┴──────────┴─────────────────┘",
              "",
              "→ Réseau scanné ! Tapez 'connect router' pour configurer le réseau.",
            ],
          },
          explain: {
            response: [
              "📖 LE RÉSEAU LOCAL (LAN)",
              "━━━━━━━━━━━━━━━━━━━━━━━━",
              "Un LAN connecte des machines proches (bureau, école).",
              "Chaque appareil a :",
              "  • Une adresse IP (ex: 192.168.1.100)",
              "  • Une adresse MAC (identifiant physique unique)",
              "  • Un masque de sous-réseau (délimite le réseau)",
              "  • Une passerelle (gateway) pour sortir du LAN",
              "",
              "Outils de base : ifconfig, ping, scan, traceroute",
            ],
          },
          "connect router": {
            response: [
              "✓ Connexion au routeur 192.168.1.1 établie.",
              "  Firmware: OpenWRT 23.05",
              "  Uptime: 47 jours",
              "",
              "→ Accès réseau confirmé. Niveau suivant débloqué !",
            ],
            nextLevel: true,
          },
        },
      },

      // ─── LEVEL 1: PING & CONNECTIVITÉ ───
      {
        id: 1,
        title: "DIAGNOSTIC RÉSEAU",
        topic: "Ping & Connectivité",
        mission: "Un serveur ne répond plus. Utilisez 'ping' pour diagnostiquer, puis 'traceroute' pour localiser le problème.",
        hint: "Essayez: ping 192.168.1.10, puis ping 8.8.8.8, puis traceroute 8.8.8.8",
        commands: {
          help: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║  ping <ip>       - Tester la connectivité     ║",
              "║  traceroute <ip> - Tracer le chemin réseau     ║",
              "║  diagnose        - Analyser le problème       ║",
              "║  explain         - Comprendre ping/traceroute ║",
              "╚═══════════════════════════════════════════════╝",
            ],
          },
          explain: {
            response: [
              "📖 PING & TRACEROUTE",
              "━━━━━━━━━━━━━━━━━━━━",
              "PING envoie un paquet ICMP Echo Request :",
              "  → Si réponse : la machine est joignable",
              "  → Si timeout : problème réseau ou machine down",
              "",
              "TRACEROUTE affiche chaque routeur traversé :",
              "  → Permet de localiser OÙ le paquet se perd",
              "  → Chaque 'hop' = un routeur intermédiaire",
              "",
              "TTL (Time To Live) : compteur qui s'incrémente",
              "à chaque hop pour découvrir la route.",
            ],
          },
          "ping 192.168.1.10": {
            response: [
              "PING 192.168.1.10 :",
              "  64 bytes from 192.168.1.10: ttl=64 time=0.8ms",
              "  64 bytes from 192.168.1.10: ttl=64 time=0.6ms",
              "  64 bytes from 192.168.1.10: ttl=64 time=0.9ms",
              "  ✓ Serveur local OK — 0% packet loss",
            ],
          },
          "ping 192.168.1.1": {
            response: [
              "PING 192.168.1.1 :",
              "  64 bytes from 192.168.1.1: ttl=64 time=1.2ms",
              "  ✓ Gateway OK",
            ],
          },
          "ping 8.8.8.8": {
            response: [
              "PING 8.8.8.8 :",
              "  Request timeout for icmp_seq 0",
              "  Request timeout for icmp_seq 1",
              "  Request timeout for icmp_seq 2",
              "  ✗ 100% packet loss — Pas d'accès Internet !",
              "",
              "→ Le LAN fonctionne mais pas Internet. Lancez traceroute 8.8.8.8",
            ],
          },
          "traceroute 8.8.8.8": {
            response: [
              "traceroute to 8.8.8.8 :",
              "  1  192.168.1.1    1.2ms   ✓ (votre gateway)",
              "  2  10.0.0.1       3.5ms   ✓ (routeur FAI)",
              "  3  82.64.12.1     8.1ms   ✓ (backbone FAI)",
              "  4  * * *          ✗ TIMEOUT",
              "  5  * * *          ✗ TIMEOUT",
              "",
              "⚠ Le paquet se perd au hop 4 — problème chez le FAI !",
              "→ Tapez 'diagnose' pour conclure.",
            ],
          },
          diagnose: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║  DIAGNOSTIC RÉSEAU                            ║",
              "╠═══════════════════════════════════════════════╣",
              "║  ✓ LAN         : Fonctionnel                 ║",
              "║  ✓ Gateway     : Joignable                   ║",
              "║  ✓ FAI hop 1-3 : OK                          ║",
              "║  ✗ FAI hop 4+  : PERTE DE PAQUETS            ║",
              "╠═══════════════════════════════════════════════╣",
              "║  Conclusion: Panne chez le FAI, pas locale.  ║",
              "║  Action: Contacter le support FAI.            ║",
              "╚═══════════════════════════════════════════════╝",
              "",
              "✓ Diagnostic correct ! Niveau suivant débloqué.",
            ],
            nextLevel: true,
          },
        },
        defaultResponse: (input) => {
          if (input === "traceroute" || input === "ping") {
            return ["✗ Usage : " + input + " <adresse_ip>", "  Exemple : " + input + " 8.8.8.8"];
          }
          if (input.startsWith("traceroute ")) {
            const ip = input.slice(11).trim();
            if (ip === "192.168.1.1") {
              return ["traceroute to 192.168.1.1 :", "  1  192.168.1.1    1.1ms   ✓ (votre gateway)", "", "→ Le routeur local est joignable. Essayez traceroute 8.8.8.8"];
            }
            if (ip === "192.168.1.10") {
              return ["traceroute to 192.168.1.10 :", "  1  192.168.1.10   0.8ms   ✓ (réseau local)", "", "→ Le serveur local est joignable. Le problème est plus loin. Essayez traceroute 8.8.8.8"];
            }
            return ["traceroute to " + ip + " :", "  1  192.168.1.1    1.2ms   ✓ (votre gateway)", "  2  * * *          ✗ TIMEOUT", "", "→ Pas de route vers " + ip + ". Essayez traceroute 8.8.8.8"];
          }
          if (input.startsWith("ping ")) {
            const ip = input.slice(5).trim();
            return ["PING " + ip + " :", "  Request timeout for icmp_seq 0", "  ✗ Hôte injoignable."];
          }
          return null;
        },
      },

      // ─── LEVEL 2: SUBNETTING ───
      {
        id: 2,
        title: "CALCUL DE SOUS-RÉSEAU",
        topic: "Subnetting",
        mission: `Réseau: ${subnet.network}${subnet.cidr}. Calculez le nombre d'hôtes possibles. Tapez 'answer <nombre>'.`,
        hint: `Masque ${subnet.mask} = ${subnet.cidr}. Formule : 2^(32-prefix) - 2. La réponse est ${subnet.hosts}.`,
        commands: {
          help: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║  subnet info     - Voir les infos réseau      ║",
              "║  answer <nombre> - Donner votre réponse       ║",
              "║  explain         - Comprendre le subnetting   ║",
              "║  calc <cidr>     - Aide au calcul             ║",
              "╚═══════════════════════════════════════════════╝",
            ],
          },
          explain: {
            response: [
              "📖 SUBNETTING (SOUS-RÉSEAU)",
              "━━━━━━━━━━━━━━━━━━━━━━━━━━━",
              "Une adresse IPv4 = 32 bits : RÉSEAU | HÔTE",
              "",
              "Le masque définit la frontière :",
              "  /24 = 255.255.255.0   → 8 bits hôte  → 2⁸-2 = 254 hôtes",
              "  /25 = 255.255.255.128 → 7 bits hôte  → 2⁷-2 = 126 hôtes",
              "  /16 = 255.255.0.0     → 16 bits hôte → 2¹⁶-2 = 65534 hôtes",
              "",
              "On retire 2 : adresse réseau + broadcast",
              "",
              "Notation CIDR: /24 = les 24 premiers bits sont le réseau",
              "Bits hôte = 32 - préfixe CIDR",
              "Hôtes = 2^(bits hôte) - 2",
            ],
          },
          "subnet info": {
            response: [
              `  Réseau    : ${subnet.network}`,
              `  Masque    : ${subnet.mask}`,
              `  CIDR      : ${subnet.cidr}`,
              `  Broadcast : ${subnet.broadcast}`,
              "",
              "→ Combien d'hôtes utilisables ? Tapez 'answer <nombre>'",
            ],
          },
        },
        defaultResponse: (input) => {
          const m = input.match(/^calc \/(\d+)$/);
          if (m) {
            const p = parseInt(m[1]);
            if (p < 0 || p > 32) return ["✗ CIDR doit être entre 0 et 32."];
            const bits = 32 - p;
            const hosts = Math.pow(2, bits) - 2;
            return [
              `  /${p} → ${bits} bits hôte`,
              `  2^${bits} - 2 = ${hosts} hôtes utilisables`,
            ];
          }
          const a = input.match(/^answer (\d+)$/);
          if (a) {
            if (a[1] === subnet.hosts) return null; // win handled by checkWin
            return [`✗ Incorrect. Indice : masque ${subnet.mask}, formule 2^(bits hôte) - 2`];
          }
          return null;
        },
        checkWin: (input) => {
          const m = input.match(/^answer (\d+)$/);
          return m && m[1] === subnet.hosts;
        },
        winResponse: [
          `✓ CORRECT ! ${subnet.hosts} hôtes utilisables sur un ${subnet.cidr}`,
          "",
          "Le subnetting est la BASE de l'architecture réseau.",
          "→ Niveau suivant débloqué !",
        ],
      },

      // ─── LEVEL 3: DNS ───
      {
        id: 3,
        title: "RÉSOLUTION DNS",
        topic: "DNS",
        mission: `Résolvez le domaine ${dns.domain}. Utilisez 'nslookup' et 'dig' pour trouver l'IP, puis 'answer <ip>'.`,
        hint: `Tapez 'nslookup ${dns.domain}' ou 'dig ${dns.domain}'. L'IP est ${dns.ip}.`,
        commands: {
          help: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║  nslookup <dom>  - Résolution DNS simple      ║",
              "║  dig <dom>       - Résolution DNS détaillée   ║",
              "║  answer <ip>     - Donner l'IP trouvée        ║",
              "║  explain         - Comprendre le DNS          ║",
              "╚═══════════════════════════════════════════════╝",
            ],
          },
          explain: {
            response: [
              "📖 DNS (Domain Name System)",
              "━━━━━━━━━━━━━━━━━━━━━━━━━━",
              "Le DNS traduit les noms de domaine en adresses IP.",
              "",
              "Hiérarchie de résolution :",
              "  1. Cache local (navigateur, OS)",
              "  2. Serveur DNS récursif (FAI ou 8.8.8.8)",
              "  3. Serveur racine → .fr → domaine",
              "  4. Serveur autoritaire du domaine",
              "",
              "Types d'enregistrements :",
              "  A     : domaine → IPv4",
              "  AAAA  : domaine → IPv6",
              "  CNAME : alias → autre domaine",
              "  MX    : serveur mail",
              "  NS    : serveur DNS autoritaire",
              "  TXT   : données texte (SPF, DKIM...)",
            ],
          },
        },
        defaultResponse: (input) => {
          if (input === `nslookup ${dns.domain}`) {
            return [
              `Server:    8.8.8.8`,
              `Address:   8.8.8.8#53`,
              "",
              `Non-authoritative answer:`,
              `Name:    ${dns.domain}`,
              `Address: ${dns.ip}`,
              "",
              `→ Tapez 'answer ${dns.ip}' pour valider.`,
            ];
          }
          if (input === `dig ${dns.domain}`) {
            return [
              `;; ANSWER SECTION:`,
              `${dns.domain}.  300  IN  ${dns.type}  ${dns.ip}`,
              "",
              `;; Query time: 12 msec`,
              `;; SERVER: 8.8.8.8#53`,
              `;; MSG SIZE rcvd: 58`,
              "",
              `→ Record ${dns.type} trouvé ! Tapez 'answer ${dns.ip}'`,
            ];
          }
          if (input.startsWith("nslookup ") || input.startsWith("dig ")) {
            return ["✗ Domaine inconnu. Vérifiez le nom exact dans la mission."];
          }
          const a = input.match(/^answer (.+)$/);
          if (a) {
            if (a[1] === dns.ip) return null;
            return [`✗ Ce n'est pas la bonne IP. Utilisez nslookup ou dig sur ${dns.domain}`];
          }
          return null;
        },
        checkWin: (input) => {
          const m = input.match(/^answer (.+)$/);
          return m && m[1] === dns.ip;
        },
        winResponse: [
          `✓ CORRECT ! ${dns.domain} → ${dns.ip}`,
          "",
          "Le DNS est le \"annuaire\" d'Internet.",
          "Sans DNS, il faudrait retenir toutes les IP par cœur !",
          "→ Niveau suivant débloqué !",
        ],
      },

      // ─── LEVEL 4: DHCP ───
      {
        id: 4,
        title: "CONFIGURATION DHCP",
        topic: "DHCP",
        mission: "Un nouveau PC n'a pas d'IP. Configurez le serveur DHCP pour lui attribuer une adresse. Suivez le processus DORA.",
        hint: "Le processus DHCP = DORA : Discover → Offer → Request → Acknowledge. Tapez 'dora' pour lancer.",
        commands: {
          help: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║  dora          - Lancer le processus DHCP     ║",
              "║  pool          - Voir le pool d'adresses      ║",
              "║  leases        - Voir les baux actifs         ║",
              "║  config        - Voir la config DHCP          ║",
              "║  explain       - Comprendre le DHCP           ║",
              "╚═══════════════════════════════════════════════╝",
            ],
          },
          explain: {
            response: [
              "📖 DHCP (Dynamic Host Configuration Protocol)",
              "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
              "Le DHCP attribue automatiquement les configs réseau.",
              "",
              "Processus DORA :",
              "  1. DISCOVER : Le client envoie un broadcast",
              "     'Qui peut me donner une IP ?'",
              "  2. OFFER : Le serveur DHCP propose une IP",
              "  3. REQUEST : Le client accepte l'offre",
              "  4. ACK : Le serveur confirme le bail (lease)",
              "",
              "Le bail a une durée limitée (ex: 24h).",
              "Le client doit renouveler avant expiration.",
              "",
              "Le serveur fournit : IP, masque, gateway, DNS",
            ],
          },
          pool: {
            response: [
              "  DHCP Pool: 192.168.1.100 → 192.168.1.200",
              "  Masque   : 255.255.255.0",
              "  Gateway  : 192.168.1.1",
              "  DNS      : 8.8.8.8, 1.1.1.1",
              "  Bail     : 86400s (24h)",
              "",
              "  Disponibles: 97/100",
            ],
          },
          leases: {
            response: [
              "  ┌───────────────────┬───────────────────┬──────────┐",
              "  │ IP                │ MAC               │ EXPIRE   │",
              "  ├───────────────────┼───────────────────┼──────────┤",
              "  │ 192.168.1.101     │ aa:bb:cc:11:22:33 │ 23:14:02 │",
              "  │ 192.168.1.102     │ dd:ee:ff:44:55:66 │ 18:45:30 │",
              "  │ 192.168.1.103     │ 11:22:33:aa:bb:cc │ 12:00:15 │",
              "  └───────────────────┴───────────────────┴──────────┘",
            ],
          },
          config: {
            response: [
              "  dhcp-server {",
              "    interface eth0;",
              "    range 192.168.1.100 192.168.1.200;",
              "    subnet-mask 255.255.255.0;",
              "    default-gateway 192.168.1.1;",
              "    dns-server 8.8.8.8, 1.1.1.1;",
              "    lease-time 86400;",
              "  }",
            ],
          },
          dora: {
            response: [
              "⟳ Processus DHCP DORA en cours...",
              "",
              "  ① DISCOVER → Client (ff:ff:ff:ff:ff:ff) broadcast",
              "    'Je cherche un serveur DHCP !'",
              "",
              "  ② OFFER ← Serveur propose 192.168.1.104",
              "    + masque 255.255.255.0",
              "    + gateway 192.168.1.1",
              "    + DNS 8.8.8.8",
              "",
              "  ③ REQUEST → Client accepte 192.168.1.104",
              "    'Je prends cette IP !'",
              "",
              "  ④ ACK ← Serveur confirme le bail",
              "    Durée: 24 heures",
              "",
              "✓ PC configuré ! IP 192.168.1.104 attribuée.",
              "",
              "→ Tapez 'verify' pour vérifier la configuration.",
            ],
          },
          verify: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║  VÉRIFICATION CONFIG RÉSEAU - Nouveau PC      ║",
              "╠═══════════════════════════════════════════════╣",
              "║  IP       : 192.168.1.104        ✓           ║",
              "║  Masque   : 255.255.255.0        ✓           ║",
              "║  Gateway  : 192.168.1.1          ✓           ║",
              "║  DNS      : 8.8.8.8              ✓           ║",
              "║  Bail     : 86400s               ✓           ║",
              "╠═══════════════════════════════════════════════╣",
              "║  PING gateway : ✓ OK                         ║",
              "║  PING DNS     : ✓ OK                         ║",
              "║  Résolution   : ✓ google.fr → 142.250.75.227 ║",
              "╚═══════════════════════════════════════════════╝",
              "",
              "✓ Configuration DHCP fonctionnelle !",
              "→ Niveau suivant débloqué !",
            ],
            nextLevel: true,
          },
        },
      },

      // ─── LEVEL 5: FIREWALL ───
      {
        id: 5,
        title: "RÈGLES FIREWALL",
        topic: "Firewall & Sécurité",
        mission: `Audit de sécurité : le port ${fw.port} (${fw.service}) est ouvert sur le serveur web. C'est dangereux ! Bloquez-le avec 'iptables'.`,
        hint: `Tapez 'iptables -A INPUT -p tcp --dport ${fw.port} -j DROP' pour bloquer le port ${fw.port}.`,
        commands: {
          help: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║  iptables -L       - Lister les règles        ║",
              "║  iptables -A INPUT - Ajouter une règle        ║",
              "║  nmap 192.168.1.10 - Scanner les ports         ║",
              "║  explain           - Comprendre les firewalls  ║",
              "╚═══════════════════════════════════════════════╝",
            ],
          },
          explain: {
            response: [
              "📖 FIREWALL (PARE-FEU)",
              "━━━━━━━━━━━━━━━━━━━━━━",
              "Un firewall filtre le trafic réseau selon des règles.",
              "",
              "Chaînes iptables :",
              "  INPUT   : trafic entrant vers la machine",
              "  OUTPUT  : trafic sortant de la machine",
              "  FORWARD : trafic transitant (routeur)",
              "",
              "Actions :",
              "  ACCEPT : autoriser le paquet",
              "  DROP   : supprimer silencieusement",
              "  REJECT : refuser avec message d'erreur",
              "",
              "Syntaxe : iptables -A <chaîne> -p <proto> --dport <port> -j <action>",
              "",
              "Principe du moindre privilège :",
              "→ N'ouvrir QUE les ports nécessaires !",
            ],
          },
          "nmap 192.168.1.10": {
            response: [
              "Starting Nmap scan on 192.168.1.10...",
              "",
              "  PORT     STATE  SERVICE",
              "  22/tcp   open   SSH",
              "  80/tcp   open   HTTP",
              "  443/tcp  open   HTTPS",
              `  ${fw.port}/tcp   open   ${fw.service}  ⚠ DANGER`,
              "",
              `⚠ Le port ${fw.port} (${fw.service}) est exposé sur un serveur web !`,
              `→ Bloquez-le : iptables -A INPUT -p tcp --dport ${fw.port} -j DROP`,
            ],
          },
          "iptables -L": {
            response: [
              "Chain INPUT (policy ACCEPT)",
              "  ACCEPT  tcp  --  anywhere  dport 22   (SSH)",
              "  ACCEPT  tcp  --  anywhere  dport 80   (HTTP)",
              "  ACCEPT  tcp  --  anywhere  dport 443  (HTTPS)",
              `  ⚠ Pas de règle pour bloquer ${fw.port}/${fw.service} !`,
            ],
          },
          [`iptables -A INPUT -p tcp --dport ${fw.port} -j DROP`]: {
            response: [
              `✓ Règle ajoutée : BLOQUER TCP port ${fw.port} (${fw.service})`,
              "",
              "Chain INPUT (policy ACCEPT) — mise à jour :",
              "  ACCEPT  tcp  dport 22   (SSH)",
              "  ACCEPT  tcp  dport 80   (HTTP)",
              "  ACCEPT  tcp  dport 443  (HTTPS)",
              `  DROP    tcp  dport ${fw.port}  (${fw.service}) ← NOUVEAU`,
              "",
              `✓ Port ${fw.port} bloqué ! Le serveur est sécurisé.`,
              "→ Niveau suivant débloqué !",
            ],
            nextLevel: true,
          },
        },
        defaultResponse: (input) => {
          if (input.startsWith("iptables -A")) {
            return [`✗ Syntaxe incorrecte. Essayez : iptables -A INPUT -p tcp --dport ${fw.port} -j DROP`];
          }
          return null;
        },
      },

      // ─── LEVEL 6: VLAN ───
      {
        id: 6,
        title: "SEGMENTATION VLAN",
        topic: "VLAN & Segmentation",
        mission: `Créez le VLAN ${vlan.id} (${vlan.name}) sur le switch pour isoler le trafic. Configurez-le avec le sous-réseau ${vlan.subnet}.`,
        hint: `Tapez 'vlan create ${vlan.id} ${vlan.name}' puis 'vlan assign ${vlan.id} ${vlan.subnet}'.`,
        commands: {
          help: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║  vlan list              - Lister les VLANs    ║",
              "║  vlan create <id> <nom> - Créer un VLAN       ║",
              "║  vlan assign <id> <sub> - Assigner sous-réseau║",
              "║  vlan verify            - Vérifier la config  ║",
              "║  explain                - Comprendre les VLAN ║",
              "╚═══════════════════════════════════════════════╝",
            ],
          },
          explain: {
            response: [
              "📖 VLAN (Virtual LAN)",
              "━━━━━━━━━━━━━━━━━━━━━",
              "Un VLAN segmente un réseau physique en réseaux logiques.",
              "",
              "Pourquoi ?",
              "  • Sécurité : isoler les départements",
              "  • Performance : réduire le broadcast",
              "  • Organisation : séparer admin/dev/guest",
              "",
              "Fonctionnement :",
              "  • Chaque VLAN a un ID (1-4094)",
              "  • Les ports du switch sont assignés à un VLAN",
              "  • Trunk = liaison inter-switch multi-VLAN (802.1Q)",
              "  • Inter-VLAN routing = via routeur ou switch L3",
              "",
              "Sans VLAN, tout le monde est dans le même broadcast domain !",
            ],
          },
          "vlan list": {
            response: [
              "  ┌──────┬────────────┬──────────────────────┐",
              "  │ ID   │ NOM        │ SOUS-RÉSEAU          │",
              "  ├──────┼────────────┼──────────────────────┤",
              "  │ 1    │ DEFAULT    │ 192.168.1.0/24       │",
              "  └──────┴────────────┴──────────────────────┘",
              "",
              `→ Créez le VLAN ${vlan.id} : vlan create ${vlan.id} ${vlan.name}`,
            ],
          },
        },
        defaultResponse: (input) => {
          if (input === `vlan create ${vlan.id} ${vlan.name}`) {
            return [
              `✓ VLAN ${vlan.id} (${vlan.name}) créé.`,
              "",
              `→ Assignez le sous-réseau : vlan assign ${vlan.id} ${vlan.subnet}`,
            ];
          }
          if (input === `vlan assign ${vlan.id} ${vlan.subnet}`) {
            return [
              `✓ Sous-réseau ${vlan.subnet} assigné au VLAN ${vlan.id}.`,
              "",
              "→ Tapez 'vlan verify' pour valider la configuration.",
            ];
          }
          if (input === "vlan verify") return null; // handled by checkWin
          if (input.startsWith("vlan create") || input.startsWith("vlan assign")) {
            return [`✗ Vérifiez les paramètres. VLAN ID: ${vlan.id}, Nom: ${vlan.name}, Subnet: ${vlan.subnet}`];
          }
          return null;
        },
        checkWin: (input) => input === "vlan verify",
        winResponse: [
          "╔═══════════════════════════════════════════════╗",
          "║  VÉRIFICATION VLAN                            ║",
          "╠═══════════════════════════════════════════════╣",
          `║  VLAN ${vlan.id} (${vlan.name})${" ".repeat(Math.max(0, 32 - vlan.name.length - vlan.id.length))}✓           ║`,
          `║  Subnet: ${vlan.subnet}${" ".repeat(Math.max(0, 28 - vlan.subnet.length))}✓           ║`,
          "║  Isolation broadcast       ✓                 ║",
          "║  Trunk 802.1Q              ✓                 ║",
          "╚═══════════════════════════════════════════════╝",
          "",
          "✓ VLAN correctement configuré !",
          "→ Niveau suivant débloqué !",
        ],
      },

      // ─── LEVEL 7: FINAL CHALLENGE ───
      {
        id: 7,
        title: "INCIDENT RÉSEAU CRITIQUE",
        topic: "Troubleshooting Complet",
        mission: "ALERTE ! Le réseau de production est down. Diagnostiquez et réparez en utilisant toutes vos compétences. Tapez 'status' pour commencer.",
        hint: "Suivez les étapes : status → ping gateway → check dns → check dhcp → fix dns → fix dhcp → restart",
        fixedDns: false,
        fixedDhcp: false,
        commands: {
          help: {
            response: [
              "╔═══════════════════════════════════════════════╗",
              "║  status        - État des services            ║",
              "║  ping <ip>     - Tester la connectivité       ║",
              "║  check dns     - Vérifier le DNS              ║",
              "║  check dhcp    - Vérifier le DHCP             ║",
              "║  fix dns       - Réparer le DNS               ║",
              "║  fix dhcp      - Réparer le DHCP              ║",
              "║  restart       - Redémarrer les services      ║",
              "╚═══════════════════════════════════════════════╝",
            ],
          },
          status: {
            response: [
              "⚠ RAPPORT D'INCIDENT — RÉSEAU PRODUCTION",
              "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
              "  Connectivité LAN  : ⚠ DÉGRADÉE",
              "  Service DNS       : ✗ DOWN",
              "  Service DHCP      : ✗ DOWN",
              "  Firewall          : ✓ OK",
              "  Switches          : ✓ OK",
              "",
              "→ 2 services critiques down ! Investiguez chacun.",
            ],
          },
          "ping 192.168.1.1": {
            response: [
              "PING 192.168.1.1 : 64 bytes, ttl=64, time=1.1ms",
              "✓ Gateway joignable — le lien physique est OK.",
            ],
          },
          "check dns": {
            response: [
              "⟳ Vérification DNS...",
              "",
              "  Serveur DNS primaire  : 192.168.1.10  ✗ UNREACHABLE",
              "  Serveur DNS secondaire: 8.8.8.8       ✓ OK",
              "  Config: /etc/resolv.conf pointe vers 192.168.1.10 uniquement",
              "",
              "⚠ Le DNS primaire est down et aucun fallback configuré !",
              "→ Tapez 'fix dns' pour corriger.",
            ],
          },
          "check dhcp": {
            response: [
              "⟳ Vérification DHCP...",
              "",
              "  Service dhcpd : ✗ STOPPED (crashed)",
              "  Dernière erreur : 'pool exhausted — no available leases'",
              "  Leases actifs : 254/254 (100% utilisé !)",
              "",
              "⚠ Le pool DHCP est plein ! Aucune nouvelle IP disponible.",
              "→ Tapez 'fix dhcp' pour corriger.",
            ],
          },
          "fix dns": {
            response: [
              "⟳ Réparation DNS...",
              "",
              "  Mise à jour /etc/resolv.conf :",
              "    nameserver 192.168.1.10",
              "    nameserver 8.8.8.8        ← AJOUTÉ (fallback)",
              "    nameserver 1.1.1.1        ← AJOUTÉ (fallback)",
              "",
              "  Redémarrage bind9... ✓ OK",
              "  Test résolution google.fr... ✓ 142.250.75.227",
              "",
              "✓ DNS réparé avec fallback redondant !",
            ],
          },
          "fix dhcp": {
            response: [
              "⟳ Réparation DHCP...",
              "",
              "  Nettoyage baux expirés... 47 baux libérés",
              "  Extension pool : 192.168.1.100 → 192.168.2.200",
              "  Réduction lease time : 86400s → 28800s (8h)",
              "  Redémarrage dhcpd... ✓ OK",
              "",
              "✓ DHCP réparé ! Pool étendu, baux nettoyés.",
            ],
          },
          restart: {
            response: [
              "⟳ Redémarrage des services réseau...",
              "",
              "  [1/5] Networking    ... ✓",
              "  [2/5] DNS (bind9)   ... ✓",
              "  [3/5] DHCP (dhcpd)  ... ✓",
              "  [4/5] Firewall      ... ✓",
              "  [5/5] Monitoring    ... ✓",
              "",
              "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
              "  TOUS LES SERVICES SONT OPÉRATIONNELS !",
              "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━",
            ],
            nextLevel: true,
          },
        },
      },

      // ─── VICTORY ───
      {
        id: 8,
        title: "MISSION ACCOMPLIE",
        topic: "Victoire",
        mission: "",
        hint: "",
        commands: {},
        victory: true,
      },
    ];
  }

};
