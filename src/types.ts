import { JSONEnvelope, Path } from 'falcor'


export type NextProps<Fragment extends Partial<TypedFragment> = Partial<TypedFragment>> = { status: 'next', graphFragment: JSONEnvelope<Fragment> | {} }
export type CompleteProps<Fragment extends Partial<TypedFragment> = Partial<TypedFragment>> = { status: 'complete', graphFragment: JSONEnvelope<Fragment> | {} }
export type ErrorProps = { status: 'error', graphFragment: {}, error: Error }
export type ChildProps<Fragment extends Partial<TypedFragment> = Partial<TypedFragment>> = NextProps<Fragment> | CompleteProps<Fragment> | ErrorProps

export type Atom<T = any> = { $type: 'atom', value: T }
export type Ref = { $type: 'ref', value: Path }
export type ErrorSentinel<T = any> = { $type: 'error', value: T }
export type Sentinel = Atom | Ref | ErrorSentinel

export type Primitive = string | number | boolean | null | undefined
export type ComplexType = Primitive
  | Primitive[]
  // TODO - handle deep complex types once typescript can circularly reference types https://github.com/microsoft/TypeScript/pull/33050
  | { [key: string]: Primitive | Primitive[] }
  | { [key: string]: { [key: string]: Primitive | Primitive[] } }
  | { [key: string]: { [key: string]: { [key: string]: Primitive | Primitive[] } } }
  | { [key: string]: { [key: string]: { [key: string]: { [key: string]: Primitive | Primitive[] } } } }


export type FalcorList<Item = any> = { length: number } & { [index: string]: Item }

export type TerminalSentinel<T> = Atom<T> | Atom<null> | Atom<undefined> | ErrorSentinel<string | { message: string }>

export type TypedFragment = TerminalSentinel<ComplexType> | { [key: string]: TypedFragment }