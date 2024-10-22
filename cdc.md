### Cahier des Charges pour l'Application Web de Gestion Financière

---

#### 1. **Contexte et Objectifs**

##### 1.1 **Contexte**
L'application web a pour but de permettre la gestion des finances personnelles et professionnelles. Elle permettra de suivre les dépenses, les revenus et les bénéfices générés, avec une interface intuitive et des outils de visualisation des données.

##### 1.2 **Objectifs**
- Offrir une solution complète pour gérer à la fois les finances personnelles et professionnelles.
- Assurer la sécurité et la performance de l'application avec une architecture évolutive.

---

#### 2. **Fonctionnalités Générales**

##### 2.1 **Authentification et Sécurité**
- connexion des utilisateurs via email et mot de passe.
- Connexion via **JWT (JSON Web Tokens)** pour sécuriser les sessions utilisateurs.

##### 2.2 **Tableau de Bord**
- **Vue d'ensemble** : Accès aux sections "Gestion Financière" .
- Visualisation des graphiques financiers (dépenses, revenus, bénéfices) en temps réel.

---

#### 3. **Gestion Financière (Société et Personnel)**

##### 3.1 **Création et Gestion des Comptes Financiers**
- Création de comptes financiers avec :
  - Nom du compte (ex : "Compte personnel", "Compte société").
  - Montant initial.
  - Description du compte.
  - Devise utilisée (ex : EUR, USD).
  
##### 3.2 **Ajout et Gestion des Dépenses**
- **Dépenses récurrentes** : Nom de la dépense, montant, fréquence (ex : mensuelle).
- **Dépenses ponctuelles** : Nom de la dépense, montant, date.
- Possibilité de modifier ,ajouuter ou supprimer des dépenses.

##### 3.3 **Ajout et Gestion des Revenus**
- **Revenus fixes** : Nom du revenu, montant, fréquence (ex : tous les mois).
- **Revenus ponctuels** : Nom du revenu, montant, date.
- Possibilité de modifier,ajouter ou supprimer les revenus.

##### 3.4 **Dépenses Exceptionnelles**
- Ajout de dépenses exceptionnelles à déduire immédiatement du solde du compte.

##### 3.5 **Rapports et Statistiques**
- Graphiques des dépenses et des revenus, avec filtrage par périodes (semaine, mois, année).
- Catégorisation des dépenses par type (alimentation, transport, etc.).

---


#### 6. **Technologies Utilisées**

##### 6.1 **Frontend**
- **Angular** : Utilisé pour créer une interface utilisateur réactive et dynamique.
  - **TypeScript** : Pour la gestion du code frontend.
  - **Angular Material**  : Pour une interface utilisateur moderne et accessible.
  - **RxJS** : Pour la gestion des flux de données asynchrones dans l'application.
  
##### 6.2 **Backend**
- **Nodes JS** : Pour la gestion de la logique métier et des API REST.
  
##### 6.3 **Base de Données**
- **PostgreSQL**  : Base de données relationnelle pour stocker les informations financières et clients.



##### 6.5 **Autres Outils**
- **Git** pour le contrôle de version, avec un dépôt hébergé sur **GitLab** ou **GitHub**.

---

#### 7. **Contraintes et Exigences Techniques**

##### 7.1 **Exigences Fonctionnelles**
- L'application doit être **responsive**, s'adaptant à tous les types de dispositifs (ordinateur, tablette, smartphone).
- Gestion efficace de multiples comptes financiers et comptes clients.
- Authentification sécurisée et gestion des autorisations pour l’accès aux données.

##### 7.2 **Exigences Non Fonctionnelles**
- **Performance** : Les requêtes doivent être traitées rapidement même avec une large base de données.
- **Sécurité** : Utilisation de bonnes pratiques pour protéger les données sensibles.
- **Scalabilité** : L'application doit pouvoir évoluer pour accueillir un grand nombre d'utilisateurs.
- **Fiabilité** : Système de gestion des erreurs et reprise sur incident.

---
