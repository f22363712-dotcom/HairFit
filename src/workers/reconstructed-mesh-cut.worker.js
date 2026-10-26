import { cutHairGeometry } from '../lib/reconstructed-mesh-cut.js';

self.onmessage = ({ data }) => {
  const { id, epoch, geometry, center, radius } = data ?? {};
  try {
    const result = cutHairGeometry(geometry, { center, radius });
    const transfers = [];
    for (const packet of [result.remaining, result.removed]) {
      transfers.push(packet.positions.buffer, packet.normals.buffer);
      if (packet.index) transfers.push(packet.index.buffer);
    }
    self.postMessage({ id, epoch, result }, transfers);
  } catch {
    self.postMessage({ id, epoch, error: 'Hair cut failed. Try a smaller cut or reset the model.' });
  }
};
