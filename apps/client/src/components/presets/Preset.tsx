import Sakoy1Preset from "./Sakoy1Preset"
import TestPreset from "./TestPreset"

export const PlaceholderName = 'NAME'
export const PlaceholderPrompt = 'PLACEHOLDER PROMPT GOES HERE'

export type Theme = {
  display: string,
  key: string,
  element: () => JSX.Element
}

export type Themes = Theme[]

export const themes: Themes = [
  {
    display: 'test',
    key: "TEST",
    element: TestPreset,
  },
  {
    key: "family",
    display: 'ครอบครัว',
    element: () => <></>,
  },
  {
    key: "sakoy1",
    display: "สก๊อย 1",
    element: Sakoy1Preset
  }
]
