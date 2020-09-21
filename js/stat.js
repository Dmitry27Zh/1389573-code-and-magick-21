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

window.renderStatistics = function (ctx, names, times) {
  renderRect(ctx, `rgba(0, 0, 0, 0.7)`, CLOUD_X + GAP, CLOUD_Y + GAP, CLOUD_WIDTH, CLOUD_HEIGHT);
  renderRect(ctx, `#fff`, CLOUD_X, CLOUD_Y, CLOUD_WIDTH, CLOUD_HEIGHT);

  ctx.fillStyle = `#000`;
  ctx.font = `${FONT_SIZE}px PT Mono`;
  ctx.fillText(`Ура, вы победили!`, CLOUD_X + GAP * 2, CLOUD_Y + FONT_GAP);
  ctx.fillText(`Список результатов:`, CLOUD_X + GAP * 2, CLOUD_Y + FONT_GAP + FONT_SIZE);
  // Гистограмма
  const MAX_ELEMENT = times.reduce(function (maxTime = times[0], time) {
    return time > maxTime ? time : maxTime;
  });

  const colors = names.map(function (name) {
    let color = `hsl(240, ${Math.round(Math.random() * 100)}%, 50%)`;

    return name === `Вы` ? `rgb(250, 0, 0)` : color;
  });

  let COLUMN_X = CLOUD_X + GAP + COLUMN_WIDTH;

  for (let i = 0; i < times.length; i++) {
    let columnHeight = times[i] * COLUMN_MAX_HEIGHT / MAX_ELEMENT;
    let COLUMN_Y = GAP + CLOUD_HEIGHT - COLUMN_WIDTH - columnHeight;
    renderRect(ctx, colors[i], COLUMN_X, COLUMN_Y, COLUMN_WIDTH, columnHeight);

    // Текст гистограммы
    ctx.fillStyle = `#000`;
    ctx.fillText(names[i], COLUMN_X, GAP + CLOUD_HEIGHT - COLUMN_WIDTH + FONT_SIZE);
    ctx.fillText(Math.round(times[i]), COLUMN_X, COLUMN_Y - GAP);

    COLUMN_X += COLUMN_WIDTH + COLUMN_GAP;
  }
};
