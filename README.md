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

# class css
## breakpoints
```
xs: 0
sm: 576px
md: 768px
lg: 992px
xl: 1200px
```

## display
possible d-{size}-{name} = d-md-flex
```
d-none
```
```
d-flex
```
```
d-inline
```
```
d-inline-block
```
```
d-block
```
```
d-table
```
```
d-table-cell
```
```
d-inline-flex
```

## position
possible position-{size}-{name} = position-md-relative
```
position-static
```
```
position-relative
```
```
position-absolute
```
```
position-fixed
```
```
position-sticky
```

## align
possible align-items-{size}-{name} = align-items-md-center
```
align-items-start
```
```
align-items-end
```
```
align-items-center
```
```
align-items-baseline
```
```
align-items-stretch
```

## justify-content
possible justify-content-{size}-{name} = justify-content-md-center
```
justify-content-start
```
```
justify-content-end
```
```
justify-content-center
```
```
justify-content-between
```
```
justify-content-around
```

## margin
cela va de 0 à 5
possible m-{size}-{number} = m-md-2
```
m-0
```
```
mt-0
```
```
mb-0
```
```
ms-0
```
```
me-0
```
```
mx-0
```
```
my-0
```
```
m-auto
```
```
mx-auto
```

## padding
cela va de 0 à 5
possible p-{size}-{number} = p-md-2
```
p-0
```
```
pt-0
```
```
pb-0
```
```
ps-0
```
```
pe-0
```
```
px-0
```
```
py-0
```

## text
possible text-{size}-{name} = text-md-center
```
text-center
```
```
text-start
```
```
text-end
```
```
text-default
```
```
text-secondary
```
