# Take-Home Test – Software Engineer

> **Niveau cible** : Engineer 2 / Senior 1 (3-6 ans d'expérience)  
> **Durée estimée** : 3-4 heures (hors bonus)  
> **Délai de rendu** : 5 jours maximum

---

## 🎯 Objectif

Ce test évalue votre capacité à concevoir et implémenter un **module financier** avec le niveau de rigueur attendu dans un environnement Fintech. Nous évaluons :

- La **conception orientée objet** et le respect des principes SOLID
- La **gestion des invariants métier** et des cas d'erreur
- La **traçabilité** et l'**auditabilité** des opérations
- La qualité des **tests** et la couverture des cas limites
- La **clarté du code** et la documentation

---

## 📜 Interface Imposée

Vous devez implémenter une classe respectant **strictement** cette interface :

```java
public interface BankAccount {
    void deposit(int amount);
    void withdraw(int amount);
    void printStatement();
}
```

> ⚠️ **L'interface est immuable.** Toute modification des signatures invalide la solution.

---

## 📋 Spécifications Fonctionnelles

### 1. Dépôt (`deposit`)

| Règle | Comportement attendu |
|-------|---------------------|
| Montant > 0 | Créer une transaction crédit, mettre à jour le solde |
| Montant ≤ 0 | Lever une exception explicite avec message clair |
| Montant > 1 000 000 | Lever une exception (limite par opération) |

### 2. Retrait (`withdraw`)

| Règle | Comportement attendu |
|-------|---------------------|
| Montant > 0 et solde suffisant | Créer une transaction débit, mettre à jour le solde |
| Montant ≤ 0 | Lever une exception explicite |
| Montant > solde actuel | Lever une exception `InsufficientFundsException` (ou équivalent) |
| Montant > 1 000 000 | Lever une exception (limite par opération) |

> 💡 **Aucun découvert autorisé.** Le solde ne peut jamais devenir négatif.

### 3. Relevé (`printStatement`)

Affiche l'historique des transactions avec :

- **Date** de l'opération (format ISO : `YYYY-MM-DD`)
- **Type** d'opération (`DEPOSIT` / `WITHDRAWAL`)
- **Montant** de l'opération
- **Solde après** l'opération

**Tri** : ordre chronologique **décroissant** (opération la plus récente en premier).

#### Exemple de sortie

```
Date       | Type       | Amount  | Balance
-----------+------------+---------+---------
2024-01-15 | WITHDRAWAL |    -500 |    2500
2024-01-14 | DEPOSIT    |    2000 |    3000
2024-01-10 | DEPOSIT    |    1000 |    1000
```

> Le format exact est libre, mais la **structure** et la **cohérence des soldes** sont évaluées.

---

## 🔬 Contraintes Techniques Obligatoires

### Architecture & Conception

| Exigence | Détail |
|----------|--------|
| **Transaction immuable** | Une transaction créée ne peut plus être modifiée |
| **Séparation des responsabilités** | Distinguer clairement : modèle, logique métier, affichage |
| **Injection de dépendances** | Le fournisseur de date/heure doit être injectable (pour les tests) |
| **Exceptions typées** | Créer des exceptions métier explicites (pas de `RuntimeException` générique) |

### Qualité de Code

- Pas de logique métier dans les constructeurs
- Pas d'état mutable partagé
- Nommage explicite (pas d'abréviations cryptiques)
- Méthodes courtes et focalisées (< 20 lignes idéalement)

---

## 🧪 Exigences de Tests

### Tests obligatoires

Vous devez couvrir **au minimum** les scénarios suivants :

#### Dépôts
- [ ] Dépôt valide → solde mis à jour
- [ ] Dépôt de montant nul → exception
- [ ] Dépôt de montant négatif → exception
- [ ] Dépôt dépassant la limite → exception
- [ ] Plusieurs dépôts successifs → solde cumulé correct

#### Retraits
- [ ] Retrait valide avec solde suffisant → solde mis à jour
- [ ] Retrait de montant nul → exception
- [ ] Retrait de montant négatif → exception
- [ ] Retrait supérieur au solde → exception `InsufficientFunds`
- [ ] Retrait égal au solde → solde à zéro (cas limite)
- [ ] Retrait dépassant la limite → exception

#### Relevé
- [ ] Compte vide → relevé vide ou message approprié
- [ ] Une seule transaction → affichage correct
- [ ] Plusieurs transactions → ordre décroissant respecté
- [ ] Vérification du solde cumulatif après chaque opération

#### Intégration
- [ ] Scénario complet : dépôt → retrait → dépôt → relevé

### Qualité des tests attendue

- Tests **indépendants** (pas de dépendance à l'ordre d'exécution)
- Tests **déterministes** (date/heure mockée)
- Nommage **explicite** décrivant le scénario testé
- **Assertions précises** (pas de `assertTrue(true)`)

---

## 📊 Grille d'Évaluation

### Critères Éliminatoires

| Critère | Seuil |
|---------|-------|
| L'interface est modifiée | ❌ Élimination |
| Le code ne compile pas | ❌ Élimination |
| Aucun test fourni | ❌ Élimination |
| Solde négatif possible | ❌ Élimination |

### Grille de Notation (sur 100 points)

| Catégorie | Points | Détail |
|-----------|--------|--------|
| **Respect du contrat** | 15 | Interface, comportements, exceptions |
| **Modélisation** | 20 | Transaction immuable, types dédiés, séparation |
| **Qualité du code** | 20 | Lisibilité, SOLID, pas de code smell |
| **Tests** | 25 | Couverture, pertinence, clarté, déterminisme |
| **Architecture** | 10 | Injection de dépendances, extensibilité |
| **Documentation** | 10 | README, commentaires pertinents, choix expliqués |

### Barème de Niveau

| Score | Niveau |
|-------|--------|
| < 50 | Insuffisant |
| 50-64 | Junior confirmé |
| 65-79 | **Engineer 2** ✅ |
| 80-89 | **Senior 1** ✅ |
| ≥ 90 | Senior+ |

---

## 📦 Livrables

### Obligatoires

1. **Code source** complet et fonctionnel
2. **Tests unitaires** couvrant les scénarios listés
3. **README.md** contenant :
   - Instructions d'installation et d'exécution
   - Instructions pour lancer les tests
   - Choix techniques et justifications
   - Limites connues et pistes d'amélioration

### Structure attendue (exemple)

```
├── src/
│   ├── main/
│   │   └── [code source]
│   └── test/
│       └── [tests]
├── README.md
├── [fichiers de build : pom.xml, package.json, go.mod, etc.]
└── [.gitignore]
```

---

## 🛠️ Technologies

Vous êtes libre d'utiliser le langage de votre choix. Exemples :

- Java (17+), Kotlin
- TypeScript / Node.js
- Go
- Python (3.10+)
- C# (.NET 6+)
- Rust

> 💡 Choisissez le langage où vous êtes **le plus à l'aise**. Nous évaluons la maîtrise, pas le choix technologique.

---

## ⭐ Bonus (Optionnels)

Ces bonus permettent de démontrer une maturité technique supérieure. Ils ne sont **pas requis** pour valider le test, mais peuvent faire la différence.

### Bonus Architecture (+10 points max)

| Bonus | Points |
|-------|--------|
| Pattern Repository pour les transactions | +3 |
| Event Sourcing (les transactions **sont** l'état) | +5 |
| CQRS (séparation lecture/écriture) | +5 |

### Bonus API (+10 points max)

| Bonus | Points |
|-------|--------|
| API REST avec endpoints `/deposit`, `/withdraw`, `/statement` | +5 |
| Validation des entrées avec messages d'erreur structurés | +2 |
| Documentation OpenAPI/Swagger | +3 |

### Bonus DevOps (+5 points max)

| Bonus | Points |
|-------|--------|
| Dockerfile fonctionnel | +2 |
| docker-compose avec persistance | +2 |
| CI/CD (GitHub Actions, GitLab CI) | +1 |

### Bonus Frontend (+10 points max)

| Bonus | Points |
|-------|--------|
| Interface web minimaliste fonctionnelle | +5 |
| Gestion d'erreurs UX (messages clairs, états de chargement) | +3 |
| Tests frontend | +2 |

---

## 🎯 Conseils pour Réussir

### Ce que nous recherchons

✅ Code **simple mais bien structuré**  
✅ Tests **qui documentent le comportement**  
✅ Exceptions **explicites et informatives**  
✅ README **qui permet de comprendre vos choix**  
✅ Git history **propre** (commits atomiques et messages clairs)

### Ce que nous pénalisons

❌ Over-engineering (frameworks lourds pour un problème simple)  
❌ Copier-coller de code  
❌ Tests qui ne testent rien de significatif  
❌ Absence de gestion d'erreurs  
❌ Code "ça marche mais je ne sais pas pourquoi"

---

## ❓ Questions Fréquentes

**Q : Puis-je utiliser des bibliothèques externes ?**  
R : Oui, pour les tests (JUnit, Jest, pytest...) et le tooling. Évitez les frameworks qui "cachent" la logique métier.

**Q : Dois-je implémenter une persistance ?**  
R : Non, le stockage en mémoire suffit. La persistance est un bonus.

**Q : Comment gérer les dates dans les tests ?**  
R : Injectez un fournisseur de date (Clock, TimeProvider, ou simple fonction). C'est un critère d'évaluation.

**Q : Le format exact du relevé est-il important ?**  
R : Non. La structure (colonnes), l'ordre (décroissant), et la cohérence des soldes sont évalués, pas l'alignement pixel-perfect.

**Q : Combien de temps dois-je y passer ?**  
R : 3-4h pour la partie obligatoire. Ne sacrifiez pas la qualité pour les bonus.

---

## 📤 Soumission

1. Hébergez votre code sur un repository Git (GitHub, GitLab, Bitbucket)
2. Assurez-vous que le repository est **accessible** (public ou invitation envoyée)
3. Envoyez le lien par email avec pour objet : `[Take-Home] Votre Nom - Bank Account`

---

## 📌 Récapitulatif

| Élément | Obligatoire | Bonus |
|---------|:-----------:|:-----:|
| Interface respectée | ✅ | |
| Transaction immuable | ✅ | |
| Exceptions typées | ✅ | |
| Injection de date | ✅ | |
| Tests unitaires complets | ✅ | |
| README documenté | ✅ | |
| API REST | | ⭐ |
| Frontend | | ⭐ |
| Docker | | ⭐ |
| Event Sourcing | | ⭐ |

---

*Bonne chance ! Nous avons hâte de découvrir votre solution.* 🚀
