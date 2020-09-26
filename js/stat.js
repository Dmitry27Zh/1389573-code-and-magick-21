'use strict';

const PLAYER_NAME = `Вы`;

const MESSAGE = `Ура, вы победили!\nСписок результатов:`;

const CloudParameters = {
  WIDTH: 420,
  HEIGHT: 270,
  X: 100,
  Y: 10,
  GAP: 10,
};

const FontParameters = {
  GAP: 30,
  SIZE: 16,
};

const ColumnParameters = {
  WIDTH: 40,
  MAX_HEIGHT: 150,
  GAP: 50,
};

const getRandomColor = function () {
  return `hsl(240, ${Math.round(Math.random() * 100)}%, 50%)`;
};

const getMaxElement = function (array) {
  return Math.max.apply(null, array);
};

const renderCloud = function (ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CloudParameters.WIDTH, CloudParameters.HEIGHT);
};

const findLineBreaks = function (text) {
  let startPos = 0;
  let positions = [];

  while (text) {
    let foundPos = text.indexOf(`\n`, startPos);

    if (foundPos === -1) {
      break;
    }

    positions.push(foundPos);
    startPos = foundPos + 1;
  }

  return positions;
};

const renderText = function (ctx, text) {
  ctx.fillStyle = `#000`;
  ctx.font = `${FontParameters.SIZE}px PT Mono`;

  const lineBreaks = findLineBreaks(text);
  let textX = CloudParameters.X + CloudParameters.GAP * 2;
  let textY = CloudParameters.Y + FontParameters.GAP;

  for (let i = 0; i < lineBreaks.length + 1; i++) {
    let textLineStart = i === 0 ? 0 : lineBreaks[i - 1] + 1;
    let textLineEnd = lineBreaks[i];
    let textLine = text.slice(textLineStart, textLineEnd);
    ctx.fillText(textLine, textX, textY);
    textY += FontParameters.SIZE;
  }
};

const renderHistogram = function (ctx, names, times) {
  const colors = names.map(function (name) {
    return name === PLAYER_NAME ? `rgb(250, 0, 0)` : getRandomColor();
  });

  let columnX = CloudParameters.X + CloudParameters.GAP + ColumnParameters.WIDTH;

  for (let i = 0; i < times.length; i++) {
    let columnHeight = times[i] * ColumnParameters.MAX_HEIGHT / getMaxElement(times);
    let columnY = CloudParameters.GAP + CloudParameters.HEIGHT - ColumnParameters.WIDTH - columnHeight;

    ctx.fillStyle = colors[i];
    ctx.fillRect(columnX, columnY, ColumnParameters.WIDTH, columnHeight);

    ctx.fillStyle = `#000`;
    ctx.fillText(names[i], columnX, columnY + columnHeight + FontParameters.SIZE);
    ctx.fillText(Math.round(times[i]), columnX, columnY - CloudParameters.GAP);

    columnX += ColumnParameters.WIDTH + ColumnParameters.GAP;
  }
};

window.renderStatistics = function (ctx, names, times) {
  renderCloud(ctx, `rgba(0, 0, 0, 0.7)`, CloudParameters.X + CloudParameters.GAP, CloudParameters.Y + CloudParameters.GAP);
  renderCloud(ctx, `#fff`, CloudParameters.X, CloudParameters.Y);
  renderText(ctx, MESSAGE);
  renderHistogram(ctx, names, times);
};
