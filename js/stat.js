'use strict';

const CLOUD_WIDTH = 420;
const CLOUD_HEIGHT = 270;

const CLOUD_X = 100;
const CLOUD_Y = 10;
const GAP = 10;
const FONT_GAP = 30;
const FONT_SIZE = 16;

const COLUMN_WIDTH = 40;
const COLUMN_MAX_HEIGHT = 150;
const COLUMN_GAP = 50;

const renderRect = function (ctx, color, x, y, width, height) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, width, height);
};

const getMaxElement = function (arr) {
  let MaxElement = arr[0];

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] > MaxElement) {
      MaxElement = arr[i];
    }
  }

  return MaxElement;
};

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, `rgba(0, 0, 0, 0.7)`, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderRect(ctx, `#fff`, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = `#000`;
  ctx.font = `${FONT_SIZE}px PT Mono`;
  ctx.fillText(`Ура, вы победили!`, CLOUD_X + GAP * 2, CLOUD_Y + FONT_GAP);
  ctx.fillText(`Список результатов:`, CLOUD_X + GAP * 2, CLOUD_Y + FONT_GAP + FONT_SIZE);

  let COLUMN_X = CLOUD_X + GAP + COLUMN_WIDTH;

  const colors = names.map(function (name) {
    let color = `hsl(240, ${Math.round(Math.random() * 100)}%, 50%)`;

    if (name === `Вы`) {
      color = `rgb(250, 0, 0)`;
    }

    return color;
  });

  const MAX_ELEMENT = getMaxElement(times);

  for (let i = 0; i < times.length; i++) {
    let columnHeight = times[i] * COLUMN_MAX_HEIGHT / MAX_ELEMENT;
    let COLUMN_Y = GAP + CLOUD_HEIGHT - COLUMN_WIDTH - columnHeight;
    renderRect(ctx, colors[i], COLUMN_X, COLUMN_Y, COLUMN_WIDTH, columnHeight);
    COLUMN_X += COLUMN_WIDTH + COLUMN_GAP;
  }
};
