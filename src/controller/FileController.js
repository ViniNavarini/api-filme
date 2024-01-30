const FileService = require("../services/FileService");

class FileController {
  async readFileAndRecord() {
    return new Promise(async (resolve, reject) => {
      try {
        this.fileService = new FileService();
        const result = await this.fileService.readFileAndRecord();
        resolve(result);
      } catch (error) {
        reject(error);
      }
    });
  }
}

module.exports = FileController;
