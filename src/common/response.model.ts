
import { ApiProperty } from "@nestjs/swagger";
export class ResOp<T = any> {
    @ApiProperty({ type: 'object' })
    data?: T
  
    @ApiProperty({ type: 'number', default: 200 })
    statusCode: number
  
    @ApiProperty({ type: 'string', default: 'success' })
    message: string
    
    @ApiProperty({ type: 'object' })
    pageInfo?: Object
  

    constructor(statusCode: number, data: T, message = 'success', pageInfo = {}) {
      this.statusCode = statusCode 
      this.data = data
      this.message = message
      this.pageInfo = this.pageInfo
    }
  }