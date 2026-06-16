// ═══════════════════════════════════════════════
// DATA / IA LEVELS DATA — Pedago Game
// Used by: data.html (custom inline engine, no Babel)
// Depends on: shared/utils.js (shuffle)
//   DATA_LEVELS.build() → fresh randomized array of 12 levels
//   Each level: { id, title, mission, hint, topic, answers,
//                 winResponse, explain }
// ═══════════════════════════════════════════════

var DATA_LEVELS = {

  build: function buildLevels() {
    // Level 0 — Types de données
    const typeQuestions = shuffle([
      {
        data: '["Alice", 28, "Paris", true]',
        q: "Quel type de structure est-ce ?",
        a: ["list", "liste", "array", "tableau"],
        explain: "Une liste (ou array) est une collection ordonnée d'éléments de types variés.",
      },
      {
        data: '{"nom": "Alice", "age": 28, "ville": "Paris"}',
        q: "Quel type de structure est-ce ?",
        a: ["dict", "dictionnaire", "dictionary", "json", "objet", "object"],
        explain: "Un dictionnaire (dict) stocke des paires clé-valeur. Format JSON = standard d'échange de données.",
      },
      {
        data: "nom,age,ville\nAlice,28,Paris\nBob,35,Lyon",
        q: "Quel format de fichier est-ce ?",
        a: ["csv"],
        explain: "CSV = Comma Separated Values. Format tabulaire simple, lisible par Excel, Pandas, etc.",
      },
    ]);
    const tq = typeQuestions[0];

    // Level 1 — SQL basics
    const sqlQuestions = shuffle([
      {
        table: "TABLE clients (id, nom, age, ville, achats)\n  1 | Alice  | 28 | Paris | 12\n  2 | Bob    | 35 | Lyon  |  3\n  3 | Clara  | 22 | Paris | 27\n  4 | David  | 45 | Lille |  8",
        q: "Écrivez une requête pour obtenir les noms des clients de Paris.",
        a: [
          "select nom from clients where ville = 'paris'",
          "select nom from clients where ville='paris'",
          'select nom from clients where ville = "paris"',
          'select nom from clients where ville="paris"',
        ],
        explain: "SELECT <colonnes> FROM <table> WHERE <condition> — la base de toute requête SQL.",
      },
      {
        table: "TABLE produits (id, nom, prix, stock, categorie)\n  1 | Laptop  | 999 | 15 | Tech\n  2 | Clavier |  49 | 82 | Tech\n  3 | Cahier  |   5 | 200| Bureau\n  4 | Écran   | 350 |  7 | Tech",
        q: "Écrivez une requête pour compter les produits par catégorie.",
        a: [
          "select categorie, count(*) from produits group by categorie",
          "select categorie,count(*) from produits group by categorie",
        ],
        explain: "GROUP BY regroupe les lignes par valeur. COUNT(*) compte les lignes de chaque groupe.",
      },
    ]);
    const sq = sqlQuestions[0];

    // Level 2 — Data Cleaning
    const cleanQuestions = shuffle([
      {
        dataset: "nom    | age  | salaire\nAlice  | 28   | 35000\nBob    | -5   | 42000\nClara  | 31   | NaN\nDavid  | 999  | 28000\n???    | 27   | 31000",
        q: "Combien de valeurs problématiques voyez-vous ? Tapez le nombre.",
        a: ["4"],
        problems: [
          "age = -5 (négatif impossible)",
          "salaire = NaN (valeur manquante)",
          "age = 999 (outlier aberrant)",
          "nom = ??? (donnée invalide)",
        ],
        explain: "Le nettoyage de données = 80% du travail d'un data scientist. Il faut détecter : valeurs manquantes (NaN/null), outliers, données invalides, doublons.",
      },
      {
        dataset: "email             | date_inscription | pays\nalice@mail.com    | 2024-01-15      | France\nbob@mail          | 15/01/2024      | france\nalice@mail.com    | 2024-01-15      | FR\nclara@mail.com    | 2024-13-01      | NULL",
        q: "Combien de problèmes de qualité voyez-vous ? Tapez le nombre.",
        a: ["5", "6"],
        problems: [
          "bob@mail — email invalide (pas de domaine)",
          "Formats de date incohérents (YYYY-MM-DD vs DD/MM/YYYY)",
          "Doublon : alice@mail.com apparaît 2 fois",
          "Pays incohérent : France, france, FR (normalisation)",
          "Date invalide : mois 13 n'existe pas",
          "NULL = valeur manquante",
        ],
        explain: "Qualité des données : cohérence des formats, doublons, validation (emails, dates), normalisation des catégories.",
      },
    ]);
    const cq = cleanQuestions[0];

    // Level 3 — Statistiques descriptives
    const statQuestions = shuffle([
      {
        data: "Revenus mensuels (€) : 2100, 2300, 2200, 2400, 2100, 8500, 2300",
        q: "Quelle mesure de tendance centrale est la plus représentative ici : moyenne ou médiane ?",
        a: ["mediane", "médiane", "median"],
        explain: "La médiane (2300€) résiste aux outliers. La moyenne (3129€) est tirée vers le haut par 8500€. Quand il y a des valeurs extrêmes → toujours préférer la médiane.",
      },
      {
        data: "Notes d'examen : 8, 12, 14, 15, 13, 11, 14, 9, 13, 12",
        q: "Quel est l'écart-type approximatif ? Tapez 'faible' (< 3) ou 'fort' (> 3).",
        a: ["faible"],
        explain: "L'écart-type mesure la dispersion. Ici les notes sont groupées entre 8-15 avec une moyenne ~12.1, l'écart-type ≈ 2.1 → dispersion faible, groupe homogène.",
      },
    ]);
    const stq = statQuestions[0];

    // Level 4 — Visualisation
    const vizQuestions = shuffle([
      {
        scenario: "Vous voulez montrer l'évolution du chiffre d'affaires mois par mois sur 2024.",
        q: "Quel type de graphique est le plus adapté ? (line/bar/pie/scatter)",
        a: ["line", "ligne", "line chart"],
        explain: "Line chart = évolution temporelle. Bar = comparaison catégories. Pie = proportions (à éviter souvent). Scatter = corrélation entre 2 variables.",
      },
      {
        scenario: "Vous voulez comparer la répartition homme/femme dans 5 départements.",
        q: "Quel type de graphique ? (line/bar/pie/scatter/stacked bar)",
        a: ["stacked bar", "bar", "stacked", "bar chart"],
        explain: "Stacked bar chart = idéal pour comparer des compositions entre catégories. Bar groupé marche aussi.",
      },
    ]);
    const vq = vizQuestions[0];

    // Level 5 — Train/Test Split
    const splitQuestion = {
      scenario: "Vous avez 1000 lignes de données pour prédire si un client va churner.\nVous entraînez votre modèle sur les 1000 lignes.\nAccuracy sur ces données : 98%.\nAccuracy en production : 52%.",
      q: "Quel est le problème principal ? Tapez le terme technique.",
      a: ["overfitting", "sur-apprentissage", "surapprentissage", "overfit"],
      explain: "OVERFITTING = le modèle a mémorisé les données d'entraînement au lieu d'apprendre les patterns. Solution : toujours séparer train/test (typiquement 80/20), utiliser la validation croisée.",
    };

    // Level 6 — Métriques ML
    const metricQuestions = shuffle([
      {
        scenario: "Détection de fraude bancaire :\n  - Votre modèle prédit 100 transactions\n  - 90 prédites « légitimes » → 85 vraies, 5 étaient des fraudes\n  - 10 prédites « fraude » → 8 vraies fraudes, 2 faux positifs",
        q: "Le recall (rappel) pour la classe 'fraude' est de combien ? (en %)",
        a: ["61", "61%", "62", "62%"],
        explain: "Recall = Vrais Positifs / (Vrais Positifs + Faux Négatifs) = 8 / (8+5) ≈ 61.5%. En détection de fraude, le recall est crucial : rater une fraude coûte plus cher qu'un faux positif.",
      },
      {
        scenario: "Diagnostic médical (cancer) :\n  - 200 patients testés\n  - 180 prédits sains → 175 vrais, 5 avaient un cancer\n  - 20 prédits malades → 15 vrais cancers, 5 faux positifs",
        q: "La précision pour la classe 'cancer' est de combien ? (en %)",
        a: ["75", "75%"],
        explain: "Précision = VP / (VP + FP) = 15 / (15+5) = 75%. Mais attention : le recall = 15/(15+5 manqués) = 75% aussi ici. En médical, on privilégie souvent le recall (ne pas rater de malades).",
      },
    ]);
    const mq = metricQuestions[0];

    // Level 7 — Feature Engineering
    const feQuestions = shuffle([
      {
        dataset: "Pour prédire le prix d'un appartement :\n  surface_m2 | nb_pieces | adresse             | date_construction\n  65         | 3         | 12 rue Victor Hugo  | 1985\n  42         | 2         | 8 av des Champs     | 2010",
        q: "Quelle nouvelle feature pourriez-vous créer à partir de 'adresse' pour le modèle ? Tapez le concept.",
        a: ["quartier", "arrondissement", "code postal", "ville", "zone", "localisation", "geolocalisation", "latitude", "longitude", "coordonnees", "district"],
        explain: "Feature engineering = créer de nouvelles variables utiles. Une adresse brute est inutilisable → extraire le quartier, code postal, ou géocoder en lat/long. Aussi : 'ancienneté' = 2024 - date_construction.",
      },
    ]);
    const feq = feQuestions[0];

    // Level 8 — Algorithmes ML
    const algoQuestions = shuffle([
      {
        scenario: "Vous devez classer des emails en spam/pas spam.\nVous avez 50 000 emails labellisés.\nLes features sont : nb_mots, nb_liens, contient_mot('gratuit'), heure_envoi, etc.",
        q: "Quel type de problème ML est-ce ? (classification/regression/clustering)",
        a: ["classification"],
        explain: "Classification = prédire une catégorie (spam/pas spam). Régression = prédire une valeur continue (prix). Clustering = regrouper sans labels (segmentation clients).",
      },
      {
        scenario: "Vous avez 10 000 clients avec leurs comportements d'achat.\nPas de labels. Vous voulez identifier des segments de clientèle.",
        q: "Quel type de problème ML ? (classification/regression/clustering)",
        a: ["clustering"],
        explain: "Clustering = apprentissage non supervisé. Pas de labels → on cherche des groupes naturels. Algorithmes : K-Means, DBSCAN, hiérarchique.",
      },
    ]);
    const aq = algoQuestions[0];

    // Level 9 — Bias & Ethics
    const biasQuestions = shuffle([
      {
        scenario: "Un modèle de recrutement IA est entraîné sur 10 ans d'historique d'embauche.\nL'entreprise a historiquement embauché 85% d'hommes.\nLe modèle obtient 92% d'accuracy sur le test set.",
        q: "Quel est le risque principal ? Tapez le concept.",
        a: ["biais", "bias", "discrimination", "biais de selection", "biais historique", "biais de genre"],
        explain: "BIAIS DE DONNÉES → Le modèle reproduit les discriminations historiques. 92% d'accuracy ne signifie rien si le modèle est biaisé. Solutions : audit de fairness, données équilibrées, features protégées exclues, métriques par sous-groupe.",
      },
    ]);
    const bq = biasQuestions[0];

    // Level 10 — Deep Learning
    const dlQuestions = shuffle([
      {
        scenario: "Réseau de neurones pour classification d'images :\n  Input: image 28x28 pixels (niveaux de gris)\n  Hidden layer 1: 128 neurones, ReLU\n  Hidden layer 2: 64 neurones, ReLU\n  Output: 10 neurones, Softmax",
        q: "Pourquoi Softmax en sortie et pas ReLU ? (1 mot clé)",
        a: ["probabilite", "probabilites", "probabilité", "probabilités", "proba", "distribution"],
        explain: "Softmax convertit les scores en probabilités (somme = 1). Chaque neurone de sortie = probabilité d'une classe. ReLU est pour les couches cachées (introduit la non-linéarité).",
      },
      {
        scenario: "Vous entraînez un CNN sur ImageNet (1.2M images, 1000 classes).\nÉpoque 1: loss=4.2, accuracy=8%\nÉpoque 50: train_loss=0.3, train_acc=95%, val_loss=2.1, val_acc=62%",
        q: "Que se passe-t-il à l'époque 50 ?",
        a: ["overfitting", "sur-apprentissage", "surapprentissage", "overfit"],
        explain: "Train acc 95% mais val acc 62% = overfitting massif. Le gap train/val est le signal. Solutions : dropout, data augmentation, early stopping, régularisation L2, plus de données.",
      },
    ]);
    const dlq = dlQuestions[0];

    // Level 11 — Pipeline & MLOps
    const mlopsQuestions = shuffle([
      {
        scenario: "Votre modèle de recommandation est en production depuis 6 mois.\nPerformance initiale : precision@10 = 0.42\nPerformance actuelle : precision@10 = 0.28\nAucune modification du code.",
        q: "Quel phénomène explique cette dégradation ? (terme technique)",
        a: ["data drift", "drift", "concept drift", "model drift", "distribution shift", "derive", "dérive"],
        explain: "DATA DRIFT = les données réelles changent avec le temps (nouveaux produits, tendances, comportements). Le modèle entraîné sur d'anciennes données devient obsolète. Solution : monitoring continu, ré-entraînement automatique, alertes sur métriques.",
      },
    ]);
    const mlq = mlopsQuestions[0];

    return [
      // Level 0
      {
        id: 0, title: "STRUCTURES DE DONNÉES",
        mission: `Identifiez la structure de données suivante.\n\n  ${tq.data}\n\n${tq.q}`,
        hint: tq.explain.substring(0, 60) + "...",
        topic: "Types & Structures", answers: tq.a,
        winResponse: ["✓ CORRECT !", "", `📖 ${tq.explain}`, "", "→ Maîtriser les structures de données = fondation de tout projet data."],
        explain: ["📖 STRUCTURES DE DONNÉES", "━━━━━━━━━━━━━━━━━━━━━━━━", "• Liste/Array : collection ordonnée [1, 2, 3]", "• Dict/JSON : paires clé-valeur {\"nom\": \"Alice\"}", "• CSV : tableau texte, séparateur virgule", "• DataFrame : tableau structuré (Pandas)", "• Parquet : format colonnaire optimisé Big Data"],
      },
      // Level 1
      {
        id: 1, title: "SQL — REQUÊTES",
        mission: `Voici une table :\n\n  ${sq.table}\n\n${sq.q}`,
        hint: sq.explain.substring(0, 80) + "...",
        topic: "SQL", answers: sq.a,
        winResponse: ["✓ REQUÊTE VALIDE !", "", `📖 ${sq.explain}`],
        explain: ["📖 SQL FONDAMENTAUX", "━━━━━━━━━━━━━━━━━━━", "SELECT colonnes FROM table", "WHERE condition", "GROUP BY colonne", "ORDER BY colonne ASC/DESC", "JOIN table2 ON table1.id = table2.id", "HAVING condition_sur_aggregat", "", "Agrégats : COUNT, SUM, AVG, MIN, MAX"],
      },
      // Level 2
      {
        id: 2, title: "NETTOYAGE DE DONNÉES",
        mission: `Analysez ce dataset :\n\n  ${cq.dataset}\n\n${cq.q}`,
        hint: "Cherchez : NaN, valeurs négatives impossibles, outliers, données invalides.",
        topic: "Data Cleaning", answers: cq.a,
        winResponse: ["✓ BON OEIL !", "", "Problèmes détectés :", ...cq.problems.map((p) => `  ⚠ ${p}`), "", `📖 ${cq.explain}`],
        explain: ["📖 NETTOYAGE DE DONNÉES", "━━━━━━━━━━━━━━━━━━━━━━━", "Vérifier :", "  • Valeurs manquantes (NaN, NULL, vide)", "  • Outliers (IQR, z-score)", "  • Doublons (duplicated())", "  • Types incorrects (str au lieu de int)", "  • Cohérence des formats (dates, pays)", "", "Pandas : .isna(), .describe(), .duplicated(), .dtypes"],
      },
      // Level 3
      {
        id: 3, title: "STATISTIQUES DESCRIPTIVES",
        mission: `${stq.data}\n\n${stq.q}`,
        hint: "Pensez à l'impact des valeurs extrêmes sur chaque mesure.",
        topic: "Statistiques", answers: stq.a,
        winResponse: ["✓ EXACT !", "", `📖 ${stq.explain}`],
        explain: ["📖 STATS DESCRIPTIVES", "━━━━━━━━━━━━━━━━━━━━━", "Tendance centrale : moyenne, médiane, mode", "Dispersion : écart-type, variance, IQR", "Distribution : histogramme, boxplot", "", "Médiane > Moyenne quand outliers présents", "IQR = Q3 - Q1, outliers si < Q1-1.5*IQR ou > Q3+1.5*IQR"],
      },
      // Level 4
      {
        id: 4, title: "DATA VISUALISATION",
        mission: `${vq.scenario}\n\n${vq.q}`,
        hint: "Chaque type de graphique a un usage optimal selon le message à transmettre.",
        topic: "Visualisation", answers: vq.a,
        winResponse: ["✓ BON CHOIX !", "", `📖 ${vq.explain}`],
        explain: ["📖 CHOISIR SON GRAPHIQUE", "━━━━━━━━━━━━━━━━━━━━━━━━", "📈 Line chart → évolution temporelle", "📊 Bar chart → comparaison de catégories", "🥧 Pie chart → proportions (⚠ souvent trompeur)", "⚫ Scatter plot → corrélation 2 variables", "📦 Boxplot → distribution + outliers", "🗺️ Heatmap → matrice de corrélation", "", "Règle d'or : un graphique = un message clair"],
      },
      // Level 5
      {
        id: 5, title: "TRAIN / TEST SPLIT",
        mission: `${splitQuestion.scenario}\n\n${splitQuestion.q}`,
        hint: "Quand un modèle performe bien en entraînement mais mal en réalité...",
        topic: "Overfitting", answers: splitQuestion.a,
        winResponse: ["✓ EXACTEMENT !", "", `📖 ${splitQuestion.explain}`, "", "Règle d'or : JAMAIS évaluer sur les données d'entraînement."],
        explain: ["📖 OVERFITTING vs UNDERFITTING", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "Overfitting : trop appris → mémorise le bruit", "  → train_acc >> val_acc", "Underfitting : pas assez appris → trop simple", "  → train_acc ET val_acc faibles", "", "Solutions overfitting :", "  • Train/test split (80/20)", "  • Cross-validation (k-fold)", "  • Régularisation (L1, L2, Dropout)", "  • Plus de données / data augmentation"],
      },
      // Level 6
      {
        id: 6, title: "MÉTRIQUES ML",
        mission: `${mq.scenario}\n\n${mq.q}`,
        hint: "Recall = TP / (TP + FN). Précision = TP / (TP + FP).",
        topic: "Métriques", answers: mq.a,
        winResponse: ["✓ BIEN CALCULÉ !", "", `📖 ${mq.explain}`],
        explain: ["📖 MÉTRIQUES DE CLASSIFICATION", "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━", "Accuracy = (TP+TN) / Total", "Précision = TP / (TP+FP) → 'Parmi mes prédictions +, combien sont vraies ?'", "Recall = TP / (TP+FN) → 'Parmi les vrais +, combien j'ai trouvé ?'", "F1-Score = 2 × (P×R)/(P+R)", "", "⚠ Accuracy trompeuse si classes déséquilibrées !", "Fraude/Médical → prioriser Recall", "Spam → prioriser Précision"],
      },
      // Level 7
      {
        id: 7, title: "FEATURE ENGINEERING",
        mission: `${feq.dataset}\n\n${feq.q}`,
        hint: "Comment transformer une donnée brute en information utile pour un modèle ?",
        topic: "Feature Engineering", answers: feq.a,
        winResponse: ["✓ BONNE INTUITION !", "", `📖 ${feq.explain}`],
        explain: ["📖 FEATURE ENGINEERING", "━━━━━━━━━━━━━━━━━━━━━━", "Transformer les données brutes en features utiles :", "  • Extraction : date → jour_semaine, mois, weekend", "  • Encoding : catégoriel → one-hot, ordinal, target", "  • Agrégation : historique → moyenne, tendance", "  • Interaction : surface × nb_etages = volume", "  • Texte → TF-IDF, embeddings, sentiment", "", "\"Garbage in, garbage out\" — la qualité des features > choix de l'algorithme"],
      },
      // Level 8
      {
        id: 8, title: "ALGORITHMES ML",
        mission: `${aq.scenario}\n\n${aq.q}`,
        hint: "Supervisé = avec labels. Non supervisé = sans labels.",
        topic: "Algorithmes", answers: aq.a,
        winResponse: ["✓ CORRECT !", "", `📖 ${aq.explain}`],
        explain: ["📖 TYPES DE ML", "━━━━━━━━━━━━━━━", "SUPERVISÉ (avec labels) :", "  Classification : catégories → Logistic Reg, Random Forest, SVM, XGBoost", "  Régression : valeurs continues → Linear Reg, Gradient Boosting", "", "NON SUPERVISÉ (sans labels) :", "  Clustering : K-Means, DBSCAN, Hierarchical", "  Réduction dim : PCA, t-SNE, UMAP", "", "RENFORCEMENT : agent + environnement + récompense"],
      },
      // Level 9
      {
        id: 9, title: "BIAIS & ÉTHIQUE IA",
        mission: `${bq.scenario}\n\n${bq.q}`,
        hint: "Le modèle apprend de ce qu'on lui donne. Si les données sont biaisées...",
        topic: "Éthique IA", answers: bq.a,
        winResponse: ["✓ CRUCIAL !", "", `📖 ${bq.explain}`, "", "→ L'IA Act européen impose des audits de biais pour les systèmes à haut risque."],
        explain: ["📖 BIAIS EN IA", "━━━━━━━━━━━━━━━", "Types de biais :", "  • Biais de sélection : données non représentatives", "  • Biais historique : discriminations passées reproduites", "  • Biais de confirmation : interpréter pour confirmer", "  • Biais de survivant : ne voir que les succès", "", "Solutions :", "  • Audit de fairness (equalized odds, demographic parity)", "  • Données diversifiées et représentatives", "  • Transparence et explicabilité (SHAP, LIME)", "  • Régulation : AI Act (UE), RGPD"],
      },
      // Level 10
      {
        id: 10, title: "DEEP LEARNING",
        mission: `${dlq.scenario}\n\n${dlq.q}`,
        hint: "Pensez à ce que la couche de sortie doit produire pour une classification.",
        topic: "Deep Learning", answers: dlq.a,
        winResponse: ["✓ EXACT !", "", `📖 ${dlq.explain}`],
        explain: ["📖 DEEP LEARNING", "━━━━━━━━━━━━━━━━━", "Architectures principales :", "  • MLP : couches denses, données tabulaires", "  • CNN : images, détection de patterns spatiaux", "  • RNN/LSTM : séquences, texte, séries temporelles", "  • Transformer : NLP (BERT, GPT), vision (ViT)", "", "Fonctions d'activation :", "  ReLU → couches cachées (résout vanishing gradient)", "  Softmax → sortie classification multi-classes", "  Sigmoid → sortie classification binaire"],
      },
      // Level 11
      {
        id: 11, title: "MLOPS & PRODUCTION",
        mission: `${mlq.scenario}\n\n${mlq.q}`,
        hint: "Le monde réel change. Les données aussi.",
        topic: "MLOps", answers: mlq.a,
        winResponse: ["✓ BIEN VU !", "", `📖 ${mlq.explain}`, "", "→ Un modèle en production sans monitoring = une bombe à retardement."],
        explain: ["📖 MLOPS", "━━━━━━━━━", "Pipeline complet :", "  Data → Feature Store → Train → Evaluate → Deploy → Monitor", "", "Concepts clés :", "  • Data drift : distribution des données change", "  • Concept drift : la relation X→Y change", "  • A/B testing : comparer modèles en prod", "  • Feature store : centraliser les features", "  • Model registry : versioner les modèles", "", "Outils : MLflow, Kubeflow, Airflow, DVC, Weights & Biases"],
      },
    ];
  }

};
