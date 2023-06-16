import GameObject, {
  GameObjectParams,
  RenderMode,
} from '@al-engine/game_object';
import { SpriteMapAsset } from '@al-engine/asset';
import { Sprite } from '@al-engine/core';
import { IMessage } from '@al-engine/message';

interface Map {
  [index: string]: number;
}
const map: Map = {
  а: 0,
  б: 1,
  в: 2,
  г: 3,
  ґ: 4,
  д: 5,
  е: 6,
  є: 7,
  ж: 8,
  з: 9,
  и: 10,
  і: 11,
  ї: 12,
  й: 13,
  к: 14,
  л: 15,
  м: 16,
  н: 17,
  о: 18,
  п: 19,
  р: 20,
  с: 21,
  т: 22,
  у: 23,
  ф: 24,
  х: 25,
  ц: 26,
  ч: 27,
  ш: 28,
  щ: 29,
  ь: 30,
  ю: 31,
  я: 32,
  А: 33,
  Б: 34,
  В: 35,
  Г: 36,
  Ґ: 37,
  Д: 38,
  Е: 39,
  Є: 40,
  Ж: 41,
  З: 42,
  И: 43,
  І: 44,
  Ї: 45,
  Й: 46,
  К: 47,
  Л: 48,
  М: 49,
  Н: 50,
  О: 51,
  П: 52,
  Р: 53,
  С: 54,
  Т: 55,
  У: 56,
  Ф: 57,
  Х: 58,
  Ц: 59,
  Ч: 60,
  Ш: 61,
  Щ: 62,
  Ь: 63,
  Ю: 64,
  Я: 65,
  '0': 66,
  '1': 67,
  '2': 68,
  '3': 69,
  '4': 70,
  '5': 71,
  '6': 72,
  '7': 73,
  '8': 74,
  '9': 75,
  '!': 76,
  '"': 77,
  '#': 78,
  $: 79,
  '%': 80,
  '&': 81,
  "'": 82,
  '(': 83,
  ')': 84,
  '*': 85,
  '+': 86,
  ',': 87,
  '-': 88,
  '.': 89,
  '/': 90,
  ':': 91,
  ';': 92,
  '<': 93,
  '=': 94,
  '>': 95,
  '?': 96,
  '@': 97,
  '[': 98,
  ']': 99,
  '\\': 100,
  '^': 101,
  _: 102,
  '{': 103,
  '}': 104,
  '|': 105,
  '~': 106,
};
export const options = {
  charSize: 8,
  charsCount: 107,
};

export default class Message<Params extends GameObjectParams>
  extends GameObject<Params>
  implements IMessage {
  font: SpriteMapAsset;
  message: string;

  constructor(message: string, font: SpriteMapAsset, renderMode?: RenderMode) {
    super(renderMode);

    this.size = {
      height: options.charSize,
      width: message.length * options.charSize,
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
      height: options.charSize,
      width: this.message.length * options.charSize,
    };
    for (let index = 0; index < this.message.length; index++) {
      const char = this.message[index];
      const spriteIndex = this.getSpriteIndexByChar(char);
      if (spriteIndex !== undefined) {
        const sprite = this.font.data!.sprites[
          options.charsCount - 1 - spriteIndex
        ];
        const parentOffset = { x: 0, y: 0 };
        if (this.renderMode === RenderMode.hud) {
          parentOffset.x = this.position.x;
          parentOffset.y = this.position.y;
        }
        this.addChild(
          new Char(
            sprite,
            {
              x: parentOffset.x + index * options.charSize,
              y: parentOffset.y,
            },
            this.renderMode
          )
        );
      }
    }
  };

  getSpriteIndexByChar = (char: string): number | undefined => {
    return map[char];
  };
}

export class Char<Params extends GameObjectParams> extends GameObject<Params> {
  constructor(
    sprite: Sprite,
    position: { x: number; y: number },
    renderMode?: RenderMode
  ) {
    super(renderMode);
    this.position = position;
    this.sprite = sprite;
  }
}
