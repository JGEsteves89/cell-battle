export function setupCanvas() {
    const margin = 30;
    const width = window.innerWidth - margin;
    const height = window.innerHeight - margin;
    const canvas = document.getElementById('screen');
    canvas.setAttribute('width', '' + width);
    canvas.setAttribute('height', '' + height);
    const ctx = canvas.getContext('2d');
    ctx.canvas.width = width;
    ctx.canvas.height = height;
    return { canvas, ctx, width, height };
}
