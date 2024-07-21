export default function calculateSimplifiedWaveHeight(x, z, time) {
  const waveFrequency = 0.11;
  const waveAmplitude = 0.15;

  const wave1 = Math.sin(x * waveFrequency + time) * waveAmplitude;
  const wave2 = Math.sin(z * waveFrequency + time * 1.5) * waveAmplitude;

  return wave1 + wave2;
}
