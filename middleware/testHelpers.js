const mockReq = (body) => ({
    body: body,
  });
  
  const mockRes = () => {
    const res = {};
    res.status = (code) => {
      res.statusCode = code;
      return res;
    };
    res.json = (body) => {
      res.body = body;
      return res;
    };
    return res;
  };
  
  module.exports = { mockReq, mockRes };
  