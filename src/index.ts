import GameObject, { GameObjectParams } from '@al-engine/game_object';
import { SpriteMapAsset } from '@al-engine/asset';
import { Sprite } from '@al-engine/core';

interface Map {
  [index: string]: number;
}

const charSize = 8;
const map: Map = {
  a: 0,
  b: 1,
  c: 2,
  d: 3,
  e: 4,
  f: 5,
  g: 6,
  h: 7,
  i: 8,
  j: 9,
  k: 10,
  l: 11,
  m: 12,
  n: 13,
  o: 14,
  p: 15,
  q: 16,
  r: 17,
  s: 18,
  t: 19,
  u: 20,
  v: 21,
  w: 22,
  x: 23,
  y: 24,
  z: 25,
  A: 26,
  B: 27,
  C: 28,
  D: 29,
  E: 30,
  F: 31,
  G: 32,
  H: 33,
  I: 34,
  J: 35,
  K: 36,
  L: 37,
  M: 38,
  N: 39,
  O: 40,
  P: 41,
  Q: 42,
  R: 43,
  S: 44,
  T: 45,
  U: 46,
  V: 47,
  W: 48,
  X: 49,
  Y: 50,
  Z: 51,
  '0': 52,
  '1': 53,
  '2': 54,
  '3': 55,
  '4': 56,
  '5': 57,
  '6': 58,
  '7': 59,
  '8': 60,
  '9': 61,
  '!': 62,
  '"': 63,
  '#': 64,
  $: 65,
  '%': 66,
  '&': 67,
  "'": 68,
  '(': 69,
  ')': 70,
  '*': 71,
  '+': 72,
  ',': 73,
  '-': 74,
  '.': 75,
  '/': 76,
  ':': 77,
  ';': 78,
  '<': 79,
  '=': 80,
  '>': 81,
  '?': 82,
  '@': 83,
  '[': 84,
  ']': 85,
  '\\': 86,
  '^': 87,
  _: 88,
  '{': 89,
  '}': 90,
  '|': 91,
  '~': 92,
};

export default class Message<
  Params extends GameObjectParams
> extends GameObject<Params> {
  font: SpriteMapAsset;
  message: string;

  constructor(message: string, font: SpriteMapAsset) {
    super();

    this.size = {
      height: charSize,
      width: message.length * charSize,
    };

    this.message = message;
    this.font = font;
  }

  init(): void {
    if (this.font.isLoading()) {
      throw Error('Font should be loaded before create message');
    }

    this.mountMessage();
  }

  changeMessage = (message: string) => {
    this.message = message;
    this.mountMessage();
  };

  mountMessage = () => {
    this.children = [];
    this.size = {
      height: charSize,
      width: this.message.length * charSize,
    };
    for (let index = 0; index < this.message.length; index++) {
      const char = this.message[index];
      const spriteIndex = this.getSpriteIndexByChar(char);
      if (spriteIndex !== undefined) {
        const sprite = this.font.data!.sprites[spriteIndex];
        this.addChild(new Char(sprite, { x: index * charSize, y: 0 }));
      }
    }
  };

  getSpriteIndexByChar = (char: string): number | undefined => {
    return map[char];
  };
}

export class Char<Params extends GameObjectParams> extends GameObject<Params> {
  constructor(sprite: Sprite, position: { x: number; y: number }) {
    super();
    this.position = position;
    this.sprite = sprite;
  }
}
