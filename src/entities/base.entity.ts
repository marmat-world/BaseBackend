import {Column,PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn  } from 'typeorm';
const moment = require('moment');

export abstract class Base {

    @PrimaryGeneratedColumn({ type: 'int', unsigned: true, comment: '主键id' })
    id: number;

    @Column({ type: 'tinyint', unsigned: true, default: 1, comment: '状态:1启用 0禁用' })
    status: number

    @CreateDateColumn({ type: 'timestamp', comment: '创建时间', transformer: {
        to(value) {
          return value;
        },
        from(value) {
          return moment(value).valueOf();
        }
      },
    })
    create_time: Date 
  
    @UpdateDateColumn({ type: 'timestamp', comment: '修改时间', transformer: {
        to(value) {
            return value;
          },
          from(value) {
            return moment(value).valueOf();
          }
        } 
    })
    update_time: Date 
    
}