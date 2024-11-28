import { generateKey } from './utils';

test('generateKey', () => {
    const key = generateKey();
    console.log(key);
    expect(key.length).toBeGreaterThanOrEqual(15);
});
