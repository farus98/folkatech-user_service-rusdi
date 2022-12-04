import {
    CallHandler,
    ExecutionContext,
    Injectable,
    NestInterceptor,
  } from '@nestjs/common';
  import { Observable } from 'rxjs';
  import { map } from 'rxjs/operators';
  
  export interface Response<T> {
    data: T;
  }
  
  @Injectable()
  export class ResponseMappingInput<T> implements NestInterceptor<T, Response<T>> {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => ({
          meta: {
            code: 201,
            msg: 'success',
          },
          data: data,
          error: '',
        })),
      );
    }
  }

  export class ResponseMappingRetrieve<T> implements NestInterceptor<T, Response<T>> {
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => ({
          meta: {
            code: 200,
            msg: 'success',
          },
          data: data,
          error: '',
        })),
      );
    }
  }

  export class ResponseMappingRetrievePage<T> implements NestInterceptor<T, Response<T>> {
    
    private getDataPage(data: any) {
    if (!!data) {
      return data.data;
    }
    return {};
    }
    
    private getPage(data: any) {
      if (!!data) {
        return data.pagination;
      }
      return {};
    }
    
    intercept(
      context: ExecutionContext,
      next: CallHandler,
    ): Observable<Response<T>> {
      return next.handle().pipe(
        map((data) => ({
          meta: {
            code: 200,
            msg: 'success',
          },
          data: this.getDataPage(data),
          pagination: this.getPage(data),
          error: ''
        })),
      );
    }
  }