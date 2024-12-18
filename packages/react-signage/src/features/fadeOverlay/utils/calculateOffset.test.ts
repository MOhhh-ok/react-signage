import { Size } from '../types';
import { calculateOffset } from './calculateOffset';

describe('calculateOffset', () => {
    it('should calculate correct offset and size when source ratio is greater than target ratio', () => {
        const srcSize: Size = { width: 200, height: 100 };
        const targetSize: Size = { width: 100, height: 100 };

        const result = calculateOffset(srcSize, targetSize);

        expect(result).toEqual({
            xOffset: 0,
            yOffset: 25,
            newWidth: 100,
            newHeight: 50,
        });
    });

    it('should calculate correct offset and size when source ratio is less than target ratio', () => {
        const srcSize: Size = { width: 100, height: 200 };
        const targetSize: Size = { width: 100, height: 100 };

        const result = calculateOffset(srcSize, targetSize);

        expect(result).toEqual({
            xOffset: 25,
            yOffset: 0,
            newWidth: 50,
            newHeight: 100,
        });
    });

    it('should calculate correct offset and size when source ratio equals target ratio', () => {
        const srcSize: Size = { width: 100, height: 100 };
        const targetSize: Size = { width: 100, height: 100 };

        const result = calculateOffset(srcSize, targetSize);

        expect(result).toEqual({
            xOffset: 0,
            yOffset: 0,
            newWidth: 100,
            newHeight: 100,
        });
    });
});
