
import { Type, applyDecorators, HttpStatus } from '@nestjs/common'
import { ApiExtraModels, ApiResponse, getSchemaPath } from '@nestjs/swagger'

import { ResOp } from '@/src/common/response.model'

const baseTypeNames = ['String', 'Number', 'Boolean']

/**
 * @description: 生成返回结果装饰器
 */
export const ApiDataResponse = <TModel extends Type<any>>({
  type,
  status,
  message,
  isPage = false
}: {
  type?: TModel
  status?: HttpStatus
  message?: string
  isPage?: boolean
}) => {
  let data = null
  if (type) {
      if( isPage ){
         data = {
          type: 'array',
          items: { $ref: getSchemaPath(type) },
         } 
      }else{
        if (type && baseTypeNames.includes(type.name)) {
          data = { type: type.name.toLocaleLowerCase() }
        } else {
          data = {
            $ref: getSchemaPath(type)
          }     
        }
      }
  } else {
    data = { type: 'null', default: null }
  }

  //const model = Array.isArray(type) ? type[0] : type

  const pageInfo = isPage ? {
                    type: 'object',
                    properties: {
                      page_size: { type: 'number', default: 100 },
                      total: { type: 'number', default: 200 },
                      current_page: { type: 'number', default: 1 },
                      page_count: { type: 'number', default: 10 },
                   },
              } : { type: 'null', default: null } 

  return applyDecorators(
    ApiExtraModels(type),
    ApiResponse({
      status,
      schema: {
        allOf: [
          //{ $ref: getSchemaPath(ResOp) },
          {
            properties: {
              //response: prop,
              data,
              pageInfo,
              status: { type: 'number', default: status ?? 200 },
              message: { type: 'string', default: message ?? '请求成功' } 
            } 
          },
        ],
      },
    }),
  )
}