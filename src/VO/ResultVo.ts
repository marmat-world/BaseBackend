import { ApiProperty } from "@nestjs/swagger";

export class ResultVO<T> {
  @ApiProperty({ example: 200, type: 'number', description: '接口状态码' })
  private statusCode!: number;
  @ApiProperty({ example: '请求成功', type: 'string', description: '接口信息' })
  private message!: string;
  private data!: T | null;
  @ApiProperty({ example: { page_size: 10, total: 100, current_page: 1, page_count: 10 }, type: '{ page_size: number, total: number, current_page: number, page_count: number }', description: '分页信息'})
  private pageInfo! : T | null

  public getCode(): number {
    return this.statusCode
  }

  public setCode(value: number): void {
    this.statusCode = value;
  }

  public getMsg(): string {
    return this.message;
  }

  public setMsg(value: string): void {
    this.message= value;
  }

  public getData(): T | null {
    return this.data;
  }

  public setData(value: T | null): void {
    this.data = value;
  }

  public setPageInfo(value: T | null):void {
    this.pageInfo = value;
  }

  public getPageInfo(): T | null {
    return this.pageInfo;
  }
}