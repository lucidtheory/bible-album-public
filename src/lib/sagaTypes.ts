/*
These types are borrowed graciously from our fellow developers at:

https://github.com/agiledigital/typed-redux-saga/commit/f2fc47f0e94d4f7c762124df06582a8e5d9d9fa5
*/
import { Effect } from 'redux-saga/effects';

type SagaIterator<RT = any> = Generator<Effect<any>, RT, any>;

export type SagaReturnType<
  S extends (...args: any[]) => any,
  T = ReturnType<S>,
> = T extends SagaIterator<infer RT>
  ? RT
  : T extends Promise<infer RT>
    ? RT
    : T extends infer RT
      ? RT
      : never;
