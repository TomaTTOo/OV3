/** Saving the logo: the SVG as it is, or rendered to PNG at its size. */

function save(name: string, blob: Blob) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = name;
  link.click();
  URL.revokeObjectURL(url);
}

export function downloadSvg(name: string, svg: string) {
  save(`${name}.svg`, new Blob([svg], { type: 'image/svg+xml' }));
}

export async function downloadPng(name: string, svg: string, width: number, height: number) {
  const image = new Image();
  image.src = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' }));
  await image.decode();
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext('2d');
  if (!context) throw new Error('This browser cannot draw the PNG.');
  context.drawImage(image, 0, 0, width, height);
  URL.revokeObjectURL(image.src);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, 'image/png'));
  if (!blob) throw new Error('The PNG could not be made.');
  save(`${name}.png`, blob);
}
