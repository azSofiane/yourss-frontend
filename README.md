# Next.js
## installation
```
npm i
```
ou
```
yarn install
```

## _app.js
Changer la ligne 14, exemple par les reducer utilisés
```
const reducers = combineReducers({ user, panier, ... });
```

Changer la ligne 15, la key par le nom souhaiter afficher dans le localstorage
```
const persistConfig = { key: 'nomdelakeylocalstorage', storage };
```

## utilisation
Dans le terminal à la racine du projet
```
npm run dev
```
ou
```
yarn dev
```

## utiles
Déjà installé
```
fortawesome
@reduxjs/toolkit
react-redux
redux-persist
```

Pour les chemins il est possible
```
@components // dossier components
@pages // dossier pages
@reducers // dossier reducers
@styles // dossier styles
@img // dossier public/img
```
