'use strict';

(function () {
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
    FONT_FAMILY: `PT Mono`,
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

  const renderCloud = function (ctx, x, y) {
    ctx.fillStyle = `rgba(0, 0, 0, 0.7)`;
    ctx.fillRect(x + CloudParameters.GAP, y + CloudParameters.GAP, CloudParameters.WIDTH, CloudParameters.HEIGHT);
    ctx.fillStyle = `#fff`;
    ctx.fillRect(x, y, CloudParameters.WIDTH, CloudParameters.HEIGHT);
  };

  const renderText = function (ctx, text) {
    ctx.fillStyle = `#000`;
    ctx.font = `${FontParameters.SIZE}px ${FontParameters.FONT_FAMILY}`;

    const textLines = text.split(`\n`);
    let textX = CloudParameters.X + CloudParameters.GAP * 2;
    let textY = CloudParameters.Y + FontParameters.GAP;

    for (let i = 0; i < textLines.length; i++) {
      let textLine = textLines[i];
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
    renderCloud(ctx, CloudParameters.X, CloudParameters.Y);
    renderText(ctx, MESSAGE);
    renderHistogram(ctx, names, times);
  };
})();
