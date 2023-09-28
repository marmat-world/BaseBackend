import { DynamicModule, Module } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
export interface ConfigModuleOptions {
  folder: string;
}
interface IModuleInfo {
  name: string;
  module: DynamicModule;
}
@Module({})
export class IndexModule {
  static async forRoot(options: ConfigModuleOptions): Promise<DynamicModule>{
    return new Promise((resolve,reject)=>{
      const allModule = fs.readdirSync(options.folder).filter(item=> path.extname(item) === '.js').map(item=>import(path.join(options.folder,item)));
      Promise.all(allModule).then(res=>{
        const moduleInfos = res.map(item=> Object.entries<DynamicModule>(item)).flat(1).map(item=>(item[1]))
        resolve({
          module: IndexModule,
          imports: moduleInfos,
          providers: [
            {
              provide: "CONFIG_OPTIONS",
              useValue: options,
            },
          ],
          exports: [],
        });
      })
    })
  }
}