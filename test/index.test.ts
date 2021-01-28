import { Char } from '../src';
import { GameObjectParams } from 'game_object';

test('', () => {
  const char = new Char<GameObjectParams>(
    {
      width: 0,
      height: 0,
      pixels: [],
    },
    { x: 0, y: 0 }
  );
  expect(char).toBeTruthy();
});
