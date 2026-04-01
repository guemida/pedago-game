// ═══════════════════════════════════════════════
// DEV (PYTHON) LEVELS DATA — Pedago Game
// Used by: dev.html via buildLevel() and buildDifficultyLevel()
// Levels excluded: debug, OOP, algo (remain in dev.html)
// ═══════════════════════════════════════════════

var DEV_LEVELS = {

  variables: {
    id: "variables", title: "VARIABLES & TYPES", topic: "Variables & Types Python",
    missionSuffix: " Répondez avec 'answer <type>'.",
    commands: {
      help: [
        "╔══════════════════════════════════════════════╗",
        "║  answer <type>   - Répondre à la question    ║",
        "║  types           - Liste des types Python     ║",
        "║  run <code>      - Exécuter du Python         ║",
        "║  example         - Voir un exemple            ║",
        "╚══════════════════════════════════════════════╝"
      ],
      types: [
        "📖 TYPES PYTHON PRINCIPAUX :",
        "  int    → Entier        (42, -7, 0)",
        "  float  → Décimal       (3.14, -0.5)",
        "  str    → Chaîne        (\"hello\", 'world')",
        "  bool   → Booléen       (True, False)",
        "  list   → Liste         ([1, 2, 3])",
        "  dict   → Dictionnaire  ({\"a\": 1})",
        "  tuple  → Tuple         ((1, 2, 3))",
        "  None   → Rien          (None)"
      ],
      example: [
        ">>> x = 42",
        ">>> type(x)",
        "<class 'int'>",
        "",
        ">>> name = \"Python\"",
        ">>> type(name)",
        "<class 'str'>"
      ]
    },
    scenarios: [
      { q: "Quel est le type de la valeur 42 ?", check: { type: "answer", answer: "int" }, win: "✓ Correct ! type(42) → <class 'int'>", hint: "Les nombres entiers sont de type 'int' en Python." },
      { q: "Quel est le type de la valeur 3.14 ?", check: { type: "answer", answer: "float" }, win: "✓ Correct ! type(3.14) → <class 'float'>", hint: "Les nombres décimaux sont de type 'float'." },
      { q: "Quel est le type de la valeur \"hello\" ?", check: { type: "answer", answer: "str" }, win: "✓ Correct ! type(\"hello\") → <class 'str'>", hint: "Les chaînes de caractères entre guillemets sont de type 'str'." },
      { q: "Quel est le type de la valeur True ?", check: { type: "answer", answer: "bool" }, win: "✓ Correct ! type(True) → <class 'bool'>", hint: "True et False sont de type 'bool' (booléen)." },
      { q: "Quel est le type de la valeur [1, 2, 3] ?", check: { type: "answer", answer: "list" }, win: "✓ Correct ! type([1,2,3]) → <class 'list'>", hint: "Les crochets [] définissent une 'list'." }
    ],
    defaultFeedback: { prefix: "answer ", msg: ["✗ Incorrect. Tapez 'types' pour la liste des types Python."] }
  },

  conditions: {
    id: "conditions", title: "CONDITIONS & LOGIQUE", topic: "Conditions if/else, Booléens",
    missionSuffix: " Répondez avec 'answer <réponse>'.",
    defaultMsg: "✗ Incorrect. Réessayez.",
    winTemplate: [
      "✓ Correct ! La réponse est : {answer}",
      "",
      "⚠ À RETENIR :",
      "→ Python évalue les conditions de gauche à droite.",
      "→ Les valeurs 'falsy' : 0, '', [], {}, None, False.",
      "→ L'opérateur ternaire : valeur_si_vrai if condition else valeur_si_faux."
    ],
    commands: {
      help: [
        "╔══════════════════════════════════════════════╗",
        "║  answer <val>    - Répondre                   ║",
        "║  run <code>      - Tester du Python           ║",
        "║  explain         - Cours sur les conditions   ║",
        "╚══════════════════════════════════════════════╝"
      ],
      explain: [
        "📖 CONDITIONS EN PYTHON",
        "━━━━━━━━━━━━━━━━━━━━━━━",
        "if x > 0:",
        "    print('positif')",
        "elif x == 0:",
        "    print('zéro')",
        "else:",
        "    print('négatif')",
        "",
        "Opérateurs : ==, !=, <, >, <=, >=",
        "Logique : and, or, not",
        "Falsy : 0, '', [], {}, None, False",
        "Ternaire : 'a' if condition else 'b'"
      ]
    },
    challenges: {
      "débutant": [
        { desc: "Écrivez une condition : si x vaut 10, retourner 'oui', sinon 'non'. x = 10.", answer: "oui", hint: "if x == 10: → 'oui'. Tapez: answer oui" },
        { desc: "x = 5. Est-ce que x > 3 AND x < 10 ? Répondez True ou False.", answer: "true", hint: "5 > 3 est True, 5 < 10 est True. True AND True = ?" },
        { desc: "x = -3. Est-ce que x est positif (x > 0) ? True ou False.", answer: "false", hint: "-3 > 0 est False." }
      ],
      "intermédiaire": [
        { desc: "x = 15. Que retourne 'pair' si x%2==0, 'impair' sinon ?", answer: "impair", hint: "15 % 2 = 1, donc x n'est pas pair." },
        { desc: "x = 0. Que vaut bool(x) en Python ?", answer: "false", hint: "En Python, 0 est 'falsy' → bool(0) = False." },
        { desc: "x = \"\". Que vaut bool(x) en Python ?", answer: "false", hint: "Une chaîne vide est 'falsy' → bool('') = False." }
      ],
      "expert": [
        { desc: "Que retourne: True + True + False en Python ?", answer: "2", hint: "En Python, True=1 et False=0. Donc 1+1+0=2." },
        { desc: "Que retourne: not not [] en Python ? (True/False)", answer: "false", hint: "[] est falsy → not [] = True → not True = False." },
        { desc: "x=5. Que vaut: 'a' if x>3 else 'b' if x>7 else 'c' ?", answer: "a", hint: "x>3 est True, donc on retourne 'a' directement." }
      ]
    }
  },

  loops: {
    id: "loops", title: "BOUCLES & ITÉRATIONS", topic: "Boucles for/while, range, comprehensions",
    missionSuffix: " Tapez 'answer <réponse>'.",
    defaultMsg: "✗ Incorrect. Réessayez.",
    winTemplate: [
      "✓ Correct ! Réponse : {answer}",
      "",
      "⚠ À RETENIR :",
      "→ range(n) : de 0 à n-1.",
      "→ range(start, stop, step) pour plus de contrôle.",
      "→ Les list comprehensions sont plus 'pythoniques' que les boucles."
    ],
    commands: {
      help: [
        "╔══════════════════════════════════════════════╗",
        "║  answer <val>    - Répondre                   ║",
        "║  run <code>      - Tester du Python           ║",
        "║  explain         - Cours sur les boucles      ║",
        "╚══════════════════════════════════════════════╝"
      ],
      explain: [
        "📖 BOUCLES PYTHON",
        "━━━━━━━━━━━━━━━━━",
        "# For loop",
        "for i in range(5):      # 0,1,2,3,4",
        "    print(i)",
        "",
        "# While loop",
        "while x > 0:",
        "    x -= 1",
        "",
        "# List comprehension",
        "[x**2 for x in range(5)]  # [0,1,4,9,16]",
        "",
        "# range(start, stop, step)",
        "range(0, 10, 2)  # 0,2,4,6,8"
      ]
    },
    challenges: {
      "débutant": [
        { desc: "Que fait range(5) ? Donnez la liste des nombres générés, séparés par des virgules.", answer: "0,1,2,3,4", hint: "range(5) génère les nombres de 0 à 4 (5 exclu)." },
        { desc: "Combien de fois 'for i in range(3)' s'exécute ?", answer: "3", hint: "range(3) = [0, 1, 2] → 3 itérations." },
        { desc: "for i in range(1, 4): print(i). Qu'affiche ce code ? (réponse: les nombres séparés par des virgules)", answer: "1,2,3", hint: "range(1, 4) commence à 1 et s'arrête avant 4." }
      ],
      "intermédiaire": [
        { desc: "Que vaut sum(range(1, 6)) ?", answer: "15", hint: "range(1,6) = [1,2,3,4,5]. Somme = 15." },
        { desc: "Que retourne [i**2 for i in range(4)] ?", answer: "[0,1,4,9]", normalize: "removeSpaces", hint: "0²=0, 1²=1, 2²=4, 3²=9." },
        { desc: "Combien d'itérations : for i in range(0, 10, 3) ?", answer: "4", hint: "range(0,10,3) = [0,3,6,9] → 4 valeurs." }
      ],
      "expert": [
        { desc: "Que retourne: list(zip([1,2,3], ['a','b','c']))[1] ?", answer: "(2,'b')", normalize: "removeSpacesQuotes", hint: "zip crée des tuples. Index 1 = (2, 'b')." },
        { desc: "Que vaut: [x for x in range(10) if x%3==0 and x>0] ?", answer: "[3,6,9]", normalize: "removeSpaces", hint: "Multiples de 3 dans [1..9] : 3, 6, 9." },
        { desc: "Que retourne sum(1 for c in 'Hello World' if c.isupper()) ?", answer: "2", hint: "'H' et 'W' sont majuscules → 2." }
      ]
    }
  },

  lists: {
    id: "lists", title: "LISTES & STRUCTURES", topic: "Listes, Slicing, Méthodes",
    missionSuffix: " Tapez 'answer <réponse>'.",
    defaultMsg: "✗ Incorrect.",
    winTemplate: [
      "✓ Correct ! {answer}",
      "",
      "⚠ À RETENIR :",
      "→ Index à partir de 0, négatifs depuis la fin.",
      "→ Slicing : lst[start:stop:step].",
      "→ Les listes sont mutables, les tuples non."
    ],
    commands: {
      help: [
        "╔══════════════════════════════════════════════╗",
        "║  answer <val>    - Répondre                   ║",
        "║  run <code>      - Tester du Python           ║",
        "║  explain         - Cours sur les listes       ║",
        "╚══════════════════════════════════════════════╝"
      ],
      explain: [
        "📖 LISTES PYTHON",
        "━━━━━━━━━━━━━━━━",
        "lst = [1, 2, 3, 4, 5]",
        "lst[0]     → 1        (premier)",
        "lst[-1]    → 5        (dernier)",
        "lst[1:3]   → [2, 3]   (slicing)",
        "lst[::-1]  → [5,4,3,2,1] (inversé)",
        "",
        "Méthodes : append, insert, remove, pop, sort, reverse",
        "Fonctions : len, sorted, min, max, sum"
      ]
    },
    challenges: {
      "débutant": [
        { desc: "lst = [10, 20, 30, 40]. Que vaut lst[2] ?", answer: "30", hint: "Les index commencent à 0 : lst[0]=10, lst[1]=20, lst[2]=30." },
        { desc: "lst = [1, 2, 3]. Que vaut len(lst) ?", answer: "3", hint: "len() retourne le nombre d'éléments." },
        { desc: "lst = [5, 3, 8, 1]. Que vaut sorted(lst) ? (format: [a,b,c,d])", answer: "[1,3,5,8]", normalize: "removeSpaces", hint: "sorted() trie par ordre croissant." }
      ],
      "intermédiaire": [
        { desc: "lst = [1,2,3,4,5]. Que vaut lst[-2] ?", answer: "4", hint: "Index négatifs : -1=dernier, -2=avant-dernier." },
        { desc: "lst = [1,2,3,4,5]. Que vaut lst[1:4] ? (format: [a,b,c])", answer: "[2,3,4]", normalize: "removeSpaces", hint: "Slicing : lst[start:stop] (stop exclu)." },
        { desc: "'hello'[::-1] retourne quoi ?", answer: "olleh", hint: "[::-1] inverse une séquence." }
      ],
      "expert": [
        { desc: "Que vaut: list(set([1,2,2,3,3,3])) trié ?", answer: "[1,2,3]", normalize: "removeSpaces", hint: "set() supprime les doublons." },
        { desc: "Que retourne: dict(zip(['a','b'], [1,2])) ?", answer: "{'a':1,'b':2}", normalize: "removeSpacesQuotes", hint: "zip + dict crée un dictionnaire." },
        { desc: "lst=[1,[2,3],[4,[5,6]]]. Que vaut lst[2][1][0] ?", answer: "5", hint: "lst[2]=[4,[5,6]], [1]=[5,6], [0]=5." }
      ]
    }
  },

  functions: {
    id: "functions", title: "FONCTIONS", topic: "Fonctions, Lambda, Récursion",
    missionSuffix: " Tapez 'answer <réponse>'.",
    defaultMsg: "✗ Incorrect.",
    winTemplate: [
      "✓ Correct ! {answer}",
      "",
      "⚠ À RETENIR :",
      "→ def pour définir, return pour retourner une valeur.",
      "→ Les paramètres peuvent avoir des valeurs par défaut.",
      "→ Lambda = fonction courte et anonyme."
    ],
    commands: {
      help: [
        "╔══════════════════════════════════════════════╗",
        "║  answer <val>    - Répondre                   ║",
        "║  run <code>      - Tester du Python           ║",
        "║  explain         - Cours sur les fonctions    ║",
        "╚══════════════════════════════════════════════╝"
      ],
      explain: [
        "📖 FONCTIONS PYTHON",
        "━━━━━━━━━━━━━━━━━━━",
        "def nom_fonction(param1, param2='défaut'):",
        "    '''Docstring'''",
        "    return résultat",
        "",
        "# Lambda (fonction anonyme)",
        "carre = lambda x: x**2",
        "",
        "# *args et **kwargs",
        "def f(*args, **kwargs): ...",
        "",
        "# Récursion",
        "def fact(n): return n*fact(n-1) if n>1 else 1"
      ]
    },
    challenges: {
      "débutant": [
        { desc: "Complétez : def carre(x): return ___. Que met-on à la place de ___ pour retourner x au carré ?", answer: "x**2", alt: ["x*x", "x ** 2", "x * x"], hint: "x au carré = x**2 ou x*x." },
        { desc: "def add(a, b): return a + b. Que retourne add(3, 7) ?", answer: "10", hint: "3 + 7 = 10." },
        { desc: "def greet(name): return 'Hello ' + name. Que retourne greet('Python') ?", answer: "hello python", normalize: "removeQuotes", hint: "'Hello ' + 'Python' = 'Hello Python'." }
      ],
      "intermédiaire": [
        { desc: "def f(x, y=2): return x*y. Que retourne f(5) ?", answer: "10", hint: "y a une valeur par défaut de 2. f(5) = 5*2 = 10." },
        { desc: "def f(*args): return sum(args). Que retourne f(1,2,3,4) ?", answer: "10", hint: "*args capture tous les arguments. sum(1,2,3,4) = 10." },
        { desc: "Que retourne: (lambda x: x**3)(4) ?", answer: "64", hint: "Lambda x: x³. 4³ = 64." }
      ],
      "expert": [
        { desc: "def f(n): return n * f(n-1) if n > 1 else 1. Que vaut f(5) ?", answer: "120", hint: "C'est la factorielle. 5! = 5×4×3×2×1 = 120." },
        { desc: "Que retourne: list(map(lambda x: x**2, filter(lambda x: x%2==0, range(6)))) ?", answer: "[0,4,16]", normalize: "removeSpaces", hint: "Pairs dans range(6): 0,2,4. Carrés: 0,4,16." },
        { desc: "def make_adder(n): return lambda x: x+n. f=make_adder(10). Que vaut f(5) ?", answer: "15", hint: "Closure : f = lambda x: x+10. f(5) = 15." }
      ]
    }
  },

  strings: {
    id: "strings", title: "STRINGS & MÉTHODES", topic: "Chaînes de caractères, f-strings",
    missionSuffix: " Tapez 'answer <réponse>'.",
    commands: {
      help: [
        "╔══════════════════════════════════════════════╗",
        "║  answer <val>    - Répondre                   ║",
        "║  run <code>      - Tester du Python           ║",
        "║  explain         - Cours sur les strings      ║",
        "╚══════════════════════════════════════════════╝"
      ],
      explain: [
        "📖 STRINGS PYTHON",
        "━━━━━━━━━━━━━━━━━",
        "s = 'Hello World'",
        "s.upper()      → 'HELLO WORLD'",
        "s.lower()      → 'hello world'",
        "s.title()      → 'Hello World'",
        "s.strip()      → supprime espaces",
        "s.split(' ')   → ['Hello', 'World']",
        "s.replace('o','0') → 'Hell0 W0rld'",
        "s[0:5]         → 'Hello'",
        "f'{nom} a {age} ans'  → f-string"
      ]
    },
    scenarios: [
      { q: "'Python'[2:5] retourne quoi ?", check: { type: "answer", answer: "tho" }, win: "✓ Correct ! tho", hint: "Index 2='t', 3='h', 4='o'. Stop exclu." },
      { q: "'hello world'.title() retourne quoi ?", check: { type: "answer", answer: "Hello World", normalize: "removeQuotes" }, win: "✓ Correct ! Hello World", hint: ".title() met chaque mot en majuscule." },
      { q: "'  spaces  '.strip() retourne quoi ?", check: { type: "answer", answer: "spaces", normalize: "removeQuotes" }, win: "✓ Correct ! spaces", hint: ".strip() supprime les espaces en début/fin." },
      { q: "'a-b-c'.split('-') retourne quoi ?", check: { type: "answer", answer: "['a','b','c']", normalize: "removeSpacesQuotes" }, win: "✓ Correct ! ['a','b','c']", hint: ".split('-') coupe la chaîne à chaque tiret." },
      { q: "'-'.join(['x','y','z']) retourne quoi ?", check: { type: "answer", answer: "x-y-z", normalize: "removeQuotes" }, win: "✓ Correct ! x-y-z", hint: ".join() assemble avec le séparateur." },
      { q: "f'{3+4} est la réponse' retourne quoi ?", check: { type: "answer", answer: "7 est la réponse", normalize: "removeQuotes" }, win: "✓ Correct ! 7 est la réponse", hint: "f-string évalue les expressions entre {}." }
    ],
    defaultFeedback: { prefix: "answer ", msg: ["✗ Incorrect."] }
  },

  dicts: {
    id: "dicts", title: "DICTIONNAIRES", topic: "Dictionnaires, Méthodes",
    missionSuffix: " Tapez 'answer <réponse>'.",
    commands: {
      help: [
        "╔══════════════════════════════════════════════╗",
        "║  answer <val>    - Répondre                   ║",
        "║  run <code>      - Tester du Python           ║",
        "║  explain         - Cours sur les dicts        ║",
        "╚══════════════════════════════════════════════╝"
      ],
      explain: [
        "📖 DICTIONNAIRES PYTHON",
        "━━━━━━━━━━━━━━━━━━━━━━━",
        "d = {'clé': 'valeur', 'age': 25}",
        "d['clé']        → 'valeur'",
        "d.get('x', 0)   → 0 (valeur par défaut)",
        "d.keys()        → les clés",
        "d.values()      → les valeurs",
        "d.items()       → paires (clé, valeur)",
        "d.update({...}) → fusionner",
        "'clé' in d      → True/False"
      ]
    },
    scenarios: [
      { q: "d = {'a': 1, 'b': 2, 'c': 3}. Que vaut d['b'] ?", check: { type: "answer", answer: "2" }, win: "✓ Correct ! 2", hint: "d['b'] accède à la valeur associée à la clé 'b'." },
      { q: "d = {'x': 10, 'y': 20}. Que retourne list(d.keys()) ?", check: { type: "answer", answer: "['x','y']", normalize: "removeSpacesQuotes" }, win: "✓ Correct ! ['x','y']", hint: ".keys() retourne les clés du dictionnaire." },
      { q: "d = {'a': 1}. Que retourne d.get('z', 0) ?", check: { type: "answer", answer: "0" }, win: "✓ Correct ! 0", hint: ".get(key, default) retourne default si la clé n'existe pas." },
      { q: "d = {'a': 1, 'b': 2}. Que vaut len(d) ?", check: { type: "answer", answer: "2" }, win: "✓ Correct ! 2", hint: "len() compte le nombre de paires clé-valeur." },
      { q: "d = {1: 'a', 2: 'b'}. Que retourne list(d.values()) ?", check: { type: "answer", answer: "['a','b']", normalize: "removeSpacesQuotes" }, win: "✓ Correct ! ['a','b']", hint: ".values() retourne les valeurs." }
    ],
    defaultFeedback: { prefix: "answer ", msg: ["✗ Incorrect."] }
  },

  errors: {
    id: "errors", title: "GESTION D'ERREURS", topic: "Exceptions, try/except",
    missionSuffix: " Tapez 'answer <NomErreur>'.",
    commands: {
      help: [
        "╔══════════════════════════════════════════════╗",
        "║  answer <erreur>  - Répondre                  ║",
        "║  errors           - Liste des erreurs Python  ║",
        "║  explain          - Cours try/except          ║",
        "╚══════════════════════════════════════════════╝"
      ],
      errors: [
        "📋 ERREURS PYTHON COURANTES :",
        "  SyntaxError         → Erreur de syntaxe",
        "  TypeError           → Mauvais type",
        "  ValueError          → Mauvaise valeur",
        "  IndexError          → Index hors limites",
        "  KeyError            → Clé inexistante",
        "  ZeroDivisionError   → Division par zéro",
        "  AttributeError      → Attribut inexistant",
        "  NameError           → Variable non définie",
        "  FileNotFoundError   → Fichier introuvable",
        "  ModuleNotFoundError → Module introuvable"
      ],
      explain: [
        "📖 TRY / EXCEPT",
        "━━━━━━━━━━━━━━━",
        "try:",
        "    résultat = 10 / 0",
        "except ZeroDivisionError as e:",
        "    print(f'Erreur: {e}')",
        "except (TypeError, ValueError):",
        "    print('Type ou valeur incorrecte')",
        "else:",
        "    print('Pas d\\'erreur')",
        "finally:",
        "    print('Toujours exécuté')"
      ]
    },
    scenarios: [
      { q: "print(10 / 0) provoque quelle erreur ?", check: { type: "answer", answer: "zerodivisionerror" }, win: "✓ Correct ! C'est bien un ZeroDivisionError.", hint: "Division par zéro → ZeroDivisionError." },
      { q: "int('abc') provoque quelle erreur ?", check: { type: "answer", answer: "valueerror" }, win: "✓ Correct ! C'est bien un ValueError.", hint: "Conversion impossible → ValueError." },
      { q: "lst = [1,2]; lst[5] provoque quelle erreur ?", check: { type: "answer", answer: "indexerror" }, win: "✓ Correct ! C'est bien un IndexError.", hint: "Index hors limites → IndexError." },
      { q: "d = {}; d['x'] provoque quelle erreur ?", check: { type: "answer", answer: "keyerror" }, win: "✓ Correct ! C'est bien un KeyError.", hint: "Clé inexistante → KeyError." },
      { q: "'hello' + 5 provoque quelle erreur ?", check: { type: "answer", answer: "typeerror" }, win: "✓ Correct ! C'est bien un TypeError.", hint: "Concaténation str + int impossible → TypeError." },
      { q: "import blabla provoque quelle erreur ?", check: { type: "answer", answer: "modulenotfounderror" }, win: "✓ Correct ! C'est bien un ModuleNotFoundError.", hint: "Module inexistant → ModuleNotFoundError." }
    ],
    defaultFeedback: { prefix: "answer ", msg: ["✗ Ce n'est pas la bonne erreur. Tapez 'errors' pour la liste."] }
  }

};
