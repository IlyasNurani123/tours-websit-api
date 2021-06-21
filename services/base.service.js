class BaseService {
    constructor(request) {
      if (new.target === BaseService) {
        throw new TypeError("Cannot Construct Abstract instance directly");
      }
      this.request = request;
    }
  }
  
  module.exports = BaseService;
  