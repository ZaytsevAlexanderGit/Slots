# Проект Slots

## Описание

Pet-проект. Цель, получить практику в создании веб-приложения с анимациями.

[Проект](https://zaytsevalexandergit.github.io/Slots/)


### Технологии

- React
- TypeScript
- Zustand
- Motion (ex. Framer Motion)

## Установка

1. Склонировать [репозиторий фронтенда](https://github.com/ZaytsevAlexanderGit/Simple_Games.git)
   ```shell
   git clone git@github.com/ZaytsevAlexanderGit/Slots.git
   ```
2. Установить зависимости `npm i`

   ```shell
   npm i
   ```

3. Запустить скрипт

   ```shell
   npm run dev
   ```
## Работа

Для изменения размеров игровой области, и количества вариантов выпадения, необходимо поменять соответствующие параметры в state (./src/assets/stores/slots-data - slotsVariants, slotsSizeRow и slotsSizeCol).

В случае изменения размера игрового поля, так же необходимо модифицировать массив выигрышных комбинаций (./src/shared/constants.ts - winCombinationsObject).