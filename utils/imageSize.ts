export function calculateSize(src: string) {
    const img = new Image();
    img.src = src;

    const width = img.width;
    const height = img.height;
    return {width, height};
}