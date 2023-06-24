import { atom } from 'jotai'

/**
 * User input
 */
export const nameAtom = atom('')
/**
 * From backend
 */
export const promptAtom = atom('')
/**
 * Voice from backend
 */
export const voiceAtom = atom('')
/**
 *
 */
export const audioBufferAtom = atom<AudioBuffer | undefined>(undefined)
export const audioDataURLAtom = atom<string | undefined>(undefined)
