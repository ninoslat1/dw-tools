import { atom } from 'nanostores'

export const $page = atom<'convert' | 'history'>('convert')
