// ═══════════════════════════════════════════════
// SQL LEVELS DATA — Pedago Game
// Used by: sql.html via buildLevel()
// ═══════════════════════════════════════════════

var SQL_LEVELS = {

  select: {
    id: "select", title: "SELECT — Les Bases", topic: "SELECT Basique",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre requête SQL directement      ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours sur SELECT          ║", "║  mission - Revoir l'énoncé                ║", "║  schema  - Voir la structure de la table  ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 SELECT — REQUÊTE DE BASE", "━━━━━━━━━━━━━━━━━━━━━━━━━━━", "SELECT est le mot-clé le plus utilisé en SQL.", "", "Syntaxe :", "  SELECT colonne1, colonne2 FROM table;", "  SELECT * FROM table;  -- toutes les colonnes", "", "Exemples :", "  SELECT nom, email FROM clients;", "  SELECT * FROM commandes;", "", "* = toutes les colonnes (pratique mais éviter en prod)"]
    },
    scenarios: [
      {
        table: "employes",
        schema: "id | nom       | poste          | salaire | ville",
        rows: [
          " 1 | Dupont    | Développeur    |  45000  | Paris",
          " 2 | Martin    | Designer       |  38000  | Lyon",
          " 3 | Bernard   | Chef de projet |  55000  | Paris",
          " 4 | Petit     | Développeur    |  42000  | Marseille",
          " 5 | Moreau    | DBA            |  48000  | Paris"
        ],
        q: "Écrivez une requête pour afficher le nom et le salaire de tous les employés.",
        check: { type: "regexAny", patterns: ["select\\s+.*nom.*salaire.*from\\s+employes", "select\\s+.*salaire.*nom.*from\\s+employes"], flags: "i", inputReplace: [",", " "] },
        win: "✓ CORRECT ! SELECT nom, salaire FROM employes; — La base de toute requête SQL.",
        hint: "La syntaxe de base : SELECT <colonnes> FROM <table>"
      },
      {
        table: "produits",
        schema: "id | nom_produit   | categorie  | prix  | stock",
        rows: [
          " 1 | MacBook Pro   | Laptop     | 2499  | 15",
          " 2 | iPhone 15     | Smartphone | 1199  | 42",
          " 3 | AirPods Pro   | Audio      |  279  | 88",
          " 4 | iPad Air      | Tablette   |  699  | 23",
          " 5 | Magic Mouse   | Accessoire |   99  | 156"
        ],
        q: "Écrivez une requête pour afficher tous les produits (toutes les colonnes).",
        check: { type: "regex", pattern: "select\\s+\\*\\s+from\\s+produits", flags: "i" },
        win: "✓ PARFAIT ! SELECT * FROM produits; — L'étoile (*) sélectionne toutes les colonnes.",
        hint: "SELECT * sélectionne TOUTES les colonnes."
      }
    ],
    defaultFeedback: { pattern: "^select", flags: "i", msg: ["✗ Requête incorrecte. Vérifiez les colonnes et le nom de la table.", "  Tapez 'hint' pour un indice."] }
  },

  where: {
    id: "where", title: "WHERE — Filtrer", topic: "Clause WHERE",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre requête SQL directement      ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours sur WHERE           ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 WHERE — FILTRAGE", "━━━━━━━━━━━━━━━━━━━━", "WHERE filtre les lignes selon une condition.", "", "Opérateurs :", "  = égal       != ou <> différent", "  > supérieur  < inférieur", "  >= sup ou égal  <= inf ou égal", "  LIKE 'pattern%'  (recherche partielle)", "  IN ('a','b','c')  (liste de valeurs)", "  BETWEEN x AND y  (intervalle)", "  IS NULL / IS NOT NULL", "", "Exemple :", "  SELECT * FROM employes WHERE salaire > 40000;"]
    },
    scenarios: [
      {
        table: "employes",
        schema: "id | nom       | poste          | salaire | ville",
        rows: [" 1 | Dupont    | Développeur    |  45000  | Paris", " 2 | Martin    | Designer       |  38000  | Lyon", " 3 | Bernard   | Chef de projet |  55000  | Paris", " 4 | Petit     | Développeur    |  42000  | Marseille", " 5 | Moreau    | DBA            |  48000  | Paris"],
        q: "Affichez les employés qui travaillent à Paris.",
        check: { type: "regex", pattern: "select\\s+.*from\\s+employes\\s+where\\s+ville\\s*=\\s*'paris'", flags: "i" },
        win: "✓ EXACT ! WHERE ville = 'Paris' filtre les résultats. 3 employés parisiens trouvés !",
        hint: "Ajoutez WHERE colonne = 'valeur' après FROM."
      },
      {
        table: "produits",
        schema: "id | nom_produit | prix  | stock | categorie",
        rows: [" 1 | Laptop Pro  | 1299  | 8     | Laptop", " 2 | Souris RGB  |   49  | 200   | Accessoire", " 3 | Écran 27\"  |  399  | 15    | Moniteur", " 4 | Clavier     |   89  | 45    | Accessoire", " 5 | SSD 1To     |   79  | 120   | Stockage"],
        q: "Affichez les produits dont le prix est supérieur à 100.",
        check: { type: "regex", pattern: "select\\s+.*from\\s+produits\\s+where\\s+prix\\s*>\\s*100", flags: "i" },
        win: "✓ BIEN JOUÉ ! WHERE prix > 100 renvoie le Laptop et l'Écran.",
        hint: "Utilisez l'opérateur > pour comparer des valeurs numériques."
      }
    ],
    defaultFeedback: [
      { pattern: "^select(?!.*where)", flags: "i", msg: ["✗ Il manque la clause WHERE pour filtrer.", "  Tapez 'hint' pour un indice."] },
      { pattern: "^select", flags: "i", msg: ["✗ Presque ! Vérifiez la condition de filtrage.", "  Tapez 'hint' pour un indice."] }
    ]
  },

  orderby: {
    id: "orderby", title: "ORDER BY & LIMIT", topic: "Tri & Pagination",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre requête SQL directement      ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours ORDER BY            ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 ORDER BY & LIMIT", "━━━━━━━━━━━━━━━━━━━━", "ORDER BY trie les résultats :", "  ASC = croissant (défaut)", "  DESC = décroissant", "", "LIMIT restreint le nombre de résultats :", "  LIMIT 10 → max 10 lignes", "  LIMIT 5 OFFSET 10 → 5 lignes à partir de la 11ème", "", "Exemples :", "  SELECT * FROM produits ORDER BY prix DESC;", "  SELECT * FROM logs ORDER BY date DESC LIMIT 100;", "  SELECT * FROM users LIMIT 20 OFFSET 40; -- page 3"]
    },
    scenarios: [
      {
        table: "employes",
        schema: "id | nom       | poste          | salaire | ville",
        rows: [" 1 | Dupont    | Développeur    |  45000  | Paris", " 2 | Martin    | Designer       |  38000  | Lyon", " 3 | Bernard   | Chef de projet |  55000  | Paris", " 4 | Petit     | Développeur    |  42000  | Marseille", " 5 | Moreau    | DBA            |  48000  | Paris"],
        q: "Affichez les 3 employés les mieux payés (salaire décroissant).",
        check: { type: "regex", pattern: "select\\s+.*from\\s+employes\\s+order\\s+by\\s+salaire\\s+desc\\s+limit\\s+3", flags: "i" },
        win: "✓ PARFAIT ! ORDER BY salaire DESC LIMIT 3 → Bernard (55K), Moreau (48K), Dupont (45K).",
        hint: "ORDER BY colonne DESC pour trier décroissant, LIMIT n pour limiter les résultats."
      },
      {
        table: "etudiants",
        schema: "id | nom       | moyenne | promo",
        rows: [" 1 | Alice     | 16.5    | M1", " 2 | Bob       | 12.0    | L3", " 3 | Charlie   | 18.2    | M1", " 4 | Diana     | 14.8    | M2", " 5 | Eve       | 15.3    | L3"],
        q: "Affichez tous les étudiants triés par moyenne décroissante.",
        check: { type: "regex", pattern: "select\\s+.*from\\s+etudiants\\s+order\\s+by\\s+moyenne\\s+desc", flags: "i" },
        win: "✓ CORRECT ! ORDER BY moyenne DESC → Charlie (18.2), Alice (16.5), Eve (15.3)...",
        hint: "ORDER BY <colonne> DESC trie du plus grand au plus petit."
      }
    ],
    defaultFeedback: { pattern: "^select", flags: "i", msg: ["✗ Vérifiez ORDER BY et/ou LIMIT.", "  Tapez 'hint' pour un indice."] }
  },

  groupby: {
    id: "groupby", title: "GROUP BY & AGRÉGATION", topic: "Agrégation de Données",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre requête SQL directement      ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours GROUP BY            ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 GROUP BY & FONCTIONS D'AGRÉGATION", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "GROUP BY regroupe les lignes par valeur commune.", "", "Fonctions d'agrégation :", "  COUNT(*) — nombre de lignes", "  SUM(col) — somme", "  AVG(col) — moyenne", "  MIN(col) — minimum", "  MAX(col) — maximum", "", "Exemple :", "  SELECT ville, COUNT(*), AVG(salaire)", "  FROM employes", "  GROUP BY ville;", "", "HAVING = WHERE pour les groupes :", "  GROUP BY ville HAVING COUNT(*) > 2"]
    },
    scenarios: [
      {
        table: "ventes",
        schema: "id | vendeur  | produit    | montant | date",
        rows: [" 1 | Alice    | Laptop     |  1200   | 2025-01-15", " 2 | Bob      | Souris     |    49   | 2025-01-16", " 3 | Alice    | Écran      |   399   | 2025-01-17", " 4 | Charlie  | Laptop     |  1200   | 2025-01-18", " 5 | Bob      | Clavier    |    89   | 2025-01-19", " 6 | Alice    | SSD        |    79   | 2025-01-20"],
        q: "Calculez le montant TOTAL des ventes par vendeur.",
        check: { type: "regex", pattern: "select\\s+vendeur\\s*,\\s*sum\\s*\\(\\s*montant\\s*\\)\\s*.*from\\s+ventes\\s+group\\s+by\\s+vendeur", flags: "i" },
        win: "✓ EXCELLENT ! Alice: 1678€, Bob: 138€, Charlie: 1200€. GROUP BY + SUM = agrégation !",
        hint: "SELECT vendeur, SUM(montant) FROM ... GROUP BY vendeur"
      },
      {
        table: "employes",
        schema: "id | nom       | departement | salaire",
        rows: [" 1 | Dupont    | IT          |  45000", " 2 | Martin    | RH          |  38000", " 3 | Bernard   | IT          |  55000", " 4 | Petit     | Marketing   |  42000", " 5 | Moreau    | IT          |  48000", " 6 | Leroy     | RH          |  41000"],
        q: "Comptez le nombre d'employés par département.",
        check: { type: "regex", pattern: "select\\s+departement\\s*,\\s*count\\s*\\(.*\\)\\s*.*from\\s+employes\\s+group\\s+by\\s+departement", flags: "i" },
        win: "✓ BIEN ! IT: 3, RH: 2, Marketing: 1. COUNT(*) avec GROUP BY = comptage par groupe.",
        hint: "SELECT departement, COUNT(*) FROM ... GROUP BY departement"
      }
    ],
    defaultFeedback: [
      { pattern: "^select(?!.*group\\s+by)", flags: "i", msg: ["✗ Il manque GROUP BY pour regrouper les résultats.", "  Tapez 'hint' pour un indice."] },
      { pattern: "^select", flags: "i", msg: ["✗ Presque ! Vérifiez la fonction d'agrégation.", "  Tapez 'hint' pour un indice."] }
    ]
  },

  join: {
    id: "join", title: "JOIN — Jointures", topic: "Jointures SQL",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre requête SQL directement      ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours JOIN                ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 JOIN — JOINTURES", "━━━━━━━━━━━━━━━━━━━━", "JOIN combine des lignes de 2+ tables :", "", "INNER JOIN : uniquement les correspondances", "  SELECT * FROM A JOIN B ON A.id = B.a_id;", "", "LEFT JOIN : tout de A + correspondances de B", "  SELECT * FROM A LEFT JOIN B ON A.id = B.a_id;", "", "RIGHT JOIN : tout de B + correspondances de A", "", "FULL JOIN : tout de A et B", "", "Clé étrangère = colonne qui référence une autre table", "  commandes.client_id → clients.id"]
    },
    scenarios: [
      {
        tables: [
          { name: "clients", schema: "id | nom       | ville", rows: [" 1 | Alice     | Paris", " 2 | Bob       | Lyon", " 3 | Charlie   | Marseille"] },
          { name: "commandes", schema: "id | client_id | produit    | montant", rows: [" 1 |    1      | Laptop     |  1200", " 2 |    1      | Souris     |    49", " 3 |    2      | Écran      |   399", " 4 |    3      | Clavier    |    89"] }
        ],
        q: "Affichez le nom du client et le produit pour chaque commande (jointure).",
        check: { type: "regexAny", patterns: ["select\\s+.*nom.*produit.*from\\s+.*join\\s+.*(on|using)", "select\\s+.*produit.*nom.*from\\s+.*join\\s+.*(on|using)"], flags: "i" },
        win: "✓ PARFAIT ! JOIN lie les tables par clé étrangère. Alice→Laptop, Alice→Souris, Bob→Écran, Charlie→Clavier.",
        hint: "SELECT ... FROM clients JOIN commandes ON clients.id = commandes.client_id"
      }
    ],
    defaultFeedback: [
      { pattern: "^select(?!.*join)", flags: "i", msg: ["✗ Vous avez besoin d'un JOIN pour lier les deux tables.", "  Tapez 'hint' pour un indice."] },
      { pattern: "^select(?!.*(on|using))", flags: "i", msg: ["✗ Il manque la condition ON pour spécifier la jointure.", "  Tapez 'hint' pour un indice."] },
      { pattern: "^select", flags: "i", msg: ["✗ Presque ! Vérifiez les colonnes et la condition de jointure.", "  Tapez 'hint' pour un indice."] }
    ]
  },

  dml: {
    id: "dml", title: "INSERT / UPDATE / DELETE", topic: "Manipulation de Données (DML)",
    contextPrefix: "📋 CONTEXTE :\n",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre requête SQL directement      ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours DML                 ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 DML — DATA MANIPULATION LANGUAGE", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "INSERT — Ajouter des lignes :", "  INSERT INTO table (cols) VALUES (vals);", "", "UPDATE — Modifier des lignes :", "  UPDATE table SET col = val WHERE condition;", "  ⚠ SANS WHERE → modifie TOUTES les lignes !", "", "DELETE — Supprimer des lignes :", "  DELETE FROM table WHERE condition;", "  ⚠ SANS WHERE → supprime TOUT !", "", "Règle d'or : TOUJOURS tester avec SELECT d'abord,", "puis transformer en UPDATE/DELETE."]
    },
    scenarios: [
      {
        context: "Table 'employes' (id, nom, poste, salaire, ville). Vous devez ajouter un nouvel employé : Sophie Durand, Data Analyst, 43000€, à Lyon.",
        q: "Écrivez la requête INSERT.",
        check: { type: "regexAll", patterns: ["insert\\s+into\\s+employes", "(sophie|durand)", "data\\s*analyst"], flags: "i" },
        win: "✓ INSERT INTO employes (nom, poste, salaire, ville) VALUES ('Sophie Durand', 'Data Analyst', 43000, 'Lyon');",
        hint: "INSERT INTO table (col1, col2, ...) VALUES (val1, val2, ...)"
      },
      {
        context: "Table 'produits' (id, nom, prix, stock). Le produit id=3 a changé de prix : nouveau prix 349€.",
        q: "Écrivez la requête UPDATE.",
        check: { type: "regexAll", patterns: ["update\\s+produits\\s+set\\s+prix\\s*=\\s*349", "where\\s+id\\s*=\\s*3"], flags: "i" },
        win: "✓ UPDATE produits SET prix = 349 WHERE id = 3; — TOUJOURS mettre un WHERE avec UPDATE !",
        hint: "UPDATE table SET colonne = valeur WHERE condition"
      }
    ],
    defaultFeedback: { pattern: "^(insert|update|delete)", flags: "i", msg: ["✗ Presque ! Vérifiez la syntaxe et les valeurs.", "  Tapez 'hint' pour un indice."] }
  },

  subquery: {
    id: "subquery", title: "SOUS-REQUÊTES", topic: "Sous-requêtes (Subqueries)",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre requête SQL directement      ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours sous-requêtes       ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 SOUS-REQUÊTES", "━━━━━━━━━━━━━━━━━", "Une requête imbriquée dans une autre :", "", "  SELECT * FROM employes", "  WHERE salaire > (SELECT AVG(salaire) FROM employes);", "", "Utilisations :", "  • Comparer à un agrégat (AVG, MAX, MIN...)", "  • Filtrer avec IN (SELECT id FROM ...)", "  • Créer des tables temporaires (FROM subquery)", "  • EXISTS pour vérifier l'existence", "", "Alternatives modernes :", "  • CTE : WITH nom AS (SELECT ...) SELECT ...", "  • Window functions : OVER(PARTITION BY ...)"]
    },
    scenarios: [
      {
        table: "employes",
        schema: "id | nom       | poste          | salaire | dept",
        rows: [" 1 | Dupont    | Dev            |  45000  | IT", " 2 | Martin    | Designer       |  38000  | Marketing", " 3 | Bernard   | CTO            |  75000  | IT", " 4 | Petit     | Dev            |  42000  | IT", " 5 | Moreau    | DBA            |  48000  | IT", " 6 | Leroy     | CM             |  35000  | Marketing"],
        q: "Affichez les employés dont le salaire est supérieur à la MOYENNE de tous les salaires.",
        check: { type: "regex", pattern: "select\\s+.*from\\s+employes\\s+where\\s+salaire\\s*>\\s*\\(\\s*select\\s+avg\\s*\\(\\s*salaire\\s*\\)", flags: "i" },
        win: "✓ SOUS-REQUÊTE ! La moyenne est ~47167€. Bernard (75K) et Moreau (48K) sont au-dessus.",
        hint: "WHERE salaire > (SELECT AVG(salaire) FROM employes)"
      }
    ],
    defaultFeedback: { pattern: "^select", flags: "i", msg: ["✗ Utilisez une sous-requête dans la clause WHERE.", "  Tapez 'hint' pour un indice."] }
  },

  create: {
    id: "create", title: "CREATE TABLE", topic: "DDL — Modélisation",
    contextPrefix: "📋 CONTEXTE :\n",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre requête SQL directement      ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours CREATE TABLE        ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 CREATE TABLE — MODÉLISATION", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "Types de données courants :", "  INT, BIGINT — entiers", "  VARCHAR(n) — texte variable (max n)", "  TEXT — texte long", "  DATE, DATETIME, TIMESTAMP", "  DECIMAL(p,s) — nombres précis", "  BOOLEAN", "", "Contraintes :", "  PRIMARY KEY — identifiant unique", "  NOT NULL — obligatoire", "  UNIQUE — pas de doublon", "  DEFAULT val — valeur par défaut", "  FOREIGN KEY — référence autre table", "  CHECK (condition) — validation", "", "AUTO_INCREMENT (MySQL) / SERIAL (PostgreSQL)"]
    },
    scenarios: [
      {
        context: "Vous concevez une base pour un blog. Créez la table 'articles' avec : id (entier, clé primaire, auto-incrémenté), titre (texte max 200, non null), contenu (texte long), auteur_id (entier, clé étrangère), date_publication (date, défaut aujourd'hui).",
        q: "Écrivez le CREATE TABLE.",
        check: { type: "regexAll", patterns: ["create\\s+table\\s+articles", "primary\\s+key", "titre", "auteur_id"], flags: "i" },
        win: "✓ Table 'articles' créée ! Les contraintes (PK, NOT NULL, FK, DEFAULT) garantissent l'intégrité des données.",
        hint: "CREATE TABLE articles (id INT PRIMARY KEY AUTO_INCREMENT, titre VARCHAR(200) NOT NULL, ...)"
      }
    ],
    defaultFeedback: { pattern: "^(create|alter)", flags: "i", msg: ["✗ Vérifiez les colonnes, types et contraintes.", "  Tapez 'hint' pour un indice."] }
  },

  index: {
    id: "index", title: "INDEX & OPTIMISATION", topic: "Performance & Index",
    contextPrefix: "📋 SITUATION :\n",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  Tapez votre commande SQL                 ║", "║  hint    - Obtenir un indice              ║", "║  explain - Mini-cours INDEX               ║", "║  mission - Revoir l'énoncé                ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 INDEX — OPTIMISATION", "━━━━━━━━━━━━━━━━━━━━━━━", "Un index est comme l'index d'un livre :", "  Sans index → lire TOUTES les pages (Full Scan)", "  Avec index → aller directement à la bonne page", "", "Création :", "  CREATE INDEX idx_nom ON table (col1, col2);", "", "Quand indexer :", "  ✓ Colonnes dans WHERE fréquents", "  ✓ Colonnes de JOIN", "  ✓ Colonnes de ORDER BY", "  ✗ Tables très petites", "  ✗ Colonnes très souvent modifiées", "", "EXPLAIN pour analyser une requête :", "  EXPLAIN SELECT * FROM logs WHERE user_id = 42;"]
    },
    scenarios: [
      {
        context: "Votre table 'logs' contient 10 millions de lignes. La requête suivante prend 45 secondes :\n\n  SELECT * FROM logs WHERE user_id = 42 AND date > '2025-01-01';\n\nLe EXPLAIN montre un 'Full Table Scan'.",
        q: "Quelle commande SQL créeriez-vous pour accélérer cette requête ? (tapez la commande)",
        check: { type: "regexAll", patterns: ["create\\s+index", "logs", "(user_id|date)"], flags: "i" },
        win: "✓ CREATE INDEX ! Un index sur (user_id, date) transforme le scan en lookup quasi-instantané. De 45s à <100ms !",
        hint: "CREATE INDEX idx_nom ON table (colonne1, colonne2)"
      }
    ],
    defaultFeedback: { pattern: "^(create|alter)", flags: "i", msg: ["✗ Pensez à créer un INDEX. Vérifiez la syntaxe.", "  Tapez 'hint' pour un indice."] }
  },

  normalisation: {
    id: "normalisation", title: "NORMALISATION", topic: "Normalisation & Modélisation",
    contextPrefix: "📋 PROBLÈME :\n",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  answer <réponse>  - Répondre             ║", "║  hint              - Obtenir un indice    ║", "║  explain           - Mini-cours           ║", "║  mission           - Revoir l'énoncé      ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 NORMALISATION", "━━━━━━━━━━━━━━━━━", "Décomposer pour éviter la redondance :", "", "1NF : Valeurs atomiques (pas de listes dans une cellule)", "2NF : Chaque colonne dépend de TOUTE la clé primaire", "3NF : Pas de dépendance transitive", "", "Avant (dénormalisé) :", "  commandes_flat (client_nom, client_email, produit...)", "", "Après (3NF) :", "  clients (id, nom, email)", "  produits (id, nom, prix)", "  commandes (id, client_id, produit_id, quantite)", "", "Avantages : moins de redondance, cohérence, maintenance", "Inconvénient : plus de JOINs nécessaires"]
    },
    scenarios: [
      {
        context: "Vous avez cette table mal conçue 'commandes_flat' :\n\nid | client_nom | client_email       | produit   | prix | quantite\n1  | Alice      | alice@mail.com     | Laptop    | 1200 | 1\n2  | Alice      | alice@mail.com     | Souris    |   49 | 2\n3  | Bob        | bob@mail.com       | Laptop    | 1200 | 1\n\nLe nom et email d'Alice sont DUPLIQUÉS !",
        q: "Quel concept de base de données résout ce problème de duplication ? (answer <concept>)",
        check: { type: "includes", keywords: ["normalisation", "normalization", "3nf", "forme normale", "normal form"] },
        win: "✓ La NORMALISATION ! Séparer en tables clients + produits + commandes élimine la redondance et les anomalies de mise à jour.",
        hint: "Ce concept consiste à décomposer les données en plusieurs tables reliées pour éviter la redondance..."
      }
    ],
    defaultFeedback: { prefix: "answer ", msg: ["✗ Pensez au processus qui structure les tables pour éviter la duplication.", "  Tapez 'hint' pour un indice."] }
  },

  transaction: {
    id: "transaction", title: "TRANSACTIONS & ACID", topic: "Transactions & Intégrité",
    contextPrefix: "📋 PROBLÈME :\n",
    commands: {
      help: ["╔═══════════════════════════════════════════╗", "║  answer <réponse>  - Répondre             ║", "║  hint              - Obtenir un indice    ║", "║  explain           - Mini-cours           ║", "║  mission           - Revoir l'énoncé      ║", "╚═══════════════════════════════════════════╝"],
      explain: ["📖 TRANSACTIONS & ACID", "━━━━━━━━━━━━━━━━━━━━━━━", "BEGIN;", "  UPDATE comptes SET solde = solde - 500 WHERE id = 'A';", "  UPDATE comptes SET solde = solde + 500 WHERE id = 'B';", "COMMIT;  -- valide tout", "-- ou ROLLBACK;  -- annule tout", "", "ACID :", "  Atomicité — tout ou rien", "  Cohérence — état valide avant/après", "  Isolation — transactions indépendantes", "  Durabilité — persisté après COMMIT", "", "Niveaux d'isolation :", "  READ UNCOMMITTED → READ COMMITTED →", "  REPEATABLE READ → SERIALIZABLE"]
    },
    scenarios: [
      {
        context: "Vous transférez 500€ du compte A vers le compte B. Les deux opérations sont :\n\n  UPDATE comptes SET solde = solde - 500 WHERE id = 'A';\n  UPDATE comptes SET solde = solde + 500 WHERE id = 'B';\n\nSi le serveur crash entre les deux requêtes, le compte A perd 500€ mais B ne les reçoit pas !",
        q: "Quel mécanisme SQL garantit que les DEUX opérations réussissent ou AUCUNE ? (answer <mécanisme>)",
        check: { type: "includes", keywords: ["transaction", "begin", "commit", "rollback", "acid"] },
        win: "✓ Les TRANSACTIONS ! BEGIN → opérations → COMMIT (ou ROLLBACK si erreur). Le principe ACID garantit l'intégrité.",
        hint: "Ce mécanisme commence par BEGIN et finit par COMMIT ou ROLLBACK..."
      }
    ],
    defaultFeedback: { prefix: "answer ", msg: ["✗ Pensez au mécanisme qui regroupe plusieurs opérations en un bloc atomique.", "  Tapez 'hint' pour un indice."] }
  }

};
