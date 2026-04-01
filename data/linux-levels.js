// ═══════════════════════════════════════════════
// LINUX LEVELS DATA — Pedago Game
// Used by: linux.html via buildLevel()
// ═══════════════════════════════════════════════

var LINUX_LEVELS = {

  nav: {
    id: "nav", title: "NAVIGATION FILESYSTEM", topic: "Navigation & Filesystem",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "\n\nTapez la commande Linux appropriée.",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande Linux               ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours navigation          ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 NAVIGATION LINUX", "━━━━━━━━━━━━━━━━━━━━", "pwd — Afficher le répertoire courant", "ls — Lister les fichiers", "  ls -l  (détaillé)", "  ls -a  (fichiers cachés)", "  ls -la (les deux)", "cd — Changer de répertoire", "  cd /chemin/absolu", "  cd dossier    (relatif)", "  cd ..         (parent)", "  cd ~          (home)", "  cd -          (précédent)", "", "Chemins spéciaux :", "  /     racine", "  ~     home de l'utilisateur", "  .     répertoire courant", "  ..    répertoire parent"]
    },
    scenarios: [
      { q: "Vous êtes dans /home/user. Affichez le contenu du répertoire courant.", check: { type: "regex", pattern: "^ls(\\s|$)", flags: "i" }, win: "✓ ls affiche les fichiers et dossiers ! Options utiles : ls -la (détaillé + cachés), ls -lh (tailles lisibles).", hint: "La commande la plus basique pour lister les fichiers..." },
      { q: "Déplacez-vous dans le répertoire /var/log.", check: { type: "regex", pattern: "^cd\\s+/var/log\\s*$", flags: "i" }, win: "✓ cd /var/log — Vous êtes dans le répertoire des logs système !", hint: "cd = change directory" },
      { q: "Affichez le chemin du répertoire où vous vous trouvez actuellement.", check: { type: "regex", pattern: "^pwd\\s*$", flags: "i" }, win: "✓ pwd (Print Working Directory) → /home/user. Toujours savoir où on est !", hint: "3 lettres, signifie 'Print Working Directory'" }
    ],
    defaultFeedback: null
  },

  fileops: {
    id: "fileops", title: "OPÉRATIONS FICHIERS", topic: "Fichiers & Répertoires",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "\n\nTapez la commande Linux appropriée.",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande Linux               ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours fichiers            ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 OPÉRATIONS SUR FICHIERS", "━━━━━━━━━━━━━━━━━━━━━━━━━━", "cat fichier — Afficher le contenu", "less fichier — Naviguer dans le contenu", "head -n 10 fichier — 10 premières lignes", "tail -n 10 fichier — 10 dernières lignes", "touch fichier — Créer un fichier vide", "cp source dest — Copier", "mv source dest — Déplacer / Renommer", "rm fichier — Supprimer (ATTENTION !)", "  rm -r dossier — Supprimer récursivement", "  rm -rf — Force sans confirmation", "mkdir dossier — Créer un répertoire", "  mkdir -p a/b/c — Créer l'arborescence"]
    },
    scenarios: [
      { q: "Créez un fichier vide appelé 'rapport.txt'.", check: { type: "regex", pattern: "^touch\\s+rapport\\.txt\\s*$", flags: "i" }, win: "✓ touch rapport.txt — Fichier créé ! touch met aussi à jour le timestamp si le fichier existe.", hint: "La commande pour créer un fichier vide commence par 'touch'" },
      { q: "Copiez le fichier 'config.ini' vers 'config.ini.bak' (backup).", check: { type: "regex", pattern: "^cp\\s+config\\.ini\\s+config\\.ini\\.bak\\s*$", flags: "i" }, win: "✓ cp config.ini config.ini.bak — Toujours faire un backup avant de modifier un fichier de config !", hint: "cp = copy. Syntaxe : cp source destination" },
      { q: "Affichez le contenu du fichier '/etc/hostname'.", check: { type: "regex", pattern: "^cat\\s+/etc/hostname\\s*$", flags: "i" }, win: "✓ cat /etc/hostname → 'srv-web-01'. cat concatène et affiche le contenu des fichiers.", hint: "cat = concatenate. Affiche le contenu d'un fichier." }
    ],
    defaultFeedback: null
  },

  perms: {
    id: "perms", title: "PERMISSIONS", topic: "Permissions & Sécurité",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "\n\nTapez la commande chmod appropriée.",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande chmod               ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours permissions         ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 PERMISSIONS LINUX", "━━━━━━━━━━━━━━━━━━━━", "Format : -rwxrwxrwx = type|owner|group|others", "  r=4 (read) w=2 (write) x=1 (execute)", "", "Notation octale :", "  7 = rwx  6 = rw-  5 = r-x  4 = r--", "  3 = -wx  2 = -w-  1 = --x  0 = ---", "", "chmod 755 file → rwxr-xr-x", "chmod 644 file → rw-r--r--", "chmod 700 file → rwx------", "", "chown user:group file — Changer le propriétaire", "chgrp group file — Changer le groupe", "", "Principe du moindre privilège :", "  Donner le MINIMUM de droits nécessaires."]
    },
    scenarios: [
      { q: "Le fichier 'secret.conf' a les permissions : -rw-r--r-- (alice:dev).\nRendez-le lisible et exécutable UNIQUEMENT par le propriétaire (aucun droit pour les autres).", check: { type: "regex", pattern: "^chmod\\s+(700|u=rwx,go=|u=rwx,g=,o=)\\s+secret\\.conf", flags: "i" }, win: "✓ chmod 700 secret.conf — Seule Alice peut lire, écrire et exécuter !", hint: "chmod 700 ou chmod u=rwx,go= ..." },
      { q: "Le script 'deploy.sh' a les permissions -rwxrwxrwx (root:root).\nC'est DANGEREUX ! Restreignez à : propriétaire rwx, groupe rx, autres rien.", check: { type: "regex", pattern: "^chmod\\s+(750|u=rwx,g=rx,o=)\\s+deploy\\.sh", flags: "i" }, win: "✓ chmod 750 deploy.sh — Principe du moindre privilège appliqué !", hint: "rwx=7, rx=5, rien=0. Donc 7-5-0..." }
    ],
    defaultFeedback: { pattern: "^chmod", flags: "i", msg: ["✗ Vérifiez les valeurs octales ou symboliques.", "  Tapez 'hint' pour un indice."] }
  },

  grep: {
    id: "grep", title: "GREP & RECHERCHE", topic: "Grep, Pipes & Filtres",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "\n\nTapez la commande appropriée.",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande grep                ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours grep & pipes        ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 GREP & PIPES", "━━━━━━━━━━━━━━━━", "grep 'motif' fichier — Rechercher un texte", "  -i  insensible à la casse", "  -r  récursif (dans les sous-dossiers)", "  -c  compter les occurrences", "  -n  afficher les numéros de ligne", "  -v  inverser (lignes qui NE contiennent PAS)", "", "Pipes (|) — Chaîner des commandes :", "  cat fichier | grep 'erreur' | wc -l", "  ps aux | grep nginx", "  ls -la | sort -k5 -n | tail -5", "", "Autres filtres :", "  sort — trier", "  uniq — dédupliquer", "  wc -l — compter les lignes", "  cut -d: -f1 — extraire des colonnes", "  awk '{print $1}' — traitement avancé"]
    },
    scenarios: [
      { q: "Le fichier '/var/log/auth.log' contient des milliers de lignes.\nRecherchez toutes les lignes contenant 'Failed password'.", check: { type: "regex", pattern: "^grep\\s+['\"]?failed\\s*password['\"]?\\s+/var/log/auth\\.log", flags: "i" }, win: "✓ grep 'Failed password' /var/log/auth.log — 47 tentatives échouées trouvées ! Possible brute force ?", hint: "grep 'motif' fichier" },
      { q: "Comptez le nombre de lignes contenant 'ERROR' dans le fichier 'app.log'.", check: { type: "regexAny", patterns: ["^grep\\s+-c\\s+['\"]?error['\"]?\\s+app\\.log", "^grep\\s+['\"]?error['\"]?\\s+app\\.log\\s*\\|\\s*wc\\s+-l"], flags: "i" }, win: "✓ grep -c 'ERROR' app.log → 156 erreurs. L'option -c compte les occurrences !", hint: "grep -c pour compter, ou grep ... | wc -l" }
    ],
    defaultFeedback: { pattern: "^grep", flags: "i", msg: ["✗ Vérifiez la syntaxe grep et les options.", "  Tapez 'hint' pour un indice."] }
  },

  process: {
    id: "process", title: "GESTION DES PROCESSUS", topic: "Processus & Monitoring",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "\n\nTapez la commande appropriée.",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande                     ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours processus           ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 GESTION DES PROCESSUS", "━━━━━━━━━━━━━━━━━━━━━━━━", "ps — Snapshot des processus", "  ps aux — Tous les processus (détaillé)", "  ps -ef — Format complet", "", "top / htop — Monitoring en temps réel", "  Trier par CPU, RAM, etc.", "", "kill — Envoyer un signal", "  kill PID — SIGTERM (arrêt propre)", "  kill -9 PID — SIGKILL (arrêt forcé)", "  kill -HUP PID — Recharger la config", "", "Autres :", "  bg/fg — Arrière-plan / premier plan", "  nohup cmd & — Survive à la déconnexion", "  systemctl status/start/stop service"]
    },
    scenarios: [
      { q: "Un processus 'node' consomme 98% du CPU. Son PID est 4287.\nTuez ce processus immédiatement.", check: { type: "regexAny", patterns: ["^kill\\s+(-9\\s+)?4287\\s*$", "^kill\\s+-SIGKILL\\s+4287"], flags: "i" }, win: "✓ kill -9 4287 — Processus terminé ! Le signal 9 (SIGKILL) force l'arrêt immédiat.", hint: "kill -9 <PID> pour forcer l'arrêt" },
      { q: "Affichez la liste des processus en cours avec leur consommation CPU/RAM.", check: { type: "regex", pattern: "^(top|htop|ps\\s+aux)\\s*$", flags: "i" }, win: "✓ Bien joué ! ps aux / top / htop — Les outils essentiels de monitoring.", hint: "ps aux, top ou htop — commandes de monitoring" }
    ],
    defaultFeedback: null
  },

  users: {
    id: "users", title: "GESTION DES UTILISATEURS", topic: "Utilisateurs & Groupes",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "\n\nTapez la commande appropriée.",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande                     ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours utilisateurs        ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 UTILISATEURS & GROUPES", "━━━━━━━━━━━━━━━━━━━━━━━━━━", "useradd user — Créer un utilisateur", "userdel user — Supprimer", "passwd user — Définir le mot de passe", "usermod -aG group user — Ajouter au groupe", "  ⚠ -a = append (IMPORTANT, sinon écrase !)", "", "groups user — Voir les groupes d'un user", "id user — Voir UID, GID, groupes", "", "Fichiers clés :", "  /etc/passwd — Liste des utilisateurs", "  /etc/shadow — Mots de passe hashés", "  /etc/group — Liste des groupes", "", "sudo — Exécuter en tant que root", "  sudo commande", "  sudo -u user commande — En tant qu'un autre user"]
    },
    scenarios: [
      { q: "Créez un nouvel utilisateur 'stagiaire' sur le système.", check: { type: "regex", pattern: "^(sudo\\s+)?(useradd|adduser)\\s+stagiaire", flags: "i" }, win: "✓ useradd stagiaire — Utilisateur créé ! N'oubliez pas de définir un mot de passe avec passwd.", hint: "useradd ou adduser + le nom" },
      { q: "Ajoutez l'utilisateur 'dev01' au groupe 'docker'.", check: { type: "regex", pattern: "^(sudo\\s+)?usermod\\s+(-aG|--append\\s+--groups)\\s+docker\\s+dev01", flags: "i" }, win: "✓ usermod -aG docker dev01 — L'option -aG AJOUTE le groupe sans supprimer les autres !", hint: "usermod -aG <groupe> <utilisateur>" }
    ],
    defaultFeedback: null
  },

  disk: {
    id: "disk", title: "ESPACE DISQUE", topic: "Stockage & Disques",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "\n\nTapez la commande appropriée.",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande                     ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours disque              ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 GESTION DU STOCKAGE", "━━━━━━━━━━━━━━━━━━━━━━━", "df -h — Espace libre par partition", "du -sh dossier — Taille d'un dossier", "du -sh * | sort -rh | head -10 — Top 10", "", "lsblk — Liste des disques/partitions", "mount — Monter un disque", "umount — Démonter", "fdisk -l — Info partitions", "", "Nettoyage :", "  journalctl --vacuum-size=100M", "  apt clean / apt autoremove", "  find /tmp -mtime +30 -delete", "", "⚠ Un disque plein = serveur en panne !"]
    },
    scenarios: [
      { q: "Affichez l'espace disque utilisé sur toutes les partitions montées.", check: { type: "regex", pattern: "^df\\s+(-h)?\\s*$", flags: "i" }, win: "✓ df -h — Disk Free ! Le -h rend les tailles lisibles (Go, Mo). /dev/sda1 : 78% utilisé.", hint: "df = Disk Free. Ajoutez -h pour des tailles lisibles." },
      { q: "Trouvez les 5 plus gros fichiers dans /var/log.", check: { type: "regexAll", patterns: ["^(du|find|ls)", "(sort|head|tail)"], flags: "i" }, win: "✓ du -sh /var/log/* | sort -rh | head -5 — syslog fait 2.3Go, time to rotate !", hint: "du pour la taille + sort + head pour le top 5" }
    ],
    defaultFeedback: null
  },

  cron: {
    id: "cron", title: "CRON & AUTOMATISATION", topic: "Crontab & Scheduling",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre ligne crontab                ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours crontab             ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 CRONTAB", "━━━━━━━━━━", "Format : min heure jour mois jour_sem commande", "  ┌───── minute (0-59)", "  │ ┌───── heure (0-23)", "  │ │ ┌───── jour du mois (1-31)", "  │ │ │ ┌───── mois (1-12)", "  │ │ │ │ ┌───── jour semaine (0-7, 0/7=dim)", "  │ │ │ │ │", "  * * * * * commande", "", "Exemples :", "  0 2 * * * → Tous les jours à 2h", "  */15 * * * * → Toutes les 15 minutes", "  0 0 1 * * → 1er de chaque mois", "  0 9 * * 1-5 → Lun-Ven à 9h", "", "crontab -e — Éditer", "crontab -l — Lister"]
    },
    scenarios: [
      { q: "Vous devez planifier un backup automatique : exécuter '/scripts/backup.sh' tous les jours à 2h du matin.\n\nÉcrivez la ligne crontab correspondante.", check: { type: "regex", pattern: "^0\\s+2\\s+\\*\\s+\\*\\s+\\*\\s+/scripts/backup\\.sh\\s*$", flags: "i" }, win: "✓ 0 2 * * * /scripts/backup.sh — Backup planifié à 02:00 chaque jour !", hint: "Format cron : minute heure jour mois jour_semaine commande. 2h du matin = 0 2 * * *" }
    ],
    defaultFeedback: { pattern: "^[\\d*]", flags: "", msg: ["✗ Vérifiez le format : minute heure jour mois jour_semaine commande", "  Tapez 'hint' pour un indice."] }
  },

  netlinux: {
    id: "netlinux", title: "RÉSEAU LINUX", topic: "Configuration Réseau",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "\n\nTapez la commande appropriée.",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande                     ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours réseau Linux        ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 RÉSEAU LINUX", "━━━━━━━━━━━━━━━━", "ip a — Interfaces & adresses IP", "ip route — Table de routage", "ss -tlnp — Ports en écoute (remplace netstat)", "ping host — Test de connectivité", "traceroute host — Chemin réseau", "dig/nslookup — Résolution DNS", "curl URL — Requête HTTP", "wget URL — Télécharger un fichier", "", "Fichiers config :", "  /etc/hosts — DNS local", "  /etc/resolv.conf — Serveurs DNS", "  /etc/network/interfaces — Config réseau (Debian)", "  /etc/netplan/ — Config réseau (Ubuntu récent)"]
    },
    scenarios: [
      { q: "Affichez toutes les interfaces réseau et leurs adresses IP.", check: { type: "regex", pattern: "^(ip\\s+a(ddr)?|ifconfig)\\s*$", flags: "i" }, win: "✓ ip a — eth0: 192.168.1.42/24, lo: 127.0.0.1. ip a remplace ifconfig sur les systèmes modernes.", hint: "ip a (ou ifconfig sur les anciens systèmes)" },
      { q: "Vérifiez quels ports sont en écoute sur le serveur.", check: { type: "regex", pattern: "^(ss\\s+-tlnp|netstat\\s+-tlnp|ss\\s+-tunlp|netstat\\s+-tunlp)", flags: "i" }, win: "✓ ss -tlnp — Port 22 (SSH), 80 (Nginx), 3306 (MySQL) en écoute. Tout est normal.", hint: "ss -tlnp ou netstat -tlnp — t=TCP, l=listening, n=numeric, p=process" }
    ],
    defaultFeedback: null
  },

  service: {
    id: "service", title: "SERVICES & SYSTEMD", topic: "Systemctl & Services",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "\n\nTapez la commande appropriée.",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande systemctl           ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours systemd             ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 SYSTEMD & SERVICES", "━━━━━━━━━━━━━━━━━━━━━━", "systemctl status service — État", "systemctl start service — Démarrer", "systemctl stop service — Arrêter", "systemctl restart service — Redémarrer", "systemctl enable service — Auto au boot", "systemctl disable service — Désactiver auto", "", "journalctl -u service — Logs du service", "journalctl -f — Suivre les logs en temps réel", "", "Services courants :", "  nginx, apache2 — Web", "  mysql, postgresql — BDD", "  ssh — Accès distant", "  docker — Conteneurs", "  cron — Tâches planifiées"]
    },
    scenarios: [
      { q: "Le service 'nginx' ne répond plus. Redémarrez-le.", check: { type: "regex", pattern: "^(sudo\\s+)?systemctl\\s+restart\\s+nginx", flags: "i" }, win: "✓ systemctl restart nginx — Service redémarré ! Vérifiez avec systemctl status nginx.", hint: "systemctl restart <service>" },
      { q: "Configurez le service 'docker' pour qu'il démarre automatiquement au boot.", check: { type: "regex", pattern: "^(sudo\\s+)?systemctl\\s+enable\\s+docker", flags: "i" }, win: "✓ systemctl enable docker — Docker démarrera automatiquement à chaque reboot !", hint: "systemctl enable <service> pour le démarrage automatique" }
    ],
    defaultFeedback: { pattern: "^(sudo\\s+)?systemctl", flags: "i", msg: ["✗ Vérifiez l'action (start/stop/restart/enable).", "  Tapez 'hint' pour un indice."] }
  },

  shell: {
    id: "shell", title: "FIND & ONE-LINERS", topic: "Shell Avancé",
    missionPrefix: "📋 MISSION :\n",
    missionSuffix: "",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande find                ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours find                ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 FIND — RECHERCHE AVANCÉE", "━━━━━━━━━━━━━━━━━━━━━━━━━━━", "find chemin [options] [action]", "", "Filtres :", "  -name '*.log' — Par nom (glob)", "  -type f/d — Fichier ou dossier", "  -size +100M — Plus de 100Mo", "  -mtime -7 — Modifié il y a <7 jours", "  -user alice — Appartenant à alice", "  -perm 777 — Permissions exactes", "", "Actions :", "  -print — Afficher (défaut)", "  -delete — Supprimer", "  -exec cmd {} \\; — Exécuter une commande", "  | xargs cmd — Passer en argument", "", "Exemple : find / -name '*.tmp' -mtime +30 -delete"]
    },
    scenarios: [
      { q: "Complétez cette commande one-liner : trouver tous les fichiers .log de plus de 100Mo dans /var et les supprimer.\n\nTapez la commande 'find' appropriée.", check: { type: "regexAll", patterns: ["^find\\s+/var\\s+.*-name\\s+['\"]\\*\\.log['\"]\\s+.*-size\\s+\\+100M", "-delete|xargs\\s+rm|exec\\s+rm"], flags: "i" }, win: "✓ find /var -name '*.log' -size +100M -delete — 3 fichiers supprimés, 4.7Go libérés !", hint: "find /var -name '*.log' -size +100M -delete" }
    ],
    defaultFeedback: { pattern: "^find", flags: "i", msg: ["✗ Vérifiez les options -name, -size et l'action -delete.", "  Tapez 'hint' pour un indice."] }
  }

};
