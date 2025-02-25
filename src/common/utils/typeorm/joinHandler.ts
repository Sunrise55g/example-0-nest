import {
  Injectable, BadRequestException, NotFoundException,
} from '@nestjs/common';


////
import { EOperator, IOperator, ECondition, ICondition } from './types';
import { queryFormer } from './queryFormer';




export function joinHandler(dto: any, table: any, query: any) {
  // console.log('Start joinHandler: dto.join:', dto.join)

  if (!dto.join) {
    return query;
  }
  ////
  let joinArr: any[] = []

  // join string
  if (typeof dto.join == 'string') {
    const joinString = dto.join as unknown as string;

    joinArr.push({
      joinString: joinString,
    });
  }

  // join obj
  else if (typeof dto.join == 'object') {
    for (const dtoJoinKeys in dto.join as object) {
      const joinString = dto.join[dtoJoinKeys] as unknown as string;

      joinArr.push({
        joinString: joinString,
      });
    }
  }


  //
  for (let joinArrObj of joinArr) {

    //
    const joinPrev = joinArrObj.joinString.split('.');
    // joinArrObj['joinPrev'] = joinPrev;


    //
    let joinFinal = {};

    for (let joinPrevObj of joinPrev) {

      //
      const joinPrevSplit = joinPrevObj.split('||');

      let relation = joinPrevSplit[0];
      let fieldsStr = joinPrevSplit[1]
      let fields = fieldsStr?.split(',')

      if (fields) {
        for (const key in fields) {
          fields[key] = `${relation}.${fields[key]}`;
        }
      }

      joinFinal[relation] = {
        relation: relation,
        // fieldsStr: fieldsStr,
        fields: fields
      };
    }

    joinArrObj['joinFinal'] = joinFinal;
  }

  // console.dir(joinArr, { depth: null })



  ////
  for (let joinArrObj of joinArr) {

    const joinFinal = joinArrObj.joinFinal;

    //
    let joinTable = table;

    for (const key in joinFinal) {
      const joinFinalObj = joinFinal[key];

      try {
        const relation = joinFinalObj.relation;
        const fields = joinFinalObj?.fields;

        if (fields) {
          query.leftJoin(`${joinTable}.${relation}`, relation);
          query.addSelect(fields);
        }
        else {
          query.leftJoinAndSelect(`${joinTable}.${relation}`, relation);
        }

        joinTable = relation;
      } 
      catch {
        throw new BadRequestException(`Join parameters error.`);
      }

    }


  }

  
  return query;
}
