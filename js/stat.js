'use strict';

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

const PLAYER_NAME = `Вы`;

const renderCloud = function (ctx, color, x, y) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, CloudParameters.WIDTH, CloudParameters.HEIGHT);
};

const renderText = function (ctx) {
  ctx.fillStyle = `#000`;
  ctx.font = `${FontParameters.SIZE}px PT Mono`;
  ctx.fillText(`Ура, вы победили!`, CloudParameters.X + CloudParameters.GAP * 2, CloudParameters.Y + FontParameters.GAP);
  ctx.fillText(`Список результатов:`, CloudParameters.X + CloudParameters.GAP * 2, CloudParameters.Y + FontParameters.GAP + FontParameters.SIZE);

};

const renderHistogram = function (ctx, names, times) {
  const maxElement = Math.max.apply(null, times);

  const colors = names.map(function (name) {
    let randomColor = `hsl(240, ${Math.round(Math.random() * 100)}%, 50%)`;

    return name === PLAYER_NAME ? `rgb(250, 0, 0)` : randomColor;
  });

  let columnX = CloudParameters.X + CloudParameters.GAP + ColumnParameters.WIDTH;

  for (let i = 0; i < times.length; i++) {
    let columnHeight = times[i] * ColumnParameters.MAX_HEIGHT / maxElement;
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
  renderText(ctx);
  renderHistogram(ctx, names, times);
};
