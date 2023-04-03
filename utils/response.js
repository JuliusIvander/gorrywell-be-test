module.exports = Object.freeze({
  buildHttpResponse: (entity, res) => {
    res.status(entity.statusCode);
    res.json({
      success: entity.success,
      message: entity.message,
      data: entity.data,
    });
  },
});
