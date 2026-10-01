# StoreTracker

Mini-application React Native (Expo + TypeScript) :

- **Liste** : 100 magasins depuis une API mockée, filtre par nom, infinite scroll
- **Détail** : carte, horaires, bouton favori
- **Favoris** : liste persistée localement avec AsyncStorage
- **Navigation** : Tab Navigator (Liste / Favoris) + Stack Navigator pour le détail

## Installation et lancement

Prérequis : Node 22 (voir `.nvmrc`) et l'app Expo Go sur un téléphone.

```bash
nvm use
npm install
npm start
```

Scanner ensuite le QR code avec Expo Go.

Tests : `npm test`

## Variables d'environnement

Toutes sont optionnelles. Copier `.env.example` en `.env`, puis relancer avec `npx expo start -c`.

| Variable                      | Défaut | Description                                  |
| ----------------------------- | ------ | -------------------------------------------- |
| `EXPO_PUBLIC_PAGE_SIZE`       | `20`   | Nombre de magasins par page                  |
| `EXPO_PUBLIC_MOCK_LATENCY_MS` | `500`  | Latence simulée de l'API mockée (ms)         |
| `EXPO_PUBLIC_MOCK_ERROR_RATE` | `0`    | Probabilité d'erreur de l'API mockée (0 à 1) |

## Choix techniques

- **Expo** : pas de configuration native, tout tourne dans Expo Go (maps et AsyncStorage inclus).
- **React Navigation** : un Stack racine qui contient les onglets, donc l'écran Détail n'est déclaré qu'une fois.
- **TanStack Query** : cache, états loading/erreur, retry et pagination avec `useInfiniteQuery`.
- **Zustand + persist** pour les favoris : état local simple, Redux serait trop lourd ici.
- **AsyncStorage** plutôt que MMKV : disponible dans Expo Go sans build natif, suffisant pour quelques favoris.
