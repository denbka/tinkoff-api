import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as path from 'path'
import * as uuid from 'uuid'
import * as fs from 'fs'
@Injectable()
export class FilesService {

  async createFile(file): Promise<string> {
    try {
      const filename = 'file - ' + uuid.v4()
      const filePath = path.resolve(__dirname, '..', 'static')

      if (!fs.existsSync(filePath)) {
        fs.mkdirSync(filePath, { recursive: true })
      }

      fs.writeFileSync(path.join(filePath, filename), file.buffer)

      return filename
    } catch(error) {
      throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
    }
  }
}
